import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { LiveFeed } from "@/components/dashboard/live-feed";
import { ManagementActions } from "@/components/dashboard/management-actions";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Executive Overview
        </h1>
        <p className="text-slate-400">
          Willkommen zurück, Dr. Müller. Hier ist der aktuelle Status.
        </p>
      </header>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1E293B]/50 border border-slate-700/50 rounded-2xl p-6 shadow-xl shadow-black/20">
          <h2 className="text-lg font-semibold text-white mb-6">
            Live-Aktivitäten
          </h2>
          <LiveFeed />
        </div>
        <ManagementActions />
      </div>
    </div>
  );
}
