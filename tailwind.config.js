const tailwindConfig = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Include all relevant directories
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      spacing: {
        '200px': '200px', // Custom width for small and medium screens
        '400px': '400px', // Custom width for small and medium screens
        '800px': '800px', // Custom width for large and extra-large screens
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
