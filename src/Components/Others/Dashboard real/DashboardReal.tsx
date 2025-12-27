import { useTheme } from "../../../context/ThemeContext";
import { useEffect, useState } from 'react';

export default function DashboardReal() {
  const { dark } = useTheme();

  const [groupRoles, setGroupRoles] = useState<string[]>([]);
  const [tiers, setTiers] = useState<Array<{ key: string; label: string }>>([]);
  const [members, setMembers] = useState<Array<{ id: number; name: string; role: string; tier: string }>>([]);

  // keys for localStorage
  const GROUP_KEY = 'dashboard.selectedGroupRole';
  const TIER_KEY = 'dashboard.selectedTier';

  const [groupRole, setGroupRole] = useState<string>(() => {
    try {
      return localStorage.getItem(GROUP_KEY) || '';
    } catch {
      return '';
    }
  });

  const [tier, setTier] = useState<string>(() => {
    try {
      return localStorage.getItem(TIER_KEY) || '';
    } catch {
      return '';
    }
  });

  useEffect(() => {
    try {
      if (groupRole) localStorage.setItem(GROUP_KEY, groupRole);
      else localStorage.removeItem(GROUP_KEY);
    } catch {/**/}
  }, [groupRole]);

  useEffect(() => {
    try {
      if (tier) localStorage.setItem(TIER_KEY, tier);
      else localStorage.removeItem(TIER_KEY);
    } catch {/**/}
  }, [tier]);

  // fetch db from public at runtime so changes don't require rebuild
  useEffect(() => {
    let mounted = true;
    fetch('/db.json')
      .then((res) => res.json())
      .then((data) => {
          if (!mounted) return;
          if (Array.isArray(data.groupRoles)) setGroupRoles(data.groupRoles);
          if (Array.isArray(data.tiers)) setTiers(data.tiers);
          if (Array.isArray(data.members)) setMembers(data.members);
        })
      .catch(() => {
        // ignore fetch errors; keep empty lists
      });
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="flex flex-col gap-6">
      <main
        className={`w-full flex items-center justify-between px-7 h-20 rounded-lg ${dark ? 'text-white bg-[#000f24] border-gray-500 border' : 'text-gray-700 bg-[#e5e5e561] border-[#1e1e1e58] border'}`}
      >
        <article className="font-bold text-2xl">Group Filters</article>
        <article className="flex gap-3">
          <span className="flex items-center gap-2">
            <select
              value={groupRole}
              onChange={(e) => setGroupRole(e.target.value)}
              className={`w-48 flex items-center justify-between ps-3 rounded-sm h-10 ${dark ? 'text-white bg-[#000f24] border-gray-500 border' : 'text-gray-700 bg-[#e5e5e561] border-[#1e1e1e58] border'}`}
              name="groupRole"
              id="groupRole"
            >
              <option value="">All Members</option>
              {groupRoles.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </span>
          <span className="flex items-center gap-2">
            <select
              value={tier}
              onChange={(e) => setTier(e.target.value)}
              className={`w-40 flex items-center justify-between ps-3 rounded-sm h-10 ${dark ? 'text-white bg-[#000f24] border-gray-500 border' : 'text-gray-700 bg-[#e5e5e561] border-[#1e1e1e58] border'}`}
              name="tier"
              id="tier"
            >
              <option value="">All Tiers</option>
              {tiers.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </span>
        </article>
      </main>

      <main className="">
        {/** Display filtered members and broadcast button */}
        <div className={`h-full p-4 ${dark ? 'bg-slate-900 text-gray-100' : 'bg-white text-gray-900'}`}>
          <h3 className="font-semibold mb-2">Matching Members</h3>
          {members.length === 0 ? (
            <div className="text-sm text-gray-500">No members loaded.</div>
          ) : (
            (() => {
              const filtered = members.filter((m) => {
                const byRole = groupRole ? m.role === groupRole : true;
                const byTier = tier ? m.tier === tier : true;
                return byRole && byTier;
              });
              if (filtered.length === 0) return <div className="text-sm text-gray-500">No members match the selected filters.</div>;
              return (
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-sm text-gray-500">Showing <span className="font-semibold text-gray-700">{filtered.length}</span> member(s)</div>
                    
                  </div>

                  <div className="overflow-auto max-h-85 scrollbar-thumb-rounded-lg scrollbar-track-rounded-lg scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 p-1">
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {filtered.map((m) => (
                      <li
                        key={m.id}
                        className={`flex items-center gap-3 p-3 rounded-lg border ${dark ? 'border-slate-700 bg-slate-800' : 'border-gray-200 bg-white'} shadow-sm hover:shadow-md transition-shadow`}
                      >
                        <div className={`flex items-center justify-center w-12 h-12 rounded-full ${dark ? 'bg-slate-700 text-white' : 'bg-gray-100 text-gray-700'} font-semibold`}>{m.name.split(' ').map(s => s[0]).slice(0,2).join('').toUpperCase()}</div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{m.name}</div>
                            <div className="text-xs text-gray-400">#{m.id}</div>
                          </div>
                          <div className="mt-1 flex items-center gap-2">
                            <span className={`px-2 py-0.5 text-xs rounded ${m.role === 'Group Owner' ? 'bg-yellow-100 text-yellow-800' : m.role === 'Group Admin' ? 'bg-indigo-100 text-indigo-800' : 'bg-gray-100 text-gray-800'}`}>{m.role === 'Group Members' ? 'Member' : m.role.replace('Group ', '')}</span>
                            <span className={`px-2 py-0.5 text-xs rounded ${m.tier === 'tier1' ? 'bg-amber-100 text-amber-800' : m.tier === 'tier2' ? 'bg-slate-100 text-slate-800' : 'bg-rose-100 text-rose-800'}`}>{m.tier === 'tier1' ? '🥇Tier 1' : m.tier === 'tier2' ? '🥈 Tier 2' : '🥉 Tier 3'}</span>
                          </div>
                        </div>
                      </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })()
          )}
        </div>
      </main>
      <main></main>
    </div>
  );
}
