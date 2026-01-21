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
import { ChevronRight, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function GruenerBereichPage() {
  const gruenerBereich = kpiMitarbeiter.filter((m) => m.zWert >= 90);

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
        case 'up': return <ArrowUp className="w-4 h-4 text-emerald-400" />;
        case 'down': return <ArrowDown className="w-4 h-4 text-rose-400" />;
        case 'stable': return <ArrowRight className="w-4 h-4 text-slate-400" />;
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
          <span className="text-foreground font-medium">Mitarbeiter im grünen Bereich</span>
        </div>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Mitarbeiter im grünen Bereich</h1>
            <Button variant="outline" asChild>
                <Link href="/q-space">← Zur KPI-Übersicht</Link>
            </Button>
        </div>
        <p className="text-muted-foreground mt-1">Mitarbeiter mit einem stabilen Z-Wert von 90 oder höher.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Stabile Mitarbeiter ({gruenerBereich.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Abteilung</TableHead>
                <TableHead>Z-Wert</TableHead>
                <TableHead>Trend</TableHead>
                <TableHead>Letzte Abweichung</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {gruenerBereich.map((m) => (
                <TableRow key={m.id} className="cursor-pointer hover:bg-accent/50">
                   <TableCell className="font-medium">
                     <Link href={`/q-space/kpi-dashboard/mitarbeiter/${m.id}`} className="hover:underline">{m.name}</Link>
                   </TableCell>
                  <TableCell>{m.abteilung}</TableCell>
                  <TableCell className="font-mono font-bold">{m.zWert}%</TableCell>
                  <TableCell>{getTrendIcon(m.trend as any)}</TableCell>
                  <TableCell>{m.letzteAbweichung}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
