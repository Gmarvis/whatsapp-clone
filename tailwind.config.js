/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        maebrie:
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
        brie: " 0 1px .5px rgba(var(--shadow-rgb),.13)",
      },
      backgroundImage: {
        whatsappimg: "url('/whatsappbg1.jpeg')",
        whatsappdashimg: "url('/whatsappdashbord.png')",
        beckamp:
          "url('/https://static.startuptalky.com/2022/04/david-beckham-endorsed-brands-startuptalky-.jpg')",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        greenMessage: "#8EFD8E",
        themecolor: "#01a884",
        secondry: "#005c4b",
        bgGray: "#f0f2f5",

        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
      screens: {
        mobile: "0px",
      },
    },
  },
  plugins: [],
};
