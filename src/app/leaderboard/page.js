"use client";

import { useEffect, useState } from "react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    setUser(storedUser);

    const fetchLeaderboard = async () => {
      const response = await fetch("/api/leaderboard");
      const data = await response.json();
      setLeaderboard(data);
    };
    fetchLeaderboard();
  }, []);

  return (
    <div>
      <h1>Leaderboard</h1>
      {user && <p>Welcome, {user.name}</p>} {/* Show logged-in user's name */}
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={entry.id}>
            {index + 1}. {entry.user.name}: {entry.score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
