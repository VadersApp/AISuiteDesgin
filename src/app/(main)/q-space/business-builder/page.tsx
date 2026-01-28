'use client';

import { Card } from '@/components/ui/card';
import { ArrowRight, Search, FilePlus } from 'lucide-react';
import Link from 'next/link';

export default function BusinessBuilderPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Business Builder
        </h1>
        <p className="text-muted-foreground">
          KI-gestützte Analyse und Erstellung Ihrer Unternehmensprozesse.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link href="/q-space/business-builder/audit">
          <Card className="p-8 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-start gap-4 h-full cursor-pointer">
            <div className="p-4 bg-blue-500/10 text-blue-400 rounded-xl">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Bestehende Firma prüfen (Audit)</h2>
              <p className="text-muted-foreground text-sm">
                Lassen Sie Ihre aktuellen Prozesse, Dokumente und Strukturen von der KI analysieren, um Schwachstellen, Redundanzen und Optimierungspotenziale aufzudecken.
              </p>
            </div>
            <div className="mt-auto flex items-center gap-2 font-bold text-primary">
              Audit starten <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        </Link>
        <Link href="/q-space/business-builder/new">
          <Card className="p-8 hover:border-primary hover:shadow-2xl hover:-translate-y-1 transition-all flex flex-col items-start gap-4 h-full cursor-pointer">
            <div className="p-4 bg-emerald-500/10 text-emerald-400 rounded-xl">
                <FilePlus className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">Neue Prozesse aufbauen</h2>
              <p className="text-muted-foreground text-sm">
                Definieren Sie Ihr Geschäftsmodell und Ihre Ziele. Die KI erstellt eine maßgeschneiderte Prozesslandschaft inklusive Arbeitsanweisungen und Aufgabenpaketen.
              </p>
            </div>
             <div className="mt-auto flex items-center gap-2 font-bold text-primary">
              Prozesslandschaft erstellen <ArrowRight className="w-4 h-4" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
