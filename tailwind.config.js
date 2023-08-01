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
      'sm': '520px',
      // => @media (min-width: 375px) { ... }
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'black-light': '#333333',
      'black': '#000000',
      'dark': '#252329',
      'gray-light': '#BDBDBD',
      'gray': '#828282',
      'gray-secondary': '#E0E0E0',
      'blue-light': '#2D9CDB',
      'blue': '#2F80ED',
      'red': '#EB5757'
    },
    extend: {
      fontFamily: {
        sans: ['var(--font-noto-sans)']
      },
      backgroundImage: {
        'camera': "url('/camera.svg')",
      }
    }
  },
  plugins: [require('@headlessui/tailwindcss')],
}
