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
  Users,
  Building,
  Handshake,
  Kanban,
  Activity,
  CheckSquare,
  FileText,
  Mail,
  Phone,
  Calendar,
  BarChart3,
  Search,
  Plus,
  Flame,
  GitBranch,
  Workflow,
  Bot,
  Timer,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";


const modules = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Kontakte', icon: Users },
    { name: 'Firmen', icon: Building },
    { name: 'Deals', icon: Handshake },
    { name: 'Pipeline', icon: Kanban },
    { name: 'Aktivitäten', icon: Activity },
    { name: 'Aufgaben', icon: CheckSquare },
    { name: 'Notizen', icon: FileText },
    { name: 'E-Mails', icon: Mail },
    { name: 'Anrufe', icon: Phone },
    { name: 'Termine', icon: Calendar },
    { name: 'Reports', icon: BarChart3 },
];

const mockContacts = [
    { id: 1, name: 'Anna Schmidt', company: 'Innovatech GmbH', email: 'anna.schmidt@innovatech.de', status: 'Lead', owner: 'Leo Sales' },
    { id: 2, name: 'Ben Weber', company: 'Quantum Solutions', email: 'ben.w@quantum.com', status: 'Kunde', owner: 'Leo Sales' },
];
const mockCompanies = [
    { id: 1, name: 'Innovatech GmbH', industry: 'Technologie', owner: 'Leo Sales' },
    { id: 2, name: 'Quantum Solutions', industry: 'Forschung', owner: 'Leo Sales' },
];
const mockDeals = [
    { id: 1, name: 'Innovatech - Q3 Projekt', stage: 'Qualifizierung', value: '25.000€', owner: 'Leo Sales', slaDue: 'in 2 Tagen', inactiveDays: 1, nextStep: 'Anrufen' },
    { id: 2, name: 'Quantum - Jahreslizenz', stage: 'Verhandlung', value: '50.000€', owner: 'Leo Sales', slaDue: 'heute', inactiveDays: 0, nextStep: 'Angebot finalisieren' },
    { id: 3, name: 'Data Core - Integration', stage: 'Neu', value: '15.000€', owner: 'Leo Sales', slaDue: 'in 5 Tagen', inactiveDays: 0, nextStep: 'Erstkontakt' },
];
const pipelineStages = ['Neu', 'Qualifizierung', 'Präsentation', 'Verhandlung', 'Gewonnen', 'Verloren'];


const DashboardView = () => (
    <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader><CardTitle>Neue Kontakte (30T)</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">12</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Deals in Pipeline</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">4</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Pipeline-Wert</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">€90.000</p></CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-card/50">
                <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Eskalationen aktiv</CardTitle>
                    <Flame className="h-4 w-4 text-rose-400" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-2xl font-bold text-rose-400">2</div>
                </CardContent>
            </Card>
            <Card className="p-4 bg-card/50">
                <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Entscheidungen warten</CardTitle>
                    <GitBranch className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-2xl font-bold text-amber-400">5</div>
                </CardContent>
            </Card>
            <Card className="p-4 bg-card/50">
                <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Laufende Prozesse</CardTitle>
                    <Workflow className="h-4 w-4 text-blue-400" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-2xl font-bold">18</div>
                </CardContent>
            </Card>
            <Card className="p-4 bg-card/50">
                <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">KI-Aktionen heute</CardTitle>
                    <Bot className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-2xl font-bold">128</div>
                </CardContent>
            </Card>
        </div>
    </div>
);

const ContactsView = () => (
    <Card>
        <CardHeader>
            <CardTitle>Kontakte</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Firma</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Lead-Status</TableHead>
                        <TableHead>Owner</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockContacts.map(c => (
                        <TableRow key={c.id} className="cursor-pointer">
                            <TableCell className="font-medium">{c.name}</TableCell>
                            <TableCell>{c.company}</TableCell>
                            <TableCell>{c.email}</TableCell>
                            <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                            <TableCell>{c.owner}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const CompaniesView = () => (
     <Card>
        <CardHeader>
            <CardTitle>Firmen</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Firmenname</TableHead>
                        <TableHead>Branche</TableHead>
                        <TableHead>Owner</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCompanies.map(c => (
                        <TableRow key={c.id} className="cursor-pointer">
                            <TableCell className="font-medium">{c.name}</TableCell>
                            <TableCell>{c.industry}</TableCell>
                            <TableCell>{c.owner}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const DealsView = () => (
     <Card>
        <CardHeader>
            <CardTitle>Deals</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Deal-Name</TableHead>
                        <TableHead>Phase</TableHead>
                        <TableHead>Wert</TableHead>
                        <TableHead>Owner</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockDeals.map(d => (
                        <TableRow key={d.id} className="cursor-pointer">
                            <TableCell className="font-medium">{d.name}</TableCell>
                            <TableCell><Badge variant="secondary">{d.stage}</Badge></TableCell>
                            <TableCell>{d.value}</TableCell>
                            <TableCell>{d.owner}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const PipelineView = () => (
    <div>
        <h2 className="text-2xl font-bold text-foreground mb-4">Sales Pipeline</h2>
        <div className="grid grid-cols-6 gap-4 items-start min-h-[60vh]">
            {pipelineStages.map(stage => (
                <div key={stage} className="bg-muted/50 rounded-lg p-3 space-y-3 h-full">
                    <h3 className="text-sm font-bold text-center text-foreground pb-2 border-b border-border">{stage}</h3>
                    <div className="space-y-3">
                        {mockDeals.filter(d => d.stage === stage).map(deal => (
                            <Card key={deal.id} className="p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-shadow">
                                <p className="text-sm font-bold">{deal.name}</p>
                                <p className="text-xs text-muted-foreground">{deal.value}</p>
                                <div className="mt-3 pt-3 border-t border-border/50 space-y-2 text-xs">
                                    {deal.slaDue && (
                                        <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <Timer className="w-3 h-3" />
                                            <span>SLA: <span className={cn('font-bold', deal.slaDue === 'heute' && 'text-rose-400')}>{deal.slaDue}</span></span>
                                        </div>
                                    )}
                                    {deal.inactiveDays > 0 && (
                                        <div className="flex items-center gap-1.5 text-amber-400">
                                            <AlertCircle className="w-3 h-3" />
                                            <span>Inaktiv seit {deal.inactiveDays} Tag(en)</span>
                                        </div>
                                    )}
                                    {deal.nextStep && (
                                         <div className="flex items-center gap-1.5 text-muted-foreground">
                                            <ChevronRight className="w-3 h-3" />
                                            <span>Nächster Schritt: <span className="font-bold text-foreground">{deal.nextStep}</span></span>
                                        </div>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
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


export default function QhubPage() {
    const [activeModule, setActiveModule] = useState(modules[0].name);

    const renderModule = () => {
        switch (activeModule) {
            case 'Dashboard': return <DashboardView />;
            case 'Kontakte': return <ContactsView />;
            case 'Firmen': return <CompaniesView />;
            case 'Deals': return <DealsView />;
            case 'Pipeline': return <PipelineView />;
            case 'Aktivitäten': return <GenericView title="Aktivitäten" />;
            case 'Aufgaben': return <GenericView title="Aufgaben" />;
            case 'Notizen': return <GenericView title="Notizen" />;
            case 'E-Mails': return <GenericView title="E-Mails" />;
            case 'Anrufe': return <GenericView title="Anrufe" />;
            case 'Termine': return <GenericView title="Termine" />;
            case 'Reports': return <GenericView title="Reports" />;
            default: return <DashboardView />;
        }
    };

  return (
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
        {/* Left Sidebar for Modules */}
        <aside className="w-56 border-r border-border pr-4 space-y-1">
            <p className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">CRM Module</p>
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
                    <Input type="text" placeholder="Kontakte, Firmen, Deals durchsuchen..." className="pl-9 bg-input" />
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
                            <DropdownMenuItem>Neuer Kontakt</DropdownMenuItem>
                            <DropdownMenuItem>Neue Firma</DropdownMenuItem>
                            <DropdownMenuItem>Neuer Deal</DropdownMenuItem>
                            <DropdownMenuItem>Neue Aufgabe</DropdownMenuItem>
                            <DropdownMenuItem>Neue Notiz</DropdownMenuItem>
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
