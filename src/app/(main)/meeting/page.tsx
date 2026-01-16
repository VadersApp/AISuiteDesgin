import { bots } from "@/lib/data";
import { Users, SendHorizontal, Bot } from 'lucide-react';
import { Card } from "@/components/ui/card";

export default function MeetingPage() {

    return (
        <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">AI Meeting</h1>
                    <p className="text-muted-foreground">Live Kollaboration mit Agenten.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">Live Session</span>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
                <Card className="p-4 flex flex-col overflow-hidden">
                    <h3 className="text-xs font-bold text-muted-foreground mb-6 uppercase tracking-widest flex items-center gap-2"><Users className="w-3 h-3" /> Teilnehmer</h3>
                    <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1">
                        {bots.map(b => (
                             <button key={b.id} className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-border text-muted-foreground hover:border-border/70 bg-background/50 hover:bg-accent transition-all group">
                                <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-muted-foreground group-hover:text-foreground border border-border"><Bot className="w-3.5 h-3.5" /></div>
                                <span className="text-xs font-bold">{b.name}</span>
                            </button>
                        ))}
                    </div>
                </Card>
                <Card className="lg:col-span-3 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        <div className="flex justify-center">
                                <div className="px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-xs italic">AI Meeting gestartet. Teilnehmer werden synchronisiert...</div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-border bg-card/50 flex gap-3">
                        <input type="text" placeholder="Sprechen oder schreiben..." className="flex-1 bg-background/80 border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" />
                        <button className="p-3 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-all"><SendHorizontal className="w-5 h-5" /></button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
