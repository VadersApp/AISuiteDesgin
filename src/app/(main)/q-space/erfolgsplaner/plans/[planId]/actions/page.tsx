'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    ArrowLeft, 
    CheckCircle2, 
    Briefcase, 
    ExternalLink,
    Clock,
    Plus,
    Target
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const mockActions = [
    { 
        id: 'act-1', 
        title: 'Closing-Workshop Sales-Team', 
        type: 'Task-Pack', 
        status: 'In Arbeit', 
        dueAt: '15.02.2024',
        workspaceRef: 'Workspace-Task-ID-123',
        targetRef: 'Abschlüsse'
    },
    { 
        id: 'act-2', 
        title: 'Analyse Enterprise-Entscheidungswege', 
        type: 'Projekt', 
        status: 'Offen', 
        dueAt: '28.02.2024',
        workspaceRef: 'Proj-CRM-456',
        targetRef: 'Abschlüsse'
    },
    { 
        id: 'act-3', 
        title: 'A/B Test Mail-Betreffzeilen', 
        type: 'Task', 
        status: 'Erledigt', 
        dueAt: '30.01.2024',
        workspaceRef: 'Task-MKT-789',
        targetRef: 'Qualifizierte Termine'
    }
];

export default function PlanActionsPage() {
    const params = useParams();
    const { planId } = params;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Erledigt': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
            case 'In Arbeit': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
            case 'Offen': return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
            default: return 'bg-muted';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <header>
                <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                    <Link href={`/q-space/erfolgsplaner/plans/${planId}`}>
                        <ArrowLeft className="w-4 h-4 mr-1" /> Zurück zum Plan
                    </Link>
                </Button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">Maßnahmenplan</h1>
                        <p className="text-muted-foreground">Umsetzung der strategischen Gegenmaßnahmen.</p>
                    </div>
                    <Button className="gap-2">
                        <Plus className="w-4 h-4" /> Neue Maßnahme
                    </Button>
                </div>
            </header>

            <div className="space-y-4">
                {mockActions.map((action) => (
                    <Card key={action.id} className="group hover:border-primary/40 transition-all overflow-hidden relative">
                        <CardHeader className="p-4 pb-2 flex-row justify-between items-start space-y-0">
                            <div className="min-w-0">
                                <h3 className="font-bold text-foreground">{action.title}</h3>
                                <div className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary" className="text-[10px] uppercase font-bold bg-muted/50 text-muted-foreground">
                                        {action.type}
                                    </Badge>
                                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <Target className="w-3 h-3" /> Fokus: {action.targetRef}
                                    </span>
                                </div>
                            </div>
                            <Badge className={cn("text-[9px] font-black uppercase h-5", getStatusColor(action.status))} variant="outline">
                                {action.status}
                            </Badge>
                        </CardHeader>
                        <CardContent className="p-4 pt-0">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground mt-2">
                                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> Fällig: {action.dueAt}</span>
                                <span className="flex items-center gap-1.5 font-medium text-primary">
                                    <Briefcase className="w-3.5 h-3.5" /> Verknüpft im Workspace
                                </span>
                            </div>
                        </CardContent>
                        <CardFooter className="p-3 bg-muted/10 border-t border-border/50 flex justify-end">
                            <Button variant="outline" size="sm" className="h-8 text-[10px] font-black uppercase group-hover:bg-background">
                                <ExternalLink className="w-3.5 h-3.5 mr-2" /> Im Workspace öffnen
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
