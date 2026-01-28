
'use client';

import { useState, useMemo, useEffect, type FormEvent } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  PhoneCall,
  UserCheck,
  CalendarPlus,
  Percent,
  MailQuestion,
  Search,
  Activity,
  Phone,
  Calendar,
  CheckCircle2,
  XCircle,
  Sparkles,
  Flame,
  FilePen,
  MessageSquarePlus,
  Mail,
  BrainCircuit,
  User,
  History,
  X,
  Bot,
  Info,
  ChevronDown,
  GitBranch,
  Workflow,
  AlertTriangle,
  TrendingUp,
  Clock,
  Briefcase,
  Plus,
  Settings,
  Repeat,
  MoreVertical,
  Star,
  BarChart2,
} from 'lucide-react';
import { qsalesLeads as allLeads, salesKpiGroups, qSalesSystemViews, mockSequences } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useUser } from '@/firebase';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '@/components/ui/collapsible';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

type Lead = (typeof allLeads)[0];
type Sequence = (typeof mockSequences)[0];

const probabilityLabelColors: { [key: string]: string } = {
    'Sehr hoch': 'text-emerald-400',
    'Hoch': 'text-emerald-500',
    'Mittel': 'text-amber-400',
    'Niedrig': 'text-rose-400',
}

const lostReasonCodes = [
    { code: 'PRICE_TOO_HIGH', label: 'Preis zu hoch' },
    { code: 'NO_BUDGET', label: 'Kein Budget' },
    { code: 'NO_DECISION_MAKER', label: 'Entscheider nicht erreicht' },
    { code: 'TIMING', label: 'Falscher Zeitpunkt' },
    { code: 'COMPETITOR', label: 'Wettbewerber gewählt' },
    { code: 'NO_NEED', label: 'Kein Bedarf erkannt' },
    { code: 'NO_RESPONSE', label: 'Keine Reaktion' },
    { code: 'INTERNAL', label: 'Interne Gründe' },
    { code: 'OTHER', label: 'Sonstiges' },
];


const SalesFocusHeader = ({ leads, onLeadSelect }: { leads: Lead[], onLeadSelect: (lead: Lead | null) => void }) => {
    const top3Leads = [...leads].sort((a,b) => b.aiRecommendation.probability - a.aiRecommendation.probability).slice(0,3);
    const overdueLeads = leads.filter(l => l.nextAction.includes('Überfällig'));
    const todayAppointments = leads.filter(l => l.nextAction.includes('Heute') && l.status === 'Termin gelegt');

    return (
        <Card className="p-4">
             <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-3">Dein heutiger Sales-Fokus</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                 <div className="space-y-2">
                     <p className="text-xs font-bold text-foreground flex items-center gap-2"><Flame className="w-4 h-4 text-rose-400"/>Top 3 Leads</p>
                     {top3Leads.map(lead => (
                         <Button key={lead.id} variant="ghost" className="w-full justify-start h-auto py-1 px-2 text-left" onClick={() => onLeadSelect(lead)}>
                             {lead.name} <span className="text-muted-foreground ml-auto text-xs">{lead.aiRecommendation.probability}%</span>
                         </Button>
                     ))}
                 </div>
                 <div className="space-y-2">
                     <p className="text-xs font-bold text-foreground flex items-center gap-2"><Phone className="w-4 h-4 text-amber-400"/>Überfällige Kontakte</p>
                     {overdueLeads.slice(0,3).map(lead => (
                          <Button key={lead.id} variant="ghost" className="w-full justify-start h-auto py-1 px-2 text-left" onClick={() => onLeadSelect(lead)}>
                             {lead.name}
                         </Button>
                     ))}
                 </div>
                 <div className="space-y-2">
                     <p className="text-xs font-bold text-foreground flex items-center gap-2"><Calendar className="w-4 h-4 text-blue-400"/>Heutige Termine</p>
                     {todayAppointments.slice(0,3).map(lead => (
                           <Button key={lead.id} variant="ghost" className="w-full justify-start h-auto py-1 px-2 text-left" onClick={() => onLeadSelect(lead)}>
                             {lead.name}
                         </Button>
                     ))}
                 </div>
             </div>
        </Card>
    )
}

const LeadsView = ({ leads, onLeadSelect, selectedLead }: { leads: Lead[], onLeadSelect: (lead: Lead | null) => void, selectedLead: Lead | null }) => {
    return (
        <Table>
            <TableHeader>
            <TableRow>
                <TableHead className="w-1/3">Lead</TableHead>
                <TableHead>Nächste Aktion</TableHead>
                <TableHead>Priorität</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right w-[150px]">Aktion</TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            {leads.map(lead => (
                <TableRow 
                key={lead.id} 
                onClick={() => onLeadSelect(lead)}
                className={cn("cursor-pointer", selectedLead?.id === lead.id && 'bg-accent')}
                >
                <TableCell>
                    <p className="font-bold text-foreground text-sm">{lead.name}</p>
                    <p className="text-xs text-muted-foreground">{lead.company}</p>
                    <p className="text-[10px] text-blue-400 italic mt-1">{lead.kiHint}</p>
                </TableCell>
                <TableCell className="text-sm font-bold">{lead.nextAction}</TableCell>
                <TableCell><Badge variant="outline" className={cn("text-xs font-bold", lead.priority === 'Hoch' ? 'border-rose-500/50 text-rose-400' : lead.priority === 'Mittel' ? 'border-amber-500/50 text-amber-400' : 'border-slate-500/50 text-slate-400')}>{lead.priority}</Badge></TableCell>
                <TableCell><Badge variant="outline" className={cn("text-[10px] uppercase font-bold", lead.status === 'Neu' ? 'bg-blue-500/20 text-blue-400' : 'bg-muted')}>{lead.status}</Badge></TableCell>
                <TableCell className="text-right">
                    <Button variant="default" size="sm" className="h-8">
                        <Phone className="w-3.5 h-3.5 mr-2" /> Jetzt anrufen
                    </Button>
                </TableCell>
                </TableRow>
            ))}
            </TableBody>
        </Table>
    )
}

const LeadDetailPanel = ({ lead, onClose }: { lead: Lead | null, onClose: () => void }) => {
    const [isCloseDealOpen, setIsCloseDealOpen] = useState(false);
    const [isEnrollSequenceOpen, setIsEnrollSequenceOpen] = useState(false);

    if (!lead) return null;
    
    return (
        <>
        <Card className="p-4 sticky top-24">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-foreground">Lead-Kontext</h3>
                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={onClose}>
                    <X className="w-4 h-4"/>
                </Button>
            </div>
            
            <ScrollArea className="max-h-[calc(100vh-15rem)]">
              <div className="space-y-4 pr-2">
                  <Card className="p-4 bg-muted/50">
                      <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2"><User className="w-4 h-4"/> Kurzprofil</h4>
                       <p className="font-bold text-foreground text-lg">{lead.name}</p>
                       <p className="text-sm text-muted-foreground -mt-1">{lead.company}</p>
                       <div className="text-xs space-y-1 mt-2 text-muted-foreground">
                           <p>{lead.profile.email}</p>
                           <p>{lead.profile.phone}</p>
                       </div>
                       <p className="text-[10px] text-muted-foreground mt-2">Quelle: <span className="font-bold">{lead.profile.source}</span></p>
                  </Card>

                   <Card className="p-4 bg-blue-500/5 border-blue-500/10">
                      <h4 className="text-xs font-bold uppercase text-blue-400 mb-3 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> KI-Sales-Briefing</h4>
                      <div className="space-y-4 text-sm">
                          <div>
                              <p className="text-xs font-bold text-foreground">Erkannter Bedarf</p>
                              <p className="text-xs text-muted-foreground">{lead.aiRecommendation.bedarf}</p>
                          </div>
                           <div>
                              <p className="text-xs font-bold text-foreground">Erwartete Einwände</p>
                              <ul className="text-xs text-muted-foreground list-disc pl-4">
                                  {lead.aiRecommendation.einwaende.map((e,i) => <li key={i}>{e}</li>)}
                              </ul>
                          </div>
                           <div>
                              <p className="text-xs font-bold text-foreground">Empfohlener Gesprächseinstieg</p>
                              <p className="text-xs text-muted-foreground italic">"{lead.aiRecommendation.gespraechseinstieg}"</p>
                          </div>
                          <div>
                              <p className="text-xs font-bold text-foreground">Abschlusswahrscheinlichkeit</p>
                              <p className={`text-lg font-bold ${probabilityLabelColors[lead.aiRecommendation.probabilityLabel]}`}>{lead.aiRecommendation.probability}% ({lead.aiRecommendation.probabilityLabel})</p>
                          </div>
                      </div>
                  </Card>
                   
                  <Tabs defaultValue="actions">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="actions">Aktionen</TabsTrigger>
                        <TabsTrigger value="history">Historie</TabsTrigger>
                    </TabsList>
                    <TabsContent value="actions" className="mt-4">
                        <div className="grid grid-cols-2 gap-2 text-center">
                            <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Phone className="w-4 h-4"/>Anrufen</Button>
                            <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><MessageSquarePlus className="w-4 h-4"/>Notiz</Button>
                            <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Mail className="w-4 h-4"/>E-Mail</Button>
                            <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Calendar className="w-4 h-4"/>Termin</Button>
                            <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1 bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20" onClick={() => setIsEnrollSequenceOpen(true)}><Repeat className="w-4 h-4"/>Sequence</Button>
                            <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><MoreVertical className="w-4 h-4"/>Mehr</Button>
                        </div>
                         <Button variant="destructive" className="w-full mt-4" onClick={() => setIsCloseDealOpen(true)}>Deal schließen</Button>
                    </TabsContent>
                     <TabsContent value="history" className="mt-4">
                       <p className="text-xs text-muted-foreground italic text-center p-4">Aktivitätshistorie wird hier angezeigt.</p>
                     </TabsContent>
                  </Tabs>

              </div>
            </ScrollArea>
        </Card>
        <CloseLeadDialog lead={lead} open={isCloseDealOpen} onOpenChange={setIsCloseDealOpen} />
        <EnrollSequenceDialog lead={lead} open={isEnrollSequenceOpen} onOpenChange={setIsEnrollSequenceOpen} />
        </>
    )
}

const SequencesView = () => {
    const [isBuilderOpen, setIsBuilderOpen] = useState(false);
    
    return (
        <>
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle>Sales Sequences</CardTitle>
                        <CardDescription>Automatisierte Follow-up-Kampagnen zur Lead-Ansprache.</CardDescription>
                    </div>
                    <Button onClick={() => setIsBuilderOpen(true)}><Plus className="w-4 h-4 mr-2"/> Neue Sequence</Button>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Schritte</TableHead>
                                <TableHead>Sichtbarkeit</TableHead>
                                <TableHead>Erstellt von</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockSequences.map(seq => (
                                <TableRow key={seq.id} className="cursor-pointer">
                                    <TableCell className="font-medium">{seq.name}</TableCell>
                                    <TableCell>{seq.steps}</TableCell>
                                    <TableCell><Badge variant="outline">{seq.scope}</Badge></TableCell>
                                    <TableCell>{seq.createdBy}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
            <SequenceBuilderDialog open={isBuilderOpen} onOpenChange={setIsBuilderOpen} />
        </>
    )
}

const SequenceBuilderDialog = ({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Neue Sequence erstellen (V1)</DialogTitle>
                    <DialogDescription>Definieren Sie eine einfache, automatisierte Abfolge von Aktionen.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2"><Label htmlFor="seq-name">Name</Label><Input id="seq-name" placeholder="z.B. Kaltakquise Q1" className="bg-input"/></div>
                    <div className="space-y-2"><Label>Sichtbarkeit</Label><Select defaultValue="private"><SelectTrigger className="bg-input"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="private">Nur ich</SelectItem><SelectItem value="team">Team</SelectItem></SelectContent></Select></div>
                    <p className="text-sm font-bold pt-4 border-t border-border">Schritte</p>
                    <div className="space-y-3 p-3 bg-muted/50 rounded-lg border">
                        <div className="flex items-center gap-2"><Label className="w-20">Tag 1</Label><Select defaultValue="email"><SelectTrigger className="bg-input"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="email">E-Mail</SelectItem><SelectItem value="call">Anruf (Aufgabe)</SelectItem></SelectContent></Select></div>
                        <div className="flex items-center gap-2"><Label className="w-20">Tag 3</Label><Select defaultValue="call"><SelectTrigger className="bg-input"><SelectValue/></SelectTrigger><SelectContent><SelectItem value="email">E-Mail</SelectItem><SelectItem value="call">Anruf (Aufgabe)</SelectItem></SelectContent></Select></div>
                    </div>
                     <Button variant="outline" size="sm">Schritt hinzufügen</Button>
                </div>
                <DialogFooter><Button>Sequence speichern</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    )
};

const EnrollSequenceDialog = ({ lead, open, onOpenChange }: { lead: Lead, open: boolean, onOpenChange: (open: boolean) => void }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>In Sequence aufnehmen</DialogTitle>
                    <DialogDescription>{lead.name} einer Sequence hinzufügen.</DialogDescription>
                </DialogHeader>
                <div className="py-4 space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="enroll-seq">Sequence</Label>
                        <Select><SelectTrigger id="enroll-seq" className="bg-input"><SelectValue placeholder="Sequence auswählen..."/></SelectTrigger>
                        <SelectContent>{mockSequences.map(s => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}</SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter><Button>Aufnehmen</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

const CloseLeadDialog = ({ lead, open, onOpenChange }: { lead: Lead, open: boolean, onOpenChange: (open: boolean) => void }) => {
    const [status, setStatus] = useState<'won' | 'lost' | null>(null);
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Deal abschließen: {lead.name}</DialogTitle>
                </DialogHeader>
                <div className="py-4 space-y-4">
                     <div className="space-y-2"><Label>Status</Label><Select onValueChange={(v: 'won'|'lost') => setStatus(v)}><SelectTrigger className="bg-input"><SelectValue placeholder="Status wählen..."/></SelectTrigger><SelectContent><SelectItem value="won">Gewonnen</SelectItem><SelectItem value="lost">Verloren</SelectItem></SelectContent></Select></div>
                     {status === 'lost' && (
                         <div className="space-y-2 animate-in fade-in">
                            <Label>Grund des Verlusts</Label>
                            <Select><SelectTrigger className="bg-input"><SelectValue placeholder="Grund wählen..."/></SelectTrigger>
                                <SelectContent>{lostReasonCodes.map(r => <SelectItem key={r.code} value={r.code}>{r.label}</SelectItem>)}</SelectContent>
                            </Select>
                            <Textarea placeholder="Optionale Notiz zum Verlust..." className="bg-input"/>
                         </div>
                     )}
                </div>
                <DialogFooter><Button disabled={!status}>Deal abschließen</Button></DialogFooter>
            </DialogContent>
        </Dialog>
    )
}


export default function QSalesPage() {
  const [activeView, setActiveView] = useState(qSalesSystemViews[0].id);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(allLeads[0]);
  const [customSmartViews, setCustomSmartViews] = useState([
      { id: 'custom-1', name: 'Meine Follow-Ups Q1', isPinned: true },
      { id: 'custom-2', name: 'Leads aus Berlin', isPinned: false },
  ]);

  const [activeMainView, setActiveMainView] = useState('leads'); // 'leads', 'sequences', 'reporting', 'settings'

  const { user } = useUser();

  const filteredLeads = useMemo(() => {
    if (!activeView.startsWith('system-')) return allLeads; // Simplified for custom views
    switch (activeView) {
      case 'system-call-now':
        return allLeads.filter(l => (l.nextAction.includes('Heute') || l.nextAction.includes('Überfällig')) && l.status !== 'Abgeschlossen' && l.status !== 'Verloren');
      case 'system-due-today':
        return allLeads.filter(l => l.nextAction.includes('Heute') && l.status !== 'Abgeschlossen' && l.status !== 'Verloren');
      case 'system-follow-ups':
        return allLeads.filter(l => l.status === 'Follow-up geplant');
      case 'system-done':
         return allLeads.filter(l => l.status === 'Abgeschlossen');
      case 'system-lost':
         return allLeads.filter(l => l.status === 'Verloren');
      case 'system-ai-priority':
        return [...allLeads].filter(l => l.status !== 'Abgeschlossen' && l.status !== 'Verloren').sort((a,b) => b.aiRecommendation.probability - a.aiRecommendation.probability);
      default:
        return allLeads.filter(l => l.status !== 'Abgeschlossen' && l.status !== 'Verloren');
    }
  }, [activeView]);

  const renderMainView = () => {
    switch (activeMainView) {
        case 'sequences':
            return <SequencesView />;
        case 'reporting':
            return <Card><CardHeader><CardTitle>Reporting</CardTitle></CardHeader><CardContent><p className="text-muted-foreground italic">Reporting-Ansicht wird hier aufgebaut.</p></CardContent></Card>;
        case 'settings':
            return <Card><CardHeader><CardTitle>Einstellungen</CardTitle></CardHeader><CardContent><div className="flex items-center space-x-2"><Switch id="advanced-view"/><Label htmlFor="advanced-view">Erweiterte Ansicht (Pro)</Label></div></CardContent></Card>;
        case 'leads':
        default:
            return (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className={cn("transition-all duration-300", selectedLead ? "lg:col-span-7" : "lg:col-span-12")}>
                    <Card>
                        <div className="p-4 border-b border-border flex justify-between items-center">
                            <h3 className="font-bold text-foreground">{qSalesSystemViews.find(v => v.id === activeView)?.name || customSmartViews.find(v => v.id === activeView)?.name} ({filteredLeads.length})</h3>
                            <div className="flex items-center gap-2">
                                <div className="relative w-48">
                                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                                    <input type="text" placeholder="Leads durchsuchen..." className="w-full bg-input rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
                                </div>
                                <Button variant="outline" size="sm" className="text-xs">Filter <ChevronDown className="w-3 h-3 ml-2"/></Button>
                            </div>
                        </div>
                        <div className="overflow-auto">
                           <LeadsView leads={filteredLeads} onLeadSelect={setSelectedLead} selectedLead={selectedLead} />
                        </div>
                    </Card>
                    </div>
                    {selectedLead && (
                         <div className="lg:col-span-5 animate-in fade-in duration-300">
                           <LeadDetailPanel lead={selectedLead} onClose={() => setSelectedLead(null)} />
                        </div>
                    )}
                </div>
            )
    }
  }

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">QSales</h1>
        <p className="text-muted-foreground">Ihre operative Vertriebsoberfläche für die tägliche Sales-Arbeit.</p>
      </header>
      
      <SalesFocusHeader leads={allLeads} onLeadSelect={setSelectedLead} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <aside className="p-2 lg:col-span-2">
            <div className="space-y-1">
                <p className="px-2 pt-1 pb-2 text-xs font-bold uppercase text-muted-foreground">SmartViews</p>
                {qSalesSystemViews.map(view => {
                    const Icon = { Flame, Calendar, BrainCircuit, Repeat, CheckCircle2, XCircle }[view.ui.icon as string] || Star;
                    return (
                        <Button 
                            key={view.id}
                            variant={activeView === view.id && activeMainView === 'leads' ? 'secondary' : 'ghost'}
                            onClick={() => { setActiveView(view.id); setActiveMainView('leads'); }}
                            className="w-full justify-start text-sm font-bold gap-2"
                        >
                           <Icon className="w-4 h-4"/> {view.name}
                        </Button>
                    );
                })}
            </div>
             <div className="space-y-1 mt-4">
                <p className="px-2 pt-1 pb-2 text-xs font-bold uppercase text-muted-foreground">Meine SmartViews</p>
                {customSmartViews.map(view => (
                    <Button 
                        key={view.id}
                        variant={activeView === view.id && activeMainView === 'leads' ? 'secondary' : 'ghost'}
                        onClick={() => { setActiveView(view.id); setActiveMainView('leads'); }}
                        className="w-full justify-start text-sm font-bold gap-2"
                    >
                        {view.name}
                    </Button>
                ))}
                 <Button variant="ghost" className="w-full justify-start text-sm font-normal text-muted-foreground gap-2">
                    <Plus className="w-4 h-4"/> SmartView erstellen
                </Button>
            </div>
            <div className="space-y-1 mt-4">
                 <p className="px-2 pt-1 pb-2 text-xs font-bold uppercase text-muted-foreground">Sales Tools</p>
                 <Button variant={activeMainView === 'sequences' ? 'secondary' : 'ghost'} onClick={() => setActiveMainView('sequences')} className="w-full justify-start text-sm font-bold gap-2"><Repeat className="w-4 h-4"/> Sequences</Button>
                 <Button variant={activeMainView === 'reporting' ? 'secondary' : 'ghost'} onClick={() => setActiveMainView('reporting')} className="w-full justify-start text-sm font-bold gap-2"><BarChart2 className="w-4 h-4"/> Reporting</Button>
                 <Button variant={activeMainView === 'settings' ? 'secondary' : 'ghost'} onClick={() => setActiveMainView('settings')} className="w-full justify-start text-sm font-bold gap-2"><Settings className="w-4 h-4"/> Einstellungen</Button>
            </div>
        </aside>

        <main className="lg:col-span-10">
          {renderMainView()}
        </main>
      </div>
    </div>
  );
}

