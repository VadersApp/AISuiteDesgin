'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/components/ui/card';
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
  ChevronDown,
  Activity,
  Phone,
  MailCheck,
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
  Info
} from 'lucide-react';
import { qsalesLeads as allLeads } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const kpis = [
  { title: 'Anrufe heute', value: '34', icon: PhoneCall },
  { title: 'Erreichte Leads', value: '12', icon: UserCheck },
  { title: 'Termine gelegt', value: '3', icon: CalendarPlus },
  { title: 'Abschlussquote', value: '25%', icon: Percent },
  { title: 'Offene Follow-ups', value: '8', icon: MailQuestion },
];

const views = [
  { name: 'Aktive Leads', icon: Activity },
  { name: 'Heute anrufen', icon: Phone },
  { name: 'Follow-ups', icon: MailCheck },
  { name: 'Termine gelegt', icon: Calendar },
  { name: 'Abgeschlossen', icon: CheckCircle2 },
  { name: 'Verloren / Kein Interesse', icon: XCircle },
  { name: 'KI-empfohlen', icon: Sparkles },
  { name: 'Priorisiert', icon: Flame },
];

const statusColors: { [key: string]: string } = {
  Neu: 'bg-blue-500/20 text-blue-400',
  Kontaktiert: 'bg-amber-500/20 text-amber-400',
  'Follow-up geplant': 'bg-purple-500/20 text-purple-400',
  'Termin gelegt': 'bg-emerald-500/20 text-emerald-400',
  Verloren: 'bg-rose-500/20 text-rose-400',
};

const priorityColors: { [key: string]: string } = {
  Hoch: 'border-rose-500/50 text-rose-400',
  Mittel: 'border-amber-500/50 text-amber-400',
  Niedrig: 'border-slate-500/50 text-slate-400',
};

type Lead = (typeof allLeads)[0];

export default function QSalesPage() {
  const [activeView, setActiveView] = useState('Aktive Leads');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(allLeads[0]);

  const filteredLeads = useMemo(() => {
    switch (activeView) {
      case 'Heute anrufen':
        return allLeads.filter(l => l.nextAction.includes('Heute'));
      case 'Follow-ups':
        return allLeads.filter(l => l.status === 'Follow-up geplant');
      case 'Termine gelegt':
         return allLeads.filter(l => l.status === 'Termin gelegt');
      case 'Abgeschlossen':
         return allLeads.filter(l => l.status === 'Abgeschlossen');
      case 'Verloren / Kein Interesse':
         return allLeads.filter(l => l.status === 'Verloren');
      case 'KI-empfohlen':
        return [...allLeads].sort((a,b) => b.aiRecommendation.probability - a.aiRecommendation.probability);
      case 'Priorisiert':
        return [...allLeads].sort((a,b) => {
            const prioOrder = { 'Hoch': 3, 'Mittel': 2, 'Niedrig': 1};
            return prioOrder[b.priority] - prioOrder[a.priority];
        });
      case 'Aktive Leads':
      default:
        return allLeads.filter(l => l.status !== 'Abgeschlossen' && l.status !== 'Verloren');
    }
  }, [activeView]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">QSales</h1>
        <p className="text-muted-foreground">Ihre operative Vertriebsoberfläche für die tägliche Sales-Arbeit.</p>
      </header>
      
      {/* Topbar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {kpis.map(kpi => {
          const Icon = kpi.icon;
          return (
            <Card key={kpi.title} className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-muted rounded-lg text-muted-foreground"><Icon className="w-4 h-4" /></div>
                <div>
                    <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{kpi.title}</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar */}
        <Card className="p-2 lg:col-span-2">
            <div className="space-y-1">
            {views.map(view => {
                const Icon = view.icon;
                return (
                <Button 
                    key={view.name}
                    variant={activeView === view.name ? 'secondary' : 'ghost'}
                    onClick={() => setActiveView(view.name)}
                    className="w-full justify-start text-xs font-bold gap-2"
                >
                    <Icon className="w-4 h-4" />
                    {view.name}
                </Button>
                )
            })}
            </div>
        </Card>

        {/* Main Workspace */}
        <div className={cn("transition-all duration-300", selectedLead ? "lg:col-span-7" : "lg:col-span-10")}>
          <Card>
            <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-foreground">{activeView} ({filteredLeads.length})</h3>
                <div className="flex items-center gap-2">
                    <div className="relative w-48">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <input type="text" placeholder="Leads durchsuchen..." className="w-full bg-input rounded-md pl-9 pr-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
                    </div>
                    <Button variant="outline" size="sm" className="text-xs">Filter <ChevronDown className="w-3 h-3 ml-2"/></Button>
                </div>
            </div>
            <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Name</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Letzte Aktivität</TableHead>
                  <TableHead>Nächste Aktion</TableHead>
                  <TableHead>Priorität</TableHead>
                  <TableHead>Zuständig</TableHead>
                  <TableHead className="text-right w-[150px]">Aktionen</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLeads.map(lead => (
                  <TableRow 
                    key={lead.id} 
                    onClick={() => setSelectedLead(lead)}
                    className={cn("cursor-pointer", selectedLead?.id === lead.id && 'bg-accent')}
                    >
                    <TableCell>
                      <p className="font-bold text-foreground text-sm">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.company}</p>
                    </TableCell>
                    <TableCell><Badge variant="outline" className={cn("text-[10px] uppercase font-bold", statusColors[lead.status])}>{lead.status}</Badge></TableCell>
                    <TableCell className="text-xs">{lead.lastActivity}</TableCell>
                    <TableCell className="text-xs font-mono">{lead.nextAction}</TableCell>
                    <TableCell><Badge variant="outline" className={cn("text-xs font-bold", priorityColors[lead.priority])}>{lead.priority}</Badge></TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar className="w-6 h-6">
                          <AvatarFallback className="text-[10px] bg-muted text-muted-foreground font-bold">{lead.agentAvatar}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs font-bold text-muted-foreground">{lead.agent}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                        <Button variant="secondary" size="sm" className="h-8">
                            <Phone className="w-3.5 h-3.5 mr-2" /> Anrufen
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </Card>
        </div>

        {/* Right Detail Panel */}
        {selectedLead && (
            <div className="lg:col-span-3 animate-in fade-in duration-300">
                <Card className="p-4 sticky top-24">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="font-bold text-foreground">Lead-Kontext</h3>
                        <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => setSelectedLead(null)}>
                            <X className="w-4 h-4"/>
                        </Button>
                    </div>
                    
                    <div className="space-y-4 max-h-[calc(100vh-15rem)] overflow-y-auto custom-scrollbar pr-2">
                        {/* Short Profile */}
                        <Card className="p-4 bg-muted/50">
                            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2"><User className="w-4 h-4"/> Kurzprofil</h4>
                             <p className="font-bold text-foreground text-lg">{selectedLead.name}</p>
                             <p className="text-sm text-muted-foreground -mt-1">{selectedLead.company}</p>
                             <div className="text-xs space-y-1 mt-2 text-muted-foreground">
                                 <p>{selectedLead.profile.email}</p>
                                 <p>{selectedLead.profile.phone}</p>
                             </div>
                             <p className="text-[10px] text-muted-foreground mt-2">Quelle: <span className="font-bold">{selectedLead.profile.source}</span></p>
                        </Card>

                        {/* AI Recommendation */}
                         <Card className="p-4 bg-blue-500/5 border-blue-500/10">
                            <h4 className="text-xs font-bold uppercase text-blue-400 mb-3 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> KI-Empfehlung</h4>
                            <div className="space-y-3">
                                <div>
                                    <p className="text-xs font-bold text-foreground">Nächster Status</p>
                                    <Badge variant="outline" className="text-xs bg-background">{selectedLead.aiRecommendation.nextStatus}</Badge>
                                </div>
                                 <div>
                                    <p className="text-xs font-bold text-foreground">Abschluss-Wahrscheinlichkeit</p>
                                    <div className="flex items-center gap-2">
                                        <Progress value={selectedLead.aiRecommendation.probability} className="h-1.5" />
                                        <span className="text-xs font-mono text-foreground font-bold">{selectedLead.aiRecommendation.probability}%</span>
                                    </div>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground">Beste Kontaktzeit</p>
                                    <p className="text-xs text-muted-foreground">{selectedLead.aiRecommendation.bestTime}</p>
                                </div>
                            </div>
                        </Card>

                        {/* Actions */}
                        <Card className="p-4 bg-muted/50">
                             <div className="grid grid-cols-3 gap-2 text-center">
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><FilePen className="w-4 h-4"/>Status</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><MessageSquarePlus className="w-4 h-4"/>Notiz</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Mail className="w-4 h-4"/>E-Mail</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Calendar className="w-4 h-4"/>Termin</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Info className="w-4 h-4"/>Info</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Bot className="w-4 h-4"/>KI</Button>
                             </div>
                        </Card>


                        {/* Call History */}
                         <Card className="p-4 bg-muted/50">
                            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2"><History className="w-4 h-4"/> Anruf-Historie</h4>
                            <div className="space-y-3">
                                {selectedLead.callHistory.map((call, i) => (
                                    <div key={i} className="text-xs">
                                        <div className="flex justify-between items-center">
                                            <p className="font-bold text-foreground">{call.result}</p>
                                            <p className="text-muted-foreground font-mono">{call.date}</p>
                                        </div>
                                        <p className="text-muted-foreground">Dauer: {call.duration}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                         {/* Notes */}
                         <Card className="p-4 bg-muted/50">
                            <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2"><MessageSquarePlus className="w-4 h-4"/> Notizen</h4>
                             <div className="space-y-3">
                                {selectedLead.notes.map((note, i) => (
                                    <div key={i} className="text-xs border-l-2 border-border pl-2">
                                        <p className="text-muted-foreground italic">"{note.text}"</p>
                                        <p className="text-[10px] text-muted-foreground/70 mt-1">{note.date}</p>
                                    </div>
                                ))}
                            </div>
                        </Card>

                    </div>
                </Card>
            </div>
        )}
      </div>
    </div>
  );
}
