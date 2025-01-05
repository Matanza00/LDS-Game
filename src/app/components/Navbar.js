"use client";

import { useState } from "react";
import SignInModal from "./SignInModal"; // Import the SignIn Modal component

const Navbar = ({ user, setUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle the modal open/close
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="navbar">
      <div>Ping Pong Game</div>
      <div>
        {user.loggedIn ? (
          `Welcome, ${user.name}`
        ) : (
          <>
            Guest
            <button
              onClick={toggleModal}
              style={{
                marginLeft: "10px",
                background: "#000000",
                color: "#fff",
                padding: "5px 10px",
              }}
            >
              Sign In
            </button>
            {isModalOpen && (
              <SignInModal setIsModalOpen={setIsModalOpen} setUser={setUser} />
            )}
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
