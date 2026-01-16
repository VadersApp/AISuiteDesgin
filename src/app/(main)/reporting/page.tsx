import { Card } from "@/components/ui/card";
import { reportingStats } from "@/lib/data";
import { Coins, PiggyBank, TrendingUp, ShieldCheck } from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  coins: Coins,
  "piggy-bank": PiggyBank,
  "trending-up": TrendingUp,
  "shield-check": ShieldCheck,
};

export default function ReportingPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Reporting & ROI
          </h1>
          <p className="text-slate-400">Finanzielle und operative Analyse.</p>
        </div>
        <div className="bg-slate-800/50 p-1 rounded-xl border border-slate-700/50 flex text-xs font-bold">
          <button className="px-4 py-2 rounded-lg transition-all bg-blue-600 text-white shadow-lg">
            Monatlich
          </button>
          <button className="px-4 py-2 rounded-lg transition-all text-slate-400 hover:text-white">
            Jährlich
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportingStats.map((s, i) => {
          const Icon = iconMap[s.icon];
          return (
            <Card
              key={i}
              className="p-6 flex items-center gap-4"
            >
              <div
                className={`p-3 rounded-xl bg-${s.color}-500/10 text-${s.color}-400`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">
                  {s.title}
                </p>
                <h3 className="text-2xl font-bold text-white">{s.value}</h3>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
