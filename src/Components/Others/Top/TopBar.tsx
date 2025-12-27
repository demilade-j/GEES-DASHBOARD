import { BellDot, Search } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext";
import { useState } from "react";

export default function TopBar() {
  const { dark, toggle } = useTheme();
  const [modal,setModal] = useState(false)

  // side-effect already handled by ThemeProvider; keep label in sync

  return (
    <div className={`${dark ? 'bg-slate-950 text-gray-100 border-gray-800' : 'bg-gray-100 text-gray-900 border-gray-200'} h-20 border-b px-10 flex justify-between items-center`}>
      <main className={`flex gap-3 items-center justify-center px-4 h-10 rounded-md ${dark ? "":"bg-gray-300"}`}>
        <span>
          <Search />
        </span>
        <input
          type="text"
          placeholder="Search..."
          className="border-0 outline-0 placeholder-current"
        />
      </main>
      <main className="flex gap-6">
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            aria-label="Toggle dark mode"
            type="checkbox"
            className="sr-only peer"
            checked={dark}
            onChange={toggle}
          />

          {/* Track (colors controlled by `dark` state too) */}
          <div
            className={`w-11 h-6 rounded-full transition-colors duration-300 ${dark ? 'bg-gray-700 peer-checked:bg-indigo-500' : 'bg-gray-300 peer-checked:bg-blue-600'}`}
          ></div>

          {/* Thumb (colors controlled by `dark` state too) */}
          <div
            className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform duration-300 peer-checked:translate-x-5 ${dark ? 'bg-gray-200' : 'bg-white'}`}
          ></div>
          <span className="ml-2 text-sm">{dark ? "Dark Mode" : "Light Mode"}</span>
        </label>

        <article onClick={() => setModal(true)}><BellDot className={`cursor-pointer ${dark ? "text-white" :"text-[#101010]"}`}/></article>
      </main>

      {modal && <div className="absolute left-0 top-0 z-20 flex items-center justify-center w-screen h-screen text-white bg-[#111111e5]">
        <main className="w-[60%] h-[60%] bg-white flex relative cursor-pointer flex-col gap-6 items-center justify-center rounded-lg">
          <span className="w-40 h-40 rounded-full border-5 border-b-0 border-t-0 border-indigo-700 animate-spin "></span>
          <span className="text-indigo-700 font-bold text-2xl">Coming Soon....</span>
          <span onClick={() => setModal(false)} className="absolute p-3 text-indigo-700 border border-indigo-700 rounded-full size-10 flex items-center justify-center font-bold text-2xl right-5 top-5 pb-4">×</span>
        </main>
      </div> }
    </div>
  );
}
