'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PhoneIncoming, PhoneForwarded, Settings, BarChart2, Plus, Headset, Shield, TrendingUp, FileText } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const serviceKpis = [
  { title: "Anrufe heute", value: "72", icon: PhoneIncoming },
  { title: "Deflection Rate", value: "89%", icon: Shield },
  { title: "Eskalationsrate", value: "11%", icon: TrendingUp },
  { title: "Erstellte Tickets", value: "64", icon: FileText },
];

export default function QcallPage() {
  const [isServiceActive, setIsServiceActive] = useState(false);

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Qcall Studio
        </h1>
        <p className="text-muted-foreground">Ihr entwickelter AI Telefonassistent für In- & Outbound.</p>
      </header>

      {/* Digital Customer Service Card */}
      <Card className="p-6">
        <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
                  <Headset className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-foreground">Digitaler Kundenservice</h2>
                  <p className="text-sm text-muted-foreground">AI-basierter Telefon-Kundenservice mit Ticket-Dokumentation und Eskalation.</p>
               </div>
            </div>
             <div className="flex items-center gap-3">
               <Label htmlFor="service-active-switch" className="text-xs font-bold text-muted-foreground">
                 {isServiceActive ? 'Aktiv' : 'Inaktiv'}
               </Label>
               <Switch
                 id="service-active-switch"
                 checked={isServiceActive}
                 onCheckedChange={setIsServiceActive}
               />
            </div>
        </div>
        
        {isServiceActive && (
          <div className="mt-6 pt-6 border-t border-border animate-in fade-in duration-300">
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Live-Analyse</h3>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {serviceKpis.map(kpi => {
                const Icon = kpi.icon;
                return (
                  <Card key={kpi.title} className="p-4 bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-background/50 rounded-lg text-muted-foreground"><Icon className="w-4 h-4" /></div>
                      <div>
                          <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{kpi.title}</p>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        )}
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Qcall - Inbound */}
        <Card className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
                  <PhoneIncoming className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-foreground">Qcall</h2>
                  <p className="text-sm text-muted-foreground">Inbound-Telefonassistenz</p>
               </div>
            </div>
             <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">Aktiv</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Qcall nimmt eingehende Anrufe entgegen, beantwortet häufige Fragen, terminiert Meetings und leitet komplexe Anliegen intelligent an menschliche Mitarbeiter weiter.
          </p>
          <div className="mt-auto space-y-4 pt-6 border-t border-border">
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Anrufe heute</span>
                <span className="font-bold text-foreground">128</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Durchschnittliche Dauer</span>
                <span className="font-bold text-foreground">2:34 min</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Erfolgsquote</span>
                <span className="font-bold text-emerald-400">92%</span>
             </div>
          </div>
           <div className="mt-6 flex gap-3">
              <Button className="flex-1">
                <Settings className="mr-2 h-4 w-4" />
                Konfigurieren
              </Button>
              <Button variant="outline" className="flex-1">
                 <BarChart2 className="mr-2 h-4 w-4" />
                Live-Analyse
              </Button>
            </div>
        </Card>

        {/* Qdial - Outbound */}
        <Card className="p-6 flex flex-col">
          <div className="flex justify-between items-start mb-4">
             <div className="flex items-center gap-4">
               <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center border border-purple-500/20">
                  <PhoneForwarded className="w-6 h-6" />
               </div>
               <div>
                  <h2 className="text-xl font-bold text-foreground">Qdial</h2>
                  <p className="text-sm text-muted-foreground">Outbound-Sales & Setting</p>
               </div>
            </div>
             <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-500/10 text-slate-400 border border-slate-500/20 shrink-0">Inaktiv</span>
          </div>
           <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Qdial führt proaktiv Outbound-Calls für Ihr Sales-Team durch. Von der Kaltakquise über die Terminvereinbarung bis hin zu Follow-ups – vollständig autonom durch Ihre KI-Mitarbeiter.
          </p>
           <div className="mt-auto space-y-4 pt-6 border-t border-border">
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Aktive Kampagnen</span>
                <span className="font-bold text-foreground">0</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Termine heute</span>
                <span className="font-bold text-foreground">0</span>
             </div>
             <div className="flex justify-between items-center text-sm">
                <span className="text-muted-foreground font-medium">Zuletzt genutzt von</span>
                <span className="font-bold text-foreground">Leo Sales</span>
             </div>
          </div>
           <div className="mt-6 flex gap-3">
              <Button className="flex-1">
                <Plus className="mr-2 h-4 w-4" />
                Neue Kampagne
              </Button>
              <Button variant="outline" className="flex-1">
                 <Settings className="mr-2 h-4 w-4" />
                Konfigurieren
              </Button>
            </div>
        </Card>
      </div>
    </div>
  );
}
