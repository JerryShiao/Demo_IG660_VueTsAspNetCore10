// 設定檔：Tailwind CSS 的設定，這裡可以自訂 Tailwind 的主題、顏色、字型等
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          200: '#bbd8ef',
          500: '#6d9bd6',
        },
      },
    },
  },
  plugins: [],
};
