import { Card } from "@/components/ui/card";
import { Activity, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const tabs = [
    "Adminübersicht",
    "Nutzung & Limits",
    "Billing",
    "System Health",
    "LLM Provider",
    "Compliance",
  ];
  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          System Admin
        </h1>
        <p className="text-slate-400">Globale Steuerung.</p>
      </header>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              i === 0
                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                : "bg-[#1E293B]/50 border-slate-700/50 text-slate-500 hover:text-white hover:bg-slate-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-blue-500/10 text-blue-400">
              <Activity className="w-4 h-4" />
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase">
              Requests (24h)
            </p>
            <p className="text-xl font-bold text-white">1.2M</p>
          </Card>
          <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-slate-500 text-[10px] font-bold uppercase">
              Uptime
            </p>
            <p className="text-xl font-bold text-white">99.98%</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
