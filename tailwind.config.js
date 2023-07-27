/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/containers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      'sm': '375px',
      // => @media (min-width: 375px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black': '#333333',
      'gray-light': '#BDBDBD',
      'gray': '#828282',
      'blue-light': '#2D9CDB',
      'blue': '#2F80ED'
    },
    extend:{
      fontFamily:{
        sans:['var(--font-noto-sans)']
      }
    }
  },
  plugins: [],
}
