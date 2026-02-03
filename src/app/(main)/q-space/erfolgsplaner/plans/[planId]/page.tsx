'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
    ArrowLeft, 
    Target, 
    TrendingUp, 
    AlertTriangle, 
    CheckCircle2, 
    ChevronRight,
    BrainCircuit
} from 'lucide-react';
import { cn } from '@/lib/utils';

const mockPlan = {
    id: 'active-plan-id',
    name: 'Jahresplan 2024 - Vertrieb & Wachstum',
    status: 'On Track',
    overallProgress: 92,
    period: 'Januar - Dezember 2024',
    goals: [
        { id: 'g1', title: 'Umsatz', target: '1.200.000 €', current: '1.104.000 €', progress: 92, status: 'On Track' },
        { id: 'g2', title: 'Marge', target: '25 %', current: '24.2 %', progress: 96, status: 'On Track' },
        { id: 'g3', title: 'Neue Leads', target: '500', current: '410', progress: 82, status: 'Watch' },
        { id: 'g4', title: 'Qualifizierte Termine', target: '120', current: '98', progress: 81, status: 'Watch' },
        { id: 'g5', title: 'Abschlüsse', target: '30', current: '22', progress: 73, status: 'Kritisch' },
    ]
};

export default function PlanDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { planId } = params;

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Track': return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
            case 'Watch': return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
            case 'Kritisch': return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
            default: return 'bg-muted';
        }
    };

    return (
        <div className="space-y-8 pb-20">
            <header>
                <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                    <Link href="/q-space/erfolgsplaner">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Zurück zum Erfolgsplaner
                    </Link>
                </Button>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground tracking-tight">{mockPlan.name}</h1>
                        <p className="text-muted-foreground">{mockPlan.period}</p>
                    </div>
                    <Badge className={cn("text-sm px-4 py-1", getStatusColor(mockPlan.status))} variant="outline">
                        Status: {mockPlan.status}
                    </Badge>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Linke Spalte: Ziele */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Kernziele (Top 5)</CardTitle>
                            <CardDescription>Die wichtigsten Metriken für diesen Planungszeitraum.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {mockPlan.goals.map((goal) => (
                                <div key={goal.id} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="font-bold text-foreground">{goal.title}</p>
                                            <p className="text-xs text-muted-foreground">Soll: {goal.target} | Ist: {goal.current}</p>
                                        </div>
                                        <Badge className={cn("text-[10px] uppercase font-black h-5", getStatusColor(goal.status))} variant="outline">
                                            {goal.status}
                                        </Badge>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <Progress value={goal.progress} className="h-2 flex-1" />
                                        <span className="text-xs font-mono font-bold w-10 text-right">{goal.progress}%</span>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>

                {/* Rechte Spalte: Navigation & KI-Insight */}
                <div className="space-y-6">
                    <Card className="bg-blue-500/5 border-blue-500/10">
                        <CardHeader>
                            <CardTitle className="text-blue-300 text-base flex items-center gap-2">
                                <BrainCircuit className="w-5 h-5" /> KI-Kurzcheck
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-sm text-blue-200/80 leading-relaxed">
                            <p>Der Plan ist insgesamt stabil (92%), jedoch stagnieren die <strong>Abschlüsse</strong>. Die Lead-Pipeline ist gut gefüllt, aber die Conversion zum Termin sinkt leicht.</p>
                        </CardContent>
                        <CardFooter>
                            <Button variant="outline" className="w-full text-xs font-bold border-blue-500/20 text-blue-300 hover:bg-blue-500/10" asChild>
                                <Link href={`/q-space/erfolgsplaner/plans/${planId}/review`}>
                                    Zur Detailanalyse <ChevronRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </CardFooter>
                    </Card>

                    <div className="grid grid-cols-1 gap-4">
                        <Link href={`/q-space/erfolgsplaner/plans/${planId}/review`}>
                            <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-amber-500/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <AlertTriangle className="w-5 h-5 text-amber-400" />
                                        <span className="font-bold">Abweichungen prüfen</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </Card>
                        </Link>
                        <Link href={`/q-space/erfolgsplaner/plans/${planId}/actions`}>
                            <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer border-l-4 border-l-emerald-500/50">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                        <span className="font-bold">Maßnahmen (5 offen)</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                </div>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
