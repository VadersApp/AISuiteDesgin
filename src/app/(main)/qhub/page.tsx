'use client';

import { useState, useMemo, FormEvent, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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
import { format, isToday, isTomorrow, isFuture, isPast, isWithinInterval, startOfWeek, endOfWeek, addDays, subDays, startOfToday } from 'date-fns';
import { de } from 'date-fns/locale';
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
  Building2,
  Handshake,
  Kanban,
  Mail,
  Phone,
  TrendingUp,
  Ticket,
  CalendarDays,
  Clock,
  History,
  DollarSign,
  ChevronDown,
  CheckCircle2,
  Circle,
  GitBranch,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import { kpiMitarbeiter, topKennzahlen, chatThreads, teamChatsData, invitesData, docFolders, mockDocs as allMockDocs, mockSops, mockProjects, mockTasks, mockContacts, mockDeals, pipelineStages, execKpiData, featureFlags, qhubAgents, processTemplate_leadRoutingV1, leadRoutingPolicy, testLeads, getDynamicQalenderBookings, mockCompanies, allActivities, mockNotes } from '@/lib/data';
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
    { name: 'Termine', icon: CalendarDays },
    { name: 'Kontakte', icon: Users },
    { name: 'Firmen', icon: Building2 },
    { name: 'Deals', icon: Handshake },
    { name: 'Pipeline', icon: Kanban },
    { name: 'Aktivitäten', icon: Activity },
    { name: 'Aufgaben', icon: CheckSquare },
    { name: 'Notizen', icon: FileText },
    { name: 'E-Mails', icon: Mail },
    { name: 'Anrufe', icon: Phone },
    { name: 'Reports', icon: BarChart3 },
];

const DashboardView = ({ currentUser, filteredKpiMitarbeiter, filteredChatThreads, filteredTasks } : { currentUser: any, filteredKpiMitarbeiter: any[], filteredChatThreads: any[], filteredTasks: any[]}) => {
    
    const geschaeftsueberblickData = [
        { title: "Pipeline-Gesamtwert", value: "€90.000", subtitle: "Summe aller aktiven Verkaufschancen" },
        { title: "Aktive Deals", value: "4", subtitle: "Derzeit in Bearbeitung" },
        { title: "Neue Kontakte (30 Tage)", value: "12", subtitle: "Neu erfasste Kontakte" },
    ];

    const handlungsbedarfData = [
      { title: "Eskalationen aktiv", value: 2, icon: Flame, color: 'rose', tooltip: "Erfordert sofortige Prüfung" },
      { title: "Entscheidungen offen", value: 5, icon: GitBranch, color: 'amber', tooltip: "Freigabe oder Prüfung notwendig" },
      { title: "Laufende Prozesse", value: 18, icon: Workflow, color: 'blue', tooltip: "Automatisierungen in Bearbeitung" },
      { title: "KI-Aktionen heute", value: 128, icon: BotIcon, color: 'emerald', tooltip: "Durch KI-Mitarbeiter ausgeführt" },
    ];

    const vertriebsKpiData = [
        { title: "Deals in Bearbeitung", value: "4" },
        { title: "Pipeline-Wert", value: "€90.000" },
        { title: "Übergaben aus Marketing", value: "8" },
    ];

    const kundenserviceKpiData = [
        { title: "Offene Tickets", value: "43" },
        { title: "Dringende Tickets", value: "7" },
        { title: "SLA-Verstöße", value: "3", tooltip: "Service-Level-Agreement-Verstöße" },
        { title: "AVA-Antworten heute", value: "76", tooltip: "AVA ist Ihre Kundenservice-KI" },
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
                         <Button variant="link" className="p-0 h-auto text-primary" asChild>
                            <Link href="/qhub?module=Pipeline">Zur Pipeline →</Link>
                         </Button>
                    </CardFooter>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Kundenservice – aktuelle Lage</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {kundenserviceKpiData.map(kpi => (
                            <TooltipProvider key={kpi.title}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Card className="p-4 bg-muted/50">
                                            <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                            <p className="text-3xl font-bold">{kpi.value}</p>
                                        </Card>
                                    </TooltipTrigger>
                                    {kpi.tooltip && <TooltipContent><p>{kpi.tooltip}</p></TooltipContent>}
                                </Tooltip>
                            </TooltipProvider>
                        ))}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Marketing & Kundenentwicklung</CardTitle>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-4">
                         {marketingKpiData.map(kpi => (
                             <TooltipProvider key={kpi.title}>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                         <Card className="p-4 bg-muted/50">
                                            <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                            <p className="text-3xl font-bold">{kpi.value}</p>
                                         </Card>
                                    </TooltipTrigger>
                                    {kpi.tooltip && <TooltipContent><p>{kpi.tooltip}</p></TooltipContent>}
                                </Tooltip>
                            </TooltipProvider>
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


const ContactsView = () => {
    const [filter, setFilter] = useState('Alle');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredContacts = useMemo(() => {
        let contacts = mockContacts;

        if (searchTerm) {
            const lowercasedFilter = searchTerm.toLowerCase();
            contacts = contacts.filter(c => 
                c.name.toLowerCase().includes(lowercasedFilter) ||
                c.company.toLowerCase().includes(lowercasedFilter) ||
                c.email.toLowerCase().includes(lowercasedFilter)
            );
        }
        
        switch (filter) {
            case 'Aktiv':
                return contacts.filter(c => c.status === 'Aktiv');
            case 'Mit Handlungsbedarf':
                return contacts.filter(c => c.priority === 'critical' || c.priority === 'attention');
            case 'Kunden':
                return contacts.filter(c => c.leadStatus === 'Kunde' || c.leadStatus === 'In Betreuung');
            case 'Alle':
            default:
                return contacts;
        }
    }, [filter, searchTerm]);

    const getPriorityClass = (priority: string | undefined) => {
        switch (priority) {
            case 'critical': return 'bg-rose-500/5 hover:bg-rose-500/10';
            case 'attention': return 'bg-amber-500/5 hover:bg-amber-500/10';
            default: return 'hover:bg-muted/50';
        }
    };
    
    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Kontakte</CardTitle>
                        <CardDescription>Alle bekannten Personen im System</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-48 bg-input" />
                        <Button><Plus className="mr-2 h-4 w-4" /> Kontakt erstellen</Button>
                    </div>
                </div>
                <div className="pt-4">
                    <Tabs value={filter} onValueChange={setFilter}>
                        <TabsList>
                            <TabsTrigger value="Alle">Alle</TabsTrigger>
                            <TabsTrigger value="Aktiv">Aktiv</TabsTrigger>
                            <TabsTrigger value="Mit Handlungsbedarf">Mit Handlungsbedarf</TabsTrigger>
                            <TabsTrigger value="Kunden">Kunden</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Firma</TableHead>
                            <TableHead>E-Mail</TableHead>
                            <TableHead>Kontaktphase</TableHead>
                            <TableHead>Zuständig</TableHead>
                            <TableHead>Kontakt aktiv</TableHead>
                            <TableHead>Letzte Aktivität</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredContacts.map(c => (
                            <TableRow key={c.id} className={cn("cursor-pointer", getPriorityClass(c.priority))}>
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell>{c.company}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell><Badge variant="outline">{c.leadStatus}</Badge></TableCell>
                                <TableCell>{c.owner}</TableCell>
                                <TableCell>
                                    <Badge variant={c.status === 'Aktiv' ? 'default' : 'secondary'} className={c.status === 'Aktiv' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}>
                                        {c.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{c.lastActivity}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const CompaniesView = () => {
    const [filter, setFilter] = useState('Alle');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredCompanies = useMemo(() => {
        return mockCompanies.filter(c => {
            const matchesSearch = searchTerm === '' || c.name.toLowerCase().includes(searchTerm.toLowerCase());
            if (!matchesSearch) return false;

            switch (filter) {
                case 'Aktiv':
                    return c.status === 'Aktiv';
                case 'Mit Verkaufschancen':
                    return c.aktiveVorgange.includes('Verkaufschance');
                case 'Mit Servicefällen':
                    return c.aktiveVorgange.includes('Servicefall');
                case 'Alle':
                default:
                    return true;
            }
        });
    }, [filter, searchTerm]);

    const getPriorityClass = (priority?: string) => {
        switch (priority) {
            case 'critical': return 'bg-rose-500/5 hover:bg-rose-500/10';
            case 'attention': return 'bg-amber-500/5 hover:bg-amber-500/10';
            default: return 'hover:bg-muted/50';
        }
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle>Firmen</CardTitle>
                        <CardDescription>Alle Unternehmen im System</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                        <Input placeholder="Suchen..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-48 bg-input" />
                        <Button><Plus className="mr-2 h-4 w-4" /> Firma erstellen</Button>
                    </div>
                </div>
                <div className="pt-4">
                    <Tabs value={filter} onValueChange={setFilter}>
                        <TabsList>
                            <TabsTrigger value="Alle">Alle</TabsTrigger>
                            <TabsTrigger value="Aktiv">Aktiv</TabsTrigger>
                            <TabsTrigger value="Mit Verkaufschancen">Mit Verkaufschancen</TabsTrigger>
                            <TabsTrigger value="Mit Servicefällen">Mit Servicefällen</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="font-semibold">Firmenname</TableHead>
                            <TableHead>Branche</TableHead>
                            <TableHead>Zuständig</TableHead>
                            <TableHead>Firma aktiv</TableHead>
                            <TableHead>Aktive Vorgänge</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredCompanies.map(c => (
                            <TableRow key={c.id} className={cn("cursor-pointer", getPriorityClass(c.priority))}>
                                <TableCell className="font-semibold text-foreground">{c.name}</TableCell>
                                <TableCell className="text-muted-foreground">{c.industry}</TableCell>
                                <TableCell>{c.owner}</TableCell>
                                <TableCell>
                                    <Badge variant={c.status === 'Aktiv' ? 'default' : 'secondary'} className={c.status === 'Aktiv' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-slate-500/20 text-slate-400'}>
                                        {c.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>{c.aktiveVorgange}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const DealsView = () => {
    const [filter, setFilter] = useState('Alle');

    const filteredDeals = useMemo(() => {
        switch (filter) {
            case 'Mit Handlungsbedarf':
                return mockDeals.filter(d => d.slaDue === 'heute' || d.slaDue === 'morgen' || d.slaDue === 'überschritten');
            case 'SLA kritisch':
                return mockDeals.filter(d => d.slaDue === 'überschritten');
            case 'In Verhandlung':
                return mockDeals.filter(d => d.stage === 'Verhandlung');
            case 'Alle':
            default:
                return mockDeals;
        }
    }, [filter]);

    const getPriorityClass = (slaStatus?: string | null) => {
        switch (slaStatus) {
            case 'überschritten':
                return 'bg-rose-500/5 hover:bg-rose-500/10';
            case 'heute':
            case 'morgen':
                return 'bg-amber-500/5 hover:bg-amber-500/10';
            default:
                return 'hover:bg-muted/50';
        }
    };
    
    const formatSlaStatus = (slaDue: string | null) => {
        if (!slaDue) return "Im Plan";
        if (slaDue === 'überschritten') return "SLA überschritten";
        return `SLA ${slaDue} fällig`;
    };

    return (
     <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <div>
                    <CardTitle>Deals</CardTitle>
                    <CardDescription>Alle laufenden Verkaufschancen</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                    <Input placeholder="Suchen..." className="w-48 bg-input" />
                    <Button><Plus className="mr-2 h-4 w-4" /> Deal erstellen</Button>
                </div>
            </div>
            <div className="pt-4">
                <Tabs value={filter} onValueChange={setFilter}>
                    <TabsList>
                        <TabsTrigger value="Alle">Alle</TabsTrigger>
                        <TabsTrigger value="Mit Handlungsbedarf">Mit Handlungsbedarf</TabsTrigger>
                        <TabsTrigger value="SLA kritisch">SLA kritisch</TabsTrigger>
                        <TabsTrigger value="In Verhandlung">In Verhandlung</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Deal-Name</TableHead>
                        <TableHead>Nächster Schritt</TableHead>
                        <TableHead>Phase</TableHead>
                        <TableHead>Wert</TableHead>
                        <TableHead>SLA-Status</TableHead>
                        <TableHead>Zuständig</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredDeals.map(d => (
                        <TableRow key={d.id} className={cn("cursor-pointer", getPriorityClass(d.slaDue))}>
                            <TableCell className="font-semibold">{d.name}</TableCell>
                            <TableCell className="text-primary font-medium">{d.nextStep}</TableCell>
                            <TableCell><Badge variant="secondary">{d.stage}</Badge></TableCell>
                            <TableCell>{d.value}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={cn(
                                    'text-xs',
                                    d.slaDue === 'überschritten' && 'border-rose-500/50 text-rose-400',
                                    (d.slaDue === 'heute' || d.slaDue === 'morgen') && 'border-amber-500/50 text-amber-400',
                                )}>{formatSlaStatus(d.slaDue)}</Badge>
                            </TableCell>
                            <TableCell>{d.owner}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
    );
};

const PipelineView = () => {
    const formatCurrency = (valueStr: string) => {
        const number = parseInt(valueStr.replace(/[^0-9]/g, ''), 10);
        return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(number);
    };

    const formatSlaStatus = (slaDue: string | null): string => {
        if (!slaDue) return "";
        if (slaDue === 'überschritten') return "SLA überschritten";
        return `SLA ${slaDue} fällig`;
    };

    return (
        <div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Sales Pipeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start min-h-[60vh]">
                {pipelineStages.map(phase => {
                    const dealsInPhase = mockDeals.filter(d => d.stage === phase);
                    const phaseTotalValue = dealsInPhase.reduce((sum, deal) => sum + parseInt(deal.value.replace(/[^0-9]/g, ''), 10), 0);
                    const phaseDealCount = dealsInPhase.length;

                    return (
                        <div key={phase} className="bg-muted/50 rounded-xl flex flex-col h-full">
                            <div className="text-center p-4 border-b border-border">
                                <h3 className="text-base font-bold text-foreground">{phase}</h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {phaseDealCount} Verkaufschance{phaseDealCount !== 1 ? 'n' : ''} · {formatCurrency(phaseTotalValue.toString())}
                                </p>
                            </div>
                            <div className="space-y-3 p-3 flex-1">
                                {dealsInPhase.map(deal => {
                                    const isCritical = deal.slaDue === 'überschritten';
                                    const isAttention = deal.slaDue === 'heute' || deal.slaDue === 'morgen';
                                    
                                    const cardClasses = cn(
                                        "p-3 cursor-grab active:cursor-grabbing shadow-sm hover:shadow-md transition-all border",
                                        isCritical ? 'bg-rose-500/5 border-rose-500/20' : 
                                        isAttention ? 'bg-amber-500/5 border-amber-500/20' : 
                                        'bg-card border-border'
                                    );

                                    return (
                                        <Card key={deal.id} className={cardClasses}>
                                            <div>
                                                <h4 className="font-bold text-foreground truncate">{deal.name}</h4>
                                                <p className="text-sm text-muted-foreground">{formatCurrency(deal.value)}</p>
                                            </div>
                                            
                                            <div className="my-2 py-2 border-t border-b border-border/50 text-xs">
                                                {deal.inactiveDays > 0 && (
                                                    <p className="text-muted-foreground/80 mb-1">{deal.inactiveDays} Tage ohne Aktivität</p>
                                                )}
                                                {deal.slaDue && (
                                                    <div className={cn("flex items-center gap-1.5 font-medium", isCritical ? "text-rose-500" : isAttention ? "text-amber-500" : "text-muted-foreground")}>
                                                        <AlertTriangle className="w-3.5 h-3.5" />
                                                        <span>{formatSlaStatus(deal.slaDue)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-primary/10 p-2 rounded-md text-center mt-2">
                                                <p className="text-[9px] font-bold text-primary/80 uppercase">Nächster Schritt:</p>
                                                <p className="text-sm font-bold text-primary">{deal.nextStep}</p>
                                            </div>
                                        </Card>
                                    );
                                })}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

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

const TerminboardView = () => {
    const allBookings = useMemo(() => getDynamicQalenderBookings().map(b => ({ ...b, date: new Date(b.startAt) })), []);

    const todayBookings = useMemo(() => allBookings.filter(b => isToday(b.date)), [allBookings]);
    const nextBooking = useMemo(() => todayBookings.filter(b => isFuture(b.date)).sort((a, b) => a.date.getTime() - b.date.getTime())[0], [todayBookings]);
    const customerBookingsToday = useMemo(() => todayBookings.filter(b => b.role === 'Kunde' || b.role === 'Interessent').length, [todayBookings]);

    const upcomingBookings = useMemo(() => {
        const tomorrow = addDays(new Date(), 1);
        const endOfThisWeek = endOfWeek(new Date(), { weekStartsOn: 1 });

        return {
            heute: todayBookings.sort((a, b) => a.date.getTime() - b.date.getTime()),
            morgen: allBookings.filter(b => isTomorrow(b.date)).sort((a, b) => a.date.getTime() - b.date.getTime()),
            dieseWoche: allBookings.filter(b => isFuture(b.date) && !isToday(b.date) && !isTomorrow(b.date) && isWithinInterval(b.date, { start: new Date(), end: endOfThisWeek })).sort((a, b) => a.date.getTime() - b.date.getTime()),
            spaeter: allBookings.filter(b => isFuture(b.date) && !isWithinInterval(b.date, { start: new Date(), end: endOfThisWeek })).sort((a, b) => a.date.getTime() - b.date.getTime()),
        }
    }, [allBookings, todayBookings]);

    const criticalBookings = useMemo(() => allBookings.filter(b => b.status === 'überfällig' || b.status === 'unbestätigt' || b.status === 'ohne Ergebnis'), [allBookings]);
    const pastBookings = useMemo(() => allBookings.filter(b => isPast(b.date) && b.status === 'erledigt'), [allBookings]);

    const contextIcons: { [key: string]: React.ElementType } = {
        Verkaufschance: Handshake,
        Ticket: Ticket,
        Projekt: Briefcase,
    };
    
    const getRoleBadgeColor = (role: string) => {
        switch(role) {
            case 'Kunde': return 'bg-emerald-500/10 text-emerald-400';
            case 'Interessent': return 'bg-blue-500/10 text-blue-400';
            case 'Intern': return 'bg-slate-500/10 text-slate-400';
            default: return 'bg-muted';
        }
    }
    
    const getStatusColorClass = (status: string) => {
        if (status === 'überfällig') return 'border-rose-500 text-rose-400';
        if (status === 'unbestätigt' || status === 'ohne Ergebnis') return 'border-amber-500 text-amber-400';
        return 'border-border';
    }


    const renderBookingCard = (booking: any) => {
        const ContextIcon = contextIcons[booking.context.split(' ')[0]] || Briefcase;
        return (
            <Card key={booking.bookingId} className="p-4">
                <p className="font-bold text-sm text-foreground">{booking.eventTypeName}</p>
                <p className="text-sm text-muted-foreground">{booking.guestName}</p>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-border text-xs">
                     <div className="flex items-center gap-4">
                        <Badge variant="outline" className={cn("capitalize", getRoleBadgeColor(booking.role))}>{booking.role}</Badge>
                        <span className="text-muted-foreground flex items-center gap-1.5"><ContextIcon className="w-3 h-3" /> {booking.context}</span>
                     </div>
                     <span className="font-mono text-muted-foreground">{format(booking.date, 'HH:mm')} Uhr</span>
                </div>
            </Card>
        )
    };
    
     const renderBookingGroup = (title: string, bookings: any[]) => {
        if (bookings.length === 0) return null;
        return (
            <div key={title}>
                <h3 className="text-sm font-bold text-muted-foreground my-4">{title}</h3>
                <div className="space-y-3">
                    {bookings.map(renderBookingCard)}
                </div>
            </div>
        );
    };


    return (
         <div className="space-y-8">
            {/* ZONE A */}
            <div>
                <h2 className="text-xl font-bold text-foreground mb-4">Tagesüberblick</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4"><CardHeader className="p-0"><CardTitle className="text-sm">Termine heute</CardTitle></CardHeader><CardContent className="p-0 pt-2"><p className="text-3xl font-bold">{todayBookings.length}</p></CardContent></Card>
                    <Card className="p-4"><CardHeader className="p-0"><CardTitle className="text-sm">Nächster Termin</CardTitle></CardHeader><CardContent className="p-0 pt-2"><p className="text-3xl font-bold">{nextBooking ? format(nextBooking.date, 'HH:mm') : '---'}</p><p className="text-xs text-muted-foreground truncate">{nextBooking?.eventTypeName || 'Keine anstehenden Termine'}</p></CardContent></Card>
                    <Card className="p-4"><CardHeader className="p-0"><CardTitle className="text-sm">Termine mit Kunden</CardTitle></CardHeader><CardContent className="p-0 pt-2"><p className="text-3xl font-bold">{customerBookingsToday}</p></CardContent></Card>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* ZONE B */}
                <div className="lg:col-span-2 space-y-2">
                     <h2 className="text-xl font-bold text-foreground">Nächste Termine</h2>
                    {renderBookingGroup('Heute', upcomingBookings.heute)}
                    {renderBookingGroup('Morgen', upcomingBookings.morgen)}
                    {renderBookingGroup('Diese Woche', upcomingBookings.dieseWoche)}
                    {renderBookingGroup('Später', upcomingBookings.spaeter)}
                </div>
                {/* ZONE C & D */}
                <div className="space-y-6">
                     <div>
                        <h2 className="text-xl font-bold text-foreground mb-4">Offene / kritische Termine</h2>
                        <div className="space-y-3">
                             {criticalBookings.length > 0 ? criticalBookings.map(b => (
                                <Card key={b.bookingId} className={cn("p-3 border-l-4", getStatusColorClass(b.status))}>
                                    <p className="font-bold text-xs">{b.eventTypeName}</p>
                                    <p className="text-xs text-muted-foreground">{b.guestName} • {format(b.date, 'dd.MM.yy HH:mm')}</p>
                                     <Badge variant="outline" className="capitalize mt-2 text-xs">{b.status.replace('_', ' ')}</Badge>
                                </Card>
                             )) : <p className="text-sm text-muted-foreground italic">Keine kritischen Termine.</p>}
                        </div>
                    </div>
                     <Collapsible>
                        <CollapsibleTrigger asChild>
                            <Button variant="outline" className="w-full">
                                <History className="mr-2 h-4 w-4" />
                                Vergangene Termine anzeigen
                            </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-4 space-y-3">
                              {pastBookings.length > 0 ? pastBookings.map(b => (
                                <Card key={b.bookingId} className="p-3 bg-muted/50">
                                    <p className="font-bold text-xs text-muted-foreground">{b.eventTypeName}</p>
                                    <p className="text-xs text-muted-foreground/70">{b.guestName} • {format(b.date, 'dd.MM.yyyy')}</p>
                                </Card>
                             )) : <p className="text-sm text-muted-foreground italic text-center py-4">Keine vergangenen Termine.</p>}
                        </CollapsibleContent>
                    </Collapsible>
                </div>
            </div>
        </div>
    )
}

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

const ActivityItem = ({ activity }: { activity: any }) => {
  const isOverdue = isPast(activity.dueDate) && !isToday(activity.dueDate);
  const isTodayTask = isToday(activity.dueDate);

  const priorityColor = isOverdue
    ? 'border-rose-500/50 bg-rose-500/5'
    : isTodayTask
    ? 'border-amber-500/50 bg-amber-500/5'
    : 'border-border';
  
  const priorityDotColor = isOverdue
    ? 'bg-rose-500'
    : isTodayTask
    ? 'bg-amber-500'
    : 'bg-blue-500';
    
  const Icon = {
      Aufgabe: CheckSquare,
      Termin: CalendarIcon,
      Rückruf: Phone,
      Verkaufschance: Handshake,
      Servicefall: Ticket,
  }[activity.type] || CheckSquare;

  return (
    <div className={cn("flex items-center gap-4 p-3 rounded-lg border-l-4", priorityColor)}>
      <div className={cn("w-2 h-2 rounded-full shrink-0", priorityDotColor)}></div>
      <div className="flex-1 grid grid-cols-12 gap-4 items-center">
        <div className="col-span-4 flex items-center gap-2">
            <Icon className="w-4 h-4 text-muted-foreground"/>
            <span className="font-bold text-foreground">{activity.description}</span>
        </div>
        <div className="col-span-3 text-sm text-muted-foreground">{activity.context}</div>
        <div className="col-span-2">
            {activity.status === 'Erledigt' ? (
                <span className="text-xs font-medium text-emerald-500 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5"/> Erledigt</span>
            ) : isOverdue ? (
                <span className="text-xs font-medium text-rose-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Überfällig</span>
            ) : isTodayTask ? (
                <span className="text-xs font-medium text-amber-500 flex items-center gap-1"><Clock className="w-3.5 h-3.5"/> Heute fällig</span>
            ) : (
                <span className="text-xs text-muted-foreground">{activity.dueDate.toLocaleDateString('de-DE', { weekday: 'long' })}</span>
            )}
        </div>
        <div className="col-span-2 text-sm text-muted-foreground">
             {activity.status !== 'Erledigt' && <Button variant="outline" size="sm">Erledigen</Button>}
        </div>
        <div className="col-span-1 text-right">
            <Button variant="ghost" size="icon" className="w-8 h-8"><MoreVertical className="w-4 h-4"/></Button>
        </div>
      </div>
    </div>
  );
};

const ActivityGroup = ({ title, activities }: { title: string; activities: any[] }) => {
  if (activities.length === 0) return null;
  return (
    <div>
      <h2 className="text-lg font-bold text-foreground mb-4">{title}</h2>
      <div className="space-y-3">
        {activities.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
      </div>
    </div>
  );
};


const ActivitiesView = () => {
  const activities = useMemo(() => allActivities.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime()), []);

  const today = startOfToday();
  const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });

  const overdue = useMemo(() => activities.filter(a => isPast(a.dueDate) && !isToday(a.dueDate) && a.status !== 'Erledigt'), [activities]);
  const dueToday = useMemo(() => activities.filter(a => isToday(a.dueDate) && a.status !== 'Erledigt'), [activities]);
  
  const dueTomorrow = useMemo(() => activities.filter(a => isTomorrow(a.dueDate) && a.status !== 'Erledigt'), [activities]);
  const dueThisWeek = useMemo(() => activities.filter(a => isFuture(a.dueDate) && !isTomorrow(a.dueDate) && isWithinInterval(a.dueDate, { start: today, end: endOfThisWeek }) && a.status !== 'Erledigt'), [activities, today, endOfThisWeek]);
  const dueLater = useMemo(() => activities.filter(a => isFuture(a.dueDate) && !isWithinInterval(a.dueDate, { start: today, end: endOfThisWeek }) && a.status !== 'Erledigt'), [activities, today, endOfThisWeek]);

  const completed = useMemo(() => activities.filter(a => a.status === 'Erledigt').slice(0, 10), [activities]);


  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Aktivitäten
        </h1>
        <p className="text-muted-foreground">Ihre persönliche Arbeitszentrale für heute und die nächsten Tage.</p>
      </header>

      <div className="space-y-8">
        {/* Zone 1: Heute & Überfällig */}
        <ActivityGroup title="Heute & Überfällig" activities={[...overdue, ...dueToday]} />

        {/* Zone 2: Nächste Aktivitäten */}
        <ActivityGroup title="Morgen" activities={dueTomorrow} />
        <ActivityGroup title="Diese Woche" activities={dueThisWeek} />
        <ActivityGroup title="Später" activities={dueLater} />

        {/* Zone 3: Abgeschlossen */}
        <Collapsible>
          <CollapsibleTrigger asChild>
            <div className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground">
                <h2 className="text-lg font-bold">Erledigte Aufgaben</h2>
                <ChevronDown className="w-5 h-5"/>
            </div>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4 animate-in fade-in">
             <div className="space-y-3">
                {completed.map(activity => <ActivityItem key={activity.id} activity={activity} />)}
             </div>
          </CollapsibleContent>
        </Collapsible>

      </div>
    </div>
  );
}

const AufgabenView = () => {

    type TaskStatus = 'Offen' | 'Erledigt';

    const [tasks, setTasks] = useState(mockTasks.map(t => ({...t, status: t.status as TaskStatus})));

    const handleSetDone = (taskId: string) => {
        setTasks(currentTasks => currentTasks.map(t => t.id === taskId ? {...t, status: 'Erledigt'} : t));
    };

    const priorityOrder: { [key: string]: number } = { 'Hoch': 1, 'Mittel': 2, 'Niedrig': 3 };

    const getDueDate = (dueString: string): Date => {
        const now = new Date();
        if (dueString === 'Heute') return startOfToday();
        if (dueString === 'Morgen') return addDays(startOfToday(), 1);
        if (dueString === 'Diese Woche') return addDays(startOfToday(), 3);
        if (dueString === 'Nächste Woche') return addDays(startOfToday(), 7);
        if (dueString === 'Sofort') return subDays(startOfToday(), 1);
        return addDays(startOfToday(), 14); // Default
    };

    const isOverdue = (dueString: string) => {
        const dueDate = getDueDate(dueString);
        return isPast(dueDate) && !isToday(dueDate);
    }
    
    const overdueTasks = tasks.filter(t => t.status === 'Offen' && isOverdue(t.due));
    const openTasks = tasks.filter(t => t.status === 'Offen' && !isOverdue(t.due)).sort((a, b) => priorityOrder[a.prio] - priorityOrder[b.prio]);
    const doneTasks = tasks.filter(t => t.status === 'Erledigt');

    const TaskRow = ({ task }: { task: any }) => {
        const overdue = isOverdue(task.due);
        let priorityClass = 'bg-blue-500';
        if (overdue) {
            priorityClass = 'bg-rose-500';
        } else if (task.prio === 'Hoch') {
            priorityClass = 'bg-amber-500';
        }
        
        return (
            <div className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-accent/50">
                <div className={cn("w-2 h-2 rounded-full shrink-0", priorityClass)}></div>
                <div className="flex-1 font-bold text-foreground">{task.title}</div>
                <div className="text-sm text-muted-foreground w-48">{task.desc}</div>
                <div className="w-24 text-sm">{overdue ? 'Überfällig' : task.due}</div>
                <div className="w-24 text-sm">{task.prio}</div>
                <Button variant="outline" size="sm" onClick={() => handleSetDone(task.id)}>Erledigen</Button>
            </div>
        )
    };

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Aufgaben</h1>
                <p className="text-muted-foreground">Ihre persönliche To-do-Zentrale mit Verantwortung.</p>
            </header>

            <div className="space-y-6">
                <div>
                    <h2 className="text-xl font-bold text-foreground mb-4">Meine offenen Aufgaben</h2>
                    <div className="space-y-3">
                        {openTasks.length > 0 ? openTasks.map(task => <TaskRow key={task.id} task={task} />) : <p className="text-muted-foreground italic">Keine offenen Aufgaben.</p>}
                    </div>
                </div>

                <div>
                    <h2 className="text-xl font-bold text-rose-400 mb-4">Überfällige Aufgaben</h2>
                    <div className="space-y-3">
                         {overdueTasks.length > 0 ? overdueTasks.map(task => <TaskRow key={task.id} task={task} />) : <p className="text-muted-foreground italic">Sehr gut! Nichts ist überfällig.</p>}
                    </div>
                </div>

                <Collapsible>
                    <CollapsibleTrigger asChild>
                         <div className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground">
                            <h2 className="text-xl font-bold">Erledigte Aufgaben</h2>
                            <ChevronDown className="w-5 h-5"/>
                        </div>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 animate-in fade-in">
                        <div className="space-y-3">
                            {doneTasks.map(task => (
                                <div key={task.id} className="flex items-center gap-4 p-3 rounded-lg border border-border bg-muted/50 text-muted-foreground">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
                                    <div className="flex-1 line-through">{task.title}</div>
                                </div>
                            ))}
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};

const NotesView = () => {
    const [filter, setFilter] = useState('Alle');
    const [searchTerm, setSearchTerm] = useState('');

    const filteredNotes = useMemo(() => {
        return mockNotes.filter(n => {
            const matchesSearch = searchTerm === '' ||
                (n.title && n.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
                n.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (n.contextName && n.contextName.toLowerCase().includes(searchTerm.toLowerCase()));

            if (!matchesSearch) return false;

            switch (filter) {
                case 'Zu Deals':
                    return n.contextType === 'Deal';
                case 'Zu Kontakten':
                    return n.contextType === 'Kontakt';
                case 'Intern':
                    return n.contextType === 'Intern';
                case 'Alle':
                default:
                    return true;
            }
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [filter, searchTerm]);

    const sevenDaysAgo = new Date(Date.now() - 1000 * 60 * 60 * 24 * 7);
    const aktuelleNotizen = filteredNotes.filter(n => new Date(n.createdAt) > sevenDaysAgo);
    const aeltereNotizen = filteredNotes.filter(n => new Date(n.createdAt) <= sevenDaysAgo);

    const NoteCard = ({ note }: { note: any }) => {
        const contextIcons: { [key: string]: React.ElementType } = {
            Deal: Handshake,
            Kontakt: UserIcon,
            Firma: Building2,
            Intern: Info,
        };
        const ContextIcon = contextIcons[note.contextType as keyof typeof contextIcons] || Info;

        return (
            <Card className="p-4">
                <div className="flex justify-between items-start">
                    <div>
                        {note.title && <CardTitle className="text-base mb-2">{note.title}</CardTitle>}
                        <p className="text-sm text-muted-foreground">{note.content}</p>
                    </div>
                     <div className="text-right flex-shrink-0 ml-4">
                        <p className="text-xs font-bold text-foreground">{note.createdBy}</p>
                        <p className="text-xs text-muted-foreground">{format(new Date(note.createdAt), "dd.MM.yyyy, HH:mm")}</p>
                    </div>
                </div>
                {note.contextType !== 'Intern' && (
                     <div className="mt-3 pt-3 border-t border-border flex items-center gap-2 text-xs text-muted-foreground">
                        <ContextIcon className="w-3.5 h-3.5" />
                        <span>{note.contextType}: {note.contextName}</span>
                     </div>
                )}
            </Card>
        )
    }

    return (
        <div className="space-y-8">
             <header>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Notizen</h1>
                <p className="text-muted-foreground">Alle wichtigen Festhaltungen im Überblick.</p>
            </header>

            <div className="flex justify-between items-center">
                 <Tabs value={filter} onValueChange={setFilter}>
                    <TabsList>
                        <TabsTrigger value="Alle">Alle</TabsTrigger>
                        <TabsTrigger value="Zu Deals">Zu Deals</TabsTrigger>
                        <TabsTrigger value="Zu Kontakten">Zu Kontakten</TabsTrigger>
                        <TabsTrigger value="Intern">Intern</TabsTrigger>
                    </TabsList>
                </Tabs>
                <div className="flex items-center gap-2">
                    <Input placeholder="Suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-48 bg-input" />
                    <Button><Plus className="mr-2 h-4 w-4" /> Notiz erstellen</Button>
                </div>
            </div>

            {/* Aktuelle Notizen */}
            <div>
                 <h2 className="text-xl font-bold text-foreground mb-4">Aktuelle Notizen</h2>
                 <div className="space-y-4">
                    {aktuelleNotizen.length > 0 ? aktuelleNotizen.map(note => <NoteCard key={note.id} note={note}/>) : <p className="text-muted-foreground italic">Keine aktuellen Notizen.</p>}
                 </div>
            </div>
            
            {/* Ältere Notizen */}
            <Collapsible>
                <CollapsibleTrigger asChild>
                     <div className="flex items-center gap-2 text-muted-foreground cursor-pointer hover:text-foreground">
                        <h2 className="text-xl font-bold">Ältere Notizen</h2>
                        <ChevronDown className="w-5 h-5"/>
                    </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="mt-4 animate-in fade-in">
                    <div className="space-y-4">
                        {aeltereNotizen.length > 0 ? aeltereNotizen.map(note => <NoteCard key={note.id} note={note}/>) : <p className="text-muted-foreground italic">Keine älteren Notizen.</p>}
                    </div>
                </CollapsibleContent>
            </Collapsible>
        </div>
    );
};


export default function QhubPage() {
  const router = useRouter();
  const searchParams = usePathname();
  
  const [activeModule, setActiveModule] = useState(modules[0].name);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const urlParams = new URLSearchParams(window.location.search);
    const moduleParam = urlParams.get('module');
    if (moduleParam && modules.some(m => m.name === moduleParam)) {
        setActiveModule(moduleParam);
    }
  }, []);

  const [currentUserId, setCurrentUserId] = useState('dr-mueller');
  const currentUser = useMemo(() => kpiMitarbeiter.find(m => m.id === currentUserId), [currentUserId]);

  if (!currentUser) {
    return <div className="p-8">Benutzer wird geladen oder konnte nicht gefunden werden...</div>;
  }

  const renderModule = () => {
      switch (activeModule) {
          case 'Dashboard': return <DashboardView currentUser={currentUser} filteredKpiMitarbeiter={kpiMitarbeiter} filteredChatThreads={chatThreads} filteredTasks={mockTasks} />;
          case 'Termine': return <TerminboardView />;
          case 'Kontakte': return <ContactsView />;
          case 'Firmen': return <CompaniesView />;
          case 'Deals': return <DealsView />;
          case 'Pipeline': return <PipelineView />;
          case 'Aktivitäten': return <ActivitiesView />;
          case 'Aufgaben': return <AufgabenView />;
          case 'Notizen': return <NotesView />;
          case 'Reports': return <ReportsView />;
          default: return <GenericView title={activeModule} />;
      }
  };

  const handleModuleClick = (moduleName: string) => {
    setActiveModule(moduleName);
    const newSearchParams = new URLSearchParams(window.location.search);
    newSearchParams.set('module', moduleName);
    router.replace(`/qhub?${newSearchParams.toString()}`);
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
             <header>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">
                    Q-Hub
                </h1>
                <p className="text-muted-foreground">
                    Zentrale für Kunden, Vertrieb & Service
                </p>
            </header>
             <header className="flex justify-between items-center">
                 <div className="relative w-96">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Kontakte, Firmen, Deals durchsuchen..." className="pl-9 bg-input" />
                </div>
                 {isClient && <div className="flex items-center gap-3">
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
                </div>}
            </header>
            <div className="animate-in fade-in duration-300">
                {renderModule()}
            </div>
        </main>
    </div>
    </>
  );
}
