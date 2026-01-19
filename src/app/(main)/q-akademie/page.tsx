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
  BookCopy,
  Network,
  FolderKanban,
  Users,
  Building,
  BarChart3,
  Award,
  Settings,
  Search,
  Plus,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const modules = [
    { name: 'Übersicht', icon: LayoutDashboard },
    { name: 'Kurse', icon: BookCopy },
    { name: 'Lernpfade', icon: Network },
    { name: 'Inhalte', icon: FolderKanban },
    { name: 'Teilnehmer', icon: Users },
    { name: 'Abteilungen & Rollen', icon: Building },
    { name: 'Fortschritt & Reports', icon: BarChart3 },
    { name: 'Zertifikate', icon: Award },
    { name: 'Einstellungen', icon: Settings },
];

// Mock Data
const mockCourses = [
    { id: 1, title: 'Onboarding für Sales-Team', description: 'Grundlagen für neue Vertriebsmitarbeiter.', modules: 5, enrolled: 12, status: 'Veröffentlicht' },
    { id: 2, title: 'DSGVO-Basisschulung', description: 'Rechtliche Grundlagen für alle Mitarbeiter.', modules: 3, enrolled: 45, status: 'Veröffentlicht' },
    { id: 3, title: 'Führungskräfte-Training Q1', description: 'Entwurf für das kommende Quartal.', modules: 8, enrolled: 0, status: 'Entwurf' },
];

const mockParticipants = [
    { id: 1, name: 'Anna Schmidt', role: 'Sales Manager', department: 'Vertrieb', courses: 3, progress: 80 },
    { id: 2, name: 'Ben Weber', role: 'Developer', department: 'IT', courses: 2, progress: 100 },
];

const mockLearningPaths = [
    { id: 1, title: 'Onboarding Vertrieb', courses: 3, assigned: 'Vertrieb', mandatory: true },
    { id: 2, title: 'Führungskräfte Entwicklung', courses: 5, assigned: 'Management', mandatory: false },
];

// Views
const OverviewView = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-foreground">Übersicht</h2>
            <p className="text-muted-foreground">Die Q-Akademie ist dein zentrales System für Schulungen und internes Wissen.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader><CardTitle>Aktive Kurse</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">2</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Teilnehmer gesamt</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">45</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Abgeschlossene Kurse</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">128</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Offene Schulungen</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">15</p></CardContent>
            </Card>
        </div>
         <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Schnellaktionen</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button variant="outline">Kurs erstellen</Button>
                <Button variant="outline">Video hochladen</Button>
                <Button variant="outline">Lernpfad anlegen</Button>
            </div>
        </div>
    </div>
);

const CoursesView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map(course => (
            <Card key={course.id} className="flex flex-col">
                <CardHeader>
                    <div className="flex justify-between items-start">
                        <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                        <Badge variant={course.status === 'Veröffentlicht' ? 'default' : 'secondary'}>{course.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground pt-1">{course.description}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="text-sm text-muted-foreground flex items-center justify-between">
                        <span>{course.modules} Module</span>
                        <span>{course.enrolled} Teilnehmer</span>
                    </div>
                </CardContent>
                <div className="p-6 pt-0">
                    <Button variant="outline" className="w-full">Kurs verwalten</Button>
                </div>
            </Card>
        ))}
         <Card className="flex flex-col items-center justify-center border-2 border-dashed bg-transparent shadow-none hover:border-primary/80 hover:bg-accent/50 transition-colors">
            <Button variant="ghost" className="h-auto flex-col gap-2">
                <Plus className="w-8 h-8 text-muted-foreground" />
                <span className="text-sm font-bold text-muted-foreground">Neuen Kurs erstellen</span>
            </Button>
        </Card>
    </div>
);

const LearningPathsView = () => (
    <Card>
        <CardHeader><CardTitle>Lernpfade</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Anzahl Kurse</TableHead><TableHead>Zugewiesen an</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockLearningPaths.map(lp => (
                        <TableRow key={lp.id} className="cursor-pointer">
                            <TableCell className="font-medium">{lp.title}</TableCell>
                            <TableCell>{lp.courses}</TableCell>
                            <TableCell>{lp.assigned}</TableCell>
                            <TableCell><Badge variant={lp.mandatory ? 'destructive' : 'outline'}>{lp.mandatory ? 'Pflicht' : 'Optional'}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const ParticipantsView = () => (
    <Card>
        <CardHeader><CardTitle>Teilnehmer</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Abteilung</TableHead><TableHead>Kurse</TableHead><TableHead>Fortschritt</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockParticipants.map(p => (
                        <TableRow key={p.id} className="cursor-pointer">
                            <TableCell className="font-medium">{p.name}</TableCell>
                            <TableCell>{p.department}</TableCell>
                            <TableCell>{p.courses}</TableCell>
                            <TableCell>{p.progress}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

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


export default function QAkademiePage() {
    const [activeModule, setActiveModule] = useState(modules[0].name);

    const renderModule = () => {
        switch (activeModule) {
            case 'Übersicht': return <OverviewView />;
            case 'Kurse': return <CoursesView />;
            case 'Lernpfade': return <LearningPathsView />;
            case 'Teilnehmer': return <ParticipantsView />;
            case 'Inhalte': return <GenericView title="Inhalte" />;
            case 'Abteilungen & Rollen': return <GenericView title="Abteilungen & Rollen" />;
            case 'Fortschritt & Reports': return <GenericView title="Fortschritt & Reports" />;
            case 'Zertifikate': return <GenericView title="Zertifikate" />;
            case 'Einstellungen': return <GenericView title="Einstellungen" />;
            default: return <OverviewView />;
        }
    };

    return (
        <div className="flex h-full min-h-[calc(100vh-10rem)]">
            <aside className="w-56 border-r border-border pr-4 space-y-1">
                <p className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">Q-Akademie</p>
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

            <main className="flex-1 pl-6 space-y-6">
                <header className="flex justify-between items-center">
                     <div className="relative w-96">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input type="text" placeholder="Kurse, Videos, Inhalte durchsuchen..." className="pl-9 bg-input" />
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
                                <DropdownMenuItem>Neuer Kurs</DropdownMenuItem>
                                <DropdownMenuItem>Neuer Lernpfad</DropdownMenuItem>
                                <DropdownMenuItem>Video hochladen</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <div className="animate-in fade-in duration-300">
                    {renderModule()}
                </div>
            </main>
        </div>
    );
}
