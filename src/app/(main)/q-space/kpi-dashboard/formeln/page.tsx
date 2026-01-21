import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function FormelnPage() {
  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/q-space" className="hover:text-foreground">Q-Space</Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/q-space" className="hover:text-foreground">KPI-Dashboard</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Formeln & Regeln</span>
        </div>
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-foreground">Formeln & Regeln</h1>
            <Button variant="outline" asChild>
                <Link href="/q-space">← Zur KPI-Übersicht</Link>
            </Button>
        </div>
         <p className="text-muted-foreground mt-1">Die Berechnungslogik des KPI-Dashboards.</p>
      </header>
      
      <Card>
        <CardHeader>
          <CardTitle>Berechnungslogik</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 font-mono text-sm">
            <p><strong className="text-primary">Z₀</strong> = 100 (Ausgangswert)</p>
            <p><strong className="text-primary">Aᵢ</strong> = (Istᵢ − Sollᵢ) / Sollᵢ (KPI-Abweichung)</p>
            <p><strong className="text-primary">F_KPIᵢ</strong> = |Aᵢ| × Gewichtᵢ × 100 (KPI-Strafwert)</p>
            <p><strong className="text-primary">F_Zeit</strong> = Tage_Verzug × 2 (Zeitverzug)</p>
            <p className="font-bold"><strong className="text-primary">Z</strong> = 100 − Σ(F_KPIᵢ) − Σ(F_Zeit) (Gesamtzufriedenheit)</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Schwellenwerte (Status)</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
            <p><strong className="text-emerald-400">Grün (Stabil):</strong> Z ≥ 90</p>
            <p><strong className="text-amber-400">Gelb (Beobachtung):</strong> 80 ≤ Z &lt; 90</p>
            <p><strong className="text-orange-400">Orange (Warnung):</strong> 70 ≤ Z &lt; 80</p>
            <p><strong className="text-rose-400">Rot (Eskalation):</strong> Z &lt; 70</p>
        </CardContent>
      </Card>

      <Card className="bg-blue-500/5 border-blue-500/10 p-4">
        <p className="text-sm text-blue-300"><strong>Hinweis:</strong> Diese Logik ist ausschließlich auf Mitarbeiter vom Typ <strong>"Mensch"</strong> anwendbar.</p>
      </Card>
    </div>
  );
}
