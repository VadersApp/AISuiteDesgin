import { liveFeed } from "@/lib/data";

export function LiveFeed() {
    return (
        <div className="space-y-4">
            {liveFeed.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-blue-400 font-bold border border-slate-700/50">{item.name[0]}</div>
                        <div><p className="text-sm font-semibold text-white">{item.name}</p><p className="text-xs text-slate-500">{item.action}</p></div>
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">{item.time}</span>
                </div>
            ))}
        </div>
    )
}
