'use client';

import { useState } from 'react';
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
  UserCheck as UserCheckIcon,
  AlertTriangle,
  Flame,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  BarChart3,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

const modules = [
    { name: 'KPI-Dashboard', icon: BarChart3 },
    { name: 'Übersicht', icon: LayoutDashboard },
    { name: 'Dateien & Dokumente', icon: FileText },
    { name: 'Ordnerstruktur', icon: Kanban },
    { name: 'Geteilt mit mir', icon: Users },
    { name: 'Nutzer', icon: Users },
    { name: 'Gruppen', icon: Users },
    { name: 'Berechtigungen', icon: ShieldCheck },
    { name: 'Aktivitätsprotokoll', icon: Activity },
    { name: 'Einstellungen', icon: Settings },
];

// Mock Data for views
const mockFiles = [
    { id: 1, name: 'Quartalsbericht Q4.docx', type: 'Dokument', owner: 'Dr. Müller', modified: 'Heute', shareStatus: 'Privat' },
    { id: 2, name: 'Marketing-Planung Q1.xlsx', type: 'Tabelle', owner: 'Sophie Market', modified: 'Gestern', shareStatus: 'Team' },
];
const mockUsers = [
    { id: 1, name: 'Dr. Müller', email: 'ceo@aisuite.de', role: 'Admin', status: 'aktiv', groups: 'Geschäftsführung' },
    { id: 2, name: 'Leo Sales', email: 'leo.sales@aisuite.de', role: 'Manager', status: 'aktiv', groups: 'Vertrieb' },
];
const mockGroups = [
    { id: 1, name: 'Geschäftsführung', members: 1, description: 'Zugriff auf alle strategischen Dokumente.' },
    { id: 2, name: 'Vertrieb', members: 5, description: 'Zugriff auf Sales-Materialien und CRM-Daten.' },
];
const mockActivity = [
    { id: 1, user: 'Dr. Müller', action: 'hat die Datei "Quartalsbericht Q4.docx" hochgeladen.', target: 'Quartalsbericht Q4.docx', time: 'vor 5 Minuten' },
    { id: 2, user: 'Sophie Market', action: 'hat den Ordner "Q1 Kampagnen" erstellt.', target: 'Q1 Kampagnen', time: 'vor 1 Stunde' },
];

// NEW KPI DATA
const kpiMitarbeiter = [
    { name: 'Ben Weber', abteilung: 'IT', zWert: 65, status: 'Eskalation', trend: 'down', letzteAbweichung: 'Deployment-Verzug (+3 Tage)', eskalation: 'Ja', prevZ: 72 },
    { name: 'Anna Schmidt', abteilung: 'Vertrieb', zWert: 78, status: 'Warnung', trend: 'down', letzteAbweichung: 'Zielverfehlung Q4 (-15%)', eskalation: 'Nein', prevZ: 81 },
    { name: 'Sophie Lang', abteilung: 'Marketing', zWert: 85, status: 'Beobachtung', trend: 'up', letzteAbweichung: 'Budgetüberschreitung (+5%)', eskalation: 'Nein', prevZ: 83 },
    { name: 'Dr. Müller', abteilung: 'Geschäftsführung', zWert: 95, status: 'Stabil', trend: 'stable', letzteAbweichung: 'Keine', eskalation: 'Nein', prevZ: 95 },
].sort((a, b) => a.zWert - b.zWert);

const gesamtZufriedenheit = Math.round(kpiMitarbeiter.reduce((acc, m) => acc + m.zWert, 0) / kpiMitarbeiter.length);
const gruenerBereich = kpiMitarbeiter.filter(m => m.zWert >= 90).length;
const aktiveWarnungen = kpiMitarbeiter.filter(m => m.zWert >= 70 && m.zWert < 80).length;
const aktiveEskalationen = kpiMitarbeiter.filter(m => m.zWert < 70).length;

const topKennzahlen = [
    { title: 'Ø Zufriedenheit gesamt', value: `${gesamtZufriedenheit}%`, icon: HeartPulse, color: 'blue' },
    { title: 'Mitarbeiter im grünen Bereich', value: gruenerBereich, icon: UserCheckIcon, color: 'emerald' },
    { title: 'Aktive Warnungen', value: aktiveWarnungen, icon: AlertTriangle, color: 'amber' },
    { title: 'Aktive Eskalationen', value: aktiveEskalationen, icon: Flame, color: 'rose' }
];

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

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-xl font-bold text-foreground">KPI-Übersicht – Organisation & Leistung</h2>
                <p className="text-sm text-muted-foreground">Systembasierte Leistungsbewertung. Automatisiert. Objektiv.</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topKennzahlen.map((kpi, index) => {
                    const Icon = kpi.icon;
                    return (
                        <Card key={index} className="p-4">
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
                                <TableHead>Aktueller Z-Wert</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Trend</TableHead>
                                <TableHead>Letzte Abweichung</TableHead>
                                <TableHead>Eskalationsstatus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kpiMitarbeiter.map((m, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">{m.name}</TableCell>
                                    <TableCell>{m.abteilung}</TableCell>
                                    <TableCell className="font-mono font-bold">{m.zWert}%</TableCell>
                                    <TableCell>
                                        <Badge className={cn("text-xs", getStatusColor(m.status))} variant="outline">{m.status}</Badge>
                                    </TableCell>
                                    <TableCell>{getTrendIcon(m.trend as any)}</TableCell>
                                    <TableCell>{m.letzteAbweichung}</TableCell>
                                    <TableCell>
                                         <Badge variant={m.eskalation === 'Ja' ? 'destructive' : 'secondary'}>{m.eskalation}</Badge>
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


const OverviewView = () => (
    <div className="space-y-8">
        <div>
            <h2 className="text-xl font-bold text-foreground">Workspace</h2>
            <p className="text-sm text-muted-foreground">Q-Space ist dein zentraler Arbeitsbereich für Dokumente, Nutzer und Zusammenarbeit.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader><CardTitle>Dateien gesamt</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">1.250</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Aktive Nutzer</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">14</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Gruppen</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">5</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Letzte Aktivitäten</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">32</p><p className="text-xs text-muted-foreground">in den letzten 24h</p></CardContent>
            </Card>
        </div>
         <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Schnellaktionen</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Button variant="outline">Dokument hochladen</Button>
                <Button variant="outline">Ordner erstellen</Button>
                <Button variant="outline">Nutzer anlegen</Button>
                <Button variant="outline">Gruppe anlegen</Button>
            </div>
        </div>
    </div>
);

const FilesView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Dateien & Dokumente</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Typ</TableHead>
                        <TableHead>Besitzer</TableHead>
                        <TableHead>Letzte Änderung</TableHead>
                        <TableHead>Freigabe-Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockFiles.map(c => (
                        <TableRow key={c.id} className="cursor-pointer">
                            <TableCell className="font-medium">{c.name}</TableCell>
                            <TableCell>{c.type}</TableCell>
                            <TableCell>{c.owner}</TableCell>
                            <TableCell>{c.modified}</TableCell>
                            <TableCell><Badge variant="outline">{c.shareStatus}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const UsersView = () => (
    <Card>
        <CardHeader><CardTitle>Nutzer</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>E-Mail</TableHead><TableHead>Rolle</TableHead><TableHead>Status</TableHead><TableHead>Gruppen</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockUsers.map(u => (
                        <TableRow key={u.id} className="cursor-pointer">
                            <TableCell className="font-medium">{u.name}</TableCell>
                            <TableCell>{u.email}</TableCell>
                            <TableCell>{u.role}</TableCell>
                            <TableCell><Badge variant={u.status === 'aktiv' ? 'default' : 'secondary'}>{u.status}</Badge></TableCell>
                            <TableCell>{u.groups}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const GroupsView = () => (
    <Card>
        <CardHeader><CardTitle>Gruppen</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader><TableRow><TableHead>Gruppenname</TableHead><TableHead>Mitglieder</TableHead><TableHead>Beschreibung</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockGroups.map(g => (
                        <TableRow key={g.id} className="cursor-pointer">
                            <TableCell className="font-medium">{g.name}</TableCell>
                            <TableCell>{g.members}</TableCell>
                            <TableCell>{g.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const ActivityView = () => (
    <Card>
        <CardHeader><CardTitle>Aktivitätsprotokoll</CardTitle></CardHeader>
        <CardContent>
             <Table>
                <TableHeader><TableRow><TableHead>Nutzer</TableHead><TableHead>Aktion</TableHead><TableHead>Zeitstempel</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockActivity.map(a => (
                        <TableRow key={a.id} className="cursor-pointer">
                            <TableCell className="font-medium">{a.user}</TableCell>
                            <TableCell>{a.action}</TableCell>
                            <TableCell>{a.time}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
)

const GenericView = ({ title }: { title: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground italic">Ansicht für "{title}" wird aufgebaut.</p>
        </CardContent>
    </Card>
);

export default function QSpacePage() {
    const [activeModule, setActiveModule] = useState(modules[0].name);

    const renderModule = () => {
        switch (activeModule) {
            case 'KPI-Dashboard': return <KpiDashboard />;
            case 'Übersicht': return <OverviewView />;
            case 'Dateien & Dokumente': return <FilesView />;
            case 'Nutzer': return <UsersView />;
            case 'Gruppen': return <GroupsView />;
            case 'Aktivitätsprotokoll': return <ActivityView />;
            case 'Ordnerstruktur': return <GenericView title="Ordnerstruktur" />;
            case 'Geteilt mit mir': return <GenericView title="Geteilt mit mir" />;
            case 'Berechtigungen': return <GenericView title="Berechtigungen" />;
            case 'Einstellungen': return <GenericView title="Einstellungen" />;
            default: return <KpiDashboard />;
        }
    };

  return (
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
        {/* Left Sidebar for Modules */}
        <aside className="w-56 border-r border-border pr-4 space-y-1">
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
            {/* Topbar */}
            <header className="flex justify-between items-center">
                 <div className="relative w-96">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Dateien, Ordner, Nutzer durchsuchen..." className="pl-9 bg-input" />
                </div>
                <div className="flex items-center gap-3">
                     <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button>
                                <Plus className="mr-2 h-4 w-4" />
                                Erstellen
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Neue Datei</DropdownMenuItem>
                            <DropdownMenuItem>Neuer Ordner</DropdownMenuItem>
                            <DropdownMenuItem>Neuer Nutzer</DropdownMenuItem>
                            <DropdownMenuItem>Neue Gruppe</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>

            {/* Module Content */}
            <div className="animate-in fade-in duration-300">
                {renderModule()}
            </div>
        </main>
    </div>
  );
}
