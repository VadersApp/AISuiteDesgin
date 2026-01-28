'use client';

import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, AlertTriangle, Target as TargetIcon, Plus } from 'lucide-react';
import Link from 'next/link';

export default function ErfolgsplanerPage() {
  // Mock data
  const aktiverPlan = { status: 'On Track' };
  const abweichungen = 3;
  const massnahmen = 5;

  const getStatusColor = (status: string) => {
    if (status === 'On Track') return 'text-emerald-400';
    if (status === 'Watch') return 'text-amber-400';
    return 'text-rose-400';
  };

  return (
    <div className="space-y-8">
      <header>
        <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
          <Link href="/q-space">
            <ArrowLeft className="w-4 h-4 mr-1" /> Zurück zu Q-Space
          </Link>
        </Button>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">Erfolgsplaner</h1>
        <p className="text-muted-foreground">Jahres-, Quartals- und Monatsziele definieren, verfolgen und KI-gestützt erreichen.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/q-space/erfolgsplaner/plans/active-plan-id">
          <Card className="p-6 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer h-full">
            <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-blue-500/10 text-blue-400 rounded-xl w-fit">
                <CheckCircle className="w-6 h-6" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <h2 className="text-xl font-bold text-foreground mb-2">Aktiver Plan</h2>
              <p className="text-sm text-muted-foreground">Status: <span className={getStatusColor(aktiverPlan.status)}>{aktiverPlan.status}</span></p>
            </CardContent>
          </Card>
        </Link>
        
        <Link href="/q-space/erfolgsplaner/plans/active-plan-id/review">
          <Card className="p-6 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer h-full">
             <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-amber-500/10 text-amber-400 rounded-xl w-fit">
                <AlertTriangle className="w-6 h-6" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <h2 className="text-xl font-bold text-foreground mb-2">Abweichungen</h2>
              <p className="text-sm text-muted-foreground">{abweichungen} Ziele im Rückstand.</p>
            </CardContent>
          </Card>
        </Link>
        
         <Link href="/q-space/erfolgsplaner/plans/active-plan-id/actions">
          <Card className="p-6 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all cursor-pointer h-full">
             <CardHeader className="p-0 mb-4">
              <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl w-fit">
                <TargetIcon className="w-6 h-6" />
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <h2 className="text-xl font-bold text-foreground mb-2">Maßnahmen</h2>
              <p className="text-sm text-muted-foreground">{massnahmen} offene Maßnahmenpakete.</p>
            </CardContent>
          </Card>
        </Link>
      </div>

       <div className="text-center pt-8">
            <Button asChild>
                <Link href="/q-space/erfolgsplaner/plans/create">
                    <Plus className="w-4 h-4 mr-2" />
                    Neuen Erfolgsplan erstellen
                </Link>
            </Button>
       </div>
    </div>
  );
}
