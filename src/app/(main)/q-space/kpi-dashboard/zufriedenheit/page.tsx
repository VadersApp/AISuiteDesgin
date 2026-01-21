'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { kpiMitarbeiter, gesamtZufriedenheit, gruenerBereichCount, beobachtungCount, aktiveWarnungenCount, aktiveEskalationenCount } from '@/lib/data';
import { ChevronRight, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ZufriedenheitPage() {

  const statusCounts = {
      stabil: gruenerBereichCount,
      beobachtung: beobachtungCount,
      warnung: aktiveWarnungenCount,
      eskalation: aktiveEskalationenCount
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

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/q-space" className="hover:text-foreground">Q-Space</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/q-space" className="hover:text-foreground">KPI-Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Zufriedenheit gesamt</span>
        </div>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Zufriedenheit gesamt</h1>
            <Button variant="outline" asChild>
                <Link href="/q-space">← Zur KPI-Übersicht</Link>
            </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="flex flex-col items-center justify-center p-6">
            <p className="text-sm font-bold text-muted-foreground uppercase">Ø Zufriedenheit</p>
            <p className="text-7xl font-bold text-foreground my-2">{gesamtZufriedenheit}%</p>
            <div className="flex items-center gap-2 text-emerald-400">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm font-bold">Stabil</span>
            </div>
        </Card>
        <Card>
            <CardHeader><CardTitle>Aufschlüsselung nach Status</CardTitle></CardHeader>
            <CardContent className="space-y-3">
                <div className="flex justify-between items-center"><Badge variant="outline" className={getStatusColor('Stabil')}>Stabil (≥90%)</Badge> <span className="font-bold">{statusCounts.stabil}</span></div>
                <div className="flex justify-between items-center"><Badge variant="outline" className={getStatusColor('Beobachtung')}>Beobachtung (80-89%)</Badge> <span className="font-bold">{statusCounts.beobachtung}</span></div>
                <div className="flex justify-between items-center"><Badge variant="outline" className={getStatusColor('Warnung')}>Warnung (70-79%)</Badge> <span className="font-bold">{statusCounts.warnung}</span></div>
                <div className="flex justify-between items-center"><Badge variant="outline" className={getStatusColor('Eskalation')}>Eskalation (&lt;70%)</Badge> <span className="font-bold">{statusCounts.eskalation}</span></div>
            </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Alle Mitarbeiter</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Abteilung</TableHead>
                <TableHead>Z-Wert</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {kpiMitarbeiter.map((m) => (
                <TableRow key={m.id} className="cursor-pointer hover:bg-accent/50">
                   <TableCell className="font-medium">
                     <Link href={`/q-space/kpi-dashboard/mitarbeiter/${m.id}`} className="hover:underline">{m.name}</Link>
                   </TableCell>
                  <TableCell>{m.abteilung}</TableCell>
                  <TableCell className="font-mono font-bold">{m.zWert}%</TableCell>
                  <TableCell>
                     <Badge className={cn("text-xs", getStatusColor(m.status))} variant="outline">{m.status}</Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
