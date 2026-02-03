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
  BarChart as BarChartIcon,
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
  MessageSquarePlus,
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
  Trash2,
  ArrowUpRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from "@/lib/utils";
import { kpiMitarbeiter, chatThreads, docFolders, mockDocs as allMockDocs, mockSops, mockProjects, mockTasks, mockContacts, mockDeals, pipelineStages, qSalesReportingData, getDynamicQalenderBookings, mockCompanies, allActivities, mockNotes as initialMockNotes, mockEmails, mockCalls, kiTagesfokus } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { Separator } from '@/components/ui/separator';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { format, formatDistanceToNow, isToday, isYesterday, isThisWeek } from 'date-fns';
import { de } from 'date-fns/locale';
import { 
    BarChart as RechartsBarChart, 
    Bar as RechartsBar, 
    XAxis as RechartsXAxis, 
    YAxis as RechartsYAxis, 
    Tooltip as RechartsTooltip,
    ResponsiveContainer
} from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';

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
                            <Card key={item.title} className="overflow-hidden min-w-0 max-w-full relative">
                                <CardHeader className="p-4 pb-2">
                                    <CardTitle className="text-base truncate">{item.title}</CardTitle>
                                </CardHeader>
                                <CardContent className="p-4 pt-0">
                                    <p className="font-bold text-foreground font-mono truncate" style={{ fontSize: 'clamp(22px, 3vw, 40px)', lineHeight: '1.1' }}>{parseValue(item.value)}</p>
                                    <p className="text-xs text-muted-foreground truncate">{item.subtitle}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        {handlungsbedarfData.map(item => {
                            const Icon = item.icon;
                            return (
                                <Card key={item.title} className={cn("p-4 bg-card/50 border-l-4 overflow-hidden min-w-0 max-w-full relative", item.color === 'rose' ? 'border-rose-500/50' : item.color === 'amber' ? 'border-amber-500/50' : item.color === 'blue' ? 'border-blue-500/50' : 'border-emerald-500/50')}>
                                    <div className="flex items-center gap-4 min-w-0">
                                        <Icon className={cn("h-6 w-6 shrink-0", item.color === 'rose' ? 'text-rose-400' : item.color === 'amber' ? 'text-amber-400' : item.color === 'blue' ? 'text-blue-400' : 'text-emerald-400')} />
                                        <div className="min-w-0">
                                            <p className="text-2xl font-bold font-mono truncate">{item.value}</p>
                                            <p className="text-xs font-bold text-muted-foreground uppercase truncate">{item.title}</p>
                                        </div>
                                    </div>
                                </Card>
                            );
                        })}
                    </div>
                </div>
                <div className="space-y-6">
                     <Card className="border-rose-500/50 bg-rose-500/10 overflow-hidden">
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
                    <Card className="bg-blue-950/50 border-blue-500/20 overflow-hidden">
                        <CardHeader>
                            <CardTitle className="text-base text-blue-300 flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5 shrink-0"/> KI-Tagesfokus
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
                <Card className="overflow-hidden">
                    <CardHeader><CardTitle>Vertrieb – Status</CardTitle></CardHeader>
                    <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {vertriebsKpiData.map(kpi => (
                             <Card key={kpi.title} className="p-4 bg-muted/50 overflow-hidden min-w-0">
                                <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest truncate">{kpi.title}</p>
                                <p className="text-3xl font-bold font-mono truncate">{parseValue(kpi.value)}</p>
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
    const nextBooking = bookings.find(b => (new Date(b.startAt) >= new Date()));

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 px-1">Tagesüberblick</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                            <p className="text-xs font-bold text-muted-foreground uppercase truncate">Termine heute</p>
                            <p className="text-4xl font-bold text-foreground mt-2 font-mono">{todayBookings.length}</p>
                        </Card>
                        <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                            <p className="text-xs font-bold text-muted-foreground uppercase truncate">Nächster Termin</p>
                            <div className="mt-2">
                                {nextBooking ? (
                                    <>
                                        <p className="text-2xl font-bold text-primary font-mono">{format(nextBooking.startDate, 'HH:mm')} Uhr</p>
                                        <p className="text-xs text-muted-foreground font-medium truncate mt-1">{nextBooking.guestName}</p>
                                    </>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic mt-2">Keine Termine</p>
                                )}
                            </div>
                        </Card>
                        <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                            <p className="text-xs font-bold text-muted-foreground uppercase truncate">Termine mit Kunden</p>
                            <p className="text-4xl font-bold text-emerald-400 mt-2 font-mono">{customerBookings.length}</p>
                        </Card>
                    </div>
                </div>
                
                <div className="lg:col-span-4">
                    <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-4 px-1">KI-Hinweise</h3>
                    <Card className="bg-blue-500/5 border-blue-500/20 h-[calc(100%-2.5rem)] flex flex-col overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
                                <Sparkles className="w-4 h-4 text-blue-400 shrink-0"/> KI-Assistent
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 flex-1 overflow-auto custom-scrollbar">
                            <div className="space-y-4 text-xs">
                                <div className="space-y-2">
                                    <p className="font-bold text-blue-200 flex items-center gap-1.5"><Info className="w-3.5 h-3.5 shrink-0"/> Heute wichtig</p>
                                    <p className="text-blue-300/90 leading-relaxed">
                                        {nextBooking ? `Vorbereitung für ${nextBooking.guestName}: Letzter Kontakt vor 14 Tagen.` : 'Keine kritischen Fristen heute.'}
                                    </p>
                                </div>
                                <div className="flex gap-2">
                                    <Button size="sm" variant="outline" className="h-7 text-[10px] uppercase font-black"><MessageSquarePlus className="w-3 h-3 mr-1"/> Notiz</Button>
                                    <Button size="sm" variant="outline" className="h-7 text-[10px] uppercase font-black"><UserIcon className="w-3 h-3 mr-1"/> Kontakt</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground px-1">Nächste Termine</h3>
                <div className="grid grid-cols-1 gap-3">
                    {bookings.length > 0 ? bookings.map(b => (
                        <Card key={b.bookingId} className={cn("p-4 hover:border-primary/40 transition-all overflow-hidden relative", isToday(b.startDate) && "border-l-4 border-l-primary")}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-4 min-w-0">
                                    <div className="text-center min-w-[80px] p-2 bg-muted rounded-lg shrink-0">
                                        <p className="text-[10px] font-bold uppercase text-muted-foreground">{format(b.startDate, 'EEE', {locale: de})}</p>
                                        <p className="text-lg font-bold font-mono">{format(b.startDate, 'dd.MM.')}</p>
                                    </div>
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-foreground truncate">{b.eventTypeName}</h4>
                                        <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                                            <Badge variant="outline" className="text-[9px] font-black uppercase px-1.5 py-0 h-4">{b.role}</Badge>
                                            <span className="font-mono">{format(b.startDate, 'HH:mm')} Uhr</span>
                                            <span>•</span>
                                            <span className="truncate">{b.guestName}</span>
                                        </div>
                                        {b.context && (
                                            <p className="text-[10px] text-primary font-bold mt-1.5 flex items-center gap-1">
                                                <LinkIcon className="w-3 h-3"/> {b.context}
                                            </p>
                                        )}
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                    <Button variant="outline" size="sm" className="text-xs font-bold px-4">Öffnen</Button>
                                </div>
                            </div>
                        </Card>
                    )) : (
                        <Card className="p-12 text-center text-muted-foreground italic border-dashed">
                            Keine anstehenden Termine vorhanden.
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
};

const TasksListView = () => {
    const [isDoneTasksOpen, setIsDoneTasksOpen] = useState(false);
    
    const openTasks = mockTasks.filter(t => t.status !== 'Erledigt');
    const doneTasks = mockTasks.filter(t => t.status === 'Erledigt');
    
    const tasksHeute = openTasks.filter(t => t.due === 'Heute').length;
    const tasksUeberfaellig = openTasks.filter(t => t.status === 'Überfällig' || t.due === 'Sofort').length;
    const tasksHighPrio = openTasks.filter(t => t.prio === 'Hoch').length;
    const tasksInArbeit = openTasks.filter(t => t.status === 'In Arbeit').length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aufgaben heute</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", tasksHeute > 0 ? "text-primary" : "text-muted-foreground")}>
                        {tasksHeute || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative border-l-4 border-l-rose-500/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Überfällig</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", tasksUeberfaellig > 0 ? "text-rose-400" : "text-muted-foreground")}>
                        {tasksUeberfaellig || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Hohe Priorität</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", tasksHighPrio > 0 ? "text-amber-400" : "text-muted-foreground")}>
                        {tasksHighPrio || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">In Arbeit</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", tasksInArbeit > 0 ? "text-blue-400" : "text-muted-foreground")}>
                        {tasksInArbeit || 'Keine'}
                    </p>
                </Card>
            </div>

            <Card className="bg-blue-500/5 border-blue-500/20 overflow-hidden">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400 shrink-0"/> KI-Hinweise zu Aufgaben
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
                                2 Aufgaben warten seit &gt;3 Tagen auf Rückmeldung. Prüfung der Abhängigkeiten empfohlen.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-foreground">Empfohlene Aktion</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase">Aufgabe öffnen</Button>
                                <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase">Notiz hinzufügen</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground px-1">Offene Aufgaben</h3>
                <div className="grid grid-cols-1 gap-3">
                    {openTasks.map(t => (
                        <Card key={t.id} className={cn(
                            "p-4 hover:border-primary/40 transition-all overflow-hidden relative",
                            (t.status === 'Überfällig' || t.due === 'Sofort') && "border-l-4 border-l-rose-500/50",
                            t.due === 'Heute' && "border-l-4 border-l-primary/50"
                        )}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-black uppercase",
                                            t.prio === 'Hoch' ? "border-rose-500/50 text-rose-400" : "border-muted text-muted-foreground"
                                        )}>
                                            {t.prio}
                                        </Badge>
                                        <h4 className="font-bold text-foreground text-sm truncate">{t.title}</h4>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
                                        <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5"/> {t.owner}</span>
                                        <span className={cn("font-bold", (t.status === 'Überfällig' || t.due === 'Sofort') && "text-rose-400")}>
                                            <Clock className="w-3.5 h-3.5 inline mr-1"/> {t.due}
                                        </span>
                                        <span className="flex items-center gap-1.5 font-medium text-primary"><Briefcase className="w-3.5 h-3.5"/> Q-Hub</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                            </TooltipTrigger>
                                            <TooltipContent>Notiz hinzufügen</TooltipContent>
                                        </Tooltip>
                                    </TooltipProvider>
                                    <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase px-3">Erledigt</Button>
                                    <Button variant="default" size="sm" className="h-8 text-[10px] font-black uppercase px-3">Öffnen</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            {doneTasks.length > 0 && (
                <Collapsible open={isDoneTasksOpen} onOpenChange={setIsDoneTasksOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between hover:bg-transparent px-1">
                            <span className="text-sm font-bold text-muted-foreground flex items-center gap-2 uppercase tracking-widest">
                                <CheckCircle2 className="w-4 h-4"/> Erledigte Aufgaben ({doneTasks.length})
                            </span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isDoneTasksOpen && "rotate-180")}/>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-3">
                        {doneTasks.map(t => (
                            <Card key={t.id} className="p-4 opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all overflow-hidden relative">
                                <div className="flex items-center justify-between gap-4">
                                    <div className="min-w-0">
                                        <h4 className="font-bold text-foreground text-sm truncate line-through">{t.title}</h4>
                                        <p className="text-[10px] text-muted-foreground mt-1">Erledigt am {format(new Date(), 'dd.MM.yyyy')}</p>
                                    </div>
                                    <Badge variant="outline" className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 uppercase font-black text-[9px] h-5">Erledigt</Badge>
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
        <Card id="qhub-reports" className="overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle>Kontakte</CardTitle>
                    <Button><Plus className="mr-2 h-4 w-4" /> Kontakt erstellen</Button>
                </div>
            </CardHeader>
            <CardContent className="p-0">
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
    <Card id="qhub-reports" className="overflow-hidden">
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Firmen</CardTitle>
                <Button><Plus className="mr-2 h-4 w-4" /> Firma erstellen</Button>
            </div>
        </CardHeader>
        <CardContent className="p-0">
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

const DealsView = () => {
    const [isClosedDealsOpen, setIsClosedDealsOpen] = useState(false);

    const activeDeals = mockDeals.filter(d => d.stage !== 'Gewonnen' && d.stage !== 'Verloren');
    const wonDeals = mockDeals.filter(d => d.stage === 'Gewonnen');
    const lostDeals = mockDeals.filter(d => d.stage === 'Verloren');

    const openDealsCount = activeDeals.length;
    const pipelineValue = activeDeals.reduce((sum, d) => {
        const val = parseFloat(d.value.replace(/[^0-9.-]+/g, "")) || 0;
        return sum + val;
    }, 0);
    const inNegotiationCount = activeDeals.filter(d => d.stage === 'Verhandlung').length;
    const criticalDealsCount = activeDeals.filter(d => d.inactiveDays > 3 || d.aiRisk).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Offene Deals</p>
                    <p className="text-4xl font-bold mt-2 font-mono">{openDealsCount || 'Keine'}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pipeline-Wert</p>
                    <p className="text-4xl font-bold mt-2 text-primary font-mono">{formatWaehrung(pipelineValue)}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">In Verhandlung</p>
                    <p className="text-4xl font-bold mt-2 text-blue-400 font-mono">{inNegotiationCount || 'Keine'}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative border-l-4 border-l-rose-500/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kritische Deals</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", criticalDealsCount > 0 ? "text-rose-400" : "text-muted-foreground")}>
                        {criticalDealsCount || 'Keine'}
                    </p>
                </Card>
            </div>

            <Card className="bg-blue-500/5 border-blue-500/20 overflow-hidden">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400 shrink-0"/> KI-Hinweise zu Deals
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-foreground">Heute fokussieren</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                Deal 'Innovate GmbH' hat einen hohen Wert und ist seit 2 Tagen unverändert. Abschlusschance: 85%.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-foreground">Risiken erkannt</p>
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                'Data Corp' zeigt hohe Inaktivität (5 Tage). Letzte Reaktion der Gegenseite war vor einer Woche.
                            </p>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs font-bold text-foreground">Empfohlener Schritt</p>
                            <div className="flex gap-2">
                                <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase">Angebot nachfassen</Button>
                                <Button size="sm" variant="outline" className="h-7 text-[10px] font-bold uppercase">Termin vorschlagen</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-lg font-bold text-foreground px-1">Aktive Deals</h3>
                <div className="grid grid-cols-1 gap-3">
                    {activeDeals.map(d => (
                        <Card key={d.id} className={cn(
                            "p-4 hover:border-primary/40 transition-all overflow-hidden relative",
                            (d.inactiveDays > 3 || d.aiRisk) && "border-l-4 border-l-rose-500/50",
                            d.stage === 'Verhandlung' && "border-l-4 border-l-blue-500/50"
                        )}>
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="secondary" className="text-[10px] font-black uppercase px-2 h-5">
                                            {d.stage}
                                        </Badge>
                                        <h4 className="font-bold text-foreground text-sm truncate">{d.name}</h4>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1.5 font-bold text-foreground"><DollarSign className="w-3.5 h-3.5 text-emerald-400"/> {d.value}</span>
                                        <span className="flex items-center gap-1.5 font-medium text-primary"><Building2 className="w-3.5 h-3.5"/> Q-Hub</span>
                                        <span className="flex items-center gap-1.5"><UserIcon className="w-3.5 h-3.5"/> {d.owner}</span>
                                        <span className={cn("font-mono font-bold", d.inactiveDays > 3 && "text-rose-400")}>
                                            <Clock className="w-3.5 h-3.5 inline mr-1"/> {d.inactiveDays === 0 ? 'Heute aktiv' : `Vor ${d.inactiveDays} Tagen`}
                                        </span>
                                    </div>
                                    {d.aiRisk && <p className="text-[10px] text-rose-400 font-bold mt-2 flex items-center gap-1 italic"><AlertTriangle className="w-3 h-3"/> {d.aiRisk}</p>}
                                </div>
                                <div className="flex items-center gap-2 shrink-0">
                                    <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                    <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase px-3">Aufgabe</Button>
                                    <Button variant="default" size="sm" className="h-8 text-[10px] font-black uppercase px-3">Öffnen</Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>

            <div className="pt-4">
                <Collapsible open={isClosedDealsOpen} onOpenChange={setIsClosedDealsOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between hover:bg-transparent px-1 text-muted-foreground">
                            <span className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
                                <HistoryIcon className="w-4 h-4"/> Geschlossene Deals ({wonDeals.length + lostDeals.length})
                            </span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isClosedDealsOpen && "rotate-180")}/>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-4 space-y-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-emerald-400 uppercase tracking-widest px-1">Gewonnen</p>
                                {wonDeals.map(d => (
                                    <Card key={d.id} className="p-3 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all relative overflow-hidden">
                                        <div className="flex justify-between items-center gap-2">
                                            <p className="text-xs font-bold truncate">{d.name}</p>
                                            <span className="text-xs font-mono font-bold text-emerald-400">{d.value}</span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                            <div className="space-y-3">
                                <p className="text-[10px] font-black text-rose-400 uppercase tracking-widest px-1">Verloren</p>
                                {lostDeals.map(d => (
                                    <Card key={d.id} className="p-3 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition-all relative overflow-hidden">
                                        <div className="flex justify-between items-center gap-2">
                                            <p className="text-xs font-bold truncate">{d.name}</p>
                                            <span className="text-xs font-mono font-bold text-rose-400">{d.value}</span>
                                        </div>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};

const PipelineView = () => {
    const activeDeals = mockDeals.filter(d => d.stage !== 'Gewonnen' && d.stage !== 'Verloren');
    const pipelineTotalValue = activeDeals.reduce((sum, d) => sum + (parseFloat(d.value.replace(/[^0-9.-]+/g, "")) || 0), 0);
    const inactiveCount = activeDeals.filter(d => d.inactiveDays > 3).length;
    const criticalCount = activeDeals.filter(d => d.aiRisk).length;

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aktive Deals</p>
                    <p className="text-4xl font-bold mt-2 font-mono">{activeDeals.length}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Pipeline-Wert gesamt</p>
                    <p className="text-4xl font-bold mt-2 text-primary font-mono">{formatWaehrung(pipelineTotalValue)}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Deals ohne Aktivität</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", inactiveCount > 0 ? "text-amber-400" : "text-muted-foreground")}>
                        {inactiveCount || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative border-l-4 border-l-rose-500/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kritische Deals</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", criticalCount > 0 ? "text-rose-400" : "text-muted-foreground")}>
                        {criticalCount || 'Keine'}
                    </p>
                </Card>
            </div>

            <Card className="bg-blue-500/5 border-blue-500/20 overflow-hidden">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm text-blue-300 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-blue-400 shrink-0"/> KI-Hinweise zur Pipeline
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-foreground">Fokus heute</p>
                            <p className="text-[11px] text-blue-300/90 leading-relaxed">
                                {inactiveCount} Deals seit über 3 Tagen ohne Aktivität. Dringende Prüfung empfohlen.
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-foreground">Risiko erkannt</p>
                            <p className="text-[11px] text-blue-300/90 leading-relaxed">
                                {criticalCount} Deals in Phase 'Angebot' haben kein folgendes Meeting.
                            </p>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-bold text-foreground">Empfohlene Aktion</p>
                            <Button size="sm" variant="outline" className="h-7 text-[10px] w-full font-black uppercase">Zu den relevanten Deals</Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex gap-4 min-w-[1200px]">
                    {pipelineStages.map(phase => {
                        const phaseDeals = mockDeals.filter(d => d.stage === phase);
                        const phaseValue = phaseDeals.reduce((sum, d) => sum + (parseFloat(d.value.replace(/[^0-9.-]+/g, "")) || 0), 0);
                        const isArchivedPhase = phase === 'Gewonnen' || phase === 'Verloren';

                        return (
                            <div key={phase} className={cn("flex-1 min-w-[200px] bg-muted/30 rounded-xl p-2", isArchivedPhase && "opacity-60")}>
                                <div className="p-3 mb-3 border-b border-border/50">
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-[11px] font-black uppercase text-foreground/80 tracking-wider">{phase}</h3>
                                        <Badge variant="outline" className="text-[10px] font-bold h-5 px-1.5">{phaseDeals.length}</Badge>
                                    </div>
                                    <p className="text-[10px] font-bold text-muted-foreground mt-1 font-mono">{formatWaehrung(phaseValue)}</p>
                                </div>
                                <div className="space-y-3">
                                    {phaseDeals.map(deal => (
                                        <Card key={deal.id} className={cn(
                                            "p-3 shadow-sm hover:border-primary/40 transition-all cursor-pointer relative overflow-hidden",
                                            !isArchivedPhase && deal.inactiveDays > 3 && "border-l-4 border-l-amber-500/50",
                                            !isArchivedPhase && deal.aiRisk && "border-l-4 border-l-rose-500/50"
                                        )}>
                                            <p className="font-bold text-[11px] text-foreground truncate">{deal.name}</p>
                                            <p className="text-[10px] text-muted-foreground truncate">{deal.company || 'Unbekannt'}</p>
                                            <div className="mt-2 pt-2 border-t border-border/50 flex justify-between items-center">
                                                <span className="text-[10px] font-bold font-mono">{deal.value}</span>
                                                <span className={cn("text-[9px] font-bold font-mono", deal.inactiveDays > 3 ? "text-amber-400" : "text-muted-foreground")}>
                                                    {deal.inactiveDays === 0 ? 'Aktiv' : `Vor ${deal.inactiveDays} T.`}
                                                </span>
                                            </div>
                                            {!isArchivedPhase && (
                                                <p className="mt-2 text-[9px] text-blue-400 font-bold flex items-center gap-1 italic">
                                                    <Sparkles className="w-2.5 h-2.5 shrink-0"/> {deal.nextStep || 'Nächster Schritt fehlt'}
                                                </p>
                                            )}
                                        </Card>
                                    ))}
                                    {phaseDeals.length === 0 && (
                                        <div className="text-center py-8 text-[10px] text-muted-foreground italic uppercase tracking-widest opacity-30">Leer</div>
                                    )}
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

const ActivitiesListView = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [groupBy, setGroupBy] = useState<'time' | 'customer'>('time');
    const [isPerformanceOpen, setIsPerformanceOpen] = useState(false);

    const filteredActivities = useMemo(() => {
        return allActivities.filter(a => {
            if (selectedFilter === 'all') return true;
            if (selectedFilter === 'kontakt') return a.type === 'Termin' || a.type === 'Anruf' || a.type === 'E-Mail';
            if (selectedFilter === 'vertrieb') return a.type === 'Verkaufschance';
            if (selectedFilter === 'intern') return a.type === 'Aufgabe';
            return true;
        }).sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.createdAt || a.dueDate).getTime());
    }, [selectedFilter]);

    const groupedByTime = useMemo(() => {
        const groups: { [key: string]: any[] } = {
            'Heute': [],
            'Gestern': [],
            'Diese Woche': [],
            'Älter': []
        };

        filteredActivities.forEach(a => {
            const date = new Date(a.dueDate);
            if (isToday(date)) groups['Heute'].push(a);
            else if (isYesterday(date)) groups['Gestern'].push(a);
            else if (isThisWeek(date, { weekStartsOn: 1 })) groups['Diese Woche'].push(a);
            else groups['Älter'].push(a);
        });

        return groups;
    }, [filteredActivities]);

    const groupedByCustomer = useMemo(() => {
        return mockContacts.map(contact => {
            const customerActivities = allActivities.filter(a => a.context.includes(contact.name) || a.context.includes(contact.company));
            return {
                ...contact,
                activities: customerActivities.sort((a, b) => new Date(b.dueDate).getTime() - new Date(a.createdAt || a.dueDate).getTime())
            };
        }).filter(c => c.activities.length > 0);
    }, []);

    const stats = useMemo(() => {
        const heute = allActivities.filter(a => isToday(new Date(a.dueDate)));
        return {
            today: heute.length,
            contacts: heute.filter(a => a.type === 'Termin' || a.type === 'Anruf' || a.type === 'E-Mail').length,
            done: heute.filter(a => a.status === 'Erledigt').length,
            open: heute.filter(a => a.status === 'Offen').length
        }
    }, []);

    const typeIcons: { [key: string]: React.ElementType } = {
        'Aufgabe': CheckSquare,
        'Verkaufschance': Handshake,
        'Termin': CalendarDays,
        'Anruf': Phone,
        'E-Mail': Mail,
        'Notiz': FileText,
        'Statusänderung': Workflow
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
                <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Aktivitäten heute</p>
                        <p className="text-4xl font-bold mt-2 font-mono">{stats.today || 'Keine'}</p>
                    </Card>
                    <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kundenkontakte</p>
                        <p className="text-4xl font-bold mt-2 text-blue-400 font-mono">{stats.contacts || 'Keine'}</p>
                    </Card>
                    <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Abgeschlossen</p>
                        <p className="text-4xl font-bold mt-2 text-emerald-400 font-mono">{stats.done || 'Keine'}</p>
                    </Card>
                    <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Folgeaktionen</p>
                        <p className="text-4xl font-bold mt-2 text-amber-400 font-mono">{stats.open || 'Keine'}</p>
                    </Card>
                </div>
                
                <div className="lg:col-span-4">
                    <Card className="bg-amber-500/5 border-amber-500/20 h-full flex flex-col overflow-hidden">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm text-amber-400 flex items-center gap-2">
                                <AlertTriangle className="w-4 h-4 shrink-0"/> Hinweise & Eskalationen
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-3 flex-1 overflow-auto custom-scrollbar">
                            <div className="space-y-1.5 p-2 bg-amber-500/10 rounded-lg border border-amber-500/20">
                                <p className="text-[11px] font-bold text-amber-200 uppercase tracking-widest">Kritisch</p>
                                <p className="text-[11px] text-amber-300 leading-tight">Seit 10 Tagen kein Kontakt mit Innovate GmbH.</p>
                                <Button size="sm" variant="ghost" className="h-6 text-[9px] font-black uppercase p-0 hover:bg-transparent text-amber-400 hover:text-amber-300">Jetzt anrufen</Button>
                            </div>
                            <div className="space-y-1.5 p-2 bg-slate-500/10 rounded-lg border border-slate-500/20">
                                <p className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">Achtung</p>
                                <p className="text-[11px] text-slate-400 leading-tight">Deal 'Data Corp' ohne geplante Folgeaktion.</p>
                                <Button size="sm" variant="ghost" className="h-6 text-[9px] font-black uppercase p-0 hover:bg-transparent text-primary hover:text-primary/80">Aufgabe anlegen</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
                <div className="flex items-center gap-2 p-1 bg-muted rounded-xl border border-border">
                    <button 
                        onClick={() => setGroupBy('time')}
                        className={cn("px-4 py-1.5 rounded-lg text-[11px] font-black uppercase transition-all", groupBy === 'time' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground')}
                    >
                        Nach Zeit
                    </button>
                    <button 
                        onClick={() => setGroupBy('customer')}
                        className={cn("px-4 py-1.5 rounded-lg text-[11px] font-black uppercase transition-all", groupBy === 'customer' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground')}
                    >
                        Nach Kunde
                    </button>
                </div>

                <div className="flex items-center gap-2">
                    {['all', 'kontakt', 'vertrieb', 'intern'].map(f => (
                        <button
                            key={f}
                            onClick={() => setSelectedFilter(f)}
                            className={cn(
                                "px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border",
                                selectedFilter === f 
                                    ? "bg-primary border-primary text-primary-foreground shadow-lg"
                                    : "bg-muted border-transparent text-muted-foreground hover:border-border"
                            )}
                        >
                            {f === 'all' ? 'Alle' : f === 'kontakt' ? 'Kundenkontakt' : f === 'vertrieb' ? 'Vertrieb' : 'Intern'}
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-8">
                {groupBy === 'time' ? (
                    Object.entries(groupedByTime).map(([group, acts]) => (
                        acts.length > 0 && (
                            <div key={group} className="space-y-3">
                                <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">{group}</h4>
                                <div className="grid grid-cols-1 gap-3">
                                    {acts.map(a => {
                                        const Icon = typeIcons[a.type] || Activity;
                                        return (
                                            <Card key={a.id} className="p-4 hover:border-primary/40 transition-all group overflow-hidden relative">
                                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:text-primary transition-colors shrink-0 border border-transparent group-hover:border-primary/20 shadow-inner">
                                                            <Icon className="w-5 h-5"/>
                                                        </div>
                                                        <div className="min-w-0">
                                                            <div className="flex items-center gap-2 mb-0.5">
                                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{a.type}</span>
                                                                <span className="text-[10px] text-muted-foreground/50">•</span>
                                                                <span className="text-[10px] text-muted-foreground font-mono font-bold">{format(new Date(a.dueDate), 'HH:mm')} Uhr</span>
                                                            </div>
                                                            <h4 className="font-bold text-foreground text-sm truncate">{a.description}</h4>
                                                            <p className="text-[10px] text-muted-foreground truncate flex items-center gap-1.5 mt-1 font-medium">
                                                                <LinkIcon className="w-3 h-3 text-primary/60"/> {a.context}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                                        <Badge variant="outline" className={cn(
                                                            "text-[9px] font-black uppercase h-5 px-2",
                                                            a.status === 'Erledigt' ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                                                        )}>
                                                            {a.status}
                                                        </Badge>
                                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                                            <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase">Öffnen</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Card>
                                        )
                                    })}
                                </div>
                            </div>
                        )
                    ))
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {groupedByCustomer.map(customer => (
                            <Card key={customer.id} className="flex flex-col h-full overflow-hidden hover:border-primary/30 transition-all relative">
                                <CardHeader className="p-4 bg-muted/30 border-b border-border/50">
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="min-w-0">
                                            <h4 className="font-bold text-foreground truncate">{customer.name}</h4>
                                            <p className="text-[10px] text-muted-foreground uppercase font-black truncate">{customer.company}</p>
                                        </div>
                                        <Badge variant="outline" className="text-[9px] font-black uppercase bg-background border-primary/20 text-primary h-5 px-2">
                                            {customer.leadStatus}
                                        </Badge>
                                    </div>
                                    <p className="text-[9px] text-muted-foreground font-bold uppercase mt-2 tracking-widest">Letzter Kontakt: {customer.lastActivity}</p>
                                </CardHeader>
                                <CardContent className="p-4 flex-1">
                                    <div className="space-y-4">
                                        {customer.activities.slice(0, 3).map((act, i) => {
                                            const Icon = typeIcons[act.type] || Activity;
                                            return (
                                                <div key={i} className="flex gap-3 text-xs relative">
                                                    {i < customer.activities.slice(0, 3).length - 1 && (
                                                        <div className="absolute left-[13px] top-7 bottom-[-16px] w-[1px] bg-border"/>
                                                    )}
                                                    <div className="w-7 h-7 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0 border border-border/50 shadow-inner">
                                                        <Icon className="w-3.5 h-3.5"/>
                                                    </div>
                                                    <div className="min-w-0 pt-0.5">
                                                        <p className="font-bold text-foreground text-[13px] truncate">{act.description}</p>
                                                        <p className="text-[10px] text-muted-foreground font-mono font-bold mt-0.5">{format(new Date(act.dueDate), 'dd.MM.yyyy HH:mm')} Uhr</p>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                        {customer.activities.length > 3 && (
                                            <Button variant="ghost" className="w-full h-8 text-[10px] font-black text-muted-foreground uppercase hover:text-primary tracking-widest">
                                                + {customer.activities.length - 3} weitere anzeigen
                                            </Button>
                                        )}
                                    </div>
                                </CardContent>
                                <CardFooter className="p-2 border-t border-border/50 bg-muted/10 gap-2">
                                    <Button variant="ghost" size="sm" className="flex-1 h-8 text-[10px] font-black uppercase tracking-wider">Anrufen</Button>
                                    <Button variant="ghost" size="sm" className="flex-1 h-8 text-[10px] font-black uppercase tracking-wider">Termin</Button>
                                    <Button variant="outline" size="sm" className="flex-1 h-8 text-[10px] font-black uppercase tracking-wider bg-background">Kunde öffnen</Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            <div className="pt-8 border-t border-border">
                <Collapsible open={isPerformanceOpen} onOpenChange={setIsPerformanceOpen}>
                    <CollapsibleTrigger asChild>
                        <Button variant="ghost" className="w-full justify-between hover:bg-transparent px-1 text-muted-foreground">
                            <span className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
                                <BarChartIcon className="w-4 h-4"/> Aktivitäts-Übersicht (ROI & Trends)
                            </span>
                            <ChevronDown className={cn("w-4 h-4 transition-transform", isPerformanceOpen && "rotate-180")}/>
                        </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card className="p-6 bg-blue-500/5 border-blue-500/10 overflow-hidden relative">
                                <h5 className="text-xs font-bold text-blue-300 uppercase mb-4 flex items-center gap-2 tracking-widest"><Clock className="w-3.5 h-3.5"/> Diese Woche</h5>
                                <div className="space-y-4">
                                    <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                                        <span className="text-sm text-blue-200/80 font-medium">Kundenkontakte geführt</span>
                                        <span className="text-2xl font-bold text-white font-mono">42</span>
                                    </div>
                                    <div className="flex justify-between items-center pb-2 border-b border-blue-500/10">
                                        <span className="text-sm text-blue-200/80 font-medium">Termine durchgeführt</span>
                                        <span className="text-2xl font-bold text-white font-mono">12</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-blue-200/80 font-medium">Folgeaktionen erstellt</span>
                                        <span className="text-2xl font-bold text-white font-mono">28</span>
                                    </div>
                                </div>
                            </Card>
                            <Card className="p-6 bg-emerald-500/5 border-emerald-500/10 overflow-hidden relative">
                                <h5 className="text-xs font-bold text-emerald-300 uppercase mb-4 flex items-center gap-2 tracking-widest"><TrendingUp className="w-3.5 h-3.5"/> Letzte 30 Tage</h5>
                                <div className="space-y-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                                        <p className="text-[10px] font-black text-emerald-200 uppercase tracking-widest">Aktivitäts-Trend</p>
                                        <p className="text-[13px] text-emerald-300 mt-1 font-medium leading-relaxed">
                                            Die Gesamtaktivität ist im Vergleich zum Vormonat stabil geblieben.
                                        </p>
                                    </div>
                                    <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                                        <p className="text-[10px] font-black text-blue-200 uppercase tracking-widest">Effizienz-Verhältnis</p>
                                        <p className="text-[13px] text-blue-300 mt-1 font-medium leading-relaxed">
                                            Im Schnitt führten 18 qualifizierte Gespräche zu 4 erfolgreichen Abschlüssen.
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </CollapsibleContent>
                </Collapsible>
            </div>
        </div>
    );
};

const NotesListView = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [newNoteText, setNewNoteText] = useState('');
    const [selectedContext, setSelectedContext] = useState('none');
    const [detailNote, setDetailNote] = useState<any | null>(null);
    const { toast } = useToast();

    const groupedNotes = useMemo(() => {
        const filtered = initialMockNotes.filter(n => {
            if (selectedFilter === 'kunden' && n.contextType !== 'Kontakt' && n.contextType !== 'Firma') return false;
            if (selectedFilter === 'deals' && n.contextType !== 'Deal') return false;
            if (selectedFilter === 'intern' && n.contextType !== 'Intern') return false;
            if (searchTerm && !(n.title.toLowerCase().includes(searchTerm.toLowerCase()) || n.content.toLowerCase().includes(searchTerm.toLowerCase()))) return false;
            return true;
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

        const groups: { [key: string]: any[] } = {
            'Heute': [],
            'Diese Woche': [],
            'Älter': []
        };

        filtered.forEach(n => {
            const date = new Date(n.createdAt);
            if (isToday(date)) groups['Heute'].push(n);
            else if (isThisWeek(date, { weekStartsOn: 1 })) groups['Diese Woche'].push(n);
            else groups['Älter'].push(n);
        });

        return groups;
    }, [searchTerm, selectedFilter]);

    const handleSaveNote = () => {
        if (!newNoteText.trim()) return;
        toast({ title: "Notiz gespeichert", description: "Ihre Notiz wurde erfolgreich erfasst." });
        setNewNoteText('');
        setSelectedContext('none');
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <Card className="border-primary/20 shadow-sm overflow-hidden relative">
                <CardHeader className="p-4 pb-2 border-b bg-muted/30">
                    <CardTitle className="text-sm font-bold flex items-center gap-2 uppercase tracking-widest">
                        <MessageSquarePlus className="w-4 h-4 text-primary shrink-0"/> Neue Notiz erfassen
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    <Textarea 
                        placeholder="Gedanken, Gesprächsnotizen, Entscheidungen ..." 
                        className="bg-input min-h-[100px] text-sm resize-none focus-visible:ring-primary/30 border-transparent hover:border-border transition-colors"
                        value={newNoteText}
                        onChange={e => setNewNoteText(e.target.value)}
                    />
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest shrink-0">Kontext:</Label>
                            <Select value={selectedContext} onValueChange={setSelectedContext}>
                                <SelectTrigger className="h-8 bg-muted text-[11px] font-bold uppercase border-transparent hover:border-border transition-colors w-full sm:w-[180px]">
                                    <SelectValue placeholder="Auswählen..." />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="none">Kein Kontext</SelectItem>
                                    <SelectItem value="contact">Kontakt</SelectItem>
                                    <SelectItem value="company">Firma</SelectItem>
                                    <SelectItem value="deal">Deal</SelectItem>
                                    <SelectItem value="task">Aufgabe</SelectItem>
                                    <SelectItem value="meeting">Termin</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={handleSaveNote} disabled={!newNoteText.trim()} className="w-full sm:w-auto font-black uppercase text-[11px] h-9 px-6 shadow-lg">
                            <Check className="w-4 h-4 mr-2"/> Notiz speichern
                        </Button>
                    </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                <div className="lg:col-span-8 space-y-6">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
                        <div className="flex items-center gap-2">
                            {['all', 'kunden', 'deals', 'intern'].map(f => (
                                <button
                                    key={f}
                                    onClick={() => setSelectedFilter(f)}
                                    className={cn(
                                        "px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border",
                                        selectedFilter === f 
                                            ? "bg-primary border-primary text-primary-foreground shadow-lg"
                                            : "bg-muted border-transparent text-muted-foreground hover:border-border"
                                    )}
                                >
                                    {f === 'all' ? 'Alle' : f === 'kunden' ? 'Kunden' : f === 'deals' ? 'Deals' : 'Intern'}
                                </button>
                            ))}
                        </div>
                        <div className="relative w-full sm:w-64">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                            <Input 
                                placeholder="Notizen durchsuchen..." 
                                className="pl-9 h-8 text-[11px] font-bold uppercase bg-input border-transparent focus-visible:ring-primary/30"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="space-y-8">
                        {Object.entries(groupedNotes).map(([group, notes]) => (
                            notes.length > 0 && (
                                <div key={group} className="space-y-3">
                                    <h4 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">{group}</h4>
                                    <div className="grid grid-cols-1 gap-3">
                                        {notes.map(n => (
                                            <Card key={n.id} className="p-4 hover:border-primary/40 transition-all group overflow-hidden cursor-pointer relative" onClick={() => setDetailNote(n)}>
                                                <div className="flex justify-between items-start gap-4">
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-bold text-foreground text-[13px] truncate">{n.title}</h4>
                                                        <p className="text-[12px] text-muted-foreground line-clamp-2 mt-1 leading-relaxed font-medium">
                                                            {n.content}
                                                        </p>
                                                        <div className="flex flex-wrap items-center gap-2 mt-3">
                                                            <span className="text-[10px] text-muted-foreground font-mono font-bold tracking-tighter">{format(new Date(n.createdAt), 'HH:mm')} Uhr</span>
                                                            {n.contextType && (
                                                                <Badge variant="outline" className="text-[9px] font-black uppercase bg-muted/50 border-transparent text-muted-foreground gap-1.5 h-5">
                                                                    <LinkIcon className="w-2.5 h-2.5 text-primary/60"/> {n.contextName || n.contextType}
                                                                </Badge>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                                        <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-rose-400"><Trash2 className="w-4 h-4"/></Button>
                                                    </div>
                                                </div>
                                            </Card>
                                        ))}
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>

                <div className="lg:col-span-4 space-y-6">
                    <Card className="bg-blue-500/5 border-blue-500/20 overflow-hidden relative">
                        <CardHeader className="p-4 pb-2">
                            <CardTitle className="text-sm text-blue-300 flex items-center gap-2 uppercase tracking-widest">
                                <Sparkles className="w-4 h-4 text-blue-400 shrink-0"/> KI-Hinweis
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="p-4 pt-0 space-y-4">
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Kontext-Vorschlag</p>
                                <p className="text-[11px] text-blue-300/90 leading-relaxed font-medium">
                                    Die letzte Notiz könnte relevant sein für den Deal 'Innovate GmbH'. Soll ich sie verknüpfen?
                                </p>
                                <Button variant="link" className="h-auto p-0 text-[10px] font-black text-primary uppercase tracking-widest">Kontext verknüpfen</Button>
                            </div>
                            <Separator className="bg-blue-500/10"/>
                            <div className="space-y-1.5">
                                <p className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Wissens-Cluster</p>
                                <p className="text-[11px] text-blue-300/90 leading-relaxed font-medium">
                                    Zu 'John Doe' existieren 5 einzelne Notizen aus dieser Woche.
                                </p>
                                <Button variant="link" className="h-auto p-0 text-[10px] font-black text-primary uppercase tracking-widest">Zusammenfassen</Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Dialog open={!!detailNote} onOpenChange={open => !open && setDetailNote(null)}>
                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-none shadow-2xl bg-background">
                    {detailNote && (
                        <div className="flex flex-col h-full">
                            <DialogHeader className="p-6 pb-4 border-b border-border/50">
                                <div className="flex justify-between items-start">
                                    <div className="space-y-1">
                                        <DialogTitle className="text-xl font-bold">{detailNote.title}</DialogTitle>
                                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                            Erstellt {format(new Date(detailNote.createdAt), 'dd.MM.yyyy HH:mm', {locale: de})} Uhr von {detailNote.createdBy}
                                        </div>
                                    </div>
                                </div>
                            </DialogHeader>
                            <div className="p-6 space-y-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Inhalt</Label>
                                    <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-[13px] leading-relaxed whitespace-pre-wrap min-h-[200px] font-medium">
                                        {detailNote.content}
                                    </div>
                                </div>
                                
                                {detailNote.contextType && (
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Verknüpft mit</Label>
                                        <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                                            <LinkIcon className="w-4 h-4 text-primary shrink-0"/>
                                            <span className="text-[11px] font-bold text-foreground uppercase tracking-wider">{detailNote.contextType}: {detailNote.contextName || '-'}</span>
                                            <Button variant="ghost" size="sm" className="ml-auto h-7 text-[9px] font-black uppercase tracking-widest">Öffnen</Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <DialogFooter className="p-4 bg-muted/20 border-t border-border/50 gap-2 sm:justify-between items-center">
                                <p className="text-[10px] text-muted-foreground italic font-medium">Zuletzt geändert: vor wenigen Augenblicken</p>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={() => setDetailNote(null)} className="font-bold text-[11px] uppercase tracking-wider">Schließen</Button>
                                    <Button size="sm" className="font-bold text-[11px] uppercase tracking-wider px-6">Notiz bearbeiten</Button>
                                </div>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

const EmailsListView = () => {
    const [selectedFilter, setSelectedFilter] = useState('pending');
    const [detailEmail, setDetailNote] = useState<any | null>(null);

    const filteredEmails = useMemo(() => {
        return mockEmails.filter(e => {
            if (selectedFilter === 'all') return true;
            if (selectedFilter === 'new') return e.status === 'Neu eingegangen';
            if (selectedFilter === 'pending') return e.status === 'Antwort offen';
            if (selectedFilter === 'critical') return e.subject.toLowerCase().includes('dringend') || e.status === 'Neu eingegangen';
            if (selectedFilter === 'done') return e.status === 'Beantwortet';
            return true;
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [selectedFilter]);

    const stats = {
        today: mockEmails.filter(e => isToday(new Date(e.createdAt))).length,
        unread: mockEmails.filter(e => e.status === 'Neu eingegangen').length,
        critical: mockEmails.filter(e => e.subject.toLowerCase().includes('dringend')).length,
        pending: mockEmails.filter(e => e.status === 'Antwort offen').length,
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Neu eingegangen': return "bg-blue-500/10 text-blue-400 border-blue-500/20";
            case 'Antwort offen': return "bg-amber-500/10 text-amber-400 border-amber-500/20";
            case 'Beantwortet': return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20";
            default: return "bg-muted";
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Neue Sales-Mails</p>
                    <p className="text-4xl font-bold mt-2 font-mono text-primary">{stats.today}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Ungelesen</p>
                    <p className="text-4xl font-bold mt-2 font-mono text-blue-400">{stats.unread}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative border-l-4 border-l-rose-500/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kritisch</p>
                    <p className="text-4xl font-bold mt-2 font-mono text-rose-400">{stats.critical}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Antwort ausstehend</p>
                    <p className="text-4xl font-bold mt-2 font-mono text-amber-400">{stats.pending}</p>
                </Card>
            </div>

            <Card className="bg-blue-500/5 border-blue-500/20 overflow-hidden relative">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm text-blue-300 flex items-center gap-2 uppercase tracking-widest">
                        <Sparkles className="w-4 h-4 text-blue-400 shrink-0"/> KI-Hinweise zu E-Mails
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Dringlichkeit</p>
                        <p className="text-[11px] text-blue-300/90 leading-relaxed font-medium">
                            Kunde 'Innovate GmbH' wartet seit 3 Tagen auf eine Antwort zu seiner Rechnungsfrage.
                        </p>
                        <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold uppercase border-blue-500/30 text-blue-300">Aufgabe anlegen</Button>
                            <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold uppercase border-blue-500/30 text-blue-300">In Q-Mail antworten</Button>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Kontext-Check</p>
                        <p className="text-[11px] text-blue-300/90 leading-relaxed font-medium">
                            In der E-Mail von 'Global Exports' wurde eine Preisdiskussion erkannt. Abschlussrelevanz: Hoch.
                        </p>
                        <Button variant="link" className="h-auto p-0 text-[10px] font-black text-primary uppercase tracking-widest">Deal 'Logistik-Suite' öffnen</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
                    <div className="flex flex-wrap items-center gap-2">
                        {['all', 'new', 'pending', 'critical', 'done'].map(f => (
                            <button
                                key={f}
                                onClick={() => setSelectedFilter(f)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border",
                                    selectedFilter === f 
                                        ? "bg-primary border-primary text-primary-foreground shadow-lg"
                                        : "bg-muted border-transparent text-muted-foreground hover:border-border"
                                )}
                            >
                                {f === 'all' ? 'Alle' : f === 'new' ? 'Neu' : f === 'pending' ? 'Antwort ausstehend' : f === 'critical' ? 'Kritisch' : 'Abgeschlossen'}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Mail className="w-3 h-3 mr-2"/> In Q-Mail öffnen</Button>
                </div>

                <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Verkaufsrelevante E-Mails</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {filteredEmails.map(email => (
                            <Card key={email.id} className="p-4 hover:border-primary/40 transition-all group overflow-hidden relative cursor-pointer" onClick={() => setDetailNote(email)}>
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-3 mb-1">
                                            <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 border border-border/50">
                                                {email.direction === 'Eingehend' ? <PhoneIncoming className="w-4 h-4 text-blue-400"/> : <PhoneOutgoing className="w-4 h-4 text-emerald-400"/>}
                                            </div>
                                            <div className="min-w-0">
                                                <h4 className="font-bold text-foreground text-sm truncate">{email.contactName}</h4>
                                                <p className="text-[10px] text-muted-foreground uppercase font-black truncate">{email.companyName}</p>
                                            </div>
                                            <Badge variant="outline" className={cn("text-[9px] font-black uppercase ml-auto h-5 px-2", getStatusColor(email.status))}>
                                                {email.status}
                                            </Badge>
                                        </div>
                                        <div className="ml-11 mt-2">
                                            <p className="font-bold text-foreground text-[13px] line-clamp-1">{email.subject}</p>
                                            <p className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">{email.aiSuggestion?.analysis || 'Analyse läuft...'}</p>
                                            <div className="flex flex-wrap items-center gap-3 mt-3">
                                                <span className="text-[10px] text-muted-foreground font-mono font-bold tracking-tighter">{formatDistanceToNow(new Date(email.createdAt), { addSuffix: true, locale: de })}</span>
                                                <Badge variant="outline" className="text-[9px] font-black uppercase bg-primary/5 border-transparent text-primary/80 gap-1.5 h-5">
                                                    <LinkIcon className="w-2.5 h-2.5"/> {email.contextName}
                                                </Badge>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><ArrowUpRight className="w-4 h-4"/></Button>
                                        <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase px-3">Öffnen</Button>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={!!detailEmail} onOpenChange={open => !open && setDetailNote(null)}>
                <DialogContent className="sm:max-w-[700px] p-0 overflow-hidden bg-background">
                    {detailEmail && (
                        <div className="flex flex-col h-full">
                            <DialogHeader className="p-6 pb-4 border-b border-border/50">
                                <div className="space-y-1">
                                    <DialogTitle className="text-xl font-bold">{detailEmail.subject}</DialogTitle>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                        Von: {detailEmail.contactName} ({detailEmail.companyName}) • {format(new Date(detailEmail.createdAt), 'dd.MM.yyyy HH:mm', {locale: de})}
                                    </div>
                                </div>
                            </DialogHeader>
                            <ScrollArea className="flex-1 max-h-[500px]">
                                <div className="p-6 space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Nachricht</Label>
                                        <div className="p-4 rounded-xl bg-muted/30 border border-border/50 text-sm leading-relaxed font-medium text-foreground/90 italic">
                                            "Hallo zusammen, vielen Dank für den Termin gestern. Wir haben intern noch einmal über das Angebot für das Phoenix-Projekt gesprochen. Könnten wir die Laufzeit ggf. auf 24 Monate verlängern? Beste Grüße, {detailEmail.contactName.split(' ')[0]}"
                                        </div>
                                    </div>
                                    
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Kontext</Label>
                                            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                                                <Handshake className="w-4 h-4 text-primary shrink-0"/>
                                                <span className="text-[11px] font-bold text-foreground uppercase truncate">{detailEmail.contextName}</span>
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Status</Label>
                                            <Badge variant="outline" className={cn("w-full justify-center h-9 text-[10px] font-black uppercase", getStatusColor(detailEmail.status))}>
                                                {detailEmail.status}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </ScrollArea>
                            <DialogFooter className="p-4 bg-muted/20 border-t border-border/50 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" className="font-bold text-[10px] uppercase tracking-wider"><CheckSquare className="w-3.5 h-3.5 mr-2"/> Aufgabe erstellen</Button>
                                <Button variant="outline" size="sm" className="font-bold text-[10px] uppercase tracking-wider"><CheckCircle2 className="w-3.5 h-3.5 mr-2"/> Als erledigt markieren</Button>
                                <Button size="sm" className="font-bold text-[10px] uppercase tracking-wider ml-auto"><Mail className="w-3.5 h-3.5 mr-2"/> In Q-Mail antworten</Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

const CallsListView = () => {
    const [selectedFilter, setSelectedFilter] = useState('pending');
    const [detailCall, setDetailCall] = useState<any | null>(null);

    const filteredCalls = useMemo(() => {
        return mockCalls.filter(c => {
            if (selectedFilter === 'all') return true;
            if (selectedFilter === 'verpasst') return c.type === 'Verpasst';
            if (selectedFilter === 'pending') return c.status === 'Rückruf offen';
            if (selectedFilter === 'customer') return c.contactName && c.companyName;
            if (selectedFilter === 'done') return c.status === 'Erfolgreich geführt';
            return true;
        }).sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [selectedFilter]);

    const stats = {
        totalToday: mockCalls.filter(c => isToday(new Date(c.createdAt))).length,
        missed: mockCalls.filter(c => c.type === 'Verpasst').length,
        pending: mockCalls.filter(c => c.status === 'Rückruf offen').length,
        customer: mockCalls.filter(c => c.contactName && c.companyName).length
    };

    const getCallIcon = (type: string) => {
        if (type === 'Verpasst') return <PhoneMissed className="w-4 h-4 text-rose-400"/>;
        if (type === 'Eingehend') return <PhoneIncoming className="w-4 h-4 text-blue-400"/>;
        return <PhoneOutgoing className="w-4 h-4 text-emerald-400"/>;
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500" id="qhub-reports">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Anrufe heute</p>
                    <p className="text-4xl font-bold mt-2 font-mono text-primary">{stats.totalToday || 'Keine'}</p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative border-l-4 border-l-rose-500/50">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Verpasste Anrufe</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", stats.missed > 0 ? "text-rose-400" : "text-muted-foreground")}>
                        {stats.missed || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Rückrufe offen</p>
                    <p className={cn("text-4xl font-bold mt-2 font-mono", stats.pending > 0 ? "text-amber-400" : "text-muted-foreground")}>
                        {stats.pending || 'Keine'}
                    </p>
                </Card>
                <Card className="p-5 flex flex-col justify-between overflow-hidden relative">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Kundenanrufe</p>
                    <p className="text-4xl font-bold mt-2 font-mono text-blue-400">{stats.customer || 'Keine'}</p>
                </Card>
            </div>

            <Card className="bg-blue-500/5 border-blue-500/20 overflow-hidden relative">
                <CardHeader className="p-4 pb-2">
                    <CardTitle className="text-sm text-blue-300 flex items-center gap-2 uppercase tracking-widest">
                        <Sparkles className="w-4 h-4 text-blue-400 shrink-0"/> KI-Hinweise zu Anrufen
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Nachbearbeitung</p>
                        <p className="text-[11px] text-blue-300/90 leading-relaxed font-medium">
                            Der Anruf von 'Max Mustermann' (vor 1,5 Std.) wurde noch nicht mit einer Notiz versehen.
                        </p>
                        <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold uppercase border-blue-500/30 text-blue-300">Notiz hinzufügen</Button>
                            <Button variant="outline" size="sm" className="h-7 text-[10px] font-bold uppercase border-blue-500/30 text-blue-300">Aufgabe anlegen</Button>
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <p className="text-[10px] font-black uppercase text-blue-200 tracking-widest">Priorität</p>
                        <p className="text-[11px] text-blue-300/90 leading-relaxed font-medium">
                            Ein verpasster Anruf von 'Peter Panik' (Deal-relevant) erfordert zeitnahen Rückruf.
                        </p>
                        <Button variant="link" className="h-auto p-0 text-[10px] font-black text-primary uppercase tracking-widest">In Q-Sales zurückrufen</Button>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 px-1">
                    <div className="flex flex-wrap items-center gap-2">
                        {['all', 'verpasst', 'pending', 'customer', 'done'].map(f => (
                            <button
                                key={f}
                                onClick={() => setSelectedFilter(f)}
                                className={cn(
                                    "px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all border",
                                    selectedFilter === f 
                                        ? "bg-primary border-primary text-primary-foreground shadow-lg"
                                        : "bg-muted border-transparent text-muted-foreground hover:border-border"
                                )}
                            >
                                {f === 'all' ? 'Alle' : f === 'verpasst' ? 'Verpasst' : f === 'pending' ? 'Rückruf offen' : f === 'customer' ? 'Kundenanrufe' : 'Erledigt'}
                            </button>
                        ))}
                    </div>
                    <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase tracking-widest"><Phone className="w-3 h-3 mr-2"/> In Q-Sales öffnen</Button>
                </div>

                <div className="space-y-3">
                    <h3 className="text-[10px] font-black uppercase text-muted-foreground tracking-widest px-1">Letzte Anrufe</h3>
                    <div className="grid grid-cols-1 gap-3">
                        {filteredCalls.map(call => (
                            <Card key={call.id} className="p-4 hover:border-primary/40 transition-all group overflow-hidden relative cursor-pointer" onClick={() => setDetailCall(call)}>
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0 border border-border/50 shadow-inner">
                                            {getCallIcon(call.type)}
                                        </div>
                                        <div className="min-w-0">
                                            <div className="flex items-center gap-2 mb-0.5">
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{call.type}</span>
                                                {call.duration && (
                                                    <>
                                                        <span className="text-[10px] text-muted-foreground/50">•</span>
                                                        <span className="text-[10px] text-muted-foreground font-mono font-bold">{call.duration}</span>
                                                    </>
                                                )}
                                            </div>
                                            <h4 className="font-bold text-foreground text-sm truncate">{call.contactName || 'Unbekannter Anrufer'}</h4>
                                            <div className="flex items-center gap-3 mt-1">
                                                <span className="text-[10px] text-muted-foreground font-mono font-bold tracking-tighter">{formatDistanceToNow(new Date(call.createdAt), { addSuffix: true, locale: de })}</span>
                                                {call.contextName && (
                                                    <Badge variant="outline" className="text-[9px] font-black uppercase bg-primary/5 border-transparent text-primary/80 gap-1.5 h-5">
                                                        <LinkIcon className="w-2.5 h-2.5"/> {call.contextName}
                                                    </Badge>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0">
                                        <Badge variant="outline" className={cn(
                                            "text-[9px] font-black uppercase h-5 px-2",
                                            call.status === 'Rückruf offen' ? "bg-amber-500/10 text-amber-400 border-amber-500/20" : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                                        )}>
                                            {call.status}
                                        </Badge>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button variant="ghost" size="icon" className="h-8 w-8"><FilePen className="w-4 h-4"/></Button>
                                            <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase px-3">Öffnen</Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>

            <Dialog open={!!detailCall} onOpenChange={open => !open && setDetailCall(null)}>
                <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-background">
                    {detailCall && (
                        <div className="flex flex-col h-full">
                            <DialogHeader className="p-6 pb-4 border-b border-border/50">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        {getCallIcon(detailCall.type)}
                                        <DialogTitle className="text-xl font-bold">{detailCall.contactName || 'Unbekannt'}</DialogTitle>
                                    </div>
                                    <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">
                                        {detailCall.companyName || 'Keine Firma'} • {format(new Date(detailCall.createdAt), 'dd.MM.yyyy HH:mm', {locale: de})} Uhr
                                    </div>
                                </div>
                            </DialogHeader>
                            <ScrollArea className="flex-1 max-h-[500px]">
                                <div className="p-6 space-y-6">
                                    <div className="grid grid-cols-2 gap-4 text-center">
                                        <Card className="p-3 bg-muted/30">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Dauer</Label>
                                            <p className="font-mono font-bold mt-1">{detailCall.duration || '--:--'}</p>
                                        </Card>
                                        <Card className="p-3 bg-muted/30">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Status</Label>
                                            <p className={cn("text-[11px] font-bold uppercase mt-1", detailCall.status === 'Rückruf offen' ? 'text-amber-400' : 'text-emerald-400')}>{detailCall.status}</p>
                                        </Card>
                                    </div>

                                    {detailCall.contextName && (
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Verknüpfter Kontext</Label>
                                            <div className="flex items-center gap-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                                                <Handshake className="w-4 h-4 text-primary shrink-0"/>
                                                <span className="text-[11px] font-bold text-foreground uppercase truncate">{detailCall.contextName}</span>
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">Gesprächsnotiz</Label>
                                        <Textarea placeholder="Notiz zum Gespräch hinzufügen..." className="bg-input min-h-[100px] text-sm resize-none" />
                                    </div>
                                </div>
                            </ScrollArea>
                            <DialogFooter className="p-4 bg-muted/20 border-t border-border/50 flex flex-wrap gap-2">
                                <Button variant="outline" size="sm" className="font-bold text-[10px] uppercase tracking-wider"><CheckSquare className="w-3.5 h-3.5 mr-2"/> Aufgabe erstellen</Button>
                                <Button variant="outline" size="sm" className="font-bold text-[10px] uppercase tracking-wider"><FilePen className="w-3.5 h-3.5 mr-2"/> Notiz speichern</Button>
                                <Button size="sm" className="font-bold text-[10px] uppercase tracking-wider ml-auto"><Phone className="w-3.5 h-3.5 mr-2"/> In Q-Sales öffnen</Button>
                            </DialogFooter>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

// --- Reporting Tabs ---

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
            <CardContent className="flex items-center justify-around flex-wrap gap-4">
                {uebersicht.salesFlow.map((step, index) => (
                    <React.Fragment key={step.stage}>
                        <div className="text-center">
                            <p className="text-sm font-bold text-muted-foreground">{step.stage}</p>
                            <p className="text-3xl font-bold">{step.value}</p>
                        </div>
                        {index < uebersicht.salesFlow.length - 1 && (
                            <div className="text-center">
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
                <CardDescription>Deals, die gerade drohen zu kippen.</CardDescription>
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
                         <RechartsBarChart data={learnings.lostReasonData} layout="vertical" margin={{left: 20}}>
                             <RechartsXAxis type="number" hide />
                             <RechartsYAxis dataKey="reason" type="category" tickLine={false} axisLine={false} tick={{ fill: 'hsl(var(--foreground))' }}/>
                             <RechartsTooltip content={<ChartTooltipContent />} />
                             <RechartsBar dataKey="count" fill="hsl(var(--primary))" radius={4} />
                         </RechartsBarChart>
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
                    <SelectTrigger className="w-full md:w-[180px] bg-input font-bold text-xs uppercase"><SelectValue /></SelectTrigger>
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
};

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
    <div className="flex h-full min-h-[calc(100vh-10rem)] overflow-hidden" id="qhub-reports">
        <aside className="w-56 border-r border-border pr-4 space-y-1 shrink-0">
            <p className="px-3 pb-2 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Q-Hub</p>
            {modules.map((mod) => {
                const Icon = mod.icon;
                return (
                    <Button
                        key={mod.name}
                        variant={activeModule === mod.name ? 'secondary' : 'ghost'}
                        onClick={() => setActiveModule(mod.name)}
                        className="w-full justify-start text-sm font-bold h-9"
                    >
                        <Icon className="mr-2 h-4 w-4 shrink-0" />
                        {mod.name}
                    </Button>
                )
            })}
        </aside>

        <main className="flex-1 pl-6 space-y-6 overflow-hidden flex flex-col min-w-0">
             <header className="flex justify-between items-center gap-4 shrink-0">
                 <div>
                    <h1 className="text-3xl font-bold text-foreground tracking-tight">Q-Hub</h1>
                    <p className="text-muted-foreground text-sm font-medium">Zentrale für Kunden, Vertrieb & Service</p>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="relative hidden lg:block w-72">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input type="text" placeholder="Suchen..." className="pl-9 bg-input text-xs font-bold uppercase h-9 border-transparent focus-visible:ring-primary/30" />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                           <Button className="h-9 px-4 font-black uppercase text-xs tracking-wider"><Plus className="mr-2 h-4 w-4" /> Erstellen</Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                            <DropdownMenuItem className="font-bold text-xs uppercase">Neuer Kontakt</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold text-xs uppercase">Neue Firma</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold text-xs uppercase">Neuer Deal</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <ScrollArea className="flex-1 -mx-2 px-2">
                <div className="animate-in fade-in duration-300 pb-10">
                    {renderModule()}
                </div>
            </ScrollArea>
        </main>
    </div>
  );
}