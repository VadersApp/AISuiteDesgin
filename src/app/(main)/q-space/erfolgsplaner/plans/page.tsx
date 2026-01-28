'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function PlansPage() {
    return (
        <div className="space-y-8">
            <header>
                <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                <Link href="/q-space/erfolgsplaner"><ArrowLeft className="w-4 h-4 mr-1" /> Zurück zum Erfolgsplaner</Link>
                </Button>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Erfolgspläne</h1>
                <p className="text-muted-foreground">Übersicht aller Pläne.</p>
            </header>
             <div className="text-center py-20 text-muted-foreground">
                Hier werden alle Erfolgspläne aufgelistet.
             </div>
        </div>
    );
}
