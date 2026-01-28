'use client';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Loader2, ArrowLeft, Check, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const steps = [
  { id: 1, name: 'Zeitraum & Ziel' },
  { id: 2, name: 'Verantwortung' },
  { id: 3, name: 'KI-Planung' },
  { id: 4, name: 'Review & Start' },
];

export default function CreatePlanPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (currentStep === 3) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
        setCurrentStep(4);
      }, 3000);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  return (
    <div className="space-y-6">
        <header>
            <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                <Link href="/q-space/erfolgsplaner"><ArrowLeft className="w-4 h-4 mr-1" /> Zurück zum Erfolgsplaner</Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Neuen Erfolgsplan erstellen</h1>
        </header>

        {/* Stepper */}
        <div className="flex justify-between items-center max-w-2xl mx-auto">
            {steps.map(step => (
                <div key={step.id} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${currentStep >= step.id ? 'bg-primary border-primary text-primary-foreground' : 'bg-muted border-border text-muted-foreground'}`}>
                        {currentStep > step.id ? <Check className="w-5 h-5"/> : step.id}
                    </div>
                    <span className={`font-bold text-sm ${currentStep >= step.id ? 'text-foreground' : 'text-muted-foreground'}`}>{step.name}</span>
                </div>
            ))}
        </div>

        <Card className="max-w-3xl mx-auto">
            {currentStep === 1 && (
                <CardContent className="p-6">
                    <CardTitle className="mb-4">Schritt 1: Zeitraum & Kernziele</CardTitle>
                    <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div><Label>Plan-Name</Label><Input placeholder="z.B. Jahresplan 2026" className="bg-input"/></div>
                            <div><Label>Zeitraum</Label>
                                <Select>
                                    <SelectTrigger className="bg-input"><SelectValue placeholder="Zeitraum wählen..." /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="year">Ganzes Jahr</SelectItem>
                                        <SelectItem value="quarter">Quartal</SelectItem>
                                        <SelectItem value="month">Monat</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <h3 className="font-medium pt-4 border-t">Kernziele (max. 5)</h3>
                         <div className="grid grid-cols-2 gap-4">
                            <div><Label>Umsatz (€)</Label><Input type="number" placeholder="z.B. 1.000.000" className="bg-input"/></div>
                            <div><Label>Marge (%)</Label><Input type="number" placeholder="z.B. 25" className="bg-input"/></div>
                            <div><Label>Leads (Anzahl)</Label><Input type="number" placeholder="z.B. 500" className="bg-input"/></div>
                            <div><Label>Termine (Anzahl)</Label><Input type="number" placeholder="z.B. 100" className="bg-input"/></div>
                            <div><Label>Abschlüsse (Anzahl)</Label><Input type="number" placeholder="z.B. 25" className="bg-input"/></div>
                         </div>
                    </div>
                </CardContent>
            )}

            {currentStep === 2 && (
                <CardContent className="p-6">
                    <CardTitle className="mb-4">Schritt 2: Verantwortlichkeit & Scope</CardTitle>
                    <div className="space-y-4">
                        <div><Label>Scope</Label>
                             <Select>
                                <SelectTrigger className="bg-input"><SelectValue placeholder="Scope wählen..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="org">Gesamtes Unternehmen</SelectItem>
                                    <SelectItem value="dept">Abteilung</SelectItem>
                                    <SelectItem value="team">Team</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div><Label>Owner</Label>
                            <Select>
                                <SelectTrigger className="bg-input"><SelectValue placeholder="Verantwortlichen wählen..." /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="dr-mueller">Dr. Müller (exec)</SelectItem>
                                    <SelectItem value="anna-schmidt">Anna Schmidt (dept_head)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </CardContent>
            )}
            
            {currentStep === 3 && (
                <CardContent className="p-12 text-center">
                    <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin mb-4" />
                    <h3 className="text-lg font-bold">KI generiert Planvorschlag...</h3>
                    <p className="text-muted-foreground">Basierend auf Ihren Zielen werden Teilziele und ein Aktivitätsmodell berechnet.</p>
                </CardContent>
            )}

            {currentStep === 4 && (
                <CardContent className="p-6">
                    <CardTitle className="mb-2">Schritt 4: Review & Start</CardTitle>
                    <p className="text-sm text-muted-foreground mb-6">Die KI schlägt folgenden Plan vor. Sie können ihn anpassen, bevor Sie ihn starten.</p>
                     <div className="space-y-4 p-4 bg-muted/50 rounded-lg border">
                        <h4 className="font-bold flex items-center gap-2"><Sparkles className="w-4 h-4 text-blue-400" /> KI-Vorschlag</h4>
                        <p className="text-sm">Um 1 Mio. € Umsatz zu erreichen, benötigen Sie 25 Abschlüsse bei einem Ø-Dealwert von 40.000 €. Das erfordert ~100 Termine (25% CR) und ~500 Leads (20% CR).</p>
                        <h5 className="font-medium text-sm pt-2">Monatsziele:</h5>
                        <p className="text-sm text-muted-foreground">Umsatz: ~83.3k €, Leads: ~42, Termine: ~8, Abschlüsse: ~2</p>
                     </div>
                </CardContent>
            )}

            <CardFooter className="p-6 flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1 || isGenerating}>Zurück</Button>
                {currentStep < 4 && <Button onClick={handleNext} disabled={isGenerating}>Weiter</Button>}
                {currentStep === 4 && <Button>Plan starten</Button>}
            </CardFooter>
        </Card>
    </div>
  );
}
