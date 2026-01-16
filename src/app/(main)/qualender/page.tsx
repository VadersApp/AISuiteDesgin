import { Card } from "@/components/ui/card";
import { Calendar, ChevronRight } from "lucide-react";

const slots = [
  { t: "15 Min Strategie", c: "blue" },
  { t: "60 Min Deep Dive", c: "emerald" },
  { t: "Onboarding", c: "purple" },
];

export default function QalenderPage() {
  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Qalender
        </h1>
        <p className="text-muted-foreground">Terminbuchung.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {slots.map((s, i) => (
          <Card
            key={i}
            className="p-6 hover:border-primary group transition-all"
          >
            <div
              className={`p-2 w-fit rounded-lg bg-${s.c}-500/10 text-${s.c}-400 mb-4 group-hover:scale-110 transition-transform`}
            >
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-foreground font-bold mb-4">{s.t}</h3>
            <button className="text-[10px] text-primary font-bold uppercase hover:text-primary/80 transition-colors flex items-center gap-1">
              Termin buchen <ChevronRight className="w-3 h-3" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
}
