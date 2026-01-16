import { liveFeed } from "@/lib/data";

export function LiveFeed() {
    return (
        <div className="space-y-4">
            {liveFeed.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border hover:border-border/80 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-primary font-bold border border-border">{item.name[0]}</div>
                        <div><p className="text-sm font-semibold text-foreground">{item.name}</p><p className="text-xs text-muted-foreground">{item.action}</p></div>
                    </div>
                    <span className="text-[10px] text-muted-foreground font-mono">{item.time}</span>
                </div>
            ))}
        </div>
    )
}
