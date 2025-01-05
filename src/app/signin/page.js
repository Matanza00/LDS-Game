"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import LDSLogo from "../../../public/LDSLogo.svg"; // Adjust the path to your SVG logo

const SignIn = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        if (user && user.id) {
          localStorage.setItem(
            "user",
            JSON.stringify({ name: user.name, loggedIn: true, id: user.id })
          );
          router.push("/game");
        } else {
          console.error("User data does not have a valid ID");
        }
      } else {
        const errorData = await response.json();
        setError(errorData?.message || "Invalid email or password");
      }
    } catch (err) {
      console.error("Error during sign-in:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white px-4">
      <div
        className="w-full p-6 bg-black rounded-lg shadow-lg"
        style={{
          maxWidth: "80vw", // Dynamic width for lg and xl screens
          width: "110%",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div className="flex justify-center mb-16 mt-10 ml-12">
          <Image src={LDSLogo} alt="LDS Logo" width={120} height={120} />
        </div>

        {/* Welcome Text */}
        <h2 className="text-center text-2xl font-medium tracking-wide mb-8 ml-12">
          Welcome Back, Champ!
        </h2>

        <form
          onSubmit={handleSignIn}
          className="space-y-8"
          style={{
            width: "110%",
            maxWidth: "80vw", // Dynamic width for lg and xl
            margin: "0 auto",
          }}
        >
          {/* Email Field */}
          <div className="flex flex-col w-full">
            <label
              htmlFor="email"
              className="block text-lg font-medium text-white mb-2 text-left"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="john.doe@gmail.com"
              className="h-12 px-4 bg-transparent text-white border border-gray-500 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "110%",
                maxWidth: "80vw", // Dynamic width
                minWidth: "220px", // Minimum width for smaller screens
              }}
            />
          </div>

          {/* Password Field */}
          <div className="flex flex-col w-full">
  <label
    htmlFor="password"
    className="block text-lg font-medium text-white mb-2 text-left"
  >
    Password
  </label>
  <div
    className="relative flex items-center"
    style={{
      width: "110%",
      maxWidth: "80vw", // Dynamic width for larger screens
      minWidth: "20vw", // Minimum width for smaller screens
    }}
  >
    <input
      type={showPassword ? "text" : "password"}
      id="password"
      placeholder="Enter your password here"
      className="h-12 px-4 pr-12 bg-transparent text-white border border-gray-500 rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
      style={{
        width: "110%",
      }}
    />
    {/* Eye Icon for Password Visibility */}
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="absolute right-3 text-white hover:text-gray-400 focus:outline-none"
      style={{
        top: "50%",
        transform: "translateY(-50%)",
      }}
    >
      {showPassword ? "🙈" : "👁️"}
    </button>
  </div>
</div>

          {/* Login Button */}
          <div className="w-full">
            <button
              type="submit"
              className="h-12 bg-white text-black font-bold rounded-lg shadow-md hover:bg-gray-200 focus:ring-2 focus:ring-white focus:outline-none"
              style={{
                width: "110%",
                maxWidth: "80vw", // Dynamic width
                minWidth: "20vw",
              }}
            >
              LOGIN
            </button>
          </div>

          {/* Go Back Button */}
          <div className="w-full">
            <button
              type="button"
              className="h-12 bg-black text-white border border-white font-bold rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-white focus:outline-none"
              onClick={() => router.back()}
              style={{
                width: "110%",
                maxWidth: "80vw", // Dynamic width
                minWidth: "220px",
              }}
            >
              GO BACK
            </button>
          </div>
        </form>

        {/* Error Message */}
        {error && (
          <p className="text-red-500 text-center text-lg font-medium mt-4">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default SignIn;
