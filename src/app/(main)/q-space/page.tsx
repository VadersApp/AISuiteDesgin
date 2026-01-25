'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  LayoutDashboard,
  FileText,
  Users,
  ShieldCheck,
  Activity,
  Settings,
  Search,
  Plus,
  Kanban,
  HeartPulse,
  UserCheck,
  AlertTriangle,
  Flame,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  BarChart3,
  Briefcase,
  Bot
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { kpiMitarbeiter, topKennzahlen } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


const modules = [
    { name: 'Übersicht', icon: LayoutDashboard },
    { name: 'Workspace', icon: Briefcase },
    { name: 'KPI-Dashboard', icon: BarChart3 },
    { name: 'KI-Mitarbeiter', icon: Bot },
    { name: 'System Admin (Q-Space)', icon: Settings },
];

const mockTasks = [
    { id: 1, title: "Q1-Report finalisieren", owner: 'Dr. Müller', status: 'Überfällig', prio: 'Hoch', due: 'Gestern' },
    { id: 2, title: "Pitch-Deck für Innovatech erstellen", owner: 'Anna Schmidt', status: 'In Arbeit', prio: 'Hoch', due: 'Heute' }
];
const mockProjects = [
    { id: 1, name: "Rollout neue CRM-Software", owner: "Ben Weber", status: "Aktiv" }
];
const mockDocuments = [
    { id: 1, title: "Unternehmensstrategie 2025", owner: "Dr. Müller", version: "2.1" }
];
const mockSops = [
    { id: 1, title: "Prozess für neue Kundenanfragen", status: "Aktiv" }
];
const mockActivities = [
    { id: 1, text: "Ben Weber hat das Projekt 'Rollout neue CRM-Software' aktualisiert.", time: "vor 5 Min."}
];

const OverviewView = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">Übersicht</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader><CardTitle>Meine Aufgaben Heute</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">1</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Überfällige Aufgaben</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold text-rose-400">1</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Mein KPI-Status</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold text-emerald-400">95%</p></CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle>Aktive Projekte</CardTitle></CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground">Projekt 'Rollout neue CRM-Software' ist aktiv.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Letzte Aktivitäten</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Ben Weber hat das Projekt 'Rollout neue CRM-Software' aktualisiert.</p>
                </CardContent>
            </Card>
        </div>
    </div>
);

const WorkspaceView = () => (
    <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Workspace</h2>
        <Tabs defaultValue="aufgaben">
            <TabsList>
                <TabsTrigger value="aufgaben">Aufgaben</TabsTrigger>
                <TabsTrigger value="projekte">Projekte</TabsTrigger>
                <TabsTrigger value="dokumente">Dokumente</TabsTrigger>
                <TabsTrigger value="sops">SOPs</TabsTrigger>
            </TabsList>
            <TabsContent value="aufgaben" className="mt-4">
                <Card><CardHeader><CardTitle>Aufgaben</CardTitle></CardHeader><CardContent>
                    <Table><TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Verantwortlicher</TableHead><TableHead>Status</TableHead><TableHead>Priorität</TableHead><TableHead>Fällig</TableHead></TableRow></TableHeader>
                        <TableBody>{mockTasks.map(t => (<TableRow key={t.id}><TableCell>{t.title}</TableCell><TableCell>{t.owner}</TableCell><TableCell>{t.status}</TableCell><TableCell>{t.prio}</TableCell><TableCell>{t.due}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
            <TabsContent value="projekte" className="mt-4">
                <Card><CardHeader><CardTitle>Projekte</CardTitle></CardHeader><CardContent>
                     <Table><TableHeader><TableRow><TableHead>Projektname</TableHead><TableHead>Verantwortlicher</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>{mockProjects.map(p => (<TableRow key={p.id}><TableCell>{p.name}</TableCell><TableCell>{p.owner}</TableCell><TableCell>{p.status}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
            <TabsContent value="dokumente" className="mt-4">
                <Card><CardHeader><CardTitle>Dokumente</CardTitle></CardHeader><CardContent>
                    <Table><TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Verantwortlicher</TableHead><TableHead>Version</TableHead></TableRow></TableHeader>
                        <TableBody>{mockDocuments.map(d => (<TableRow key={d.id}><TableCell>{d.title}</TableCell><TableCell>{d.owner}</TableCell><TableCell>{d.version}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
            <TabsContent value="sops" className="mt-4">
                <Card><CardHeader><CardTitle>SOPs</CardTitle></CardHeader><CardContent>
                    <Table><TableHeader><TableRow><TableHead>SOP-Titel</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>{mockSops.map(s => (<TableRow key={s.id}><TableCell>{s.title}</TableCell><TableCell>{s.status}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
        </Tabs>
    </div>
);

const KpiDashboard = () => {
    
    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Stabil': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Beobachtung': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Warnung': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'Eskalation': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-slate-500/10 text-slate-400';
        }
    };
    
    const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
        switch (trend) {
            case 'up': return <ArrowUp className="w-4 h-4 text-emerald-400" />;
            case 'down': return <ArrowDown className="w-4 h-4 text-rose-400" />;
            case 'stable': return <ArrowRight className="w-4 h-4 text-slate-400" />;
            default: return null;
        }
    };
    
    const iconMap: { [key: string]: React.ElementType } = {
        HeartPulse, UserCheck, AlertTriangle, Flame
    }

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-xl font-bold text-foreground">KPI-Dashboard – Organisation & Leistung</h2>
                <p className="text-sm text-muted-foreground">Systembasierte Leistungsbewertung. Automatisiert. Objektiv.</p>
                <div className="mt-2">
                    <Link href="/q-space/kpi-dashboard/formeln" className="text-sm text-primary hover:underline">
                        Formeln ansehen
                    </Link>
                </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topKennzahlen.map((kpi, index) => {
                    const Icon = iconMap[kpi.icon];
                    return (
                        <Link href={kpi.href} key={index}>
                            <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors h-full">
                                <div className="flex items-center gap-4">
                                    <div className={cn("p-3 rounded-lg", `bg-${kpi.color}-500/10 text-${kpi.color}-400`)}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-muted-foreground font-bold uppercase">{kpi.title}</p>
                                        <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                                    </div>
                                </div>
                            </Card>
                        </Link>
                    );
                })}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Mitarbeiter-Leistung</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Abteilung</TableHead>
                                <TableHead>Mitarbeitertyp</TableHead>
                                <TableHead>Aktueller Z-Wert</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Trend</TableHead>
                                <TableHead>Letzte Abweichung</TableHead>
                                <TableHead>Eskalationsstatus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kpiMitarbeiter.map((m) => (
                                <TableRow key={m.id} className="cursor-pointer hover:bg-accent/50">
                                    <TableCell className="font-medium">
                                        <Link href={`/q-space/kpi-dashboard/mitarbeiter/${m.id}`} className="hover:underline">{m.name}</Link>
                                    </TableCell>
                                    <TableCell>{m.abteilung}</TableCell>
                                    <TableCell>{m.mitarbeitertyp}</TableCell>
                                    <TableCell className="font-mono font-bold">
                                         <Link href={`/q-space/kpi-dashboard/mitarbeiter/${m.id}`} className="hover:underline">{m.zWert}%</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/q-space/kpi-dashboard/mitarbeiter/${m.id}`}>
                                            <Badge className={cn("text-xs", getStatusColor(m.status))} variant="outline">{m.status}</Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{getTrendIcon(m.trend as any)}</TableCell>
                                    <TableCell>{m.letzteAbweichung}</TableCell>
                                    <TableCell>
                                        <Link href={`/q-space/kpi-dashboard/mitarbeiter/${m.id}`}>
                                            <Badge variant={m.eskalation === 'Ja' ? 'destructive' : 'secondary'}>{m.eskalation}</Badge>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};


const AiMitarbeiterView = () => (
    <Card>
        <CardHeader>
            <CardTitle>KI-Mitarbeiter in Q-Space</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <p className="text-muted-foreground">KI-Mitarbeiter haben keine administrativen Rechte in Q-Space. Sie agieren als unterstützende Instanzen.</p>
            <ul className="list-disc pl-5 space-y-2">
                <li><strong className="text-foreground">KPI-Analyse:</strong> Die KI hilft bei der Auswertung und Interpretation von Leistungsdaten.</li>
                <li><strong className="text-foreground">Eskalationsvorbereitung:</strong> Die KI bereitet die notwendigen Informationen und Gesprächsgrundlagen für Eskalationsfälle vor.</li>
                <li><strong className="text-foreground">Gesprächsmoderation:</strong> Die KI kann als neutraler Moderator in Feedback- und Eskalationsgesprächen agieren.</li>
            </ul>
            <p className="font-bold text-primary pt-4">Wichtig: Die KI trifft keine endgültigen Entscheidungen.</p>
        </CardContent>
    </Card>
);

const SystemAdminView = () => (
     <Card>
        <CardHeader>
            <CardTitle>System Admin (Q-Space)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <h3 className="font-bold text-foreground">Funktionen</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Nutzerverwaltung für Q-Space</li>
                <li>Rollen- und Rechtevergabe</li>
                <li>Bereichszuordnung</li>
                <li>Sicherheitseinstellungen</li>
                <li>Systemstatus und Monitoring</li>
            </ul>
             <h3 className="font-bold text-foreground pt-4">Einschränkungen</h3>
            <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                <li>Kein Zugriff auf Billing-Informationen</li>
                <li>Keine Konfiguration anderer Qore-Tools</li>
                <li>Keine direkte Steuerung anderer Qore-Systeme</li>
            </ul>
        </CardContent>
    </Card>
);

export default function QSpacePage() {
    const [activeModule, setActiveModule] = useState(modules[0].name);

    const renderModule = () => {
        switch (activeModule) {
            case 'Übersicht': return <OverviewView />;
            case 'Workspace': return <WorkspaceView />;
            case 'KPI-Dashboard': return <KpiDashboard />;
            case 'KI-Mitarbeiter': return <AiMitarbeiterView />;
            case 'System Admin (Q-Space)': return <SystemAdminView />;
            default: return <OverviewView />;
        }
    };

  return (
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
        {/* Left Sidebar for Modules */}
        <aside className="w-64 border-r border-border pr-4 space-y-1">
            <p className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">Q-Space</p>
            {modules.map((mod) => {
                const Icon = mod.icon;
                return (
                    <Button
                        key={mod.name}
                        variant={activeModule === mod.name ? 'secondary' : 'ghost'}
                        onClick={() => setActiveModule(mod.name)}
                        className="w-full justify-start text-sm"
                    >
                        <Icon className="mr-2 h-4 w-4" />
                        {mod.name}
                    </Button>
                )
            })}
        </aside>

        {/* Main Area */}
        <main className="flex-1 pl-6 space-y-6">
            <div className="animate-in fade-in duration-300">
                {renderModule()}
            </div>
        </main>
    </div>
  );
}
