"use client";

const Footer = () => {
  return (
    <div
      className="w-full flex justify-between items-center px-10 py-4"
      style={{
        borderTop: "1px solid white", // Add white border to the top
        position: "absolute", // Ensure footer stays at the bottom
        bottom: 0,
        left: 0,
        backgroundColor: "#000", // Match the background
      }}
    >
      {/* Left Footer Text */}
      <div>
        <p className="text-sm font-light">Launching Soon</p>
        <p className="text-sm font-bold">Legit Design Studio ®</p>
      </div>
      {/* Right Footer Text */}
      <div>
        <p className="text-sm font-light">
          If you have any query, contact{" "}
          <a
            href="mailto:contact@legitdesign.studio"
            className="text-white underline hover:text-gray-300"
          >
            contact@legitdesign.studio
          </a>
        </p>
      </div>
    </div>
  );
};

export default Footer;
