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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const modules = [
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

const OverviewView = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-foreground">Übersicht</h2>
            <p className="text-muted-foreground">Q-Space ist dein zentraler Arbeitsbereich für Dokumente, Nutzer und Zusammenarbeit.</p>
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
            case 'Übersicht': return <OverviewView />;
            case 'Dateien & Dokumente': return <FilesView />;
            case 'Nutzer': return <UsersView />;
            case 'Gruppen': return <GroupsView />;
            case 'Aktivitätsprotokoll': return <ActivityView />;
            case 'Ordnerstruktur': return <GenericView title="Ordnerstruktur" />;
            case 'Geteilt mit mir': return <GenericView title="Geteilt mit mir" />;
            case 'Berechtigungen': return <GenericView title="Berechtigungen" />;
            case 'Einstellungen': return <GenericView title="Einstellungen" />;
            default: return <OverviewView />;
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
