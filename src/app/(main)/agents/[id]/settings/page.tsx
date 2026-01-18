'use client';

import { useState } from 'react';
import { bots } from '@/lib/data';
import { notFound, useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ChevronLeft, Bot as BotIcon, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';

export default function AgentSettingsPage() {
  const params = useParams<{ id: string }>();
  const { toast } = useToast();
  const router = useRouter();
  const bot = bots.find((b) => b.id === params.id);

  // Existing State
  const [isAgentActive, setIsAgentActive] = useState(true);
  const [language, setLanguage] = useState('Deutsch');
  const [responseStyle, setResponseStyle] = useState('Professionell');

  // New State from the image
  const [customPrompt, setCustomPrompt] = useState('');
  const [voiceId, setVoiceId] = useState('');
  const [modelId, setModelId, ] = useState('eleven_multilingual_v2');
  const [stability, setStability] = useState([0.35]);
  const [similarity, setSimilarity] = useState([0.75]);
  const [styleExaggeration, setStyleExaggeration] = useState([0.0]);
  const [speed, setSpeed] = useState([1.0]);
  const [speakerBoost, setSpeakerBoost] = useState(true);
  const [textNormalization, setTextNormalization] = useState('auto');
  const [languageCode, setLanguageCode] = useState('');
  const [seed, setSeed] = useState('');
  const [usePvc, setUsePvc] = useState(false);
  const [pronunciationDict, setPronunciationDict] = useState('');

  const [autonomeAusfuehrung, setAutonomeAusfuehrung] = useState(false);
  const [benachrichtigungenAktiviert, setBenachrichtigungenAktiviert] =
    useState(true);
  const [automatischeAntworten, setAutomatischeAntworten] = useState(false);

  if (!bot) {
    notFound();
  }

  const handleSave = () => {
    toast({
      title: 'Einstellungen gespeichert',
      description: `Die Konfiguration für ${bot.name} wurde aktualisiert.`,
    });
    router.push(`/agents/${bot.id}`);
  };

  const responseStyles = [
    'Professionell',
    'Freundlich',
    'Kurz & knapp',
    'Detailliert',
  ];

  return (
    <div className="space-y-8 pb-10 max-w-3xl mx-auto">
      <header className="flex items-center gap-4">
        <Link
          href={`/agents/${bot.id}`}
          className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
        >
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
            <BotIcon className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              {bot.name} Einstellungen
            </h1>
            <p className="text-muted-foreground text-sm font-medium">
              {bot.role}
            </p>
          </div>
        </div>
      </header>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Allgemein
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
              <div>
                <Label htmlFor="agent-active" className="font-bold text-foreground">
                  Agent aktiviert
                </Label>
                <p className="text-xs text-muted-foreground">
                  Agent ist verfügbar und kann Anfragen bearbeiten.
                </p>
              </div>
              <Switch
                id="agent-active"
                checked={isAgentActive}
                onCheckedChange={setIsAgentActive}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="language" className="font-bold text-foreground">
                Bevorzugte Sprache
              </Label>
              <Select value={language} onValueChange={setLanguage}>
                <SelectTrigger id="language" className="w-full bg-input">
                  <SelectValue placeholder="Sprache wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Deutsch">Deutsch</SelectItem>
                  <SelectItem value="English">English</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Verhalten
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <Label className="font-bold text-foreground">Antwortstil</Label>
              <p className="text-xs text-muted-foreground mb-3">
                Definiert die Tonalität und Ausführlichkeit der KI-Antworten.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {responseStyles.map((style) => (
                  <Button
                    key={style}
                    variant={responseStyle === style ? 'default' : 'outline'}
                    onClick={() => setResponseStyle(style)}
                    className="justify-center"
                  >
                    {style}
                  </Button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="custom-prompt"
                className="font-bold text-foreground"
              >
                Benutzerdefinierter Prompt
              </Label>
              <p className="text-xs text-muted-foreground">
                Zusätzliche Anweisungen für diesen Agenten.
              </p>
              <Textarea
                id="custom-prompt"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                rows={3}
                className="bg-input"
                placeholder="z.B. Antworte immer auf Deutsch und verwende einen formellen Ton..."
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
                Stimme (ElevenLabs)
              </h3>
              <Button variant="ghost" size="sm">
                Auf Defaults zurücksetzen
              </Button>
            </div>
            <p className="text-xs text-muted-foreground !mt-2">
              Diese Einstellungen steuern die Text-to-Speech Ausgabe (z.B. in
              Phone-Simulatoren) via ElevenLabs - Default.
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="voice-id">Voice ID (optional)</Label>
                <Input
                  id="voice-id"
                  value={voiceId}
                  onChange={(e) => setVoiceId(e.target.value)}
                  placeholder="Default (aus Mitarbeiter-Stimme)"
                  className="bg-input"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model-id">Model ID (optional)</Label>
                <Input
                  id="model-id"
                  value={modelId}
                  onChange={(e) => setModelId(e.target.value)}
                  className="bg-input"
                />
              </div>
            </div>
            <div>
              <Label className="font-bold text-foreground">Voice Settings</Label>
              <div className="space-y-4 pt-4">
                <div className="grid gap-2">
                  <div className="flex justify-between text-xs">
                    <Label>Stabilität</Label>
                    <span>{stability[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={stability}
                    onValueChange={setStability}
                    max={1}
                    step={0.01}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between text-xs">
                    <Label>Ähnlichkeit</Label>
                    <span>{similarity[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={similarity}
                    onValueChange={setSimilarity}
                    max={1}
                    step={0.01}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between text-xs">
                    <Label>Stil</Label>
                    <span>{styleExaggeration[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={styleExaggeration}
                    onValueChange={setStyleExaggeration}
                    max={1}
                    step={0.01}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex justify-between text-xs">
                    <Label>Geschwindigkeit</Label>
                    <span>{speed[0].toFixed(2)}</span>
                  </div>
                  <Slider
                    value={speed}
                    onValueChange={setSpeed}
                    max={2}
                    step={0.01}
                  />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
              <Label
                htmlFor="speaker-boost"
                className="font-bold text-foreground"
              >
                Speaker Boost
              </Label>
              <Switch
                id="speaker-boost"
                checked={speakerBoost}
                onCheckedChange={setSpeakerBoost}
              />
            </div>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="border-b-0">
                <AccordionTrigger className="hover:no-underline text-sm">
                  Erweiterte ElevenLabs-Optionen
                </AccordionTrigger>
                <AccordionContent className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="text-normalization">
                        Text Normalization
                      </Label>
                      <Select
                        value={textNormalization}
                        onValueChange={setTextNormalization}
                      >
                        <SelectTrigger
                          id="text-normalization"
                          className="bg-input"
                        >
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="auto">auto</SelectItem>
                          <SelectItem value="0">0</SelectItem>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="language-code">
                        Language Code (ISO 639-1, optional)
                      </Label>
                      <Input
                        id="language-code"
                        value={languageCode}
                        onChange={(e) => setLanguageCode(e.target.value)}
                        placeholder="z.B. de / en / ja"
                        className="bg-input"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="seed">Seed (optional)</Label>
                    <Input
                      id="seed"
                      value={seed}
                      onChange={(e) => setSeed(e.target.value)}
                      placeholder="0-4294967295"
                      className="bg-input"
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                    <div>
                      <Label
                        htmlFor="use-pvc"
                        className="font-bold text-foreground flex items-center gap-2"
                      >
                        Use PVC as IVC (deprecated){' '}
                        <Info className="w-3.5 h-3.5 text-muted-foreground" />
                      </Label>
                    </div>
                    <Switch
                      id="use-pvc"
                      checked={usePvc}
                      onCheckedChange={setUsePvc}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="pronunciation-dict">
                      Pronunciation Dictionaries (JSON, optional)
                    </Label>
                    <Textarea
                      id="pronunciation-dict"
                      value={pronunciationDict}
                      onChange={(e) => setPronunciationDict(e.target.value)}
                      rows={3}
                      className="bg-input font-mono text-xs"
                      placeholder='[{"pronunciation_dictionary_id":"...","version_id":"..."}]'
                    />
                  </div>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="item-1" className="border-b-0">
                      <AccordionTrigger className="text-xs hover:no-underline">Stitching / Kontext (optional)</AccordionTrigger>
                      <AccordionContent>
                        <p className="text-xs text-muted-foreground italic p-4 text-center">Keine weiteren Optionen konfiguriert.</p>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Autonomie
            </h3>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
              <div>
                <Label
                  htmlFor="autonome-ausfuehrung"
                  className="font-bold text-foreground"
                >
                  Autonome Ausführung
                </Label>
                <p className="text-xs text-muted-foreground">
                  Agent kann Aktion selbstständig ausführen.
                </p>
              </div>
              <Switch
                id="autonome-ausfuehrung"
                checked={autonomeAusfuehrung}
                onCheckedChange={setAutonomeAusfuehrung}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider">
              Benachrichtigungen
            </h3>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
              <div>
                <Label
                  htmlFor="benachrichtigungen-aktiviert"
                  className="font-bold text-foreground"
                >
                  Benachrichtigungen aktiviert
                </Label>
                <p className="text-xs text-muted-foreground">
                  Erhalte Updates wenn der Agent eine Aufgabe abgeschlossen hat.
                </p>
              </div>
              <Switch
                id="benachrichtigungen-aktiviert"
                checked={benachrichtigungenAktiviert}
                onCheckedChange={setBenachrichtigungenAktiviert}
              />
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
              <div>
                <Label
                  htmlFor="automatische-antworten"
                  className="font-bold text-foreground"
                >
                  Automatische Antworten
                </Label>
                <p className="text-xs text-muted-foreground">
                  Agent antwortet automatisch auf eingehende Nachrichten.
                </p>
              </div>
              <Switch
                id="automatische-antworten"
                checked={automatischeAntworten}
                onCheckedChange={setAutomatischeAntworten}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="outline"
            onClick={() => router.push(`/agents/${bot.id}`)}
          >
            Zurück
          </Button>
          <Button onClick={handleSave}>Einstellungen speichern</Button>
        </div>
      </div>
    </div>
  );
}
