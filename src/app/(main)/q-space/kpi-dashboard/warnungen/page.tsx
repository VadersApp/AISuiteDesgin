'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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

export default function WarnungenPage() {
  const warnungen = kpiMitarbeiter.filter((m) => m.zWert >= 70 && m.zWert < 80);
  const beobachtungen = kpiMitarbeiter.filter((m) => m.zWert >= 80 && m.zWert < 90);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stabil': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'Beobachtung': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'Warnung': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'Eskalation': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400';
    }
  };

  const renderTable = (data: typeof kpiMitarbeiter) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Abteilung</TableHead>
          <TableHead>Z-Wert</TableHead>
          <TableHead>Letzte Abweichung</TableHead>
          <TableHead>Verantwortlicher</TableHead>
          <TableHead className="text-right">Aktion</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((m) => (
          <TableRow key={m.id}>
            <TableCell className="font-medium">{m.name}</TableCell>
            <TableCell>{m.abteilung}</TableCell>
            <TableCell>
              <Badge className={cn("text-xs", getStatusColor(m.status))} variant="outline">{m.zWert}%</Badge>
            </TableCell>
            <TableCell>{m.letzteAbweichung}</TableCell>
            <TableCell>Management</TableCell>
            <TableCell className="text-right">
              <Button asChild size="sm">
                <Link href={`/q-space/employees/${m.id}`}>Details</Link>
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/q-space" className="hover:text-foreground">Q-Space</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/q-space" className="hover:text-foreground">KPI-Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Aktive Warnungen</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">Aktive Warnungen & Beobachtungen</h1>
          <Button variant="outline" asChild>
            <Link href="/q-space">← Zur KPI-Übersicht</Link>
          </Button>
        </div>
        <p className="text-muted-foreground mt-1">Mitarbeiter, deren Leistungstrend Aufmerksamkeit erfordert.</p>
      </header>

      <Tabs defaultValue="warnung" className="w-full">
        <TabsList>
          <TabsTrigger value="warnung">Warnung ({warnungen.length})</TabsTrigger>
          <TabsTrigger value="beobachtung">Beobachtung ({beobachtungen.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="warnung">
          <Card>
            <CardHeader>
              <CardTitle>Mitarbeiter unter Beobachtung (Status: Warnung)</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTable(warnungen)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="beobachtung">
           <Card>
            <CardHeader>
              <CardTitle>Mitarbeiter unter Beobachtung (Status: Beobachtung)</CardTitle>
            </CardHeader>
            <CardContent>
              {renderTable(beobachtungen)}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
