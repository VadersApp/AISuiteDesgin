'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { kpiMitarbeiter, topKennzahlen, chatThreads, chatMessages } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';


const modules = [
    { name: 'Übersicht', icon: LayoutDashboard },
    { name: 'Workspace', icon: Briefcase },
    { name: 'KPI-Dashboard', icon: BarChart3 },
    { name: 'Mitarbeiter', icon: Users },
    { name: 'System Admin (Q-Space)', icon: Settings },
];

const mockTasks = [
    { id: 1, title: "Q1-Report finalisieren", owner: 'Dr. Müller', status: 'Überfällig', prio: 'Hoch', due: 'Gestern' },
    { id: 2, title: "Pitch-Deck für Innovatech erstellen", owner: 'Anna Schmidt', status: 'In Arbeit', prio: 'Hoch', due: 'Heute' }
];
const mockProjects = [
    { id: 1, name: "Rollout neue CRM-Software", owner: "Ben Weber", status: "Aktiv" }
];
const mockDocuments = [
    { id: 1, title: "Unternehmensstrategie 2025", owner: "Dr. Müller", version: "2.1" }
];
const mockSops = [
    { id: 1, title: "Prozess für neue Kundenanfragen", status: "Aktiv" }
];

const ChatInbox = ({
  isOpen,
  onOpenChange,
  activeThreadId,
  onThreadSelect,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  activeThreadId: string | null;
  onThreadSelect: (threadId: string | null) => void;
}) => {
  const threads = chatThreads;
  const messages = activeThreadId ? chatMessages[activeThreadId] || [] : [];
  const activeThread = threads.find((t) => t.id === activeThreadId);

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="p-0 w-full md:w-[500px] sm:max-w-none flex flex-col">
        {activeThread ? (
          <>
            <div className="p-4 border-b border-border flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onThreadSelect(null)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h3 className="font-bold text-foreground leading-tight">
                  {activeThread.title}
                </h3>
                <p className="text-xs text-muted-foreground capitalize">
                  {activeThread.contextType}
                </p>
              </div>
            </div>
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex items-start gap-3',
                      msg.sender.name === 'Dr. Müller' && 'justify-end'
                    )}
                  >
                    {msg.sender.name !== 'Dr. Müller' && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback>
                          {msg.sender.avatar === 'Bot' ? (
                            <BotIcon className="w-4 h-4" />
                          ) : (
                            msg.sender.avatar
                          )}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-xs p-3 rounded-xl text-sm',
                        msg.type === 'system' &&
                          'text-center w-full text-xs text-muted-foreground italic',
                        msg.type === 'ai_summary' &&
                          'bg-blue-500/10 border border-blue-500/20 text-blue-300',
                        msg.type === 'user' &&
                          (msg.sender.name === 'Dr. Müller'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-muted rounded-bl-none')
                      )}
                    >
                      <p
                        className={cn(
                          'text-xs font-bold mb-1',
                          msg.sender.name === 'Dr. Müller'
                            ? 'text-primary-foreground/80'
                            : 'text-foreground/80'
                        )}
                      >
                        {msg.sender.name}
                      </p>
                      <p>{msg.text}</p>
                    </div>
                    {msg.sender.name === 'Dr. Müller' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <div className="relative">
                <Textarea
                  placeholder="Nachricht..."
                  className="bg-input pr-12"
                  rows={1}
                />
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="p-4 border-b border-border">
              <h2 className="font-bold text-lg text-foreground">Inbox</h2>
              <div className="relative mt-2">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Suchen..." className="pl-9 bg-input" />
              </div>
            </div>
            <ScrollArea className="flex-1">
              <div className="p-2 space-y-1">
                {threads.map((thread) => (
                  <div
                    key={thread.id}
                    onClick={() => onThreadSelect(thread.id)}
                    className="p-3 rounded-lg hover:bg-muted cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <p className="font-bold text-sm text-foreground line-clamp-1">
                        {thread.title}
                      </p>
                      {thread.unreadCount > 0 && (
                        <Badge className="bg-primary">{thread.unreadCount}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {thread.lastMessageSnippet}
                    </p>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border">
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Neue Nachricht
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};


const OverviewView = () => (
    <div className="space-y-6">
        <h2 className="text-xl font-bold text-foreground">Übersicht</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
                <CardHeader><CardTitle>Meine Aufgaben Heute</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">1</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Überfällige Aufgaben</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold text-rose-400">1</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Mein KPI-Status</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold text-emerald-400">95%</p></CardContent>
            </Card>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
                <CardHeader><CardTitle>Aktive Projekte</CardTitle></CardHeader>
                <CardContent>
                     <p className="text-sm text-muted-foreground">Projekt 'Rollout neue CRM-Software' ist aktiv.</p>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Letzte Aktivitäten</CardTitle></CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">Ben Weber hat das Projekt 'Rollout neue CRM-Software' aktualisiert.</p>
                </CardContent>
            </Card>
        </div>
    </div>
);

const WorkspaceView = () => (
    <div>
        <h2 className="text-xl font-bold text-foreground mb-4">Workspace</h2>
        <Tabs defaultValue="aufgaben">
            <TabsList>
                <TabsTrigger value="aufgaben">Aufgaben</TabsTrigger>
                <TabsTrigger value="projekte">Projekte</TabsTrigger>
                <TabsTrigger value="dokumente">Dokumente</TabsTrigger>
                <TabsTrigger value="sops">SOPs</TabsTrigger>
            </TabsList>
            <TabsContent value="aufgaben" className="mt-4">
                <Card><CardHeader><CardTitle>Aufgaben</CardTitle></CardHeader><CardContent>
                    <Table><TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Verantwortlicher</TableHead><TableHead>Status</TableHead><TableHead>Priorität</TableHead><TableHead>Fällig</TableHead></TableRow></TableHeader>
                        <TableBody>{mockTasks.map(t => (<TableRow key={t.id}><TableCell>{t.title}</TableCell><TableCell>{t.owner}</TableCell><TableCell>{t.status}</TableCell><TableCell>{t.prio}</TableCell><TableCell>{t.due}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
            <TabsContent value="projekte" className="mt-4">
                <Card><CardHeader><CardTitle>Projekte</CardTitle></CardHeader><CardContent>
                     <Table><TableHeader><TableRow><TableHead>Projektname</TableHead><TableHead>Verantwortlicher</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>{mockProjects.map(p => (<TableRow key={p.id}><TableCell>{p.name}</TableCell><TableCell>{p.owner}</TableCell><TableCell>{p.status}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
            <TabsContent value="dokumente" className="mt-4">
                <Card><CardHeader><CardTitle>Dokumente</CardTitle></CardHeader><CardContent>
                    <Table><TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Verantwortlicher</TableHead><TableHead>Version</TableHead></TableRow></TableHeader>
                        <TableBody>{mockDocuments.map(d => (<TableRow key={d.id}><TableCell>{d.title}</TableCell><TableCell>{d.owner}</TableCell><TableCell>{d.version}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
            <TabsContent value="sops" className="mt-4">
                <Card><CardHeader><CardTitle>SOPs</CardTitle></CardHeader><CardContent>
                    <Table><TableHeader><TableRow><TableHead>SOP-Titel</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                        <TableBody>{mockSops.map(s => (<TableRow key={s.id}><TableCell>{s.title}</TableCell><TableCell>{s.status}</TableCell></TableRow>))}</TableBody>
                    </Table>
                </CardContent></Card>
            </TabsContent>
        </Tabs>
    </div>
);

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
    
    const iconMap: { [key: string]: React.ElementType } = {
        HeartPulse, UserCheck, AlertTriangle, Flame
    }

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-xl font-bold text-foreground">KPI-Dashboard – Organisation & Leistung</h2>
                <p className="text-sm text-muted-foreground">Systembasierte Leistungsbewertung. Automatisiert. Objektiv.</p>
                <div className="mt-2">
                    <Link href="/q-space/kpi-dashboard/formeln" className="text-sm text-primary hover:underline">
                        Formeln ansehen
                    </Link>
                </div>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {topKennzahlen.map((kpi, index) => {
                    const Icon = iconMap[kpi.icon];
                    return (
                        <Link href={kpi.href} key={index}>
                            <Card className="p-4 cursor-pointer hover:bg-accent/50 transition-colors h-full">
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
                        </Link>
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
                                <TableHead>Mitarbeitertyp</TableHead>
                                <TableHead>Aktueller Z-Wert</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Trend</TableHead>
                                <TableHead>Letzte Abweichung</TableHead>
                                <TableHead>Eskalationsstatus</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {kpiMitarbeiter.map((m) => (
                                <TableRow key={m.id} className="cursor-pointer hover:bg-accent/50">
                                    <TableCell className="font-medium">
                                        <Link href={`/q-space/employees/${m.id}`} className="hover:underline">{m.name}</Link>
                                    </TableCell>
                                    <TableCell>{m.abteilung}</TableCell>
                                    <TableCell>{m.mitarbeitertyp}</TableCell>
                                    <TableCell className="font-mono font-bold">
                                         <Link href={`/q-space/employees/${m.id}`} className="hover:underline">{m.zWert}%</Link>
                                    </TableCell>
                                    <TableCell>
                                        <Link href={`/q-space/employees/${m.id}`}>
                                            <Badge className={cn("text-xs", getStatusColor(m.status))} variant="outline">{m.status}</Badge>
                                        </Link>
                                    </TableCell>
                                    <TableCell>{getTrendIcon(m.trend as any)}</TableCell>
                                    <TableCell>{m.letzteAbweichung}</TableCell>
                                    <TableCell>
                                        <Link href={`/q-space/employees/${m.id}`}>
                                            <Badge variant={m.eskalation === 'Ja' ? 'destructive' : 'secondary'}>{m.eskalation}</Badge>
                                        </Link>
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

const MitarbeiterView = () => {
    const [statusFilter, setStatusFilter] = useState('all');
    const [teamFilter, setTeamFilter] = useState('all');
    const [escalationFilter, setEscalationFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');

    const teams = useMemo(() => [...new Set(kpiMitarbeiter.map(m => m.team))], []);

    const filteredMitarbeiter = useMemo(() => {
        return kpiMitarbeiter.filter(m => {
            if (statusFilter !== 'all' && m.status !== statusFilter) return false;
            if (teamFilter !== 'all' && m.team !== teamFilter) return false;
            if (escalationFilter === 'yes' && m.eskalation !== 'Ja') return false;
            if (searchTerm && !m.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });
    }, [statusFilter, teamFilter, escalationFilter, searchTerm]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Stabil': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Beobachtung': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Warnung': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'Eskalation': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            default: return 'bg-slate-500/10 text-slate-400';
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-xl font-bold text-foreground">Mitarbeiter</h2>
                <p className="text-sm text-muted-foreground">Arbeits- und Leistungsübersicht Ihrer Mitarbeiter.</p>
            </header>
            <Card>
                <CardHeader>
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <CardTitle>Mitarbeiterübersicht</CardTitle>
                        <div className="flex items-center gap-2 flex-wrap">
                             <Input placeholder="Suchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full md:w-48 bg-input" />
                             <Select value={statusFilter} onValueChange={setStatusFilter}>
                                <SelectTrigger className="w-full md:w-auto bg-input"><SelectValue placeholder="Status" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Alle Status</SelectItem>
                                    <SelectItem value="Stabil">Stabil</SelectItem>
                                    <SelectItem value="Beobachtung">Beobachtung</SelectItem>
                                    <SelectItem value="Warnung">Warnung</SelectItem>
                                    <SelectItem value="Eskalation">Eskalation</SelectItem>
                                </SelectContent>
                             </Select>
                             <Select value={teamFilter} onValueChange={setTeamFilter}>
                                <SelectTrigger className="w-full md:w-auto bg-input"><SelectValue placeholder="Team" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Alle Teams</SelectItem>
                                    {teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                                </SelectContent>
                             </Select>
                             <Select value={escalationFilter} onValueChange={setEscalationFilter}>
                                <SelectTrigger className="w-full md:w-auto bg-input"><SelectValue placeholder="Eskalation" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">Alle</SelectItem>
                                    <SelectItem value="yes">Nur Eskalationen</SelectItem>
                                </SelectContent>
                             </Select>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Rolle</TableHead>
                                <TableHead>Team</TableHead>
                                <TableHead>Bereich</TableHead>
                                <TableHead>KPI Score</TableHead>
                                <TableHead>KPI Status</TableHead>
                                <TableHead>Aktive Aufgaben</TableHead>
                                <TableHead>Aktive Projekte</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                        {filteredMitarbeiter.map(m => (
                            <TableRow key={m.id} className="cursor-pointer hover:bg-accent/50">
                                <TableCell className="font-medium">
                                    <Link href={`/q-space/employees/${m.id}`} className="hover:underline">{m.name}</Link>
                                </TableCell>
                                <TableCell className="text-xs">{m.role}</TableCell>
                                <TableCell>{m.team}</TableCell>
                                <TableCell>{m.abteilung}</TableCell>
                                <TableCell className="font-mono font-bold text-sm">{m.zWert}%</TableCell>
                                <TableCell><Badge className={cn("text-xs", getStatusColor(m.status))} variant="outline">{m.status}</Badge></TableCell>
                                <TableCell className="text-center">{m.activeTasks}</TableCell>
                                <TableCell className="text-center">{m.activeProjects}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};


const SystemAdminView = () => {
    const adminTabs = [
        { value: 'overview', label: 'Übersicht' },
        { value: 'users', label: 'Benutzer' },
        { value: 'teams-depts', label: 'Teams & Bereiche' },
        { value: 'roles-rights', label: 'Rollen & Rechte' },
        { value: 'kpi-policies', label: 'KPI-Richtlinien' },
        { value: 'security', label: 'Sicherheit' },
        { value: 'system-health', label: 'Systemzustand' },
    ];
    return (
        <div>
            <header className="mb-6">
                <h2 className="text-xl font-bold text-foreground">System Admin (Q-Space)</h2>
                <p className="text-sm text-muted-foreground">Administrative Steuerung von Q-Space.</p>
            </header>
            <Tabs defaultValue="overview" className="w-full">
                <TabsList className="mb-4">
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
                                <div><Label>SOP-Abweichung</Label><Input type="number" defaultValue="3" className="bg-input"/></div>
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

export default function QSpacePage() {
    const [activeModule, setActiveModule] = useState(modules[0].name);

    const [isChatOpen, setIsChatOpen] = useState(false);
    const [activeChatThread, setActiveChatThread] = useState<string | null>(null);

    const renderModule = () => {
        switch (activeModule) {
            case 'Übersicht': return <OverviewView />;
            case 'Workspace': return <WorkspaceView />;
            case 'KPI-Dashboard': return <KpiDashboard />;
            case 'Mitarbeiter': return <MitarbeiterView />;
            case 'System Admin (Q-Space)': return <SystemAdminView />;
            default: return <OverviewView />;
        }
    };

  return (
    <>
    <div className="flex h-full min-h-[calc(100vh-10rem)]">
        {/* Left Sidebar for Modules */}
        <aside className="w-64 border-r border-border pr-4 space-y-1">
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
             <header className="flex justify-between items-center">
                 <div className="relative w-96">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input type="text" placeholder="Q-Space durchsuchen..." className="pl-9 bg-input" />
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
                            <DropdownMenuItem>Neue Aufgabe</DropdownMenuItem>
                            <DropdownMenuItem>Neues Projekt</DropdownMenuItem>
                            <DropdownMenuItem>Neues Dokument</DropdownMenuItem>
                             <DropdownMenuItem>Neue SOP</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </header>
            <div className="animate-in fade-in duration-300">
                {renderModule()}
            </div>
        </main>
    </div>
      <Button
        size="icon"
        onClick={() => {
          setActiveChatThread(null);
          setIsChatOpen(true);
        }}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl z-50"
      >
        <MessageSquare />
      </Button>
      <ChatInbox
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        activeThreadId={activeChatThread}
        onThreadSelect={setActiveChatThread}
      />
    </>
  );
}
