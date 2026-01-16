import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Link, Power, Plus } from "lucide-react";

export default function QalenderPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Qalender Studio
        </h1>
        <p className="text-muted-foreground">Ihre Zentrale für KI-gestützte Terminplanung.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Qalender Studio - Native Solution */}
        <Card className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                  <Calendar className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-foreground">Qalender</h2>
                  <p className="text-sm text-muted-foreground">Integrierte Kalender-Lösung</p>
               </div>
            </div>
             <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-500/10 text-slate-400 border border-slate-500/20 shrink-0">Optional</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            Nutzen Sie unseren vollintegrierten Kalender für maximale Effizienz. Qalender findet automatisch Termine, plant Meetings mit internen und externen Teilnehmern und löst Terminkonflikte selbstständig auf.
          </p>
          <div className="mt-auto pt-6 border-t border-border">
              <Button className="w-full" disabled>
                <Calendar className="mr-2 h-4 w-4" />
                Qalender öffnen (bald verfügbar)
              </Button>
          </div>
        </Card>

        {/* Connect Existing Calendar */}
        <Card className="p-6 flex flex-col">
           <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
                  <Link className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-foreground">Kalender verbinden</h2>
                  <p className="text-sm text-muted-foreground">Bestehende Kalender-Konten</p>
               </div>
            </div>
             <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">Empfohlen</span>
          </div>
           <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
            Verbinden Sie Ihren bestehenden Kalender (z.B. Google oder Outlook), um die volle Kraft der QORE-KI in Ihrem gewohnten Arbeitsumfeld zu nutzen. Behalten Sie Ihren Kalender und profitieren Sie von intelligenten Features.
          </p>
           <div className="mt-auto pt-6 border-t border-border">
              <Button className="w-full">
                <Link className="mr-2 h-4 w-4" />
                Kalender jetzt verbinden
              </Button>
            </div>
        </Card>
      </div>

       <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Verbundene Kalender</h3>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-background border border-border">
                        <Calendar className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                        <p className="font-bold text-foreground">ceo@aisuite.de</p>
                        <p className="text-xs text-muted-foreground">Verbunden seit 14.01.2024 (Google Calendar)</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 flex items-center gap-1.5"><Power className="w-3.5 h-3.5" />Aktiv</span>
                    <Button variant="outline" size="sm">Verwalten</Button>
                </div>
            </div>
             <button className="w-full flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
                <p className="text-sm font-bold flex items-center gap-2">
                   <Plus className="w-4 h-4"/>
                   Weiteren Kalender verbinden
                </p>
             </button>
        </div>
      </Card>
    </div>
  );
}
