import { Card } from "@/components/ui/card";
import { tasks } from "@/lib/data";
import { Hash } from "lucide-react";

export default function TasksPage() {
  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Meine Aufgaben
        </h1>
        <p className="text-slate-400">Von der KI vorbereitete Aufgaben.</p>
      </header>
      <div className="grid grid-cols-1 gap-4">
        {tasks.map((t) => (
          <Card
            key={t.id}
            className="p-6 hover:border-slate-600 border-l-4 transition-all hover:translate-x-1"
            style={{ borderLeftColor: t.color }}
          >
            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-slate-500 font-mono mb-1 flex items-center gap-2">
                  <Hash className="w-3 h-3" /> {t.id}
                </p>
                <h3 className="text-lg font-bold text-white">{t.title}</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Erstellt von{" "}
                  <span className="text-slate-300 font-bold">{t.from}</span>
                </p>
              </div>
              <button className="bg-slate-800 text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-white hover:text-black transition-all">
                Öffnen
              </button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
