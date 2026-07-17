import { Link, useLocation } from "wouter";
import { GraduationCap, Users, Megaphone, Briefcase, FileText, Image, LogOut, LayoutDashboard, UserCheck } from "lucide-react";
import { useAdminLogout } from "@workspace/api-client-react";
import { Badge } from "@/components/ui/badge";

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  const logout = useAdminLogout();

  const handleLogout = () => {
    logout.mutate(undefined, {
      onSuccess: () => {
        window.location.href = "/admin"; // Redirect to login
      }
    });
  };

  const navItems = [
    { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/dashboard?tab=courses", label: "Courses", icon: GraduationCap },
    { href: "/admin/dashboard?tab=faculty", label: "Faculty", icon: Users },
    { href: "/admin/dashboard?tab=news", label: "News & Events", icon: Megaphone },
    { href: "/admin/dashboard?tab=placements", label: "Placements", icon: Briefcase },
    { href: "/admin/dashboard?tab=leads", label: "Admissions", icon: FileText },
    { href: "/admin/dashboard?tab=media", label: "Media", icon: Image },
    { href: "/admin/dashboard?tab=users", label: "Admin Users", icon: UserCheck },
  ];

  return (
    <div className="min-h-[100dvh] flex flex-col md:flex-row bg-[#f8fafc]">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0a1e2f] text-slate-200 border-r border-[#1e293b]/30 shrink-0 flex flex-col shadow-xl z-30">
        {/* Brand Logo Box */}
        <div className="h-20 flex flex-col justify-center px-6 border-b border-slate-800/60 bg-gradient-to-br from-[#0a1e2f] to-[#040e17]">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-accent flex items-center justify-center font-bold text-white shadow-md text-sm shrink-0 border border-white/10">KB</div>
            <div>
              <span className="font-extrabold text-sm tracking-wide text-white block">KBIPER Console</span>
              <span className="text-[9px] text-accent/80 font-bold uppercase tracking-widest block -mt-0.5">Admin Portal</span>
            </div>
          </div>
        </div>

        {/* Sidebar Nav */}
        <nav className="flex-1 py-6 px-4 space-y-1.5">
          {navItems.map((item) => {
            const isActive = location === item.href || (location === "/admin/dashboard" && item.href === "/admin/dashboard" && !window.location.search);
            const searchMatches = window.location.search.includes(item.href.split('?')[1] || 'no-match');
            const reallyActive = isActive || searchMatches;

            return (
              <a
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                  reallyActive 
                    ? "bg-accent text-white shadow-md shadow-accent/20 scale-[1.02]" 
                    : "text-slate-400 hover:bg-slate-800/40 hover:text-white hover:translate-x-1"
                }`}
              >
                <item.icon className="h-4.5 w-4.5" />
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800/60">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors duration-300"
          >
            <LogOut className="h-4.5 w-4.5" />
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Top Header */}
        <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-6 shrink-0 shadow-sm z-20">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <h1 className="font-bold text-slate-800 text-sm md:text-base">CMS Control Panel</h1>
          </div>
          <div className="flex items-center gap-4">
            <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border border-emerald-200/50 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full select-none">Active Live</Badge>
            <Link href="/" className="text-xs font-bold text-accent hover:text-accent/90 border border-accent/20 hover:border-accent/40 rounded-lg px-3 py-1.5 transition-all">View Site →</Link>
          </div>
        </header>

        {/* Dashboard Work Area */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
