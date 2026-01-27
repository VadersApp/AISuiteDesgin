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
  Building,
  Handshake,
  Kanban,
  Mail,
  Phone,
  TrendingUp,
  DollarSign,
  GitBranch,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import { kpiMitarbeiter, topKennzahlen, chatThreads, teamChatsData, invitesData, docFolders, mockDocs as allMockDocs, mockSops, mockProjects, mockTasks, mockContacts, mockCompanies, mockDeals, pipelineStages, execKpiData, featureFlags, qhubAgents, processTemplate_leadRoutingV1, leadRoutingPolicy, testLeads } from '@/lib/data';
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
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';


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

const DashboardView = ({ currentUser, filteredKpiMitarbeiter, filteredChatThreads, filteredTasks } : { currentUser: any, filteredKpiMitarbeiter: any[], filteredChatThreads: any[], filteredTasks: any[]}) => {
    
    // ZONE A Data
    const geschaeftsueberblickData = [
        { title: "Pipeline-Gesamtwert", value: "€90.000", subtitle: "Summe aller aktiven Verkaufschancen" },
        { title: "Aktive Deals", value: "4", subtitle: "Derzeit in Bearbeitung" },
        { title: "Neue Kontakte (30 Tage)", value: "12", subtitle: "Neu erfasste Kontakte" },
    ];

    // ZONE B Data
    const handlungsbedarfData = [
        { title: "Eskalationen aktiv", value: 2, icon: Flame, color: 'rose', tooltip: "Erfordert sofortige Prüfung" },
        { title: 'Entscheidungen warten', value: 5, icon: GitBranch, color: 'amber', tooltip: "Freigabe oder Prüfung notwendig" },
        { title: "Laufende Prozesse", value: 18, icon: Workflow, color: 'blue', tooltip: "Automatisierungen in Bearbeitung" },
        { title: "KI-Aktionen heute", value: 128, icon: BotIcon, color: 'emerald', tooltip: "Durch KI-Mitarbeiter ausgeführt" },
    ];

    // ZONE C Data
    const vertriebsKpiData = [
        { title: "Deals in Bearbeitung", value: "4" },
        { title: "Pipeline-Wert", value: "€90.000" },
        { title: "Übergaben aus Marketing", value: "8" },
    ];

    const kundenserviceKpiData = [
        { title: "Offene Tickets", value: "43" },
        { title: "Dringende Tickets", value: "7" },
        { title: "SLA-Verstöße", value: "3" },
        { title: "AVA-Antworten heute", value: "76" },
    ];

    const marketingKpiData = [
        { title: "Aktive Nurture-Kontakte", value: '124' },
        { title: "Übergaben an Vertrieb", value: '8' },
        { title: "Soziale Interaktionen", value: '1.2k' },
        { title: "E-Mail-Wirkung", value: '42%', tooltip: "Öffnungen und Klicks zusammengefasst" },
    ];

    return (
        <div className="space-y-8">
            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
            
            {/* ZONE A: Geschäftsüberblick */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {geschaeftsueberblickData.map(item => (
                    <Card key={item.title}>
                        <CardHeader>
                            <CardTitle className="text-base">{item.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-4xl font-bold">{item.value}</p>
                            <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* ZONE B: Handlungsbedarf & Systemzustand */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {handlungsbedarfData.map(item => {
                    const Icon = item.icon;
                    return (
                        <Card key={item.title} className={`p-4 bg-card/50 border-l-4 border-${item.color}-500/50`}>
                             <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div className="flex items-center gap-4">
                                            <Icon className={`h-6 w-6 text-${item.color}-400`} />
                                            <div>
                                                <p className="text-2xl font-bold">{item.value}</p>
                                                <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                            </div>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>{item.tooltip}</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </Card>
                    );
                })}
            </div>
            
            {/* ZONE C: Operative Bereiche */}
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Vertrieb – aktueller Status</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {vertriebsKpiData.map(kpi => (
                             <Card key={kpi.title} className="p-4 bg-muted/50">
                                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                <p className="text-3xl font-bold">{kpi.value}</p>
                             </Card>
                        ))}
                    </CardContent>
                    <CardFooter>
                         <Button variant="link" className="p-0 h-auto text-primary">Zur Pipeline →</Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Kundenservice – aktuelle Lage</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {kundenserviceKpiData.map(kpi => (
                             <Card key={kpi.title} className="p-4 bg-muted/50">
                                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                <p className="text-3xl font-bold">{kpi.value}</p>
                             </Card>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Marketing & Kundenentwicklung</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                         {marketingKpiData.map(kpi => (
                             <Card key={kpi.title} className="p-4 bg-muted/50">
                                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                <p className="text-3xl font-bold">{kpi.value}</p>
                             </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>

            {/* ZONE D: Analyse & Wirkung */}
            <Collapsible>
                <CollapsibleTrigger asChild>
                    <Button variant="outline" className="w-full">
                        <BarChart3 className="mr-2 h-4 w-4" />
                        Analyse anzeigen
                    </Button>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4">
                    <Card className="p-6">
                        <CardTitle>Analyse & Wirkung</CardTitle>
                        <p className="text-muted-foreground mt-2">Detaillierte Auswertungen zu Trends, Prozess-Durchlaufzeiten und KI-Leistung.</p>
                         <div className="text-center py-12 text-muted-foreground italic">Inhalt für Analyse & Wirkung wird hier angezeigt.</div>
                    </Card>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};


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
                         <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockContacts.map(c => (
                        <TableRow key={c.id} className="cursor-pointer">
                            <TableCell className="font-medium">{c.name}</TableCell>
                            <TableCell>{c.company}</TableCell>
                            <TableCell>{c.email}</TableCell>
                            <TableCell><Badge variant="outline">{c.leadStatus}</Badge></TableCell>
                            <TableCell>{c.owner}</TableCell>
                            <TableCell><Badge variant="secondary">{c.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const CompaniesView = () => {
    return (
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
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCompanies.map(c => (
                        <TableRow key={c.id} className="cursor-pointer">
                            <TableCell className="font-medium">{c.name}</TableCell>
                            <TableCell>{c.industry}</TableCell>
                            <TableCell>{c.owner}</TableCell>
                            <TableCell><Badge variant="secondary">{c.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    );
};

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
                        <TableHead>SLA-Status</TableHead>
                        <TableHead>Nächster Schritt</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockDeals.map(d => (
                        <TableRow key={d.id} className="cursor-pointer">
                            <TableCell className="font-medium">{d.name}</TableCell>
                            <TableCell><Badge variant="secondary">{d.stage}</Badge></TableCell>
                            <TableCell>{d.value}</TableCell>
                            <TableCell>{d.owner}</TableCell>
                            <TableCell><Badge variant="outline" className={d.slaDue === 'heute' ? 'border-rose-500/50 text-rose-400' : ''}>{d.slaDue}</Badge></TableCell>
                            <TableCell className="text-xs">{d.nextStep}</TableCell>
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

const SystemAdminView = () => {
    const adminTabs = [
        { value: 'overview', label: 'Übersicht' },
        { value: 'users', label: 'Benutzer' },
        { value: 'teams-depts', label: 'Teams & Bereiche' },
        { value: 'roles-rights', label: 'Rollen & Rechte' },
        { value: 'feature-flags', label: 'Feature Flags'},
        { value: 'kpi-policies', label: 'KPI-Richtlinien' },
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
                <TabsList className="mb-4 flex-wrap h-auto justify-start">
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
                
                 <TabsContent value="feature-flags">
                    <Card>
                        <CardHeader>
                          <CardTitle>Feature Flags &amp; Systemsteuerung</CardTitle>
                          <CardDescription>Aktivieren oder deaktivieren Sie Q-Hub-Module.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Globaler System-Schalter</AlertTitle>
                                <AlertDescription>
                                    <div className="flex items-center justify-between mt-2">
                                        <div>
                                            <p className="font-bold">Q-Hub Subsystem aktivieren</p>
                                            <p className="text-xs">Deaktivieren stoppt alle Q-Hub Prozesse sofort.</p>
                                        </div>
                                        <Switch defaultChecked={true} />
                                    </div>
                                </AlertDescription>
                            </Alert>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {Object.entries(featureFlags).filter(([key]) => key !== 'qhubEnabled').map(([key, value]) => (
                                     <div key={key} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                                        <Label htmlFor={key} className="text-sm font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</Label>
                                        <Switch id={key} defaultChecked={value as boolean} />
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
                
                <TabsContent value="kpi-policies">
                    <Card>
                        <CardHeader><CardTitle>KPI-Richtlinien</CardTitle><p className="text-sm text-muted-foreground">Nur für `exec` Rolle sichtbar/bearbeitbar.</p></CardHeader>
                        <CardContent className="space-y-4">
                           <div className="grid grid-cols-3 gap-4">
                                <div><Label>OK-Schwelle (≥)</Label><Input type="number" defaultValue="90" className="bg-input"/></div>
                                <div><Label>Beobachtungs-Schwelle (≥)</Label><Input type="number" defaultValue="80" className="bg-input"/></div>
                                <div><Label>Eskalations-Schwelle (&lt;)</Label><Input type="number" defaultValue="70" className="bg-input"/></div>
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
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [currentUserId, setCurrentUserId] = useState('dr-mueller');
  const currentUser = useMemo(() => kpiMitarbeiter.find(m => m.id === currentUserId), [currentUserId]);

  if (!currentUser) {
    return <div className="p-8">Benutzer wird geladen oder konnte nicht gefunden werden...</div>;
  }

  const renderModule = () => {
      switch (activeModule) {
          case 'Dashboard': return <DashboardView currentUser={currentUser} filteredKpiMitarbeiter={kpiMitarbeiter} filteredChatThreads={chatThreads} filteredTasks={mockTasks} />;
          case 'Kontakte': return <ContactsView />;
          case 'Firmen': return <CompaniesView />;
          case 'Deals': return <DealsView />;
          case 'Pipeline': return <PipelineView />;
          case 'Reports': return <ReportsView />;
          default: return <GenericView title={activeModule} />;
      }
  };

  const handleModuleClick = (moduleName: string) => {
    setActiveModule(moduleName);
  };

  return (
    <>
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
        {/* Left Sidebar for Modules */}
        <aside className="w-56 border-r border-border pr-4 space-y-1">
            <p className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">CRM Module</p>
            {modules.map((mod) => {
                const Icon = mod.icon;
                const isActive = activeModule === mod.name;

                 return (
                    <div key={mod.name} className="relative">
                        <Button
                            variant={isActive ? 'secondary' : 'ghost'}
                            onClick={() => handleModuleClick(mod.name)}
                            className="w-full justify-start text-sm"
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            {mod.name}
                        </Button>
                    </div>
                )
            })}
        </aside>

        {/* Main Area */}
        <main className="flex-1 pl-6 space-y-6">
             <header className="flex justify-between items-center">
                 <div className="relative w-96">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Kontakte, Firmen, Deals durchsuchen..." className="pl-9 bg-input" />
                </div>
                <div className="flex items-center gap-3">
                    {isClient && <DropdownMenu>
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
                    </DropdownMenu>}
                </div>
            </header>
            <div className="animate-in fade-in duration-300">
                {renderModule()}
            </div>
        </main>
    </div>
    </>
  );
}
