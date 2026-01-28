'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, ArrowLeft, Check, Sparkles, Folder, FileText, CheckSquare, ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';


const steps = [
  { id: 1, name: 'Zielbild' },
  { id: 2, name: 'Struktur' },
  { id: 3, name: 'Generierung' },
  { id: 4, name: 'Ergebnisse' },
];

const mockNewProcessResults = {
    "Vertrieb": {
        "Akquise": {
            "Arbeitsanweisungen": ["Kaltakquise per Telefon", "LinkedIn Lead-Ansprache"],
            "Aufgabenpakete": ["Aufgabenpaket: Erster Kontaktversuch"]
        },
        "Angebotserstellung": {
             "Arbeitsanweisungen": ["Standard-Angebot erstellen", "Angebot für Enterprise-Kunden"],
            "Aufgabenpakete": ["Aufgabenpaket: Angebot nachfassen"]
        }
    },
    "Marketing": {
        "Content-Erstellung": {
            "Arbeitsanweisungen": ["Blog-Artikel schreiben (SEO)"],
            "Aufgabenpakete": []
        }
    }
}

export default function NewProcessPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleNext = () => {
    if (currentStep === 2) {
      setIsGenerating(true);
      setTimeout(() => {
        setIsGenerating(false);
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
            <h1 className="text-2xl font-bold text-foreground tracking-tight">Neuaufbau: Prozesse & Strukturen</h1>
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
                    <CardTitle className="mb-4">Schritt 1: Zielbild definieren</CardTitle>
                    <div className="space-y-4">
                        <div><label>Geschäftsmodell (Kurzbeschreibung)</label><Textarea placeholder="z.B. Wir entwickeln und vertreiben eine B2B-Software für Prozessmanagement." className="bg-input"/></div>
                        <div><label>Hauptleistungen (Liste, kommasepariert)</label><Input placeholder="z.B. Software-Lizenz, Implementierungs-Service, Support" className="bg-input"/></div>
                        <div><label>Zielkunden</label><Input placeholder="z.B. Mittelständische Unternehmen (50-500 MA) im DACH-Raum" className="bg-input"/></div>
                        <div><label>Hauptziel</label><Input placeholder="z.B. Skalierung des Vertriebs, Qualitätsverbesserung im Support" className="bg-input"/></div>
                    </div>
                </CardContent>
            )}

            {currentStep === 2 && (
                <CardContent className="p-6">
                    <CardTitle className="mb-4">Schritt 2: Organisationsstruktur</CardTitle>
                     <div className="space-y-4">
                        <div><label>Abteilungen (kommasepariert)</label><Input placeholder="z.B. Vertrieb, Marketing, IT, Support" className="bg-input"/></div>
                        <div><label>Rollen pro Abteilung (Beispiele)</label><Textarea placeholder="Vertrieb: Sales Manager, Account Executive&#10;Marketing: Content Creator, Performance Manager" rows={4} className="bg-input"/></div>
                    </div>
                </CardContent>
            )}
            
            {currentStep === 3 && (
                <CardContent className="p-12 text-center">
                    <Loader2 className="w-12 h-12 text-primary mx-auto animate-spin mb-4" />
                    <h3 className="text-lg font-bold">Prozesse werden generiert...</h3>
                    <p className="text-muted-foreground">Die KI erstellt Ihre Prozesslandschaft basierend auf Ihren Angaben.</p>
                </CardContent>
            )}

            {currentStep === 4 && (
                <CardContent className="p-6">
                    <CardTitle className="mb-2">Schritt 4: Review & Import</CardTitle>
                    <p className="text-sm text-muted-foreground mb-6">Überprüfen Sie die von der KI erstellten Prozesse und wählen Sie aus, was Sie importieren möchten.</p>
                     <div className="space-y-4">
                        {Object.entries(mockNewProcessResults).map(([dept, processes]) => (
                            <Collapsible key={dept} defaultOpen>
                                <CollapsibleTrigger className="w-full">
                                    <div className="flex items-center gap-2 p-2 bg-muted/50 rounded-t-lg border-b">
                                        <ChevronDown className="w-4 h-4"/>
                                        <Folder className="w-5 h-5 text-blue-400" />
                                        <h4 className="font-bold text-lg">{dept}</h4>
                                    </div>
                                </CollapsibleTrigger>
                                <CollapsibleContent className="p-4 border border-t-0 rounded-b-lg space-y-3">
                                    {Object.entries(processes).map(([processName, items]: any) => (
                                        <div key={processName} className="pl-4">
                                            <p className="font-semibold">{processName}</p>
                                            <div className="pl-4 mt-2 space-y-1 text-sm">
                                                {(items.Arbeitsanweisungen || []).map((item: string, i: number) => (
                                                    <p key={i} className="flex items-center gap-2"><FileText className="w-4 h-4 text-muted-foreground"/> {item}</p>
                                                ))}
                                                {(items.Aufgabenpakete || []).map((item: string, i: number) => (
                                                    <p key={i} className="flex items-center gap-2"><CheckSquare className="w-4 h-4 text-muted-foreground"/> {item}</p>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </CollapsibleContent>
                            </Collapsible>
                        ))}
                    </div>
                </CardContent>
            )}

            <CardFooter className="p-6 flex justify-between">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1 || isGenerating}>Zurück</Button>
                {currentStep < 4 && <Button onClick={handleNext} disabled={isGenerating}>Weiter</Button>}
                {currentStep === 4 && <Button>Ausgewählte importieren</Button>}
            </CardFooter>
        </Card>
    </div>
  );
}
