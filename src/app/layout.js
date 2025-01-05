"use client";

import { useState } from "react";
import Navbar from "./components/Navbar"; // Import the Navbar component
import '../../styles/globals.css'; // Import the global CSS file


export default function RootLayout({ children }) {
  const [user, setUser] = useState({ loggedIn: false, name: "Guest", id: null });

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          {`
            /* Base styling for the body */
            body {
              margin: 0;
              
              overflow-x: hidden; /* Prevent horizontal scroll */
              background-color: #000000; /* Pure black background */
              color: #FFFFFF; /* Pure white text */
              padding: 0; /* Remove unnecessary padding */
              font-family: 'Satoshi', sans-serif; /* Use Satoshi font if available */
            }

            html, body {
              height: 100%; /* Ensure the body and html cover the entire viewport */
              display: flex;
              flex-direction: column; /* Stack children vertically */
            }

            * {
              box-sizing: border-box;
            }

            /* Navbar styling */
            .navbar {
              position: fixed;
              top: 0;
              left: 0;
              width: 100%;
              background-color: #333; /* Dark gray background for navbar */
              color: #FFFFFF; /* White text color for navbar */
              display: flex;
              justify-content: space-between; /* Space between logo and nav items */
              align-items: center;
              padding: 10px 20px;
              z-index: 1000; /* Ensure navbar stays on top of other content */
              box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5); /* Optional shadow */
            }

            .navbar button {
              margin-left: 10px;
              background: #007bff; /* Blue button background */
              color: #FFFFFF; /* White text */
              padding: 5px 10px;
              cursor: pointer;
              border: none;
              border-radius: 5px;
              transition: background-color 0.3s ease;
            }

            .navbar button:hover {
              background-color: #0056b3; /* Darker blue on hover */
            }

            .navbar div {
              display: flex;
              align-items: center;
            }

            /* Main content area styling */
            main {
              flex: 1; /* Take up the remaining height */
              display: flex; /* Enable flexbox layout */
              justify-content: center; /* Center content horizontally */
              align-items: center; /* Center content vertically */
              background-color: #000000; /* Darker black background for the main content */
              padding: 0; /* Remove unnecessary padding */
            }

            /* Responsive adjustments for smaller screens */
            @media (max-width: 768px) {
              .navbar {
                padding: 10px 15px;
              }

              .navbar button {
                padding: 5px 8px;
                font-size: 0.9rem;
              }

              main {
                padding: 10px;
              }
            }
          `}
        </style>
      </head>
      <body>
        {/* Navbar */}
        {/* <Navbar user={user} setUser={setUser} /> */}
        
        {/* Main Content */}
        <main>{children}</main>
      </body>
    </html>
  );
}
