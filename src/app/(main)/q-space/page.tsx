'use client';

import { useState, useMemo, FormEvent } from 'react';
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
  ChevronRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { kpiMitarbeiter, topKennzahlen, chatThreads, teamChatsData, invitesData, docFolders } from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';


const modules = [
    { name: 'Chat', icon: MessageSquare },
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

const mockSops = [
    { id: 1, title: "Prozess für neue Kundenanfragen", status: "Aktiv" }
];

const mockDocs = [
    { 
        id: 'doc-1',
        title: 'Unternehmensstrategie 2025',
        ownerUserId: 'dr-mueller',
        ownerName: 'Dr. Müller',
        deptId: 'Geschäftsführung',
        folderId: 'folder-gf-1',
        tags: ['strategy', 'q1', 'planning'],
        status: 'active',
        versionCurrent: 2.1,
        fileName: 'unternehmensstrategie_2025_v2.1.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 2.5 * 1024 * 1024,
        updatedAt: '2024-07-20T10:00:00Z',
    },
    { 
        id: 'doc-2',
        title: 'Security Policy - Remote Work',
        ownerUserId: 'ben-weber',
        ownerName: 'Ben Weber',
        deptId: 'IT',
        folderId: 'folder-it-4',
        tags: ['security', 'policy', 'remote'],
        status: 'active',
        versionCurrent: 1.0,
        fileName: 'remote_work_policy.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        sizeBytes: 150 * 1024,
        updatedAt: '2024-07-19T14:30:00Z',
    },
    {
        id: 'doc-3',
        title: 'Pitch Deck Innovatech',
        ownerUserId: 'anna-schmidt',
        ownerName: 'Anna Schmidt',
        deptId: 'Vertrieb',
        folderId: 'folder-sales-2',
        tags: ['pitch', 'innovatech', 'q1'],
        status: 'active',
        versionCurrent: 1.2,
        fileName: 'Pitch_Innovatech_final.pptx',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sizeBytes: 5.8 * 1024 * 1024,
        updatedAt: '2024-07-21T09:00:00Z',
    },
    {
        id: 'doc-4',
        title: 'General IT Documentation',
        ownerUserId: 'ben-weber',
        ownerName: 'Ben Weber',
        deptId: 'IT',
        folderId: 'folder-it-2',
        tags: ['it', 'general'],
        status: 'active',
        versionCurrent: 1.0,
        fileName: 'it_general.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        sizeBytes: 50 * 1024,
        updatedAt: '2024-06-19T14:30:00Z',
    },
    {
        id: 'doc-5',
        title: 'Onboarding Prozess für neue Sales-Mitarbeiter',
        ownerUserId: 'mila-hr',
        ownerName: 'Mila HR',
        deptId: 'Personalwesen (HR)',
        folderId: 'folder-hr-2',
        tags: ['onboarding', 'sales', 'prozess', 'hr'],
        status: 'active',
        versionCurrent: 1.0,
        fileName: 'Onboarding_Process_New_Sales_Team.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 780 * 1024,
        updatedAt: '2024-07-22T11:00:00Z',
    }
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

const DocumentsView = () => {
    const [selectedDept, setSelectedDept] = useState('all');
    const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);
    const [selectedDoc, setSelectedDoc] = useState<any | null>(mockDocs[0]);
    const [uploadMode, setUploadMode] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set());

    const toggleFolder = (folderId: string) => {
        setExpandedFolders(prev => {
            const newSet = new Set(prev);
            if (newSet.has(folderId)) {
                newSet.delete(folderId);
            } else {
                newSet.add(folderId);
            }
            return newSet;
        });
    };

    const departments = useMemo(() => {
        const depts = [...new Set(kpiMitarbeiter.map(m => m.abteilung)), ...new Set(docFolders.map(f => f.deptId))];
        const uniqueDepts = [...new Set(depts)].filter(d => d !== 'company');
        return uniqueDepts.sort();
    }, []);

    const filteredDocs = useMemo(() => {
        return mockDocs.filter(doc => {
            const inDept = selectedDept === 'all' || doc.deptId === selectedDept;
            const inFolder = selectedFolderId === null || doc.folderId === selectedFolderId;
            const matchesSearch = searchTerm === '' || doc.title.toLowerCase().includes(searchTerm.toLowerCase()) || doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
            return inDept && inFolder && matchesSearch;
        })
    }, [selectedDept, selectedFolderId, searchTerm]);

    const renderFolders = (parentId: string | null) => {
        const foldersToRender = docFolders
            .filter(f => f.parentFolderId === parentId && (selectedDept === 'all' || f.deptId === selectedDept || f.deptId === 'company'))
            .sort((a, b) => a.name.localeCompare(b.name));
        
        return foldersToRender.map(folder => {
            const hasChildren = docFolders.some(child => child.parentFolderId === folder.id);
            const isExpanded = expandedFolders.has(folder.id);
    
            return (
                <div key={folder.id}>
                    <div 
                        className={cn(
                            "flex items-center group rounded-md cursor-pointer", 
                            selectedFolderId === folder.id ? "bg-accent" : "hover:bg-muted/50"
                        )}
                        onClick={() => setSelectedFolderId(folder.id)}
                    >
                        <Button 
                            variant="ghost" 
                            size="icon" 
                            className="w-7 h-7 shrink-0" 
                            onClick={(e) => { e.stopPropagation(); hasChildren && toggleFolder(folder.id); }}
                            aria-label={isExpanded ? 'Ordner einklappen' : 'Ordner ausklappen'}
                        >
                           {hasChildren ? (
                                <ChevronRight className={cn("w-4 h-4 text-muted-foreground transition-transform", isExpanded && "rotate-90")} />
                           ) : (
                                <span className="w-4 h-4"></span>
                           )}
                        </Button>
                        <Folder className={cn("w-4 h-4 shrink-0", selectedFolderId === folder.id ? 'text-primary' : 'text-muted-foreground')} />
                        <span className="ml-2 text-sm truncate">{folder.name}</span>
                    </div>
                    {isExpanded && hasChildren && (
                        <div className="pl-5">
                            {renderFolders(folder.id)}
                        </div>
                    )}
                </div>
            );
        });
    };
    
    // Recursive function to render folders
    

    const handleFinalizeUpload = () => {
        // Mock finalization
        setUploadMode(false);
    }

    return (
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-20rem)]">
            {/* Left: Folder Tree */}
            <Card className="col-span-3 flex flex-col">
                <CardHeader className="p-4 border-b">
                    <Select value={selectedDept} onValueChange={setSelectedDept}>
                        <SelectTrigger className="bg-input"><SelectValue /></SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Alle Bereiche</SelectItem>
                            {departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </CardHeader>
                <ScrollArea className="flex-1 p-2">
                    <div className="space-y-1">
                        {renderFolders(null)}
                    </div>
                </ScrollArea>
                <CardFooter className="p-2 border-t">
                    <Button variant="ghost" className="w-full justify-start text-sm gap-2"><FolderPlus className="w-4 h-4"/> Neuer Ordner</Button>
                </CardFooter>
            </Card>

            {/* Middle: Document List */}
            <Card className="col-span-5 flex flex-col">
                <CardHeader className="p-4 border-b">
                    <div className="flex justify-between items-center">
                        <h3 className="font-bold">Dokumente ({filteredDocs.length})</h3>
                        <Button size="sm" onClick={() => { setUploadMode(true); setSelectedDoc(null); }}><Upload className="w-4 h-4 mr-2" /> Hochladen</Button>
                    </div>
                     <Input placeholder="Dokumente durchsuchen..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mt-2 bg-input" />
                </CardHeader>
                <ScrollArea className="flex-1">
                    <div className="p-2 space-y-2">
                        {filteredDocs.map(doc => (
                             <div key={doc.id} onClick={() => { setSelectedDoc(doc); setUploadMode(false); }} className={cn("p-3 rounded-lg border cursor-pointer", selectedDoc?.id === doc.id ? 'bg-muted border-primary/50' : 'bg-card hover:bg-muted/50')}>
                                <div className="flex items-start justify-between">
                                    <p className="font-bold text-sm text-foreground line-clamp-1 flex items-center gap-2">
                                        <FileIcon className="w-4 h-4 text-muted-foreground" /> {doc.title}
                                    </p>
                                    <Badge variant={doc.status === 'active' ? 'default' : 'secondary'} className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{doc.status}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground mt-1 ml-6">{doc.fileName} - {(doc.sizeBytes / (1024*1024)).toFixed(1)}MB</p>
                            </div>
                        ))}
                    </div>
                </ScrollArea>
            </Card>

            {/* Right: Details / Upload Panel */}
            <Card className="col-span-4 flex flex-col">
                {uploadMode && (
                    /* UPLOAD PANEL */
                    <div className="flex flex-col h-full animate-in fade-in">
                        <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex justify-between items-center">
                                Upload-Prüfung
                                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => setUploadMode(false)}><X className="w-4 h-4"/></Button>
                            </CardTitle>
                        </CardHeader>
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4">
                                <p className="text-sm font-bold bg-muted p-2 rounded-md border">{mockUploadJob.fileName}</p>
                                <Card className="bg-blue-950/50 border-blue-500/20">
                                    <CardHeader><CardTitle className="text-sm text-blue-300">KI-Ablageassistent</CardTitle></CardHeader>
                                    <CardContent className="space-y-3 text-sm">
                                        <div><Label className="text-blue-400/80">Vorgeschlagener Titel</Label><Input className="bg-input" defaultValue={mockUploadJob.aiSuggestion.suggestedTitle}/></div>
                                        <div><Label className="text-blue-400/80">Vorgeschlagener Bereich</Label><Select defaultValue={mockUploadJob.aiSuggestion.deptId}><SelectTrigger className="bg-input"><SelectValue/></SelectTrigger><SelectContent>{departments.map(d=><SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent></Select></div>
                                        <div><Label className="text-blue-400/80">Vorgeschlagener Ordner</Label><Select defaultValue={mockUploadJob.aiSuggestion.folderId}><SelectTrigger className="bg-input"><SelectValue/></SelectTrigger><SelectContent>{docFolders.map(f=><SelectItem key={f.id} value={f.id}>{f.name}</SelectItem>)}</SelectContent></Select></div>
                                        <div><Label className="text-blue-400/80">Vorgeschlagene Tags</Label><Input className="bg-input" defaultValue={mockUploadJob.aiSuggestion.tags.join(', ')}/></div>
                                        <p className="text-xs text-blue-400/70 pt-2 border-t border-blue-500/20">{mockUploadJob.aiSuggestion.reason}</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </ScrollArea>
                        <CardContent className="p-4 border-t flex gap-2">
                            <Button variant="outline" className="flex-1">Anpassen</Button>
                            <Button className="flex-1" onClick={handleFinalizeUpload}>Übernehmen & Fertigstellen</Button>
                        </CardContent>
                    </div>
                )}
                {!uploadMode && selectedDoc && (
                    /* DETAILS PANEL */
                    <div className="flex flex-col h-full animate-in fade-in">
                         <CardHeader className="p-4 border-b">
                            <CardTitle className="text-base flex justify-between items-center">
                                Dokumentdetails
                                <Button variant="ghost" size="icon" className="w-7 h-7" onClick={() => setSelectedDoc(null)}><X className="w-4 h-4"/></Button>
                            </CardTitle>
                        </CardHeader>
                        <ScrollArea className="flex-1 p-4">
                            <div className="space-y-4 text-sm">
                                <h3 className="font-bold text-lg">{selectedDoc.title}</h3>
                                <div><Label>Dateiname</Label><p className="font-mono text-xs p-2 bg-muted rounded-md border">{selectedDoc.fileName}</p></div>
                                <div><Label>Owner</Label><p>{selectedDoc.ownerName}</p></div>
                                <div><Label>Bereich</Label><p>{selectedDoc.deptId}</p></div>
                                <div><Label>Tags</Label><div className="flex flex-wrap gap-1 mt-1">{selectedDoc.tags.map((t:string) => <Badge key={t} variant="secondary">{t}</Badge>)}</div></div>
                                <div><Label>Version</Label><p>{selectedDoc.versionCurrent}</p></div>
                                <div><Label>Größe</Label><p>{(selectedDoc.sizeBytes / (1024*1024)).toFixed(2)} MB</p></div>
                                <div><Label>Zuletzt geändert</Label><p>{format(new Date(selectedDoc.updatedAt), "dd.MM.yyyy HH:mm")}</p></div>
                            </div>
                        </ScrollArea>
                        <CardContent className="p-4 border-t">
                            <Button variant="outline"><Archive className="w-4 h-4 mr-2"/>Archivieren</Button>
                        </CardContent>
                    </div>
                )}
                {!uploadMode && !selectedDoc && (
                     <div className="flex items-center justify-center h-full text-muted-foreground text-center p-4">
                        <p>Wähle ein Dokument aus oder lade ein neues hoch, um Details anzuzeigen.</p>
                     </div>
                )}
            </Card>
        </div>
    )
}


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
                <DocumentsView />
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
    const { toast } = useToast();
    const [statusFilter, setStatusFilter] = useState('all');
    const [teamFilter, setTeamFilter] = useState('all');
    const [escalationFilter, setEscalationFilter] = useState('all');
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    
    // Form state for new employee
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [department, setDepartment] = useState('');
    const [team, setTeam] = useState('');
    const [startDate, setStartDate] = useState<Date | undefined>();
    const [note, setNote] = useState('');


    const teams = useMemo(() => [...new Set(kpiMitarbeiter.map(m => m.team))], []);
    const departments = useMemo(() => [...new Set(kpiMitarbeiter.map(m => m.abteilung))], []);
    const roles = ["employee", "team_lead", "dept_head", "exec", "space_admin"];


    const filteredMitarbeiter = useMemo(() => {
        return kpiMitarbeiter.filter(m => {
            if (statusFilter !== 'all' && m.status !== statusFilter) return false;
            if (teamFilter !== 'all' && m.team !== teamFilter) return false;
            if (escalationFilter === 'yes' && m.eskalation !== 'Ja') return false;
            if (searchTerm && !m.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
            return true;
        });
    }, [statusFilter, teamFilter, escalationFilter, searchTerm]);
    
    const handleCreateInvite = (e: FormEvent) => {
        e.preventDefault();
        // In a real app, this would trigger a server-side function
        console.log({ firstName, lastName, email, role, department, team, startDate, note });
        toast({
            title: "Einladung gesendet",
            description: `${firstName} ${lastName} wurde per E-Mail eingeladen.`,
        });
        setIsCreateOpen(false);
        // Reset form
        setFirstName(''); setLastName(''); setEmail(''); setRole(''); setDepartment(''); setTeam(''); setStartDate(undefined); setNote('');
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Stabil': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'Beobachtung': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'Warnung': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
            case 'Eskalation': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
            case 'pending': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
            case 'sent': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'accepted': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'expired':
            case 'cancelled': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
            default: return 'bg-slate-500/10 text-slate-400';
        }
    };

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-xl font-bold text-foreground">Mitarbeiter</h2>
                <p className="text-sm text-muted-foreground">Arbeits- und Leistungsübersicht Ihrer Mitarbeiter.</p>
            </header>
             <Tabs defaultValue="overview">
                <div className="flex justify-between items-center mb-4">
                    <TabsList>
                        <TabsTrigger value="overview">Übersicht</TabsTrigger>
                        <TabsTrigger value="invites">Einladungen</TabsTrigger>
                    </TabsList>
                    <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                        <DialogTrigger asChild>
                            <Button><Plus className="mr-2 h-4 w-4" /> Mitarbeiter anlegen</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[625px]">
                            <DialogHeader>
                                <DialogTitle>Mitarbeiter anlegen</DialogTitle>
                                <DialogDescription>
                                    Füllen Sie die Felder aus, um eine Einladung per E-Mail zu versenden.
                                </DialogDescription>
                            </DialogHeader>
                            <form onSubmit={handleCreateInvite}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstName">Vorname</Label>
                                        <Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} className="bg-input" required/>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="lastName">Nachname</Label>
                                        <Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} className="bg-input" required/>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="email">E-Mail</Label>
                                    <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="bg-input" required/>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="role">Rolle</Label>
                                        <Select required onValueChange={setRole} value={role}><SelectTrigger id="role" className="bg-input"><SelectValue placeholder="Rolle wählen..." /></SelectTrigger>
                                            <SelectContent>{roles.map(r => <SelectItem key={r} value={r} className="capitalize">{r.replace('_', ' ')}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="department">Bereich</Label>
                                         <Select required onValueChange={setDepartment} value={department}><SelectTrigger id="department" className="bg-input"><SelectValue placeholder="Bereich wählen..." /></SelectTrigger>
                                            <SelectContent>{departments.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="team">Team (optional)</Label>
                                         <Select onValueChange={setTeam} value={team}><SelectTrigger id="team" className="bg-input"><SelectValue placeholder="Team wählen..." /></SelectTrigger>
                                            <SelectContent>{teams.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                     <div className="space-y-2">
                                        <Label>Startdatum (optional)</Label>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <Button variant="outline" className={cn("w-full justify-start text-left font-normal bg-input", !startDate && "text-muted-foreground")}>
                                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                                    {startDate ? format(startDate, "PPP") : <span>Datum wählen</span>}
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto p-0"><Calendar mode="single" selected={startDate} onSelect={setStartDate} initialFocus /></PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="note">Notiz (optional)</Label>
                                    <Textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} className="bg-input" placeholder="z.B. Startet als Vertrieb..."/>
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>Abbrechen</Button>
                                <Button type="submit">Einladung senden</Button>
                            </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>

                <TabsContent value="overview">
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
                </TabsContent>
                <TabsContent value="invites">
                    <Card>
                        <CardHeader>
                            <CardTitle>Einladungen</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>E-Mail</TableHead>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Rolle</TableHead>
                                        <TableHead>Bereich / Team</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Läuft ab am</TableHead>
                                        <TableHead className="text-right">Aktionen</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {invitesData.map(invite => (
                                        <TableRow key={invite.inviteId}>
                                            <TableCell className="font-mono text-xs">{invite.email}</TableCell>
                                            <TableCell className="font-medium">{invite.firstName} {invite.lastName}</TableCell>
                                            <TableCell className="capitalize text-xs">{invite.role.replace('_', ' ')}</TableCell>
                                            <TableCell className="text-xs">{invite.deptId}{invite.teamId ? ` / ${invite.teamId}`: ''}</TableCell>
                                            <TableCell><Badge className={cn("text-xs capitalize", getStatusColor(invite.status))} variant="outline">{invite.status}</Badge></TableCell>
                                            <TableCell className="text-xs font-mono">{format(new Date(invite.expiresAt), "dd.MM.yyyy")}</TableCell>
                                            <TableCell className="text-right">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8"><MoreHorizontal /></Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuItem>Erneut senden</DropdownMenuItem>
                                                        <DropdownMenuItem>Kopiere Einladungslink</DropdownMenuItem>
                                                        <DropdownMenuItem className="text-rose-500">Abbrechen</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
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
  const [activeModule, setActiveModule] = useState(modules[1].name);
  const pathname = usePathname();
  const router = useRouter();

  const totalUnread = chatThreads.reduce(
      (sum, t) => sum + (t.unreadCount || 0),
      0
    );

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

  if (pathname.startsWith('/q-space/chat')) {
      if (activeModule !== 'Chat') {
          setActiveModule('Chat');
      }
  }

  const handleModuleClick = (moduleName: string) => {
    if (moduleName === 'Chat') {
        router.push('/q-space/chat');
    } else {
        if (pathname.startsWith('/q-space/chat')) {
            router.push('/q-space');
        }
        setActiveModule(moduleName);
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
                const isChatLink = mod.name === 'Chat';
                const isActive = isChatLink ? pathname.startsWith('/q-space/chat') : activeModule === mod.name && !pathname.startsWith('/q-space/chat');

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
                        {isChatLink && totalUnread > 0 && (
                            <Badge className="absolute right-3 top-1/2 -translate-y-1/2 h-5 justify-center p-1.5 text-xs">{totalUnread}</Badge>
                        )}
                    </div>
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
    </>
  );
}

    

