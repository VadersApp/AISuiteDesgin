import { Card } from "@/components/ui/card";
import { tasks } from "@/lib/data";
import { Hash } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Meine Aufgaben
        </h1>
        <p className="text-muted-foreground">Von der KI vorbereitete Aufgaben.</p>
      </header>
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((t) => (
          <Card
            key={t.id}
            className="p-6 hover:border-border/70 border-l-4 transition-all hover:translate-x-1"
            style={{ borderLeftColor: t.color }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-muted-foreground font-mono mb-1 flex items-center gap-2">
                  <Hash className="w-3 h-3" /> {t.id}
                </p>
                <h3 className="text-lg font-bold text-foreground">{t.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Erstellt von{" "}
                  <span className="text-foreground/80 font-bold">{t.from}</span>
                </p>
              </div>
              <button className="bg-secondary text-foreground px-5 py-2 rounded-xl text-xs font-bold hover:bg-accent hover:text-accent-foreground transition-all">
                Öffnen
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
