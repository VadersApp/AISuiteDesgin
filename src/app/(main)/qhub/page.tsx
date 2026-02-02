

'use client';

import React, { useState, useMemo, useEffect, type FormEvent } from 'react';
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
import { format, isToday, isTomorrow, isFuture, isPast, isWithinInterval, startOfWeek, endOfWeek, addDays, subDays, startOfToday, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';
import { type DateRange } from 'react-day-picker';
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart2,
  BarChart3,
  Bot as BotIcon,
  BrainCircuit,
  Briefcase,
  Building,
  Building2,
  Calendar as CalendarIcon,
  CalendarDays,
  CalendarRange,
  Check,
  CheckCircle,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Circle,
  Clock,
  DollarSign,
  File as FileIcon,
  FileQuestion,
  FileText,
  Flame,
  GitBranch,
  GraduationCap,
  Handshake,
  HeartPulse,
  History as HistoryIcon,
  Info,
  Kanban,
  LayoutDashboard,
  Mail,
  MessageSquare,
  MoreVertical,
  Percent,
  Phone,
  PhoneIncoming,
  PhoneMissed,
  PhoneOutgoing,
  Plus,
  Search,
  Settings,
  Target,
  Ticket,
  TrendingUp,
  Upload,
  User as UserIcon,
  UserCheck,
  UserX,
  Users,
  Workflow,
  X,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import { kpiMitarbeiter, topKennzahlen, chatThreads, teamChatsData, invitesData, docFolders, mockDocs as allMockDocs, mockSops, mockProjects, mockTasks, mockContacts, mockDeals, pipelineStages, execKpiData, featureFlags, qhubAgents, processTemplate_leadRoutingV1, leadRoutingPolicy, allLeads as qsalesLeads, getDynamicQalenderBookings, mockCompanies, allActivities, mockNotes, mockEmails, mockCalls, kiTagesfokus, kiManagementSummary, qSalesReportingData } from '@/lib/data';
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
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart';


const modules = [
    { name: 'Dashboard', icon: LayoutDashboard },
    { name: 'Termine', icon: CalendarDays },
    { name: 'Aufgaben', icon: CheckSquare },
    { name: 'Kontakte', icon: Users },
    { name: 'Firmen', icon: Building2 },
    { name: 'Deals', icon: Handshake },
    { name: 'Pipeline', icon: Kanban },
    { name: 'Aktivitäten', icon: Activity },
    { name: 'Notizen', icon: FileText },
    { name: 'E-Mails', icon: Mail },
    { name: 'Anrufe', icon: Phone },
    { name: 'Reports', icon: BarChart3 },
];

const mockUploadJob = {
    uploadJobId: 'upload-xyz-123',
    status: 'needs_review',
    fileName: 'Onboarding_Process_New_Sales_Team.pdf',
    mimeType: 'application/pdf',
    sizeBytes: 780 * 1024,
    aiSuggestion: {
        suggestedTitle: 'Onboarding Prozess für neue Sales-Mitarbeiter',
        deptId: 'Personalwesen (HR)',
        folderId: 'folder-hr-2',
        tags: ['onboarding', 'sales', 'prozess', 'hr'],
        confidence: 85,
        reason: 'Dokument enthält Begriffe wie "Sales", "Onboarding", "Neuer Mitarbeiter" und "Vertriebsprozess".'
    }
};

const KiTagesfokus = () => (
    <Card className="bg-blue-950/50 border-blue-500/20">
        <CardHeader>
            <CardTitle className="text-base text-blue-300 flex items-center gap-2">
                <BrainCircuit className="w-5 h-5"/>
                KI-Tagesfokus
            </CardTitle>
            <CardDescription className="text-blue-400/70">Ihre Top 5 Prioritäten für heute, basierend auf Dringlichkeit und Relevanz.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
            {kiTagesfokus.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-500/10">
                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                    <div>
                        <p className="text-sm font-bold text-white">{item.title}</p>
                        <p className="text-xs text-blue-400/80">{item.reason}</p>
                    </div>
                </div>
            ))}
        </CardContent>
    </Card>
);


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
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
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
                </div>
                <div className="space-y-6">
                     <Card className="border-rose-500/50 bg-rose-500/10">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-rose-400 text-base">KI-Eskalation</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm">Deal 'Data Corp' stagniert, da seit 5 Tagen keine Aktivität verzeichnet wurde. Die Reaktionsfrist ist überschritten.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/dashboard/system-alerts/esc-deal-stagnation">Details ansehen</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <KiTagesfokus />
                </div>
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
    const router = useRouter();
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
                            <TableRow key={c.id} onClick={() => router.push(`/qhub/contacts/${c.id}`)} className={cn("cursor-pointer", getPriorityClass(c.priority))}>
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
    const [selectedDealId, setSelectedDealId] = useState<number | null>(null);

    const filteredDeals = useMemo(() => {
        let deals = mockDeals.filter(d => d.stage !== 'Gewonnen' && d.stage !== 'Verloren');
        switch (filter) {
            case 'Mit Handlungsbedarf':
                return deals.filter(d => d.slaDue === 'heute' || d.slaDue === 'morgen' || d.slaDue === 'überschritten');
            case 'Frist kritisch':
                return deals.filter(d => d.slaDue === 'überschritten');
            case 'In Verhandlung':
                return deals.filter(d => d.stage === 'Verhandlung');
            case 'Alle':
            default:
                return deals;
        }
    }, [filter]);

    const getPriorityClass = (slaDue?: string | null) => {
        if (slaDue === 'überschritten') return 'bg-rose-500/5 hover:bg-rose-500/10';
        if (slaDue === 'heute' || slaDue === 'morgen') return 'bg-amber-500/5 hover:bg-amber-500/10';
        return 'hover:bg-muted/50';
    };
    
    const formatFristStatus = (slaDue: string | null) => {
        if (!slaDue) return "Im Plan";
        if (slaDue === 'überschritten') return "Reaktionsfrist überschritten";
        return `Nächster Schritt ${slaDue} fällig`;
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
                        <TabsTrigger value="Frist kritisch">Frist kritisch</TabsTrigger>
                        <TabsTrigger value="In Verhandlung">In Verhandlung</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="font-bold">Deal-Name</TableHead>
                        <TableHead>Nächster Schritt</TableHead>
                        <TableHead>Phase</TableHead>
                        <TableHead>Wert</TableHead>
                        <TableHead>Frist-Status</TableHead>
                        <TableHead>Zuständig</TableHead>
                        <TableHead className="text-right">KI-Analyse</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredDeals.map(d => (
                        <TableRow key={d.id} className={cn("cursor-pointer", getPriorityClass(d.slaDue))}>
                            <TableCell className="font-semibold text-foreground">{d.name}</TableCell>
                            <TableCell className="text-primary font-medium">{d.nextStep}</TableCell>
                            <TableCell><Badge variant="secondary">{d.stage}</Badge></TableCell>
                            <TableCell>{d.value}</TableCell>
                            <TableCell>
                                <Badge variant="outline" className={cn(
                                    'text-xs',
                                    d.slaDue === 'überschritten' && 'border-rose-500/50 text-rose-400',
                                    (d.slaDue === 'heute' || d.slaDue === 'morgen') && 'border-amber-500/50 text-amber-400',
                                )}>{formatFristStatus(d.slaDue)}</Badge>
                            </TableCell>
                            <TableCell>{d.owner}</TableCell>
                             <TableCell className="text-right">
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" size="sm"><BrainCircuit className="w-4 h-4 mr-2" /> Analysieren</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>KI-Dealcheck: {d.name}</DialogTitle>
                                        </DialogHeader>
                                        <div className="space-y-4 py-4 text-sm">
                                            <p><strong className="text-muted-foreground">Aktuelle Phase:</strong> {d.stage}</p>
                                            <h4 className="font-bold text-base mt-4">Checkliste für Phase '{d.stage}'</h4>
                                            <ul className="list-disc pl-5 space-y-1">
                                                <li>Angebot vollständig versendet?</li>
                                                <li>Entscheider identifiziert?</li>
                                                <li>Budget bestätigt?</li>
                                            </ul>
                                            <h4 className="font-bold text-base mt-4">KI-Risikoanalyse</h4>
                                            <p>Der Deal stagniert, da seit 5 Tagen keine Aktivität verzeichnet wurde. Nächster Schritt sollte dringend erfolgen.</p>
                                            <h4 className="font-bold text-base mt-4">Vorgeschlagener nächster Schritt</h4>
                                            <p>Anruf zur Klärung des Angebotsstatus.</p>
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </TableCell>
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

    const formatFristStatus = (slaDue: string | null): string => {
        if (!slaDue) return "";
        if (slaDue === 'überschritten') return "Reaktionsfrist überschritten";
        return `Nächster Schritt ${slaDue} fällig`;
    };

    return (
        <div>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start min-h-[60vh]">
                {pipelineStages.map(phase => {
                    const dealsInPhase = mockDeals.filter(d => d.stage === phase);
                    const phaseTotalValue = dealsInPhase.reduce((sum, deal) => sum + parseInt(deal.value.replace(/[^0-9]/g, ''), 10), 0);
                    const phaseDealCount = dealsInPhase.length;

                    return (
                        <div key={phase} className="bg-muted/50 rounded-xl flex flex-col h-full">
                            <div className="text-left p-4 border-b border-border">
                                <h3 className="text-base font-bold text-foreground">{phase}</h3>
                                <p className="text-xs text-muted-foreground mt-1">
                                    {phaseDealCount} Verkaufschance{phaseDealCount !== 1 ? 'n' : ''} <span className="mx-1">•</span> {formatCurrency(phaseTotalValue.toString())}
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
                                                        <span>{formatFristStatus(deal.slaDue)}</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="bg-primary/10 p-2 rounded-md text-center mt-2">
                                                <p className="text-[9px] font-bold text-primary/80 uppercase">Nächster Schritt:</p>
                                                <p className="text-sm font-bold text-primary">{deal.nextStep}</p>
                                            </div>
                                            
                                            {deal.aiNextStepSuggestion && (
                                                <Collapsible className="mt-2">
                                                    <CollapsibleTrigger asChild>
                                                        <Button variant="ghost" size="sm" className="w-full text-xs gap-2 text-blue-400 hover:text-blue-300">
                                                            <BrainCircuit className="w-4 h-4"/> KI-Vorschlag
                                                        </Button>
                                                    </CollapsibleTrigger>
                                                    <CollapsibleContent className="p-2 bg-blue-950/50 rounded-md border border-blue-500/20 mt-1 text-xs">
                                                        <p className="font-bold">Vorschlag:</p>
                                                        <p>{deal.aiNextStepSuggestion}</p>
                                                        {deal.aiRisk && <p className="mt-1 text-amber-400/80"><strong className="font-bold">Risiko:</strong> {deal.aiRisk}</p>}
                                                    </CollapsibleContent>
                                                </Collapsible>
                                            )}
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

const UebersichtTab = () => {
    const { uebersicht } = qSalesReportingData;
    const IconMap: { [key: string]: React.ElementType } = { Phone, Calendar, Handshake, Percent, DollarSign, AlertTriangle };
  
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {uebersicht.kpis.map(kpi => {
            const Icon = IconMap[kpi.icon as string] || Activity;
            return (
              <Card key={kpi.title}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center justify-between">
                    {kpi.title} <Icon className="w-4 h-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold">{kpi.value}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        <Card>
            <CardHeader>
                <CardTitle>Sales Flow</CardTitle>
                <CardDescription>Konvertierungsraten zwischen den Vertriebsphasen.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-nowrap items-center justify-start gap-4 p-6 overflow-x-auto no-scrollbar">
                {uebersicht.salesFlow.map((step, index) => (
                    <React.Fragment key={step.stage}>
                        <div className="text-center flex-shrink-0">
                            <p className="text-sm font-bold text-muted-foreground">{step.stage}</p>
                            <p className="text-3xl font-bold">{step.value}</p>
                        </div>
                        {index < uebersicht.salesFlow.length - 1 && (
                            <div className="text-center flex-shrink-0 px-4">
                                <ChevronsRight className="w-8 h-8 text-muted-foreground/50 hidden md:block"/>
                                <p className="text-emerald-400 font-bold mt-2 text-sm">{uebersicht.salesFlow[index+1].conversion}</p>
                            </div>
                        )}
                    </React.Fragment>
                ))}
            </CardContent>
        </Card>
      </div>
    );
};

const AktivitaetTab = () => {
    const { aktivitaet } = qSalesReportingData;
    const kpiData = [
        { title: 'Anrufe', value: aktivitaet.calls, target: 80, icon: Phone, color: 'blue' },
        { title: 'Erreichte Leads', value: aktivitaet.reachedLeads, target: 60, icon: UserCheck, color: 'emerald' },
        { title: 'Termine', value: aktivitaet.meetings, target: 10, icon: Calendar, color: 'purple' },
        { title: 'Überfällige Follow-ups', value: aktivitaet.overdueFollowups, target: 5, icon: AlertTriangle, color: 'amber', invertColor: true },
    ];

    const getKpiColor = (value: number, target: number, invert: boolean = false) => {
        const performance = value / target;
        if (invert) {
            if (value === 0) return 'text-emerald-400';
            if (value < target) return 'text-amber-400';
            return 'text-rose-400';
        }
        if (performance >= 1) return 'text-emerald-400';
        if (performance >= 0.8) return 'text-amber-400';
        return 'text-rose-400';
    }

    return (
         <div className="space-y-8">
            <CardHeader className="p-0">
                <CardTitle>Aktivität</CardTitle>
                <CardDescription>So aktiv war dein Team im ausgewählten Zeitraum.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {kpiData.map(kpi => {
                    const Icon = kpi.icon;
                    return(
                    <Card key={kpi.title}>
                        <CardHeader className="pb-2 flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                            <Icon className={cn('w-4 h-4', getKpiColor(kpi.value, kpi.target, kpi.invertColor))} />
                        </CardHeader>
                        <CardContent>
                            <p className="text-3xl font-bold">{kpi.value}</p>
                        </CardContent>
                    </Card>
                )})}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader><CardTitle className="text-base">Anrufe über Zeit</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground italic text-center p-8">Chart für Anrufe über Zeit</p></CardContent>
                </Card>
                 <Card>
                    <CardHeader><CardTitle className="text-base">Termine über Zeit</CardTitle></CardHeader>
                    <CardContent><p className="text-muted-foreground italic text-center p-8">Chart für Termine über Zeit</p></CardContent>
                </Card>
            </div>
             <Card>
                <CardHeader><CardTitle className="text-base">Wer macht was?</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Zuständig</TableHead><TableHead>Anrufe</TableHead><TableHead>Termine</TableHead><TableHead>Follow-ups (erledigt)</TableHead><TableHead>Follow-ups (überfällig)</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {aktivitaet.ranking.map(r => (
                                <TableRow key={r.assignee}>
                                    <TableCell className="font-medium">{r.assignee}</TableCell>
                                    <TableCell>{r.calls}</TableCell>
                                    <TableCell>{r.meetings}</TableCell>
                                    <TableCell>{r.followupsDone}</TableCell>
                                    <TableCell className={r.followupsOverdue > 0 ? 'text-rose-400 font-bold' : ''}>{r.followupsOverdue}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                 <CardFooter className="gap-2">
                     <Button variant="outline" size="sm">Call-Queue starten (Überfällige)</Button>
                     <Button variant="outline" size="sm">Überfällige Follow-ups verteilen</Button>
                     <Button variant="outline" size="sm">KI: Tagesplan erstellen</Button>
                 </CardFooter>
            </Card>
         </div>
    )
};
const AbschluesseTab = () => {
    const { abschluesse } = qSalesReportingData;
    const kpiData = [
        { title: 'Gewonnene Deals', value: abschluesse.wonDeals.count, icon: CheckCircle2, color: 'emerald' },
        { title: 'Verlorene Deals', value: abschluesse.lostDeals.count, icon: XCircle, color: 'rose' },
        { title: 'Win-Rate', value: `${abschluesse.winRate}%`, icon: Percent, color: 'blue' },
        { title: 'Ø Deal-Wert', value: `€${(abschluesse.avgDealValue/1000).toFixed(1)}k`, icon: DollarSign, color: 'emerald' },
        { title: 'Ø Abschlussdauer', value: `${abschluesse.avgCycleTime} Tage`, icon: Clock, color: 'purple' },
    ];
    return (
        <div className="space-y-8">
            <CardHeader className="p-0">
                <CardTitle>Abschlüsse</CardTitle>
                <CardDescription>Gewonnene und verlorene Deals im Zeitraum – inkl. Deal-Wert und Dauer.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {kpiData.map(kpi => {
                    const Icon = kpi.icon;
                    return(
                    <Card key={kpi.title}>
                        <CardHeader className="pb-2 flex-row items-center justify-between">
                            <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                            <Icon className={cn('w-4 h-4', `text-${kpi.color}-400`)} />
                        </CardHeader>
                        <CardContent><p className="text-3xl font-bold">{kpi.value}</p></CardContent>
                    </Card>
                )})}
            </div>
             <Card>
                <CardHeader><CardTitle>Deals im Zeitraum</CardTitle></CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader><TableRow><TableHead>Deal</TableHead><TableHead>Wert</TableHead><TableHead>Zuständig</TableHead><TableHead>Status</TableHead><TableHead>Dauer</TableHead></TableRow></TableHeader>
                         <TableBody>
                            {abschluesse.deals.map(d => (
                                <TableRow key={d.id}>
                                    <TableCell className="font-medium">{d.name}</TableCell>
                                    <TableCell>€{d.value.toLocaleString('de-DE')}</TableCell>
                                    <TableCell>{d.assignee}</TableCell>
                                    <TableCell><Badge variant={d.status === 'Won' ? 'default' : 'destructive'} className={d.status === 'Won' ? 'bg-emerald-500/20 text-emerald-400' : ''}>{d.status}</Badge></TableCell>
                                    <TableCell>{d.durationDays} Tage</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <Card className="bg-blue-500/10 border-blue-500/20 p-4">
                <h4 className="text-sm font-bold text-blue-300">KI: Top Gründe für Gewinne</h4>
                <p className="text-xs text-blue-200 mt-1">Schnelle Reaktionszeit und klare Bedarfsanalyse im Erstgespräch.</p>
                <h4 className="text-sm font-bold text-blue-300 mt-3">KI: Top Gründe für Verluste</h4>
                <p className="text-xs text-blue-200 mt-1">Preis wurde zu spät im Prozess thematisiert.</p>
            </Card>
        </div>
    )
};

const RisikoTab = () => {
    const { risiko } = qSalesReportingData;
    const kpiData = [
        { title: 'At-Risk Deals', value: risiko.atRiskDeals.length, icon: Flame, color: 'rose' },
        { title: 'Warning Deals', value: risiko.warningDeals.length, icon: AlertTriangle, color: 'amber' },
        { title: 'Überfällige Aktionen', value: risiko.overdueActions, icon: Clock, color: 'amber' },
        { title: 'Keine Reaktion (>7 T.)', value: risiko.noResponse, icon: UserX, color: 'rose' },
    ];
    return (
         <div className="space-y-8">
            <CardHeader className="p-0">
                <CardTitle>Risiko</CardTitle>
                <CardDescription>Deals, die gerade drohen zu kippen – inklusive klarer Gründe und Sofort-Aktionen.</CardDescription>
            </CardHeader>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {kpiData.map(kpi => {
                     const Icon = kpi.icon;
                    return (
                        <Card key={kpi.title}>
                            <CardHeader className="pb-2 flex-row items-center justify-between">
                                <CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle>
                                <Icon className={cn('w-4 h-4', `text-${kpi.color}-400`)} />
                            </CardHeader>
                            <CardContent><p className="text-3xl font-bold">{kpi.value}</p></CardContent>
                        </Card>
                    )
                })}
            </div>
             <Card>
                <CardHeader><CardTitle>Risiko-Liste</CardTitle></CardHeader>
                <CardContent className="space-y-3">
                    {risiko.atRiskDeals.map(d => (
                         <Card key={d.id} className="p-4 border-l-4 border-rose-500 bg-rose-500/5">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-foreground">{d.name}</p>
                                    <p className="text-sm text-muted-foreground">€{d.dealValue.toLocaleString('de-DE')}</p>
                                </div>
                                <div className="text-right">
                                     <Badge variant="destructive">At Risk</Badge>
                                     <p className="text-xs text-rose-400 mt-1">{d.health.reasons.join(', ')}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between mt-3 pt-3 border-t border-rose-500/20">
                                <p className="text-sm"><strong className="text-muted-foreground">Nächste Aktion:</strong> {d.nextAction}</p>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline">Task: Jetzt anrufen</Button>
                                    <Button size="sm" variant="outline">Follow-up Draft</Button>
                                </div>
                            </div>
                         </Card>
                    ))}
                </CardContent>
                 <CardFooter>
                     <Button><BrainCircuit className="w-4 h-4 mr-2"/>KI: Rettungsplan für Top 10 erstellen</Button>
                 </CardFooter>
            </Card>
        </div>
    )
};
const LearningsTab = () => {
    const { learnings } = qSalesReportingData;
    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Top Verlustgründe</CardTitle>
                </CardHeader>
                <CardContent>
                     <ChartContainer config={{}} className="h-64">
                         <BarChart data={learnings.lostReasonData} layout="vertical" margin={{left: 20}}>
                             <XAxis type="number" hide />
                             <YAxis dataKey="reason" type="category" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--foreground))' }}/>
                             <Tooltip content={<ChartTooltipContent />} />
                             <Bar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                         </BarChart>
                     </ChartContainer>
                </CardContent>
            </Card>
             <Card className="bg-blue-500/10 border-blue-500/20">
                <CardHeader>
                    <CardTitle className="text-blue-300 text-base flex items-center gap-2"><BrainCircuit/> KI-Zusammenfassung</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-blue-200">{learnings.aiSummary}</p>
                </CardContent>
            </Card>
        </div>
    );
};


const ReportingView = () => {
    return (
        <Tabs defaultValue="uebersicht">
            <div className="flex justify-between items-center mb-6">
                <TabsList>
                    <TabsTrigger value="uebersicht">Übersicht</TabsTrigger>
                    <TabsTrigger value="aktivitaet">Aktivität</TabsTrigger>
                    <TabsTrigger value="abschluesse">Abschlüsse</TabsTrigger>
                    <TabsTrigger value="risiko">Risiko</TabsTrigger>
                    <TabsTrigger value="learnings">Learnings</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <Select defaultValue="30d">
                        <SelectTrigger className="w-[180px] bg-input">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="today">Heute</SelectItem>
                            <SelectItem value="7d">Diese Woche</SelectItem>
                            <SelectItem value="30d">Dieser Monat</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <TabsContent value="uebersicht"><UebersichtTab /></TabsContent>
            <TabsContent value="aktivitaet"><AktivitaetTab /></TabsContent>
            <TabsContent value="abschluesse"><AbschluesseTab /></TabsContent>
            <TabsContent value="risiko"><RisikoTab /></TabsContent>
            <TabsContent value="learnings"><LearningsTab /></TabsContent>
        </Tabs>
    )
}

export default function QhubPage() {
  const [activeModule, setActiveModule] = useState(modules[0].name);
  const pathname = usePathname();
  const router = useRouter();

  // Simulate the currently logged-in user. In a real app, this would come from an auth context.
  const [currentUserId, setCurrentUserId] = useState('dr-mueller');
  const currentUser = useMemo(() => kpiMitarbeiter.find(m => m.id === currentUserId), [currentUserId]);
  
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    const urlParams = new URLSearchParams(window.location.search);
    const moduleParam = urlParams.get('module');
    if (moduleParam && modules.some(m => m.name === moduleParam)) {
        setActiveModule(moduleParam);
    }
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/q-space/chat')) {
      if (activeModule !== 'Q-Chat') {
          setActiveModule('Q-Chat');
      }
    }
  }, [pathname, activeModule]);

  // DERIVED DATA BASED ON USER ROLE
  const filteredKpiMitarbeiter = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'exec') return kpiMitarbeiter;
    if (currentUser.role === 'dept_head') return kpiMitarbeiter.filter(m => m.abteilung === currentUser.abteilung);
    if (currentUser.role === 'team_lead') return kpiMitarbeiter.filter(m => m.team === currentUser.team);
    return kpiMitarbeiter.filter(m => m.id === currentUser.id);
  }, [currentUser]);

  const filteredChatThreads = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'exec') return chatThreads;
    return chatThreads.filter(t => t.participants.includes(currentUser.id));
  }, [currentUser]);

  const tasksWithDept = useMemo(() => mockTasks.map(t => {
      const owner = kpiMitarbeiter.find(m => m.name === t.owner);
      return {...t, deptId: owner?.abteilung, ownerId: owner?.id };
  }), []);

  const filteredTasks = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'exec') return tasksWithDept;
    return tasksWithDept.filter(t => t.deptId === currentUser.abteilung || t.ownerId === currentUser.id);
  }, [currentUser, tasksWithDept]);

  const projectsWithDept = useMemo(() => mockProjects.map(p => {
    const owner = kpiMitarbeiter.find(m => m.name === p.owner);
    return {...p, deptId: owner?.abteilung, ownerId: owner?.id };
  }), []);

  const filteredProjects = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'exec') return projectsWithDept;
    return projectsWithDept.filter(p => p.deptId === currentUser.abteilung || p.ownerId === currentUser.id);
  }, [currentUser, projectsWithDept]);

  const filteredSops = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'exec') return mockSops;
    return mockSops.filter(s => s.deptId === currentUser.abteilung);
  }, [currentUser]);

  const filteredDocs = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'exec') return allMockDocs;
    return allMockDocs.filter(doc => doc.deptId === currentUser.abteilung || doc.ownerUserId === currentUser.id);
  }, [currentUser]);
  
  const filteredFolders = useMemo(() => {
    if (!currentUser) return [];
    if (currentUser.role === 'exec') return docFolders;
    return docFolders.filter(folder => folder.deptId === currentUser.abteilung || folder.deptId === 'Geschäftsführung');
  }, [currentUser]);

  const totalUnread = chatThreads.reduce(
      (sum, t) => sum + (t.unreadCount || 0),
      0
    );

  if (!currentUser) {
    return <div className="p-8">Benutzer wird geladen oder konnte nicht gefunden werden...</div>;
  }

  const renderModule = () => {
      switch (activeModule) {
          case 'Dashboard': return <DashboardView currentUser={currentUser} filteredKpiMitarbeiter={kpiMitarbeiter} filteredChatThreads={chatThreads} filteredTasks={mockTasks} />;
          // The components for these views are not fully defined in the provided file, so using a generic one.
          // In a real scenario, each would have its own component.
          case 'Termine': return <GenericView title="Termine" />;
          case 'Aufgaben': return <GenericView title="Aufgaben" />;
          case 'Kontakte': return <ContactsView />;
          case 'Firmen': return <CompaniesView />;
          case 'Deals': return <DealsView />;
          case 'Pipeline': return <PipelineView />;
          case 'Aktivitäten': return <GenericView title="Aktivitäten" />;
          case 'Notizen': return <GenericView title="Notizen" />;
          case 'E-Mails': return <GenericView title="E-Mails" />;
          case 'Anrufe': return <GenericView title="Anrufe" />;
          case 'Reports': return <ReportingView />;
          default: return <GenericView title={activeModule} />;
      }
  };

  const handleModuleClick = (moduleName: string) => {
    if (moduleName === 'Q-Chat') {
        router.push('/q-space/chat');
    } else {
        if (pathname.startsWith('/q-space/chat')) {
            router.push('/q-space');
        }
        setActiveModule(moduleName);
    }
  };
  
  const GenericView = ({ title }: { title: string }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground italic text-center py-12">
          Ansicht für "{title}" wird hier angezeigt.
        </p>
      </CardContent>
    </Card>
  );

  return (
    <>
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
        {/* Left Sidebar for Modules */}
        <aside className="w-56 border-r border-border pr-4 space-y-1">
            <p className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">Q-Hub</p>
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
                 <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">
                        Q-Hub
                    </h1>
                    <p className="text-muted-foreground">
                        Zentrale für Kunden, Vertrieb & Service
                    </p>
                </div>
                 {isClient && <div className="flex items-center gap-3">
                    <div className="relative w-96">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input type="text" placeholder="Kontakte, Firmen, Deals durchsuchen..." className="pl-9 bg-input" />
                    </div>
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

