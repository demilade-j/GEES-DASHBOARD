module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './my-react-router-app/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  safelist: [
    // backgrounds
    'bg-white', 'bg-gray-50', 'bg-gray-300', 'bg-gray-700', 'bg-slate-900', 'bg-slate-950',
    // text
    'text-gray-900', 'text-gray-100', 'text-indigo-700', 'text-indigo-200',
    // borders
    'border-gray-200', 'border-gray-800',
    // peer/checked variants
    'peer-checked:bg-blue-600', 'peer-checked:bg-indigo-500', 'peer-checked:translate-x-5',
    // hover/active
    'hover:underline',
  ],
  plugins: [],
};
