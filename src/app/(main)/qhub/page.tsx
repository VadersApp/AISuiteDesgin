'use client';

import { useState, useMemo, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';
import {
  LayoutDashboard,
  FileText,
  Users,
  Activity,
  Settings,
  Search,
  Plus,
  Briefcase,
  BarChart3,
  HeartPulse,
  UserCheck,
  AlertTriangle,
  Flame,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  MessageSquare,
  ArrowLeft,
  Search as SearchIcon,
  Bot as BotIcon,
  X,
  MoreHorizontal,
  Folder,
  CheckSquare,
  User as UserIcon,
  Calendar as CalendarIcon,
  Upload,
  File as FileIcon,
  FolderPlus,
  MoreVertical,
  Tag,
  Archive,
  Send,
  BrainCircuit,
  ChevronRight,
  Timer,
  Workflow,
  GitBranch,
  Building,
  Handshake,
  Kanban,
  Mail,
  Phone,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import { kpiMitarbeiter, topKennzahlen, chatThreads, teamChatsData, invitesData, docFolders, mockDocs as allMockDocs, mockSops, mockProjects, mockTasks, mockContacts, mockCompanies, mockDeals, pipelineStages, execKpiData } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


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
    { name: 'Termine', icon: CalendarIcon },
    { name: 'Reports', icon: BarChart3 },
];

const kpiCards = [
    { title: "Offene Tickets", value: "32", icon: FileText, color: "blue" },
    { title: "SLA Breaches", value: "3", icon: AlertTriangle, color: "rose" },
    { title: "Dringende Tickets", value: "7", icon: Flame, color: "amber" },
    { title: "AVA Antworten heute", value: "89", icon: BotIcon, color: "emerald" },
];

const marketingKpiCards = [
    { title: "Aktive Nurture-Kontakte", value: "145", icon: Users, color: "purple" },
    { title: "M → S Übergaben", value: "8", icon: GitBranch, color: "emerald" },
    { title: "Top Social Engagement", value: "1.2k", icon: Activity, color: "blue" },
    { title: "Email Performance", value: "42%", icon: BarChart3, color: "amber", subline: "Open Rate" },
];


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
                    <div className="text-2xl font-bold">2</div>
                </CardContent>
            </Card>
            <Card className="p-4 bg-card/50">
                <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                    <CardTitle className="text-sm font-medium">Entscheidungen warten</CardTitle>
                    <GitBranch className="h-4 w-4 text-amber-400" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-2xl font-bold">5</div>
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
                    <BotIcon className="h-4 w-4 text-emerald-400" />
                </CardHeader>
                <CardContent className="p-2 pt-0">
                    <div className="text-2xl font-bold">128</div>
                </CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
           {kpiCards.map(kpi => {
               const Icon = kpi.icon;
               return (
                <Card key={kpi.title} className="p-4 bg-card/50">
                    <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <Icon className={`h-4 w-4 text-${kpi.color}-400`} />
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                        <div className="text-2xl font-bold">{kpi.value}</div>
                    </CardContent>
                </Card>
               )
            })}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
             {marketingKpiCards.map(kpi => {
               const Icon = kpi.icon;
               return (
                <Card key={kpi.title} className="p-4 bg-card/50">
                    <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                        <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                        <Icon className={`h-4 w-4 text-${kpi.color}-400`} />
                    </CardHeader>
                    <CardContent className="p-2 pt-0">
                        <div className="text-2xl font-bold">{kpi.value}</div>
                         {kpi.subline && <p className="text-xs text-muted-foreground">{kpi.subline}</p>}
                    </CardContent>
                </Card>
               )
            })}
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
                                            <AlertTriangle className="w-3 h-3" />
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

const ReportsView = () => {
    const { kpis: execKpis, processKpis, agentKpis, attribution } = execKpiData;

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-foreground">Executive Overview</h2>
                <p className="text-sm text-muted-foreground">Live-Übersicht der wichtigsten Unternehmens-KPIs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {execKpis.map(kpi => {
                    const Icon = {
                        'DollarSign': DollarSign,
                        'TrendingUp': TrendingUp,
                        'Flame': Flame,
                        'Workflow': Workflow
                    }[kpi.icon] || HeartPulse;
                     return (
                        <Card key={kpi.title} className="p-4 bg-card/50">
                            <CardHeader className="p-2 pt-0 flex-row items-center justify-between">
                                <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                                <Icon className={`h-4 w-4 text-${kpi.color}-400`} />
                            </CardHeader>
                            <CardContent className="p-2 pt-0">
                                <div className="text-2xl font-bold">{kpi.value}</div>
                                {kpi.change && <p className="text-xs text-muted-foreground">{kpi.change}</p>}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <Card>
                    <CardHeader><CardTitle>Prozess-KPIs (Sales)</CardTitle></CardHeader>
                    <CardContent>
                         <Table>
                            <TableHeader><TableRow><TableHead>Metrik</TableHead><TableHead className="text-right">Wert</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {processKpis.map(kpi => (
                                    <TableRow key={kpi.metric}><TableCell>{kpi.metric}</TableCell><TableCell className="text-right font-mono">{kpi.value}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle>KI-Performance</CardTitle></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Agent</TableHead><TableHead className="text-right">Aktionen</TableHead><TableHead className="text-right">Erfolgsquote</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {agentKpis.map(kpi => (
                                     <TableRow key={kpi.agent}><TableCell>{kpi.agent}</TableCell><TableCell className="text-right font-mono">{kpi.actions}</TableCell><TableCell className="text-right font-mono">{kpi.successRate}</TableCell></TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader><CardTitle>Marketing Attribution</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm font-bold text-foreground">Deal: {attribution.dealName}</p>
                    <div className="mt-4 space-y-4 relative pl-5 before:absolute before:left-[9px] before:top-0 before:h-full before:w-0.5 before:bg-border">
                        {attribution.timeline.map((item, index) => (
                            <div key={index} className="flex items-center gap-4 relative">
                                <div className="h-5 w-5 rounded-full bg-background border-2 border-primary flex-shrink-0 z-10"></div>
                                <div>
                                    <p className="font-bold text-sm">{item.event}</p>
                                    <p className="text-xs text-muted-foreground">{item.channel} • {item.source} • {item.timestamp}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
};

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

const FeatureFlagView = () => {

    const featureFlags = [
        { id: 'qhubEnabled', label: 'Q-Hub Global', description: 'Aktiviert oder deaktiviert das gesamte Q-Hub-Subsystem.', enabled: true },
        { id: 'leadRouting', label: 'Lead Routing', description: 'Automatisches Routing neuer Leads basierend auf Regeln.', enabled: true },
        { id: 'salesCycle', label: 'Sales Cycle Prozess', description: 'Steuert Deals durch die Sales-Pipeline mit SLAs.', enabled: true },
        { id: 'supportFlow', label: 'Support Ticket Flow', description: 'Automatisiert die Bearbeitung von Kundenservice-Tickets.', enabled: true },
        { id: 'marketingNurture', label: 'Marketing Nurture', description: 'Prozessgesteuerte Nurture-Strecken für Kontakte.', enabled: true },
        { id: 'reportingStreams', label: 'Echtzeit-KPI-Streams', description: 'Aktualisiert KPI-Dashboards in Echtzeit basierend auf Events.', enabled: true },
        { id: 'agentActions', label: 'KI-Agenten-Aktionen', description: 'Erlaubt KI-Agenten die Ausführung von Aktionen.', enabled: true }
    ];

    return (
        <Card>
            <CardHeader>
                <CardTitle>Feature Flags</CardTitle>
                <CardDescription>Steuern Sie die Aktivierung einzelner Q-Hub-Module.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <Alert variant="destructive" className="bg-rose-950/50 border-rose-500/20 text-rose-300 [&>svg]:text-rose-400">
                    <Flame className="h-4 w-4" />
                    <AlertTitle>Globaler System-Schalter</AlertTitle>
                    <AlertDescription>
                       Das Deaktivieren von "Q-Hub Global" stoppt sofort alle Q-Hub-Prozesse und Automationen.
                    </AlertDescription>
                </Alert>
                {featureFlags.map(flag => (
                     <div key={flag.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                         <div>
                            <Label htmlFor={flag.id} className={cn("font-bold text-foreground", flag.id === 'qhubEnabled' && 'text-rose-400')}>{flag.label}</Label>
                            <p className="text-xs text-muted-foreground">{flag.description}</p>
                        </div>
                        <Switch id={flag.id} defaultChecked={flag.enabled} />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
};


const SystemAdminView = () => {
    const adminTabs = [
        { value: 'overview', label: 'Übersicht' },
        { value: 'users', label: 'Benutzer' },
        { value: 'teams-depts', label: 'Teams & Bereiche' },
        { value: 'roles-rights', label: 'Rollen & Rechte' },
        { value: 'kpi-policies', label: 'KPI-Richtlinien' },
        { value: 'feature-flags', label: 'Feature Flags' },
        { value: 'security', label: 'Sicherheit' },
        { value: 'system-health', label: 'Systemzustand' },
    ];
    return (
        <div>
            <header className="mb-6">
                <h2 className="text-xl font-bold text-foreground">System Admin (Q-Hub)</h2>
                <p className="text-sm text-muted-foreground">Administrative Steuerung von Q-Hub.</p>
            </header>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4 h-auto flex-wrap justify-start">
                    {adminTabs.map(tab => (
                        <TabsTrigger key={tab.value} value={tab.value}>{tab.label}</TabsTrigger>
                    ))}
                </TabsList>

                <TabsContent value="overview">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <Card><CardHeader><CardTitle>Aktive Nutzer</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{kpiMitarbeiter.length}</p></CardContent></Card>
                        <Card><CardHeader><CardTitle>Teams</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{[...new Set(kpiMitarbeiter.map(m=>m.team))].length}</p></CardContent></Card>
                        <Card><CardHeader><CardTitle>Bereiche</CardTitle></CardHeader><CardContent><p className="text-4xl font-bold">{[...new Set(kpiMitarbeiter.map(m=>m.abteilung))].length}</p></CardContent></Card>
                    </div>
                </TabsContent>

                <TabsContent value="feature-flags">
                    <FeatureFlagView />
                </TabsContent>

                <TabsContent value="users">
                    <Card>
                        <CardHeader><CardTitle>Benutzerverwaltung</CardTitle></CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Rolle</TableHead><TableHead>Team</TableHead><TableHead>Bereich</TableHead><TableHead>Aktiv</TableHead></TableRow></TableHeader>
                                <TableBody>
                                    {kpiMitarbeiter.map(user => (
                                        <TableRow key={user.id}>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell><Select defaultValue={user.role}><SelectTrigger className="w-40 bg-input"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Mitarbeiter">Mitarbeiter</SelectItem><SelectItem value="Teamleiter">Teamleiter</SelectItem></SelectContent></Select></TableCell>
                                            <TableCell><Select defaultValue={user.team}><SelectTrigger className="w-40 bg-input"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="Core-Backend">Core-Backend</SelectItem><SelectItem value="Enterprise">Enterprise</SelectItem></SelectContent></Select></TableCell>
                                            <TableCell><Select defaultValue={user.abteilung}><SelectTrigger className="w-40 bg-input"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="IT">IT</SelectItem><SelectItem value="Vertrieb">Vertrieb</SelectItem></SelectContent></Select></TableCell>
                                            <TableCell><Switch defaultChecked={true} /></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="teams-depts">
                    <div className="grid grid-cols-2 gap-6">
                        <Card><CardHeader><CardTitle>Bereiche</CardTitle><Button size="sm" className="mt-2">Neuer Bereich</Button></CardHeader><CardContent><p className="text-muted-foreground italic">Liste der Bereiche...</p></CardContent></Card>
                        <Card><CardHeader><CardTitle>Teams</CardTitle><Button size="sm" className="mt-2">Neues Team</Button></CardHeader><CardContent><p className="text-muted-foreground italic">Liste der Teams...</p></CardContent></Card>
                    </div>
                </TabsContent>

                 <TabsContent value="roles-rights">
                    <Card><CardHeader><CardTitle>Rollen & Rechte (Read-only)</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Hier würde eine schreibgeschützte Übersicht der Berechtigungen pro Rolle angezeigt.</p></CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="kpi-policies">
                    <Card>
                        <CardHeader><CardTitle>KPI-Richtlinien</CardTitle><p className="text-sm text-muted-foreground">Nur für `exec` Rolle sichtbar/bearbeitbar.</p></CardHeader>
                        <CardContent className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                                <div><Label>OK-Schwelle (≥)</Label><Input type="number" defaultValue="90" className="bg-input"/></div>
                                <div><Label>Beobachtungs-Schwelle (≥)</Label><Input type="number" defaultValue="80" className="bg-input"/></div>
                                <div><Label>Eskalations-Schwelle (&lt;)</Label><Input type="number" defaultValue="80" className="bg-input"/></div>
                           </div>
                           <h4 className="font-bold">Abzugsparameter</h4>
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                <div><Label>Überfällig</Label><Input type="number" defaultValue="2" className="bg-input"/></div>
                                <div><Label>Verspätet</Label><Input type="number" defaultValue="1" className="bg-input"/></div>
                                <div><Label>Blockiert</Label><Input type="number" defaultValue="1" className="bg-input"/></div>
                                <div><Label>Abweichung Arbeitsanweisung</Label><Input type="number" defaultValue="3" className="bg-input"/></div>
                                <div><Label>Projektverzug</Label><Input type="number" defaultValue="4" className="bg-input"/></div>
                           </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="security">
                     <Card>
                        <CardHeader><CardTitle>Sicherheit</CardTitle></CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <Card className="p-4"><h4 className="font-bold">Rollenverteilung</h4><p>5 Mitarbeiter, 2 Teamleiter...</p></Card>
                                <Card className="p-4"><h4 className="font-bold">Letztes Audit-Event</h4><p>Nutzer `space_admin` hat Rolle von `Ben Weber` geändert.</p></Card>
                            </div>
                        </CardContent>
                     </Card>
                </TabsContent>

                 <TabsContent value="system-health">
                     <Card>
                        <CardHeader><CardTitle>Systemzustand</CardTitle></CardHeader>
                        <CardContent className="grid grid-cols-3 gap-4">
                            <Card className="p-4 flex justify-between items-center"><p className="font-bold">KPI Engine</p><Badge className="bg-emerald-500/20 text-emerald-400">OK</Badge></Card>
                            <Card className="p-4 flex justify-between items-center"><p className="font-bold">Eskalations-Service</p><Badge className="bg-emerald-500/20 text-emerald-400">OK</Badge></Card>
                            <Card className="p-4 flex justify-between items-center"><p className="font-bold">Datenkonsistenz</p><Badge className="bg-emerald-500/20 text-emerald-400">OK</Badge></Card>
                        </CardContent>
                     </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}

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
            case 'Reports': return <ReportsView />;
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
