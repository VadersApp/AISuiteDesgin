'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PlanReviewPage() {
    const params = useParams();
    const { planId } = params;

    return (
        <div className="space-y-8">
            <header>
                <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                <Link href={`/q-space/erfolgsplaner/plans/${planId}`}><ArrowLeft className="w-4 h-4 mr-1" /> Zurück zum Plan</Link>
                </Button>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Abweichungen für Plan: {planId}</h1>
            </header>
             <div className="text-center py-20 text-muted-foreground">
                Ansicht für Abweichungen.
             </div>
        </div>
    );
}
