'use client';

import { bots } from "@/lib/data";
import { Users, SendHorizontal, Bot, ChevronLeft, Files, BrainCircuit, Goal } from 'lucide-react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useParams } from "next/navigation";


export default function MeetingSessionPage() {
    const params = useParams();
    const sessionId = params.sessionId;

    // In a real app, you would fetch session data based on the ID
    // For now, we'll just show all bots as participants
    const participants = bots;

    return (
        <div className="space-y-6 flex flex-col flex-1 h-full">
            <header className="flex justify-between items-center">
                 <div className="flex items-center gap-4">
                    <Link href="/meeting" className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground tracking-tight">AI Meeting</h1>
                        <p className="text-muted-foreground text-sm">Live-Kollaboration mit Agenten | ID: {sessionId}</p>
                    </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Button variant="outline"><BrainCircuit /> Zusammenfassen</Button>
                    <Button variant="outline"><Goal /> Aufgaben extrahieren</Button>
                    <span className="px-3 py-2 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse flex items-center gap-1.5">LIVE</span>
                 </div>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
                <Card className="p-4 flex flex-col overflow-hidden">
                    <h3 className="text-xs font-bold text-muted-foreground mb-6 uppercase tracking-widest flex items-center gap-2"><Users className="w-3 h-3" /> Teilnehmer</h3>
                    <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1">
                        {participants.map(b => (
                             <div key={b.id} className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-border bg-background/50">
                                <div className="w-6 h-6 rounded-lg bg-muted flex items-center justify-center text-muted-foreground border border-border"><Bot className="w-3.5 h-3.5" /></div>
                                <span className="text-xs font-bold">{b.name}</span>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card className="lg:col-span-3 flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        <div className="flex justify-center">
                                <div className="px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-xs italic">AI Meeting gestartet. Teilnehmer werden synchronisiert...</div>
                        </div>
                         <div className="flex justify-start">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30"><Bot className="w-4 h-4" /></div>
                                <div className="p-4 rounded-xl bg-muted border border-border text-sm max-w-xl">
                                    <p className="text-[10px] font-bold text-blue-400 mb-1">Leo Sales</p>
                                    <p>Basierend auf der Agenda sollten wir zuerst die aktuellen Sales-Zahlen für Q4 analysieren, um eine Grundlage für die Strategie zu haben. Ich kann die Daten aus dem CRM ziehen.</p>
                                </div>
                            </div>
                        </div>
                         <div className="flex justify-start">
                            <div className="flex items-start gap-3">
                                <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30"><Bot className="w-4 h-4" /></div>
                                <div className="p-4 rounded-xl bg-muted border border-border text-sm max-w-xl">
                                    <p className="text-[10px] font-bold text-purple-400 mb-1">Sophie Market</p>
                                    <p>Verstanden. Parallel dazu kann ich die Performance der letzten Marketing-Kampagnen aufbereiten, um zu sehen, welche Kanäle am besten funktioniert haben.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-border bg-card/50 flex gap-3">
                        <div className="flex-1 relative">
                            <input type="text" placeholder="Sprechen oder schreiben..." className="w-full bg-background/80 border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors pr-12" />
                            <Button size="icon" variant="ghost" className="absolute right-12 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground">
                                <Files className="w-4 h-4" />
                            </Button>
                        </div>
                        <Button className="p-3 rounded-xl aspect-square h-full"><SendHorizontal className="w-5 h-5" /></Button>
                    </div>
                </Card>
            </div>
        </div>
    )
}
