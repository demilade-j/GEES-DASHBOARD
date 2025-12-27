import { Airplay, FolderGit2, UserPen, Users } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";

type SidebarProps = {
  selected?: string;
  onSelect?: (key: string) => void;
};

const MENU = [
  { key: 'dashboard', label: 'Dashboard', icon: <Airplay/> },
  { key: 'users', label: 'Users', icon: <Users/> },
  { key: 'profile', label: 'Profile', icon: <UserPen/> },
  { key: 'reports', label: 'Reports', icon: <FolderGit2/> },
];

export default function Sidebar({ selected, onSelect }: SidebarProps) {
  const { dark } = useTheme();

  return (
    <div className={`border-r ${dark ? 'bg-slate-950 border-gray-700 text-gray-100' : 'bg-gray-100 text-[#101010] border-gray-200'} h-screen flex flex-col justify-start items-stretch`}>
      <main className={`w-full border-b px-10 ${dark ? 'border-gray-700 text-indigo-200' : 'border-gray-300 text-indigo-700'} text-3xl font-bold h-22 flex items-center justify-center`}>Code Gees</main>
      <main className={`h-full w-full flex flex-col pt-6 px-6 ${dark ? 'bg-slate-950 border-gray-700' : 'bg-gray-100 border-gray-200'}`}>
        {MENU.map((m) => {
          const active = selected === m.key;
          const base = 'px-4 py-3 rounded-md cursor-pointer mb-2 w-full';
          const light = active ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-200';
          const darkStyle = active ? 'bg-indigo-900 text-indigo-100' : 'text-gray-300 hover:bg-gray-800';
          return (
            <article
              key={m.key}
              onClick={() => onSelect?.(m.key)}
              className={`${base} ${dark ? darkStyle : light} flex gap-4 items-center `}
            >
              {m.icon}{m.label}
            </article>
          );
        })}
      </main>
    </div>
  );
}
