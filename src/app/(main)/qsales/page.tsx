'use client';

import { useState, useMemo, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
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
} from 'lucide-react';
import { qsalesLeads as allLeads, salesKpiGroups, qSalesSystemViews } from '@/lib/data';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { useUser } from '@/firebase';

type Lead = (typeof allLeads)[0];

const probabilityLabelColors: {[key: string]: string} = {
    'Sehr hoch': 'text-emerald-400',
    'Hoch': 'text-emerald-500',
    'Mittel': 'text-amber-400',
    'Niedrig': 'text-rose-400',
}

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

const actionViews = qSalesSystemViews.map(view => ({
    name: view.name,
    slug: view.id,
}));


export default function QSalesPage() {
  const [activeView, setActiveView] = useState(actionViews[0].slug);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(allLeads[0]);
  // In a real app, custom smart views would be fetched from Firestore
  const [customSmartViews, setCustomSmartViews] = useState([
      { id: 'custom-1', name: 'Meine Follow-Ups Q1', isPinned: true },
      { id: 'custom-2', name: 'Leads aus Berlin', isPinned: false },
  ]);

  const { user } = useUser(); // Example of using a hook from Firebase setup.

  const filteredLeads = useMemo(() => {
    // This is a simplified filtering logic. In a real app, this would use
    // the query builder to fetch data from Firestore based on the active view's filters.
    switch (activeView) {
      case 'system-call-now':
        return allLeads.filter(l => l.nextAction.includes('Heute') || l.nextAction.includes('Überfällig'));
      case 'system-due-today':
        return allLeads.filter(l => l.nextAction.includes('Heute'));
      case 'system-follow-ups':
        return allLeads.filter(l => l.status === 'Follow-up geplant');
      case 'system-done':
         return allLeads.filter(l => l.status === 'Abgeschlossen');
      case 'system-lost':
         return allLeads.filter(l => l.status === 'Verloren');
      case 'system-ai-priority':
        return [...allLeads].filter(l => l.status !== 'Abgeschlossen' && l.status !== 'Verloren').sort((a,b) => b.aiRecommendation.probability - a.aiRecommendation.probability);
      default:
        // For custom views, we'd apply their specific filters
        return allLeads.filter(l => l.status !== 'Abgeschlossen' && l.status !== 'Verloren');
    }
  }, [activeView]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">QSales</h1>
        <p className="text-muted-foreground">Ihre operative Vertriebsoberfläche für die tägliche Sales-Arbeit.</p>
      </header>
      
      <SalesFocusHeader leads={allLeads} onLeadSelect={setSelectedLead} />

      {/* KPI Groups */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(salesKpiGroups).map(([groupKey, group]) => {
            const colors: {[key: string]: string} = {'Aktivität': 'blue', 'Output': 'emerald', 'Risiko': 'amber'};
            return (
            <Card key={groupKey} className="p-4">
                <CardHeader className="p-0 mb-4">
                    <CardTitle className={`text-sm text-${colors[group.title]}-400`}>{group.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0 grid grid-cols-2 gap-4">
                    {group.kpis.map(kpi => {
                         const Icon = kpi.icon;
                         return (
                             <div key={kpi.title}>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{kpi.title}</p>
                                <p className="text-2xl font-bold text-foreground">{kpi.value}</p>
                            </div>
                         )
                    })}
                </CardContent>
            </Card>
        )})}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Sidebar */}
        <Card className="p-2 lg:col-span-2">
            <div className="space-y-1">
                <p className="px-2 pt-1 pb-2 text-xs font-bold uppercase text-muted-foreground">SmartViews</p>
                {actionViews.map(view => (
                    <Button 
                        key={view.slug}
                        variant={activeView === view.slug ? 'secondary' : 'ghost'}
                        onClick={() => setActiveView(view.slug)}
                        className="w-full justify-start text-sm font-bold gap-2"
                    >
                        {view.name}
                    </Button>
                ))}
            </div>
             <div className="space-y-1 mt-4">
                <p className="px-2 pt-1 pb-2 text-xs font-bold uppercase text-muted-foreground">Meine SmartViews</p>
                {customSmartViews.map(view => (
                    <Button 
                        key={view.id}
                        variant={activeView === view.id ? 'secondary' : 'ghost'}
                        onClick={() => setActiveView(view.id)}
                        className="w-full justify-start text-sm font-bold gap-2"
                    >
                        {view.name}
                    </Button>
                ))}
                 <Button variant="ghost" className="w-full justify-start text-sm font-normal text-muted-foreground gap-2">
                    <Plus className="w-4 h-4"/> SmartView erstellen
                </Button>
            </div>
        </Card>

        {/* Main Workspace */}
        <div className={cn("transition-all duration-300", selectedLead ? "lg:col-span-7" : "lg:col-span-10")}>
          <Card>
            <div className="p-4 border-b border-border flex justify-between items-center">
                <h3 className="font-bold text-foreground">{actionViews.find(v => v.slug === activeView)?.name || customSmartViews.find(v => v.id === activeView)?.name} ({filteredLeads.length})</h3>
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
                  <TableHead className="w-1/3">Lead</TableHead>
                  <TableHead>Nächste Aktion</TableHead>
                  <TableHead>Priorität</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right w-[150px]">Aktion</TableHead>
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

                        {/* AI Sales-Briefing */}
                         <Card className="p-4 bg-blue-500/5 border-blue-500/10">
                            <h4 className="text-xs font-bold uppercase text-blue-400 mb-3 flex items-center gap-2"><BrainCircuit className="w-4 h-4"/> KI-Sales-Briefing</h4>
                            <div className="space-y-4 text-sm">
                                <div>
                                    <p className="text-xs font-bold text-foreground">Erkannter Bedarf</p>
                                    <p className="text-xs text-muted-foreground">{selectedLead.aiRecommendation.bedarf}</p>
                                </div>
                                 <div>
                                    <p className="text-xs font-bold text-foreground">Erwartete Einwände</p>
                                    <ul className="text-xs text-muted-foreground list-disc pl-4">
                                        {selectedLead.aiRecommendation.einwaende.map((e,i) => <li key={i}>{e}</li>)}
                                    </ul>
                                </div>
                                 <div>
                                    <p className="text-xs font-bold text-foreground">Empfohlener Gesprächseinstieg</p>
                                    <p className="text-xs text-muted-foreground italic">"{selectedLead.aiRecommendation.gespraechseinstieg}"</p>
                                </div>
                                <div>
                                    <p className="text-xs font-bold text-foreground">Abschlusswahrscheinlichkeit</p>
                                    <p className={`text-lg font-bold ${probabilityLabelColors[selectedLead.aiRecommendation.probabilityLabel]}`}>{selectedLead.aiRecommendation.probability}% ({selectedLead.aiRecommendation.probabilityLabel})</p>
                                </div>
                            </div>
                        </Card>

                        {/* Actions */}
                        <Card className="p-4 bg-muted/50">
                             <div className="grid grid-cols-2 gap-2 text-center">
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Phone className="w-4 h-4"/>Anrufen</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><MessageSquarePlus className="w-4 h-4"/>Notiz</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Mail className="w-4 h-4"/>E-Mail</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><Calendar className="w-4 h-4"/>Termin</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1 bg-blue-500/10 border-blue-500/20 text-blue-300 hover:bg-blue-500/20"><Bot className="w-4 h-4"/>KI fragen</Button>
                                <Button variant="outline" size="sm" className="flex-col h-14 text-xs gap-1"><History className="w-4 h-4"/>Historie</Button>
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
