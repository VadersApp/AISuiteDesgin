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
import { kpiMitarbeiter } from '@/lib/data';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function EskalationenPage() {
  const eskalationen = kpiMitarbeiter.filter((m) => m.zWert < 70);

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
          <span className="text-foreground font-medium">Aktive Eskalationen</span>
        </div>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Aktive Eskalationen</h1>
            <Button variant="outline" asChild>
                <Link href="/q-space">← Zur KPI-Übersicht</Link>
            </Button>
        </div>
        <p className="text-muted-foreground mt-1">Mitarbeiter mit einem Z-Wert unter 70, die sofortige Aufmerksamkeit benötigen.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Eskalierte Mitarbeiter ({eskalationen.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Abteilung</TableHead>
                <TableHead>Z-Wert</TableHead>
                <TableHead>Letzte Abweichung</TableHead>
                <TableHead>Gesprächsstatus</TableHead>
                <TableHead className="text-right">Aktion</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {eskalationen.map((m) => (
                <TableRow key={m.id}>
                  <TableCell className="font-medium">{m.name}</TableCell>
                  <TableCell>{m.abteilung}</TableCell>
                  <TableCell>
                    <Badge className={cn("text-xs", getStatusColor(m.status))} variant="outline">{m.zWert}%</Badge>
                  </TableCell>
                  <TableCell>{m.letzteAbweichung}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">Nicht geplant</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button asChild size="sm">
                        <Link href={`/q-space/kpi-dashboard/mitarbeiter/${m.id}`}>Details</Link>
                    </Button>
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
