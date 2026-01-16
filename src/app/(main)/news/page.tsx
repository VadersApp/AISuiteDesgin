import { Card } from "@/components/ui/card";
import { newsItems } from "@/lib/data";
import { ExternalLink } from "lucide-react";

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Neuigkeiten
        </h1>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {newsItems.map((n, i) => (
          <Card
            key={i}
            className="p-6 hover:bg-accent/80 transition-colors"
          >
            <div className="flex justify-between items-start">
              <span
                className="px-2 py-0.5 rounded text-[9px] bg-blue-500/10 text-blue-400 border border-blue-500/20 font-black uppercase mb-4 inline-block"
              >
                {n.cat}
              </span>
              <ExternalLink className="w-4 h-4 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-bold text-foreground mb-2">{n.title}</h3>
            <p className="text-sm text-muted-foreground">{n.desc}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}
