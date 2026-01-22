import { dashboardStats } from "@/lib/data";
import { Bot, Layers, Zap, CheckSquare, Clock, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const iconMap: {[key:string]: React.ElementType} = {
    bot: Bot,
    layers: Layers,
    zap: Zap,
    'check-square': CheckSquare,
    clock: Clock,
    'trending-up': TrendingUp,
}

export function DashboardStats() {
    return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {dashboardStats.map(s => {
                const Icon = iconMap[s.icon];
                return (
                    <Card key={s.title} className="p-6 flex flex-col gap-2 group hover:bg-card/80 transition-colors">
                        <div className={`p-2 w-fit rounded-xl bg-${s.color}-500/10 text-${s.color}-400 group-hover:scale-110 transition-transform`}>
                            <Icon className="w-4 h-4" />
                        </div>
                        <div className="mt-2">
                            <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-widest">{s.title}</p>
                            <h3 className="text-xl font-bold text-foreground mt-0.5">{s.value}</h3>
                        </div>
                    </Card>
                )
            })}
        </div>
    )
}
