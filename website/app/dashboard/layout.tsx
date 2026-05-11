import { Terminal, LayoutGrid, Wallet, Key, User } from "lucide-react";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#050505] selection:bg-cyan-500/30">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 border-r border-white/10 bg-black/50 backdrop-blur-xl flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center">
              <Terminal className="w-5 h-5 text-cyan-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Lumina<span className="text-cyan-400">Deploy</span></span>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <Link href="/dashboard/deployments" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <LayoutGrid className="w-5 h-5" />
            Deployments
          </Link>
          <Link href="/dashboard/wallet" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg bg-cyan-500/10 text-cyan-400 transition-colors">
            <Wallet className="w-5 h-5" />
            Wallet
          </Link>
          <Link href="/dashboard/api-keys" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <Key className="w-5 h-5" />
            API Keys
          </Link>
        </nav>

        <div className="p-4 border-t border-white/10">
          <Link href="/dashboard/account" className="flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors">
            <User className="w-5 h-5" />
            Account
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Background glow for dashboard content */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="flex-1 overflow-auto relative z-10 p-6 md:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
