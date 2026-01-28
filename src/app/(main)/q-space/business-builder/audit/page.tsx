'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { departmentsConfig } from '@/lib/data';
import { Loader2, ArrowLeft, Check, Sparkles, AlertTriangle, ChevronsRight, Flame } from 'lucide-react';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';

const steps = [
  { id: 1, name: 'Kontext' },
  { id: 2, name: 'Datenquellen' },
  { id: 3, name: 'Analyse' },
  { id: 4, name: 'Ergebnisse' },
];

const mockResults = [
    { title: "Redundanter Onboarding-Prozess", problem: "Die HR- und IT-Abteilung nutzen separate Checklisten für das Mitarbeiter-Onboarding, was zu doppelter Arbeit führt.", recommendation: "Ein zentrales, geteiltes Onboarding-Projekt in Q-Space mit abhängigen Aufgaben für jede Abteilung erstellen.", deptId: "Personalwesen (HR)", effort: "M", impact: "High", outputType: "project" },
    { title: "Fehlende Arbeitsanweisung für Rechnungsfreigabe", problem: "Der Prozess zur Freigabe von Eingangsrechnungen über 1.000€ ist nicht dokumentiert.", recommendation: "Eine neue Arbeitsanweisung 'Rechnungsfreigabe > 1k EUR' mit einem klaren 4-Augen-Prinzip erstellen.", deptId: "Finanzen & Controlling", effort: "S", impact: "High", outputType: "workInstruction" },
    { title: "Ineffizientes Lead-Follow-up", problem: "Vertriebsmitarbeiter verbringen täglich >1 Stunde mit manuellen Follow-up E-Mails. Die Antwortrate ist gering.", recommendation: "Eine 3-stufige E-Mail-Sequence für 'kalte' Leads einführen, um den Prozess zu automatisieren.", deptId: "Vertrieb", effort: "M", impact: "Med", outputType: "taskPack" }
];


export default function AuditPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleNext = () => {
    if (currentStep === 2) {
      setIsAnalyzing(true);
      setTimeout(() => {
        setIsAnalyzing(false);
        setCurrentStep(4);
      }, 3000);
      setCurrentStep(3);
    } else {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => setCurrentStep(prev => Math.max(prev - 1, 1));
  
  return (
    <div className="space-y-6">
        <header>
            <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                <Link href="/q-space/business-builder"><ArrowLeft className="w-4 h-4 mr-1" /> Zurück zum Business Builder</Link>
            </Button>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Audit: Bestehende Firma prüfen</h1>
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
                    <CardTitle className="mb-4">Schritt 1: Kontext erfassen</CardTitle>
                    <div className="space-y-4">
                        <div><Label>Branche</Label><Input placeholder="z.B. Software, E-Commerce, Agentur" className="bg-input"/></div>
                        <div><Label>Firmengröße (Mitarbeiter)</Label><Input type="number" placeholder="z.B. 50" className="bg-input"/></div>
                        <div>
                            <Label>Abteilungen</Label>
                            <div className="grid grid-cols-2 gap-2 mt-2">
                                {departmentsConfig.slice(0,8).map(dept => (
                                    <div key={dept.id} className="flex items-center space-x-2">
                                        <Checkbox id={`dept-${dept.id}`} />
                                        <Label htmlFor={`dept-${dept.id}`} className="text-sm font-normal">{dept.name}</Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                         <div><Label>Ziele der Analyse</Label><Input placeholder="z.B. Effizienz steigern, Kosten senken" className="bg-input"/></div>
                    </div>
                </CardContent>
            )}

            {currentStep === 2 && (
                <CardContent className="p-6">
                    <CardTitle className="mb-4">Schritt 2: Datenquellen auswählen</CardTitle>
                    <p className="text-sm text-muted-foreground mb-4">Wählen Sie aus, welche Daten die KI für die Analyse berücksichtigen soll.</p>
                    <div className="space-y-3">
                        {['Arbeitsanweisungen', 'Dokumente', 'Projekte & Aufgaben', 'KPI-Dashboard'].map(source => (
                            <div key={source} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                                <Checkbox id={`source-${source}`} defaultChecked/>
                                <Label htmlFor={`source-${source}`} className="text-sm font-medium">{source}</Label>
                            </div>
                        ))}
                    </div>
                </CardContent>
            )}

            {currentStep === 3 && (
                <CardContent className="p-12 text-center">
                    <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin mb-4" />
                    <h3 className="text-lg font-bold">Analyse läuft...</h3>
                    <p className="text-muted-foreground">Die KI prüft Ihre ausgewählten Daten. Dies kann einige Momente dauern.</p>
                </CardContent>
            )}
             
            {currentStep === 4 && (
                <CardContent className="p-6">
                    <CardTitle className="mb-2">Schritt 4: Ergebnisse & Empfehlungen</CardTitle>
                    <p className="text-sm text-muted-foreground mb-6">Die KI hat die folgenden Potenziale identifiziert. Wählen Sie aus, welche Sie umsetzen möchten.</p>
                    <div className="space-y-4">
                        {mockResults.map((res, i) => (
                             <Card key={i} className="p-4 bg-muted/50 border">
                                <CardHeader className="p-0 mb-3">
                                    <CardTitle className="text-base flex items-center gap-2">
                                        {res.impact === 'High' && <Flame className="w-4 h-4 text-rose-400"/>}
                                        {res.impact === 'Med' && <AlertTriangle className="w-4 h-4 text-amber-400"/>}
                                        {res.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="p-0 text-sm space-y-2">
                                    <p><strong className="text-muted-foreground">Problem:</strong> {res.problem}</p>
                                    <p><strong className="text-muted-foreground">Vorschlag:</strong> {res.recommendation}</p>
                                </CardContent>
                                <CardFooter className="p-0 pt-4 flex justify-between items-center">
                                    <div className="flex items-center gap-2 text-xs">
                                        <Badge variant="outline">Aufwand: {res.effort}</Badge>
                                        <Badge variant="outline">Impact: {res.impact}</Badge>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline"><ChevronsRight className="w-4 h-4 mr-2"/> Als Projekt anlegen</Button>
                                        <Button size="sm">Übernehmen</Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </CardContent>
            )}

            <CardFooter className="p-6 flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1 || isAnalyzing}>Zurück</Button>
                {currentStep < 4 && <Button onClick={handleNext} disabled={isAnalyzing}>Weiter</Button>}
                {currentStep === 4 && <Button>Ausgewählte übernehmen</Button>}
            </CardFooter>
        </Card>
    </div>
  );
}
