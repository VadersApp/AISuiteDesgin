'use client';

import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Activity, ShieldCheck, Cpu, Database, DollarSign, HeartPulse, FileText } from "lucide-react";
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

const tabs = [
    "Adminübersicht",
    "Nutzung & Limits",
    "Billing",
    "System Health",
    "LLM Provider",
    "Compliance",
];

const AdminOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-blue-500/10 text-blue-400">
                <Activity className="w-4 h-4" />
            </div>
            <p className="text-muted-foreground text-[10px] font-bold uppercase">
                Requests (24h)
            </p>
            <p className="text-xl font-bold text-foreground">1.2M</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-muted-foreground text-[10px] font-bold uppercase">
                Uptime
            </p>
            <p className="text-xl font-bold text-foreground">99.98%</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-purple-500/10 text-purple-400">
                <Cpu className="w-4 h-4" />
            </div>
            <p className="text-muted-foreground text-[10px] font-bold uppercase">
                CPU Load
            </p>
            <p className="text-xl font-bold text-foreground">14%</p>
        </Card>
    </div>
);

const UsageAndLimits = () => (
    <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Nutzung & Limits</h2>
        <div className="space-y-6">
            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-foreground">API Requests</p>
                    <p className="text-sm font-mono text-muted-foreground">1.2M / 10M <span className="text-xs text-muted-foreground/80">(pro Monat)</span></p>
                </div>
                <Progress value={12} className="h-2" />
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-foreground">Wissensdatenbank Speicher</p>
                    <p className="text-sm font-mono text-muted-foreground">1.2GB / 10GB</p>
                </div>
                <Progress value={12} className="h-2" />
            </div>
            <div>
                <div className="flex justify-between items-center mb-2">
                    <p className="text-sm font-medium text-foreground">Aktive Workflows</p>
                    <p className="text-sm font-mono text-muted-foreground">24 / 50</p>
                </div>
                <Progress value={48} className="h-2" />
            </div>
        </div>
    </Card>
);

const Billing = () => (
    <Card className="p-6">
        <div className="flex justify-between items-start mb-8">
            <div>
                <h2 className="text-lg font-bold text-foreground">Billing</h2>
                <p className="text-sm text-muted-foreground">Ihr aktueller Plan und Rechnungen.</p>
            </div>
            <Button>Plan upgraden</Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-muted/50 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground font-bold uppercase">Aktueller Plan</p>
                <p className="text-lg font-bold text-foreground">Pro</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground font-bold uppercase">Nächste Rechnung</p>
                <p className="text-lg font-bold text-foreground">01. Feb 2025</p>
            </div>
            <div className="bg-muted/50 p-4 rounded-xl border border-border">
                <p className="text-xs text-muted-foreground font-bold uppercase">Betrag</p>
                <p className="text-lg font-bold text-foreground">€499,00</p>
            </div>
        </div>
        <h3 className="text-md font-bold text-foreground mb-4">Rechnungshistorie</h3>
        <div className="space-y-2">
            <div className="flex justify-between items-center p-3 rounded-lg bg-muted/50 hover:bg-accent/80">
                <p className="text-sm text-foreground font-medium">Rechnung #2024-001</p>
                <p className="text-sm text-muted-foreground font-mono">01. Jan 2025</p>
                <Button variant="ghost" size="sm">Download</Button>
            </div>
        </div>
    </Card>
);

const SystemHealth = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400"><ShieldCheck className="w-4 h-4" /></div>
            <p className="text-muted-foreground text-[10px] font-bold uppercase">Uptime (24h)</p>
            <p className="text-xl font-bold text-foreground">99.98%</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-blue-500/10 text-blue-400"><HeartPulse className="w-4 h-4" /></div>
            <p className="text-muted-foreground text-[10px] font-bold uppercase">Avg. Response Time</p>
            <p className="text-xl font-bold text-foreground">120ms</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-rose-500/10 text-rose-400"><Activity className="w-4 h-4" /></div>
            <p className="text-muted-foreground text-[10px] font-bold uppercase">Error Rate</p>
            <p className="text-xl font-bold text-foreground">0.02%</p>
        </Card>
        <Card className="p-6 flex flex-col gap-2">
            <div className="p-2 w-fit rounded-xl bg-purple-500/10 text-purple-400"><Database className="w-4 h-4" /></div>
            <p className="text-muted-foreground text-[10px] font-bold uppercase">Datenbank</p>
            <p className="text-xl font-bold text-emerald-400">Verbunden</p>
        </Card>
    </div>
);

const LLMProvider = () => (
     <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">LLM Provider</h2>
        <div className="flex items-start gap-6 p-6 rounded-2xl bg-muted/50 border border-border">
            <img src="https://www.gstatic.com/devrel-devsite/prod/v22d05143f26193798b485ada23635b8637955523a5416cc34a413d2c803833b4/firebase/images/lockup.svg" alt="Google AI" className="h-10 bg-white p-2 rounded-lg" />
            <div>
                <h3 className="text-xl font-bold text-foreground">Google Gemini</h3>
                <p className="text-sm text-muted-foreground mb-4">Derzeit aktiver LLM-Provider.</p>
                <div className="flex items-center gap-4 text-xs text-foreground">
                    <span>Modell: <span className="font-bold font-mono">gemini-1.5-pro-latest</span></span>
                     <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-emerald-500"></div>Aktiv</span>
                </div>
            </div>
        </div>
    </Card>
);

const Compliance = () => (
    <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-6">Compliance-Status</h2>
        <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400"/>
                    <div>
                        <p className="font-bold text-foreground">DSGVO / GDPR</p>
                        <p className="text-xs text-muted-foreground">Datenverarbeitung in EU-Rechenzentren.</p>
                    </div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-900/50 text-emerald-400 border border-emerald-700/50">Konform</span>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-emerald-400"/>
                    <div>
                        <p className="font-bold text-foreground">ISO 27001</p>
                        <p className="text-xs text-muted-foreground">Informationssicherheits-Managementsystem.</p>
                    </div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-900/50 text-emerald-400 border border-emerald-700/50">Zertifiziert</span>
            </div>
             <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-blue-400"/>
                    <div>
                        <p className="font-bold text-foreground">Audit Logs</p>
                        <p className="text-xs text-muted-foreground">Alle Systemzugriffe werden protokolliert.</p>
                    </div>
                </div>
                <span className="text-xs font-bold px-2 py-1 rounded bg-blue-900/50 text-blue-400 border border-blue-700/50">Aktiviert</span>
            </div>
        </div>
    </Card>
);

export default function AdminPage() {
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const renderContent = () => {
        switch (activeTab) {
            case "Adminübersicht":
                return <AdminOverview />;
            case "Nutzung & Limits":
                return <UsageAndLimits />;
            case "Billing":
                return <Billing />;
            case "System Health":
                return <SystemHealth />;
            case "LLM Provider":
                return <LLMProvider />;
            case "Compliance":
                return <Compliance />;
            default:
                return <AdminOverview />;
        }
    };

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          System Admin
        </h1>
        <p className="text-muted-foreground">Globale Steuerung.</p>
      </header>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              activeTab === t
                ? "bg-primary border-primary/50 text-primary-foreground shadow-lg"
                : "bg-card border-border text-muted-foreground hover:text-foreground hover:bg-accent"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="mt-8 animate-in fade-in duration-300">
        {renderContent()}
      </div>
    </div>
  );
}
