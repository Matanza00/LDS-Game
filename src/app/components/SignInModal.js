"use client";

import { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa"; // Import FontAwesome icons for email and password

const SignInModal = ({ setIsModalOpen, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous error

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        // Set the user in the state after successful login
        setUser({ id: user.id, name: user.name, loggedIn: true });
        setIsModalOpen(false); // Close the modal
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#1c1c1c", // Dark background
        padding: "20px",
        border: "1px solid #444",
        zIndex: 1000,
        maxWidth: "90%",
        width: "350px",
        color: "#fff", // White text for dark theme
        borderRadius: "10px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center", // Centers the content vertically and horizontally
        opacity: "0.9",
        
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "15px" }}>Sign In</h2>
      
      <form onSubmit={handleSignIn} style={{ display: "flex", flexDirection: "column", gap: "15px", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#333", padding: "5px", borderRadius: "5px" }}>
          <FaEnvelope style={{ marginRight: "10px", color: "#aaa" }} />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              background: "transparent",
              color: "#fff",
              border: "none",
              outline: "none",
              borderRadius: "5px",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", backgroundColor: "#333", padding: "5px", borderRadius: "5px" }}>
          <FaLock style={{ marginRight: "10px", color: "#aaa" }} />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "10px",
              fontSize: "16px",
              background: "transparent",
              color: "#fff",
              border: "none",
              outline: "none",
              borderRadius: "5px",
            }}
          />
        </div>

        {error && <p style={{ color: "red", marginTop: "5px", textAlign: "center" }}>{error}</p>}

        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#007bff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "48%",
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              color: "#fff",
              backgroundColor: "#f44336",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              width: "48%",
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignInModal;
