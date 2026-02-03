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
  CalendarDays,
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
  Sparkles,
  FilePen,
  Link as LinkIcon,
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
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { format, formatDistanceToNow, isToday, isTomorrow, isFuture } from 'date-fns';
import { de } from 'date-fns/locale';

// --- Formatting Utils ---
const formatZahl = (val: number | string) => {
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g, "")) : val;
  if (isNaN(num)) return val;
  return new Intl.NumberFormat('de-DE').format(num);
};

const formatProzent = (val: number | string) => {
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g, "")) : val;
  if (isNaN(num)) return val;
  return new Intl.NumberFormat('de-DE', { style: 'percent', minimumFractionDigits: 0 }).format(num / 100);
};

const formatWaehrung = (val: number | string) => {
  const num = typeof val === 'string' ? parseFloat(val.replace(/[^0-9.-]+/g, "")) : val;
  if (isNaN(num)) return val;
  return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(num);
};

const parseValue = (val: any) => {
  if (typeof val === 'string' && val.includes('%')) return formatProzent(val);
  if (typeof val === 'string' && val.includes('€')) return formatWaehrung(val);
  if (typeof val === 'string' && !isNaN(Number(val))) return formatZahl(val);
  return val;
};

// --- Sub-Views ---

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

    return (
        <div className="space-y-8" id="qhub-reports">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {geschaeftsueberblickData.map(item => (
                            <Card key={item.title}>
                                <CardHeader>
                                    <CardTitle className="text-base">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-4xl font-bold">{parseValue(item.value)}</p>
                                    <p className="text-xs text-muted-foreground">{item.subtitle}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {handlungsbedarfData.map(item => {
                            const Icon = item.icon;
                            return (
                                <Card key={item.title} className={cn("p-4 bg-card/50 border-l-4", item.color === 'rose' ? 'border-rose-500/50' : item.color === 'amber' ? 'border-amber-500/50' : item.color === 'blue' ? 'border-blue-500/50' : 'border-emerald-500/50')}>
                                    <div className="flex items-center gap-4">
                                        <Icon className={cn("h-6 w-6", item.color === 'rose' ? 'text-rose-400' : item.color === 'amber' ? 'text-amber-400' : item.color === 'blue' ? 'text-blue-400' : 'text-emerald-400')} />
                                        <div>
                                            <p className="text-2xl font-bold">{item.value}</p>
                                            <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                                        </div>
                                    </div>
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
                            <p className="text-sm">Deal 'Data Corp' stagniert, da seit 5 Tagen keine Aktivität verzeichnet wurde.</p>
                        </CardContent>
                        <CardFooter>
                            <Button asChild variant="outline" size="sm">
                                <Link href="/dashboard/system-alerts/esc-deal-stagnation">Details</Link>
                            </Button>
                        </CardFooter>
                    </Card>
                    <Card className="bg-blue-950/50 border-blue-500/20">
                        <CardHeader>
                            <CardTitle className="text-base text-blue-300 flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5"/> KI-Tagesfokus
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {kiTagesfokus.slice(0, 3).map((item, index) => (
                                <div key={index} className="flex items-start gap-3 p-2 rounded-lg hover:bg-blue-500/10">
                                    <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                                    <p className="text-sm font-bold text-white line-clamp-1">{item.title}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader><CardTitle>Vertrieb – Status</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {vertriebsKpiData.map(kpi => (
                             <Card key={kpi.title} className="p-4 bg-muted/50">
                                <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                                <p className="text-3xl font-bold">{parseValue(kpi.value)}</p>
                             </Card>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

const TermineView = () => {
    const bookings = getDynamicQalenderBookings().map(b => ({
        ...b,
        startDate: new Date(b.startAt)
    })).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    const todayBookings = bookings.filter(b => isToday(b.startDate));
    const customerBookings = bookings.filter(b => b.role === 'Interessent' || b.role === 'Kunde');
    const nextBooking = bookings.find(b => (isFuture(b.startDate) || isToday(b.startDate)) && b.startDate >= new Date());

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 px-1">Tagesüberblick</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="p-5 flex flex-col justify-between overflow-hidden">
                            <p className="text-xs font-bold text-muted-foreground uppercase truncate">Termine heute</p>
                            <p className="text-4xl font-bold text-foreground mt-2">{todayBookings.length}</p>
                        </Card>
                        <Card className="p-5 flex flex-col justify-between overflow-hidden">
                            <p className="text-xs font-bold text-muted-foreground uppercase truncate">Nächster Termin</p>
                            <div className="mt-2">
                                {nextBooking ? (
                                    <>
                                        <p className="text-2xl font-bold text-primary">{format(nextBooking.startDate, 'HH:mm')} Uhr</p>
                                        <p className="text-xs text-muted-foreground font-medium truncate mt-1">{nextBooking.guestName}</p>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic mt-2">Keine Termine</p>
                                )}
                            </div>
                        </Card>
                        <Card className="p-5 flex flex-col justify-between overflow-hidden">
                            <p className="text-xs font-bold text-muted-foreground uppercase truncate">Termine mit Kunden</p>
                            <p className="text-4xl font-bold text-emerald-400 mt-2">{customerBookings.length}</p>
                        </Card>
                    </div>
                </div>
                
                <div className="lg:col-span-4">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 px-1">KI-Hinweise</h3>
                    <Card className="bg-blue-500/5 border-blue-500/20 h-[calc(100%-2.5rem)] flex flex-col">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-blue-400"/> KI-Assistent
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 flex-1 overflow-auto">
                            <div className="space-y-4 text-xs">
                                <div className="space-y-2">
                                    <p className="font-bold text-blue-200 flex items-center gap-1.5"><Info className="w-3.5 h-3.5"/> Heute wichtig</p>
                                    <p className="text-blue-300/90 leading-relaxed">
                                        {nextBooking ? `Vorbereitung für ${nextBooking.guestName}: Letzter Kontakt vor 14 Tagen.` : 'Keine kritischen Fristen heute.'}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground px-1">Nächste Termine</h3>
                <div className="grid grid-cols-1 gap-3">
                    {bookings.map(b => (
                        <Card key={b.bookingId} className={cn("p-4 hover:border-primary/40 transition-all", isToday(b.startDate) && "border-l-4 border-l-primary")}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="text-center min-w-[80px] p-2 bg-muted rounded-lg">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground">{format(b.startDate, 'EEE', {locale: de})}</p>
                                        <p className="text-lg font-bold">{format(b.startDate, 'dd.MM.')}</p>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground">{b.eventTypeName}</h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                            <Badge variant="outline" className="text-[10px]">{b.role}</Badge>
                                            <span>{format(b.startDate, 'HH:mm')} Uhr</span>
                                            <span>•</span>
                                            <span>{b.guestName}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                    <Button variant="outline" size="sm">Details</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

const TasksListView = () => {
    const [isDoneTasksOpen, setIsDoneTasksOpen] = useState(false);
    
    // Derived task data
    const openTasks = mockTasks.filter(t => t.status !== 'Erledigt');
    const doneTasks = mockTasks.filter(t => t.status === 'Erledigt');
    
    const tasksHeute = openTasks.filter(t => t.due === 'Heute').length;
    const tasksUeberfaellig = openTasks.filter(t => t.status === 'Überfällig' || t.due === 'Sofort').length;
    const tasksHighPrio = openTasks.filter(t => t.prio === 'Hoch').length;
    const tasksInArbeit = openTasks.filter(t => t.status === 'In Arbeit').length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            {/* Sektion 1: Tagesüberblick */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col justify-between overflow-hidden">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aufgaben heute</p>
                    <p className={cn("text-4xl font-bold mt-2", tasksHeute > 0 ? "text-primary" : "text-muted-foreground")}>
                        {tasksHeute || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden border-l-4 border-l-rose-500/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Überfällig</p>
                    <p className={cn("text-4xl font-bold mt-2", tasksUeberfaellig > 0 ? "text-rose-400" : "text-muted-foreground")}>
                        {tasksUeberfaellig || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Hohe Priorität</p>
                    <p className={cn("text-4xl font-bold mt-2", tasksHighPrio > 0 ? "text-amber-400" : "text-muted-foreground")}>
                        {tasksHighPrio || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">In Arbeit</p>
                    <p className={cn("text-4xl font-bold mt-2", tasksInArbeit > 0 ? "text-blue-400" : "text-muted-foreground")}>
                        {tasksInArbeit || 'Keine'}
                    </p>
                </Card>
            </div>

            {/* Sektion 2: KI-Hinweise */}
            <Card className="bg-blue-500/5 border-blue-500/20">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400"/> KI-Hinweise zu Aufgaben
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-foreground">Heute priorisieren</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {tasksUeberfaellig > 0 
                                    ? `Bearbeite zuerst die ${tasksUeberfaellig} überfälligen Aufgaben, um Prozess-Staus zu vermeiden.`
                                    : "Fokussiere dich heute auf die Aufgaben mit hoher Priorität für den Projekterfolg."}
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-foreground">Blockaden erkannt</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                2 Aufgaben warten seit >3 Tagen auf Rückmeldung. Prüfung der Abhängigkeiten empfohlen.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-foreground">Empfohlene Aktion</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-7 text-[10px]">Aufgabe öffnen</Button>
                                <Button size="sm" variant="outline" className="h-7 text-[10px]">Notiz hinzufügen</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Sektion 3: Offene Aufgaben */}
            <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground px-1">Offene Aufgaben</h3>
                <div className="grid grid-cols-1 gap-3">
                    {openTasks.map(t => (
                        <Card key={t.id} className={cn(
                            "p-4 hover:border-primary/40 transition-all overflow-hidden",
                            (t.status === 'Überfällig' || t.due === 'Sofort') && "border-l-4 border-l-rose-500/50",
                            t.due === 'Heute' && "border-l-4 border-l-primary/50"
                        )}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className={cn(
                                            "text-[10px] font-bold uppercase",
                                            t.prio === 'Hoch' ? "border-rose-500/50 text-rose-400" : "border-muted text-muted-foreground"
                                        )}>
                                            {t.prio}
                                        </Badge>
                                        <h4 className="font-bold text-foreground truncate">{t.title}</h4>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5"/> {t.owner}</span>
                                        <span className={cn("font-medium", (t.status === 'Überfällig' || t.due === 'Sofort') && "text-rose-400")}>
                                            <Clock className="w-3.5 h-3.5 inline mr-1"/> {t.due}
                                        </span>
                                        <span className="flex items-center gap-1.5"><Briefcase className="w-3.5 h-3.5"/> Q-Hub</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Notiz hinzufügen</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Button variant="outline" size="sm" className="h-8">Erledigt</Button>
                                    <Button variant="default" size="sm" className="h-8">Öffnen</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {/* Sektion 4: Erledigte Aufgaben */}
            {doneTasks.length > 0 && (
                <Collapsible open={isDoneTasksOpen} onOpenChange={setIsDoneTasksOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between hover:bg-transparent px-1">
                            <span className="text-sm font-bold text-muted-foreground flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4"/> Erledigte Aufgaben ({doneTasks.length})
                            </span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isDoneTasksOpen && "rotate-180")}/>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-3">
                        {doneTasks.map(t => (
                            <Card key={t.id} className="p-4 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all overflow-hidden">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-foreground truncate line-through">{t.title}</h4>
                                        <p className="text-[10px] text-muted-foreground mt-1">Erledigt am {format(new Date(), 'dd.MM.yyyy')}</p>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase font-black text-[9px]">Erledigt</Badge>
                                </div>
                            </Card>
                        ))}
                    </CollapsibleContent>
                </Collapsible>
            )}
        </div>
    )
}

const ContactsView = () => {
    const router = useRouter();
    return (
        <Card id="qhub-reports">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Kontakte</CardTitle>
                    <Button><Plus className="mr-2 h-4 w-4" /> Kontakt erstellen</Button>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Firma</TableHead>
                            <TableHead>E-Mail</TableHead>
                            <TableHead>Zuständig</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {mockContacts.map(c => (
                            <TableRow key={c.id} onClick={() => router.push(`/qhub/contacts/${c.id}`)} className="cursor-pointer hover:bg-muted/50">
                                <TableCell className="font-medium">{c.name}</TableCell>
                                <TableCell>{c.company}</TableCell>
                                <TableCell>{c.email}</TableCell>
                                <TableCell>{c.owner}</TableCell>
                                <TableCell><Badge variant={c.status === 'Aktiv' ? 'default' : 'secondary'}>{c.status}</Badge></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
};

const CompaniesView = () => (
    <Card id="qhub-reports">
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Firmen</CardTitle>
                <Button><Plus className="mr-2 h-4 w-4" /> Firma erstellen</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Firmenname</TableHead>
                        <TableHead>Branche</TableHead>
                        <TableHead>Zuständig</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCompanies.map(c => (
                        <TableRow key={c.id}>
                            <TableCell className="font-semibold">{c.name}</TableCell>
                            <TableCell>{c.industry}</TableCell>
                            <TableCell>{c.owner}</TableCell>
                            <TableCell><Badge variant={c.status === 'Aktiv' ? 'default' : 'secondary'}>{c.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const DealsView = () => (
    <Card id="qhub-reports">
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Deals</CardTitle>
                <Button><Plus className="mr-2 h-4 w-4" /> Deal erstellen</Button>
            </div>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Deal-Name</TableHead>
                        <TableHead>Phase</TableHead>
                        <TableHead>Wert</TableHead>
                        <TableHead>Zuständig</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockDeals.filter(d => d.stage !== 'Gewonnen' && d.stage !== 'Verloren').map(d => (
                        <TableRow key={d.id}>
                            <TableCell className="font-semibold">{d.name}</TableCell>
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
    <div className="space-y-4" id="qhub-reports">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 items-start">
            {pipelineStages.map(phase => (
                <div key={phase} className="bg-muted/50 rounded-xl flex flex-col min-h-[400px]">
                    <div className="p-4 border-b border-border">
                        <h3 className="text-sm font-bold truncate">{phase}</h3>
                    </div>
                    <div className="p-3 space-y-3">
                        {mockDeals.filter(d => d.stage === phase).map(deal => (
                            <Card key={deal.id} className="p-3 shadow-sm text-xs">
                                <p className="font-bold truncate">{deal.name}</p>
                                <p className="text-muted-foreground mt-1">{deal.value}</p>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

const ActivitiesListView = () => (
    <Card id="qhub-reports">
        <CardHeader><CardTitle>Aktivitäten</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Typ</TableHead>
                        <TableHead>Beschreibung</TableHead>
                        <TableHead>Datum</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {allActivities.map(a => (
                        <TableRow key={a.id}>
                            <TableCell><Badge variant="secondary">{a.type}</Badge></TableCell>
                            <TableCell className="font-medium">{a.description}</TableCell>
                            <TableCell className="text-xs">{format(new Date(a.dueDate), "dd.MM.yyyy")}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const NotesListView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="qhub-reports">
        {mockNotes.map(note => (
            <Card key={note.id}>
                <CardHeader className="pb-2">
                    <CardTitle className="text-base">{note.title}</CardTitle>
                    <CardDescription>{note.contextName || 'Allgemein'}</CardDescription>
                </CardHeader>
                <CardContent><p className="text-sm line-clamp-3">{note.content}</p></CardContent>
            </Card>
        ))}
    </div>
);

const EmailsListView = () => (
    <Card id="qhub-reports">
        <CardHeader><CardTitle>E-Mails</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Betreff</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockEmails.map(e => (
                        <TableRow key={e.id}>
                            <TableCell className="font-medium max-w-xs truncate">{e.subject}</TableCell>
                            <TableCell><Badge variant="outline">{e.status}</Badge></TableCell>
                            <TableCell className="text-xs">{formatDistanceToNow(new Date(e.createdAt), { addSuffix: true, locale: de })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const CallsListView = () => (
    <Card id="qhub-reports">
        <CardHeader><CardTitle>Anrufe</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Typ</TableHead>
                        <TableHead>Kontakt</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Datum</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {mockCalls.map(c => (
                        <TableRow key={c.id}>
                            <TableCell className="flex items-center gap-2">{c.type}</TableCell>
                            <TableCell>{c.contactName}</TableCell>
                            <TableCell><Badge variant="outline">{c.status}</Badge></TableCell>
                            <TableCell className="text-xs">{formatDistanceToNow(new Date(c.createdAt), { addSuffix: true, locale: de })}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const UebersichtTab = () => {
    const { uebersicht } = qSalesReportingData;
    const IconMap: { [key: string]: React.ElementType } = { 
      Phone, Calendar: CalendarDays, Handshake, Percent, DollarSign, AlertTriangle 
    };
  
    return (
      <div className="space-y-8" id="qhub-reports">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {uebersicht.kpis.map(kpi => {
            const Icon = IconMap[kpi.icon as string] || Activity;
            return (
              <Card key={kpi.title} className="overflow-hidden">
                <CardHeader className="pb-2 p-4 flex flex-row items-center justify-between space-y-0 gap-2">
                  <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground truncate flex-1">
                    {kpi.title}
                  </CardTitle>
                  <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                </CardHeader>
                <CardContent className="p-4 pt-0">
                  <p className="text-2xl font-bold text-foreground font-mono truncate">
                    {parseValue(kpi.value)}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
        
        <Card className="overflow-hidden">
            <CardHeader>
                <CardTitle>Sales Flow</CardTitle>
                <CardDescription>Konvertierungsraten zwischen den Vertriebsphasen.</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-around overflow-x-auto p-6 gap-6 no-scrollbar">
                {uebersicht.salesFlow.map((step, index) => (
                    <React.Fragment key={step.stage}>
                        <div className="text-center shrink-0 min-w-[80px]">
                            <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{step.stage}</p>
                            <p className="text-2xl font-bold font-mono">{formatZahl(step.value)}</p>
                        </div>
                        {index < uebersicht.salesFlow.length - 1 && (
                            <div className="text-center shrink-0">
                                <ChevronsRight className="w-6 h-6 text-muted-foreground/30 mx-auto"/>
                                <p className="text-emerald-400 font-bold mt-1 text-xs">
                                  {formatProzent(parseFloat(uebersicht.salesFlow[index+1].conversion || '0'))}
                                </p>
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
        { title: 'Termine', value: aktivitaet.meetings, target: 10, icon: CalendarDays, color: 'purple' },
        { title: 'Überfällige Follow-ups', value: aktivitaet.overdueFollowups, target: 5, icon: AlertTriangle, color: 'amber', invertColor: true },
    ];

    const getKpiColor = (value: number, target: number, invert: boolean = false) => {
        const performance = value / target;
        if (invert) return value === 0 ? 'text-emerald-400' : value < target ? 'text-amber-400' : 'text-rose-400';
        return performance >= 1 ? 'text-emerald-400' : performance >= 0.8 ? 'text-amber-400' : 'text-rose-400';
    }

    return (
         <div className="space-y-8" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {kpiData.map(kpi => {
                    const Icon = kpi.icon;
                    return(
                    <Card key={kpi.title}>
                        <CardHeader className="p-4 pb-2 flex-row items-center justify-between gap-2 space-y-0">
                            <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground truncate">{kpi.title}</CardTitle>
                            <Icon className={cn('w-3.5 h-3.5 shrink-0', getKpiColor(kpi.value, kpi.target, kpi.invertColor))} />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <p className="text-3xl font-bold font-mono">{formatZahl(kpi.value)}</p>
                        </CardContent>
                    </Card>
                )})}
            </div>
             <Card>
                <CardHeader><CardTitle className="text-base">Zuständigkeiten</CardTitle></CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <Table>
                        <TableHeader><TableRow><TableHead>Zuständig</TableHead><TableHead className="text-right">Anrufe</TableHead><TableHead className="text-right">Termine</TableHead><TableHead className="text-right">Überfällig</TableHead></TableRow></TableHeader>
                        <TableBody>
                            {aktivitaet.ranking.map(r => (
                                <TableRow key={r.assignee}>
                                    <TableCell className="font-bold">{r.assignee}</TableCell>
                                    <TableCell className="text-right font-mono">{formatZahl(r.calls)}</TableCell>
                                    <TableCell className="text-right font-mono">{formatZahl(r.meetings)}</TableCell>
                                    <TableCell className={cn("text-right font-mono font-bold", r.followupsOverdue > 0 ? 'text-rose-400' : 'text-emerald-400')}>{formatZahl(r.followupsOverdue)}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
         </div>
    )
};

const AbschluesseTab = () => {
    const { abschluesse } = qSalesReportingData;
    const kpiData = [
        { title: 'Gewonnen', value: abschluesse.wonDeals.count, icon: CheckCircle2, color: 'emerald' },
        { title: 'Verloren', value: abschluesse.lostDeals.count, icon: XCircle, color: 'rose' },
        { title: 'Win-Rate', value: abschluesse.winRate, icon: Percent, color: 'blue', isPercent: true },
        { title: 'Ø Deal-Wert', value: abschluesse.avgDealValue, icon: DollarSign, color: 'emerald', isCurrency: true },
        { title: 'Ø Dauer', value: abschluesse.avgCycleTime, icon: Clock, color: 'purple', suffix: ' Tage' },
    ];
    return (
        <div className="space-y-8" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                {kpiData.map(kpi => {
                    const Icon = kpi.icon;
                    return(
                    <Card key={kpi.title} className="overflow-hidden">
                        <CardHeader className="p-4 pb-2 flex-row items-center justify-between space-y-0 gap-2">
                            <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground truncate">{kpi.title}</CardTitle>
                            <Icon className={cn('w-3.5 h-3.5 shrink-0', `text-${kpi.color}-400`)} />
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                          <p className="text-2xl font-bold font-mono truncate">
                            {kpi.isCurrency ? formatWaehrung(kpi.value) : kpi.isPercent ? formatProzent(kpi.value) : formatZahl(kpi.value)}
                            {kpi.suffix}
                          </p>
                        </CardContent>
                    </Card>
                )})}
            </div>
             <Card>
                <CardHeader><CardTitle>Laufende Deals</CardTitle></CardHeader>
                <CardContent className="p-0 overflow-x-auto">
                    <Table>
                        <TableHeader><TableRow><TableHead>Deal</TableHead><TableHead className="text-right">Wert</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                         <TableBody>
                            {abschluesse.deals.map(d => (
                                <TableRow key={d.id}>
                                    <TableCell className="font-bold">{d.name}</TableCell>
                                    <TableCell className="text-right font-mono">{formatWaehrung(d.value)}</TableCell>
                                    <TableCell><Badge variant={d.status === 'Won' ? 'default' : 'destructive'}>{d.status}</Badge></TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
};

const RisikoTab = () => {
    const { risiko } = qSalesReportingData;
    const kpiData = [
        { title: 'At-Risk Deals', value: risiko.atRiskDeals.length, icon: Flame, color: 'rose' },
        { title: 'Warning Deals', value: risiko.warningDeals.length, icon: AlertTriangle, color: 'amber' },
        { title: 'Überfällig', value: risiko.overdueActions, icon: Clock, color: 'amber' },
        { title: 'Keine Reaktion', value: risiko.noResponse, icon: UserX, color: 'rose' },
    ];
    return (
         <div className="space-y-8" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {kpiData.map(kpi => {
                     const Icon = kpi.icon;
                    return (
                        <Card key={kpi.title} className="overflow-hidden">
                            <CardHeader className="p-4 pb-2 flex-row items-center justify-between space-y-0 gap-2">
                                <CardTitle className="text-[10px] font-bold uppercase text-muted-foreground truncate">{kpi.title}</CardTitle>
                                <Icon className={cn('w-3.5 h-3.5 shrink-0', `text-${kpi.color}-400`)} />
                            </CardHeader>
                            <CardContent className="p-4 pt-0">
                              <p className="text-3xl font-bold font-mono">{formatZahl(kpi.value)}</p>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>
             <Card>
                <CardHeader><CardTitle>Dringender Handlungsbedarf</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {risiko.atRiskDeals.map(d => (
                         <Card key={d.id} className="p-4 border-l-4 border-rose-500 bg-rose-500/5">
                            <div className="flex justify-between items-start gap-4">
                                <div className="min-w-0">
                                    <p className="font-bold truncate">{d.name}</p>
                                    <p className="text-sm font-mono text-muted-foreground">{formatWaehrung(d.dealValue)}</p>
                                </div>
                                <Badge variant="destructive">At Risk</Badge>
                            </div>
                         </Card>
                    ))}
                </CardContent>
            </Card>
        </div>
    )
};

const LearningsTab = () => {
    const { learnings } = qSalesReportingData;
    return (
        <div className="space-y-6" id="qhub-reports">
            <Card>
                <CardHeader><CardTitle>Top Verlustgründe</CardTitle></CardHeader>
                <CardContent className="h-64 flex items-center justify-center italic text-muted-foreground">Chart visualisiert Verlustgründe...</CardContent>
            </Card>
             <Card className="bg-blue-500/5 border-blue-500/10">
                <CardHeader>
                    <CardTitle className="text-blue-300 text-sm font-bold uppercase flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> KI-Zusammenfassung</CardTitle>
                </CardHeader>
                <CardContent><p className="text-blue-200/90 text-sm leading-relaxed">{learnings.aiSummary}</p></CardContent>
            </Card>
        </div>
    );
};

const ReportingView = () => (
    <Tabs defaultValue="uebersicht" className="w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
            <TabsList className="bg-muted/50 p-1">
                <TabsTrigger value="uebersicht">Übersicht</TabsTrigger>
                <TabsTrigger value="aktivitaet">Aktivität</TabsTrigger>
                <TabsTrigger value="abschluesse">Abschlüsse</TabsTrigger>
                <TabsTrigger value="risiko">Risiko</TabsTrigger>
                <TabsTrigger value="learnings">Learnings</TabsTrigger>
            </TabsList>
            <Select defaultValue="30d">
                <SelectTrigger className="w-full md:w-[180px] bg-input"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="today">Heute</SelectItem>
                    <SelectItem value="7d">Diese Woche</SelectItem>
                    <SelectItem value="30d">Dieser Monat</SelectItem>
                </SelectContent>
            </Select>
        </div>
        <TabsContent value="uebersicht"><UebersichtTab /></TabsContent>
        <TabsContent value="aktivitaet"><AktivitaetTab /></TabsContent>
        <TabsContent value="abschluesse"><AbschluesseTab /></TabsContent>
        <TabsContent value="risiko"><RisikoTab /></TabsContent>
        <TabsContent value="learnings"><LearningsTab /></TabsContent>
    </Tabs>
);

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

export default function QhubPage() {
  const [activeModule, setActiveModule] = useState(modules[0].name);
  const pathname = usePathname();
  const router = useRouter();

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

  if (!currentUser || !isClient) {
    return <div className="p-8">Wird geladen...</div>;
  }

  const renderModule = () => {
      switch (activeModule) {
          case 'Dashboard': return <DashboardView currentUser={currentUser} filteredKpiMitarbeiter={kpiMitarbeiter} filteredChatThreads={chatThreads} filteredTasks={mockTasks} />;
          case 'Termine': return <TermineView />;
          case 'Aufgaben': return <TasksListView />;
          case 'Kontakte': return <ContactsView />;
          case 'Firmen': return <CompaniesView />;
          case 'Deals': return <DealsView />;
          case 'Pipeline': return <PipelineView />;
          case 'Aktivitäten': return <ActivitiesListView />;
          case 'Notizen': return <NotesListView />;
          case 'E-Mails': return <EmailsListView />;
          case 'Anrufe': return <CallsListView />;
          case 'Reports': return <ReportingView />;
          default: return <DashboardView currentUser={currentUser} filteredKpiMitarbeiter={kpiMitarbeiter} filteredChatThreads={chatThreads} filteredTasks={mockTasks} />;
      }
  };

  return (
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
        <aside className="w-56 border-r border-border pr-4 space-y-1">
            <p className="px-3 pb-2 text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Q-Hub</p>
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

        <main className="flex-1 pl-6 space-y-6 overflow-hidden">
             <header className="flex justify-between items-center gap-4">
                 <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Q-Hub</h1>
                    <p className="text-muted-foreground text-sm">Zentrale für Kunden, Vertrieb & Service</p>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="relative hidden lg:block w-72">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input type="text" placeholder="Suchen..." className="pl-9 bg-input" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button><Plus className="mr-2 h-4 w-4" /> Erstellen</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem>Neuer Kontakt</DropdownMenuItem>
                            <DropdownMenuItem>Neue Firma</DropdownMenuItem>
                            <DropdownMenuItem>Neuer Deal</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="animate-in fade-in duration-300" id="qhub-reports">
                {renderModule()}
            </div>
        </main>
    </div>
  );
}
