'use client';

import { useState, useRef, type FormEvent } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { List, Paperclip } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type Submission = {
  id: string;
  date: string;
  category: string;
  title: string;
  status: 'Neu' | 'In Prüfung' | 'Gelöst';
};

export default function FeedbackPage() {
  const { toast } = useToast();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [fileName, setFileName] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleFeedbackSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    if (!data.category || !data.area || !data.priority || !data.title || !data.description) {
      toast({
        variant: "destructive",
        title: "Fehler",
        description: "Bitte füllen Sie alle erforderlichen Felder aus.",
      });
      return;
    }

    const newSubmission: Submission = {
      id: `FB-${Math.floor(Math.random() * 10000)}`,
      date: new Date().toLocaleDateString('de-DE'),
      category: data.category as string,
      title: data.title as string,
      status: 'Neu',
    };

    setSubmissions((prev) => [newSubmission, ...prev]);

    toast({
      title: 'Feedback gesendet',
      description: 'Vielen Dank für deine Unterstützung!',
    });

    form.reset();
    setFileName(null);
    // Manually reset select placeholders if needed, though default value should work.
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    setFileName(file ? file.name : null);
  };

  return (
    <div className="space-y-8 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Feedback
        </h1>
        <p className="text-muted-foreground">
          Hilf uns, das System zu verbessern: Bugs, Ideen und Wünsche direkt
          hier einreichen.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <form
              ref={formRef}
              onSubmit={handleFeedbackSubmit}
              className="space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-muted-foreground uppercase">
                    Kategorie <span className="text-rose-500">*</span>
                  </Label>
                  <Select required name="category">
                    <SelectTrigger className="w-full bg-input">
                      <SelectValue placeholder="Bitte wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Bug / Problem">Bug / Problem</SelectItem>
                      <SelectItem value="Feature-Wunsch">Feature-Wunsch</SelectItem>
                      <SelectItem value="Verbesserungsvorschlag">
                        Verbesserungsvorschlag
                      </SelectItem>
                      <SelectItem value="UX/Design">UX / Design</SelectItem>
                      <SelectItem value="Performance">Performance</SelectItem>
                      <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-muted-foreground uppercase">
                    Betroffener Bereich <span className="text-rose-500">*</span>
                  </Label>
                   <Select required name="area">
                    <SelectTrigger className="w-full bg-input">
                      <SelectValue placeholder="Bitte wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Management → Abteilungen">Management → Abteilungen</SelectItem>
                        <SelectItem value="Wissensdatenbank">Wissensdatenbank</SelectItem>
                        <SelectItem value="KI-Mitarbeiter">KI-Mitarbeiter</SelectItem>
                        <SelectItem value="Chat">Chat</SelectItem>
                        <SelectItem value="Tools / AI-Tools">Tools / AI-Tools</SelectItem>
                        <SelectItem value="Login / Zugang">Login / Zugang</SelectItem>
                        <SelectItem value="Abrechnung / Vertrag">Abrechnung / Vertrag</SelectItem>
                        <SelectItem value="Sonstiges">Sonstiges</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-bold text-muted-foreground uppercase">
                    Priorität <span className="text-rose-500">*</span>
                  </Label>
                  <Select required name="priority" defaultValue="Mittel">
                     <SelectTrigger className="w-full bg-input">
                      <SelectValue placeholder="Bitte wählen..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Niedrig">Niedrig</SelectItem>
                        <SelectItem value="Mittel">Mittel</SelectItem>
                        <SelectItem value="Hoch">Hoch</SelectItem>
                        <SelectItem value="Kritisch">Kritisch</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor='title' className="text-xs font-bold text-muted-foreground uppercase">
                    Titel <span className="text-rose-500">*</span>
                  </Label>
                  <Input id='title' type="text" required maxLength={80} name="title" className="bg-input" placeholder="Kurze Zusammenfassung" />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor='description' className="text-xs font-bold text-muted-foreground uppercase">
                  Beschreibung <span className="text-rose-500">*</span>
                </Label>
                <Textarea id='description' required maxLength={1500} name="description" rows={4} className="bg-input resize-none" placeholder="Was ist passiert? Was erwartest du? Schritte zur Reproduktion (falls Bug)." />
              </div>

               <div className="space-y-1.5">
                <Label className="text-xs font-bold text-muted-foreground uppercase">Anhänge (optional)</Label>
                <div className="border border-dashed border-border rounded-xl p-4 text-center hover:bg-accent/80 transition-colors">
                    <Input id="feedback-attachment" type="file" className="hidden" onChange={handleFileChange} />
                    <Label htmlFor="feedback-attachment" className="cursor-pointer text-sm text-primary hover:text-primary/80 flex flex-col items-center gap-2">
                        <Paperclip className="w-5 h-5" />
                        <span>Datei auswählen oder hier ablegen</span>
                    </Label>
                    <span className="block text-[10px] text-muted-foreground mt-1">{fileName || 'Keine Datei ausgewählt'}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <Checkbox id="terms" required />
                    <Label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer">
                        Ich stimme zu, dass meine Angaben zur Produktverbesserung verarbeitet werden.
                    </Label>
                  </div>
                  
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                      <Button type="reset" variant="outline" onClick={() => { formRef.current?.reset(); setFileName(null); }}>Zurücksetzen</Button>
                      <Button type="submit" >Feedback senden</Button>
                  </div>
              </div>
            </form>
          </Card>
        </div>

        <div>
          <Card className="p-6 h-full flex flex-col">
            <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
              <List className="w-5 h-5 text-emerald-400" /> Meine Einsendungen
            </h2>

            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1 max-h-[600px]">
              {submissions.length > 0 ? submissions.map(item => (
                <div key={item.id} className="bg-muted/50 border border-border rounded-xl p-3 flex justify-between items-center group hover:bg-accent/80 transition-colors">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-muted-foreground bg-background px-1.5 py-0.5 rounded border border-border">{item.category}</span>
                            <span className="text-xs text-muted-foreground font-mono">{item.date}</span>
                        </div>
                        <p className="text-sm font-bold text-foreground line-clamp-1 break-words">{item.title}</p>
                    </div>
                    <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">{item.status}</span>
                </div>
              )) : (
                <p className="text-xs text-muted-foreground italic text-center py-8">
                  Noch keine Einsendungen.
                </p>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
