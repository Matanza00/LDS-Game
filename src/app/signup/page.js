"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpStep1 = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    localStorage.setItem(
      "signupStep1",
      JSON.stringify({ email, name, password })
    );
    router.push("/signup/page2");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Form Section */}
      <div className="w-1/2 flex flex-col justify-center px-10">
        <h1 className="text-2xl font-bold mb-4">You made it!</h1>
        <p className="text-sm mb-8">
          Your first step to becoming a part of Legit Design Studio.
        </p>
        <form onSubmit={handleContinue} className="space-y-6">
          <input
            type="email"
            placeholder="Email *"
            className="w-full h-12 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Full Name *"
            className="w-full h-12 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password *"
            className="w-full h-12 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Re-enter Password *"
            className="w-full h-12 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-1/2 h-12 bg-white text-black rounded-lg"
            >
              CONTINUE
            </button>
            <button
              type="button"
              className="w-1/2 h-12 bg-black border border-white text-white rounded-lg"
              onClick={() => router.back()}
            >
              GO BACK
            </button>
          </div>
        </form>
      </div>

      {/* Game Section */}
      <div className="w-1/2 bg-gray-900 flex items-center justify-center">
        <iframe
          src="/game"
          title="Ping Pong Game"
          className="w-4/5 h-4/5 rounded-lg"
        />
      </div>
    </div>
  );
};

export default SignUpStep1;
