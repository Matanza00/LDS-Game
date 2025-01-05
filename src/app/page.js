"use client";

import Image from "next/image";
import LDSLogo from "../../public/LDSLogo.svg"; // Adjust the path to your logo
import CubeImage from "../../public/Group_1.svg"; // Adjust the path to your 3D cube image
import Footer from "./components/Footer"; // Import the Footer component

const HomePage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-black text-white relative">
      {/* Cube Section */}
      <div
        className="flex justify-center lg:absolute lg:left-1/2 lg:transform lg:-translate-x-1/2"
        style={{
          marginTop: "3%", // Default for mobile
          zIndex: 10,
          width: "250px",
          height: "250px",
        }}
      >
        <Image src={CubeImage} alt="3D Cube" width={250} height={250} />
      </div>

      {/* Main Content Section */}
      <div
        className="flex flex-col lg:flex-row justify-between items-start w-full relative z-1 mt-10 lg:mt-40"
        style={{
          flex: 1, // Ensures the content takes available space
          padding: "20px",
          gap: "240px", // Add spacing between columns
        }}
      >
        {/* Left Section */}
        <div
          className="flex flex-col justify-start bg-black pl-6 lg:pl-10"
          style={{
            width: "100%", // Full width on smaller screens
            maxWidth: "850px", // Fixed width for larger screens
            height: "auto", // Auto height for smaller screens
            border: "1px solid white", // Top border
            borderLeft: "none", // Remove left border
            borderBottom: "none", // Remove bottom border
            borderTopLeftRadius: "21px", // Rounded top-left corner
            padding: "20px", // Add padding for content
          }}
        >
          {/* Logo */}
          <div className="pl-4 pt-8 lg:pl-16 lg:pt-10">
            <Image src={LDSLogo} alt="LDS Logo" width={100} height={50} />
          </div>

          {/* Content */}
          <div className="pt-6 lg:pt-16 px-4 lg:px-10">
            <h1 className="text-3xl lg:text-4xl font-bold mb-4">
              FREE Branding Package
            </h1>
            <p className="text-lg lg:text-xl font-light mb-6">
              for y'all founders
            </p>
            <ul className="space-y-2 text-sm lg:text-lg mb-8">
              <li>• Logo</li>
              <li>• Brand Guidelines</li>
              <li>• Business Card</li>
              <li>• Letterhead</li>
              <li>• Website Landing Page</li>
              <li>• Stationary Design</li>
            </ul>
          </div>
        </div>

        {/* Right Section */}
        <div
          className="flex flex-col justify-start items-center p-6 lg:p-10 w-full lg:w-1/2 mt-48 sm: pb-48"
          style={{
            textAlign: "center", // Center-align text in the right section
          }}
        >
          <h2 className="text-2xl lg:text-3xl font-bold mt-6 lg:mt-0">
            Play The Game
          </h2>
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4 mt-4">
            <button
              className="bg-white text-black font-bold px-6 py-2 rounded-lg shadow-md hover:bg-gray-200 flex items-center justify-center"
              style={{
                fontSize: "14px", // Smaller text size
                height: "40px", // Reduced height
                lineHeight: "1", // Adjust line height to center text
              }}
            >
              LOGIN
            </button>
            <button
              className="bg-transparent border border-white text-white font-bold px-6 py-2 rounded-lg shadow-md hover:bg-gray-800 flex items-center justify-center"
              style={{
                fontSize: "14px", // Smaller text size
                height: "40px", // Reduced height
                lineHeight: "1", // Adjust line height to center text
              }}
            >
              JOIN WAITLIST
            </button>
          </div>
        </div>
      </div>

      {/* Footer Component */}
      <Footer />
    </div>
  );
};

export default HomePage;
