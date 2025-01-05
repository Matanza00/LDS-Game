"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpStep2 = () => {
  const router = useRouter();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [industry, setIndustry] = useState("");

  const handleContinue = (e) => {
    e.preventDefault();
    localStorage.setItem(
      "signupStep2",
      JSON.stringify({ productName, description, industry })
    );
    router.push("/signup/page3");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Form Section */}
      <div className="w-1/2 flex flex-col justify-center px-10">
        <h1 className="text-2xl font-bold mb-4">
          Could you tell us a bit more about your company?
        </h1>
        <form onSubmit={handleContinue} className="space-y-6">
          <input
            type="text"
            placeholder="Name of your product *"
            className="w-full h-12 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <textarea
            placeholder="What is your product about? *"
            className="w-full h-32 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter the name of your industry"
            className="w-full h-12 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
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

export default SignUpStep2;
