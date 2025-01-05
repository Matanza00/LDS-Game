"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { FaSync } from "react-icons/fa"; // Importing Sync icon

const Game = () => {
  const canvasRef = useRef(null);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);


  const resetGame = useCallback(() => {
    setGameOver(false);
    setScore(0);
    setPopupVisible(false);
    initializeGame();
  }, []);

  const initializeGame = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = Math.min(window.innerWidth * 0.9, 800);
    canvas.height = 400;

    let ball = { x: canvas.width / 2, y: canvas.height / 2, dx: 4, dy: 4, radius: 10, color: "white" };
    let paddle = { width: 100, height: 10, x: (canvas.width - 100) / 2, y: canvas.height - 20, speed: 5 };
    let keys = {};
    let localScore = 0;

    const drawBall = () => {
      if (!gameOver) {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = ball.color;
        ctx.shadowColor = "white";
        ctx.shadowBlur = 10;
        ctx.fill();
        ctx.closePath();
      }
    };

    const drawPaddle = () => {
      ctx.fillStyle = "white";
      ctx.shadowColor = "black";
      ctx.shadowBlur = 5;
      ctx.fillRect(paddle.x, paddle.y, paddle.width, paddle.height);
    };

    const update = () => {
      if (gameOver) return;

      ball.x += ball.dx;
      ball.y += ball.dy;

      if (ball.x + ball.radius > canvas.width || ball.x - ball.radius < 0) ball.dx *= -1;
      if (ball.y - ball.radius < 0) ball.dy *= -1;

      if (
        ball.y + ball.radius > paddle.y &&
        ball.x > paddle.x &&
        ball.x < paddle.x + paddle.width
      ) {
        const hitPosition = (ball.x - (paddle.x + paddle.width / 2)) / (paddle.width / 2);
        ball.dx = hitPosition * 6;
        ball.dy *= -1;
        localScore += 10;
        setScore(localScore);
      }

      if (ball.y + ball.radius > canvas.height) {
        setGameOver(true);
        setPopupVisible(true);
        ball.dx = 0;
        ball.dy = 0;
        ball.x = -100;
        ball.y = -100;
      }

      if ((keys["ArrowLeft"] || keys["a"]) && paddle.x > 0) paddle.x -= paddle.speed;
      if ((keys["ArrowRight"] || keys["d"]) && paddle.x < canvas.width - paddle.width) paddle.x += paddle.speed;
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBall();
      drawPaddle();
      update();
      requestAnimationFrame(render);
    };

    document.addEventListener("keydown", (e) => (keys[e.key] = true));
    document.addEventListener("keyup", (e) => (keys[e.key] = false));

    render();

    return () => {
      document.removeEventListener("keydown", (e) => (keys[e.key] = true));
      document.removeEventListener("keyup", (e) => (keys[e.key] = false));
    };
  }, [gameOver]);

  const submitScore = async () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.loggedIn || !user.id) {
      console.error("User is not logged in or userId is missing.");
      return;
    }

    const userId = user.id;

    try {
      const response = await fetch("/api/leaderboard", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          score,
          userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error submitting score:", errorData.message);
      } else {
        console.log("Score submitted successfully.");
      }
    } catch (error) {
      console.error("Error submitting score:", error);
    }
  };

  useEffect(() => {
    initializeGame();
  }, [initializeGame]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, [gameOver]);

  useEffect(() => {
    if (gameOver) {
      submitScore();
    }
  }, [gameOver, submitScore]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "r" || e.key === "R") {
        resetGame();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [resetGame]);

  return (
    <div
      style={{
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        maxWidth: "100vw",
        overflow: "hidden",
        backgroundColor: "#121212", // Dark background for the game area
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          marginTop: "20px",
          width: "100%",
        }}
      >
        <canvas ref={canvasRef} style={{ border: "1px solid white" }}></canvas>
        <button
          onClick={resetGame}
          style={{
            marginLeft: "10px",
            backgroundColor: "black",
            border: "1px solid #ddd",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            cursor: "pointer",
            color: "white",
            fontSize: "24px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FaSync style={{ color: "white" }} />
        </button>
      </div>

      <h3 style={{ color: "white" }}>Score: {score}</h3>

      <h2 style={{ color: "white" }}>Leaderboard</h2>
      <div style={{ overflowX: "auto", width: "100%" }}>
        <table
          border="1"
          style={{
            margin: "0 auto",
            maxWidth: "600px",
            width: "100%",
            tableLayout: "fixed",
            color: "white",
            borderColor: "#ddd",
          }}
        >
          <thead>
            <tr>
              <th>Rank</th>
              <th>Name</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map((entry, index) => (
              <tr key={entry.id}>
                <td>{index + 1}</td>
                <td>{entry.user.name}</td>
                <td>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {popupVisible && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#333", // Dark background for the popup modal
            color: "white", // White text for readability
            padding: "20px",
            border: "1px solid white", // White border for contrast
            zIndex: 1000,
            maxWidth: "90%",
          }}
        >
          <h2>Game Over!</h2>
          <p>Your Score: {score}</p>
          <h3>Leaderboard Rankings</h3>
          <ul>
            {leaderboard.map((entry, index) => (
              <li key={entry.id}>
                {index + 1}. {entry.user.name}: {entry.score}
              </li>
            ))}
          </ul>
          <button onClick={() => setPopupVisible(false)} style={{ backgroundColor: "#007bff", color: "white", padding: "5px 10px", cursor: "pointer", border: "none", borderRadius: "5px" }}>
            Close
          </button>
          <button
            style={{
              marginTop: "10px",
              marginLeft: "10px",
              backgroundColor: "#007bff",
              color: "white",
              padding: "5px 10px",
              cursor: "pointer",
              border: "none",
              borderRadius: "5px",
            }}
            onClick={resetGame}
          >
            Restart Game
          </button>
        </div>
      )}
    </div>
  );
};

export default Game;
