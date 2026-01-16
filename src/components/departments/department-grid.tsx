import { departmentsConfig } from "@/lib/data";
import { Building2, Bot } from "lucide-react";
import Link from 'next/link';
import { Card } from "@/components/ui/card";

export function DepartmentGrid() {
  const colors = ["blue", "emerald", "purple", "amber", "rose", "indigo"];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {departmentsConfig.map((d, i) => {
        const color = colors[i % colors.length];
        const agentsLabel =
          d.agents.length > 0 ? d.agents[0] : "Inaktiv";
        const statusColor = d.agents.length > 0 ? "emerald" : "slate";
        return (
          <Link href={`/departments/${d.id}`} key={d.id}>
          <Card
            className="p-6 hover:border-blue-500/50 transition-all group cursor-pointer flex flex-col h-full"
          >
            <div className="mb-6 min-w-0">
              <div
                className={`w-12 h-12 rounded-2xl bg-${color}-500/10 text-${color}-400 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shrink-0`}
              >
                <Building2 className="w-6 h-6" />
              </div>
              <h3
                className="text-lg font-bold text-white mb-2 line-clamp-2"
                title={d.name}
              >
                {d.name}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed h-[3.5em]">
                {d.desc}
              </p>
            </div>
            <div className="mt-auto pt-4 border-t border-slate-700/50 flex flex-wrap justify-between items-center gap-2">
              <span className="text-[10px] text-blue-400 font-bold uppercase flex items-center gap-1 whitespace-nowrap">
                <Bot className="w-3 h-3" /> {agentsLabel}{" "}
                {d.agents.length > 1 ? `+${d.agents.length - 1}` : ""}
              </span>
              <span
                className={`w-2 h-2 rounded-full bg-${statusColor}-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] shrink-0`}
              ></span>
            </div>
          </Card>
          </Link>
        );
      })}
    </div>
  );
}
