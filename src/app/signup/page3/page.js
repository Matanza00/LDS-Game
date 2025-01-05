"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const SignUpStep3 = () => {
  const router = useRouter();
  const [link, setLink] = useState("");

  const handleFinish = (e) => {
    e.preventDefault();
    console.log("Signup completed!");
    router.push("/game");
  };

  return (
    <div className="flex min-h-screen bg-black text-white">
      {/* Form Section */}
      <div className="w-1/2 flex flex-col justify-center px-10">
        <h1 className="text-2xl font-bold mb-4">
          Thank you for submitting your form.
        </h1>
        <form onSubmit={handleFinish} className="space-y-6">
          <input
            type="url"
            placeholder="Share a link of your product with us!"
            className="w-full h-12 px-4 bg-transparent border border-gray-500 rounded-lg placeholder-gray-500"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-1/2 h-12 bg-white text-black rounded-lg"
            >
              FINISH
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

export default SignUpStep3;
