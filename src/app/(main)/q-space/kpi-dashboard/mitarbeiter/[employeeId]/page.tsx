'use client'

import { useParams, notFound } from 'next/navigation';
import Link from 'next/link';
import { kpiMitarbeiter } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ChevronRight, User, Building, Bot, TrendingUp, TrendingDown, ArrowRight, Info, CalendarClock } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MitarbeiterDetailPage() {
  const params = useParams();
  const employeeId = params.employeeId as string;
  const employee = kpiMitarbeiter.find((m) => m.id === employeeId);

  if (!employee) {
    notFound();
  }
  
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
        case 'up': return <TrendingUp className="w-5 h-5 text-emerald-400" />;
        case 'down': return <TrendingDown className="w-5 h-5 text-rose-400" />;
        case 'stable': return <ArrowRight className="w-5 h-5 text-slate-400" />;
        default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/q-space" className="hover:text-foreground">Q-Space</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/q-space" className="hover:text-foreground">KPI-Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Mitarbeiter-Detail</span>
        </div>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Mitarbeiter-Detail: {employee.name}</h1>
            <Button variant="outline" asChild>
                <Link href="/q-space">← Zur KPI-Übersicht</Link>
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <div className="lg:col-span-2 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>KPI Score</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <p className="text-7xl font-bold text-foreground">{employee.zWert}%</p>
                        <div>
                             <Badge className={cn("text-lg", getStatusColor(employee.status))} variant="outline">{employee.status}</Badge>
                             <div className="flex items-center gap-2 mt-2">
                                {getTrendIcon(employee.trend as any)}
                                <span className="text-sm text-muted-foreground">Trend</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Letzte Abweichungen</CardTitle></CardHeader>
                <CardContent>
                    <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                        <li>{employee.letzteAbweichung}</li>
                    </ul>
                </CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Berechnung</CardTitle></CardHeader>
                <CardContent className="font-mono text-sm space-y-2">
                    <p>Z = 100 - Σ(F_KPI) - Σ(F_Zeit)</p>
                    <p>Σ(F_KPI) = {(100 - employee.prevZ)}</p>
                     <p>Σ(F_Zeit) = {(employee.prevZ - employee.zWert)}</p>
                </CardContent>
            </Card>
        </div>
        <div className="space-y-6">
             <Card>
                <CardHeader><CardTitle>Basisdaten</CardTitle></CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <div className="flex items-center gap-2"><User className="w-4 h-4 text-muted-foreground" /> <strong>{employee.name}</strong></div>
                    <div className="flex items-center gap-2"><Building className="w-4 h-4 text-muted-foreground" /> {employee.abteilung}</div>
                    <div className="flex items-center gap-2"><Bot className="w-4 h-4 text-muted-foreground" /> {employee.mitarbeitertyp}</div>
                    {employee.role && <div className="flex items-center gap-2"><Info className="w-4 h-4 text-muted-foreground" /> {employee.role}</div>}
                </CardContent>
            </Card>
             {employee.zWert < 70 && (
                <Card className="border-rose-500/50 bg-rose-500/5">
                    <CardHeader>
                        <CardTitle className="text-rose-400">Eskalationsbereich</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <p className="text-sm font-bold">Eskalation aktiv (Z-Wert &lt; 70)</p>
                         <div className="flex items-center gap-2 text-sm"><strong className="text-muted-foreground">Status:</strong> <Badge variant="destructive">{employee.eskalation}</Badge></div>
                        <div className="flex items-center gap-2 text-sm"><strong className="text-muted-foreground">Gespräch:</strong> <Badge variant="secondary">Nicht geplant</Badge></div>
                        <Button className="w-full">
                            <CalendarClock className="mr-2 h-4 w-4" /> Gespräch automatisch planen
                        </Button>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
