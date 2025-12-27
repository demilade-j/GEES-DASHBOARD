import { useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import TopBar from "../Others/Top/TopBar";
import Sidebar from "../Sidebar/Sidebar";
import Loader from "../Loader/Loader";
import DashboardReal from "../Others/Dashboard real/DashboardReal";

export default function Home() {
  const { dark } = useTheme();
  const [selected, setSelected] = useState<string>('dashboard');
  const [loading, setLoading] = useState(false);

  function handleSelect(key: string){
    if(key === selected) return;
    setLoading(true);
    setTimeout(()=>{
      setSelected(key);
      setLoading(false);
    }, 1000);
  }

  return (
    <div className="flex">
      {/* Left column */}
      <main className="w-[20%]">
        <Sidebar selected={selected} onSelect={handleSelect} />
      </main>
      {/* Main content */}
      <main className={`w-[80%] ${dark ? 'bg-slate-950 text-gray-100' : 'bg-white text-gray-900'}`}>
        <article>
          <TopBar />
        </article>
  <article className="p-6">
          {loading ? (
            <Loader />
          ) : (
            <>
              {selected === 'dashboard' && <DashboardReal/>}
              {selected === 'users' && <div>Users content coming soon....</div>}
              {selected === 'profile' && <div>Profile content coming soon....</div>}
              {selected === 'reports' && <div>Reports content coming soon....</div>}
            </>
          )}
        </article>
      </main>
    </div>
  );
}
