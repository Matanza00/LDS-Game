"use client";

const Input = ({ id, type = "text", placeholder, value, onChange, bgColor = "transparent" }) => {
  return (
    <div className="relative w-full">
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full h-10 px-4 text-white border border-white rounded-lg placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none`}
        style={{
          backgroundColor: bgColor, // Customizable background color
          color: "white", // Always white text
          fontFamily: "Satoshi, sans-serif", // Use Satoshi font
        }}
        required
      />
    </div>
  );
};

export default Input;
