'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
    ArrowLeft, 
    AlertTriangle, 
    BrainCircuit, 
    TrendingDown, 
    ArrowRight,
    PlusCircle,
    Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const deviations = [
    { 
        id: 'dev-1', 
        targetTitle: 'Abschlüsse', 
        gap: '-27%', 
        reason: 'Längere Entscheidungswege bei Enterprise-Kunden.', 
        impact: 'Kritisch',
        suggestion: 'Closing-Workshop für das Sales-Team ansetzen.'
    },
    { 
        id: 'dev-2', 
        targetTitle: 'Qualifizierte Termine', 
        gap: '-19%', 
        reason: 'Geringere Response-Rate auf Kaltakquise-Sequenz.', 
        impact: 'Watch',
        suggestion: 'A/B Test der E-Mail-Betreffzeilen durchführen.'
    }
];

export default function PlanReviewPage() {
    const params = useParams();
    const { planId } = params;

    return (
        <div className="space-y-8 pb-20">
            <header>
                <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                    <Link href={`/q-space/erfolgsplaner/plans/${planId}`}>
                        <ArrowLeft className="w-4 h-4 mr-1" /> Zurück zum Plan
                    </Link>
                </Button>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Abweichungsanalyse</h1>
                <p className="text-muted-foreground">Ursachen finden und gegentsteuern.</p>
            </header>

            <div className="space-y-6">
                <Card className="bg-amber-500/5 border-amber-500/10">
                    <CardHeader>
                        <CardTitle className="text-amber-400 flex items-center gap-2">
                            <Info className="w-5 h-5" /> Warum weichen die Zahlen ab?
                        </CardTitle>
                        <CardDescription className="text-amber-200/60">Mathematische Analyse der Zielverfehlung.</CardDescription>
                    </CardHeader>
                    <CardContent className="text-sm text-amber-200/80 leading-relaxed">
                        Die größte Lücke klafft zwischen **Terminen** und **Abschlüssen**. Während die Lead-Generierung stabil ist, sinkt die Abschluss-Effizienz. Dies deutet auf Reibungsverluste in der Verhandlungsphase hin.
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4">
                    {deviations.map((dev) => (
                        <Card key={dev.id} className="overflow-hidden border-l-4 border-l-rose-500/50">
                            <CardHeader className="p-4 pb-2 flex-row justify-between items-center space-y-0">
                                <div className="flex items-center gap-3">
                                    <TrendingDown className="w-5 h-5 text-rose-400" />
                                    <h3 className="font-bold">{dev.targetTitle}</h3>
                                </div>
                                <Badge variant="outline" className="text-rose-400 border-rose-500/20 bg-rose-500/10">
                                    Lücke: {dev.gap}
                                </Badge>
                            </CardHeader>
                            <CardContent className="p-4 pt-0 space-y-4">
                                <div>
                                    <p className="text-xs font-bold text-muted-foreground uppercase">Grund der Abweichung</p>
                                    <p className="text-sm mt-1">{dev.reason}</p>
                                </div>
                                <div className="p-3 bg-blue-500/5 border border-blue-500/10 rounded-lg">
                                    <div className="flex items-center gap-2 mb-1">
                                        <BrainCircuit className="w-4 h-4 text-blue-400" />
                                        <p className="text-xs font-bold text-blue-300 uppercase">KI-Empfehlung</p>
                                    </div>
                                    <p className="text-sm text-blue-200/80">{dev.suggestion}</p>
                                </div>
                            </CardContent>
                            <CardFooter className="p-4 border-t bg-muted/10 flex justify-end">
                                <Button size="sm" className="gap-2">
                                    <PlusCircle className="w-4 h-4" /> Maßnahme ableiten
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
