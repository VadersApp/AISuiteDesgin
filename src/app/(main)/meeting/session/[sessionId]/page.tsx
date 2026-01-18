
'use client';

import { useState, useRef } from 'react';
import { bots } from '@/lib/data';
import {
  Users,
  SendHorizontal,
  Bot,
  ChevronLeft,
  BrainCircuit,
  Goal,
  Mic,
  BookText,
  ListTodo,
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const mockProtocol = {
    title: "Q4 Strategie-Review",
    date: new Date().toLocaleString('de-DE'),
    participants: ["Dr. Müller (User)", "Ava Assist (Moderator)", "Leo Sales", "Sophie Market"],
    agenda: "Analyse der Q4-Zahlen und Planung der Marketing-Strategie für Q1.",
    decisions: ["Marketing-Budget für Q1 wird um 10% erhöht."],
    keyInsights: ["Sales-Zahlen für Q4 übertreffen die Prognose um 5%.", "Social Media Kampagnen waren der Haupttreiber für neue Leads."],
    risks: ["Wettbewerber X hat ein ähnliches Produkt angekündigt."],
    nextSteps: ["Leo Sales erstellt eine detaillierte Wettbewerbsanalyse bis Freitag.", "Sophie Market plant die Q1-Kampagne basierend auf den gewonnenen Insights."],
};

const mockTasks = [
    { id: 'T-201', title: "Detaillierte Wettbewerbsanalyse erstellen", owner: "Leo Sales", status: "Offen", priority: "Hoch"},
    { id: 'T-202', title: "Q1-Kampagne planen", owner: "Sophie Market", status: "Offen", priority: "Hoch"},
    { id: 'T-203', title: "Budgetanpassung im System vornehmen", owner: "Sam Finance", status: "Vorgeschlagen", priority: "Mittel"},
]


export default function MeetingSessionPage() {
  const params = useParams();
  const sessionId = params.sessionId;
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [micError, setMicError] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  // In a real app, you would fetch session data based on the ID
  // For now, we'll just show some bots as participants
  const participants = bots.filter(b => ['ava', 'leo', 'sophie'].includes(b.id));

  const handleMicClick = async () => {
      setMicError(false);
      if (isRecording) {
        mediaRecorderRef.current?.stop();
        return;
      }

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        setIsRecording(true);

        const recorder = new MediaRecorder(stream);
        mediaRecorderRef.current = recorder;
        audioChunksRef.current = [];

        recorder.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        recorder.onstop = () => {
          setIsRecording(false);
          setIsProcessing(true);
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });

          // Simulate Speech-to-Text API Call
          setTimeout(() => {
            const input = document.getElementById('meeting-input') as HTMLInputElement;
            if (input) {
              const existingText = input.value ? input.value + ' ' : '';
              input.value = existingText + "Simulierte Transkription des Gesprochenen.";
            }
            setIsProcessing(false);
          }, 1500);
          
          stream.getTracks().forEach(track => track.stop());
        };

        recorder.start();
      } catch (err) {
        console.error("Microphone access denied:", err);
        setMicError(true);
        setIsRecording(false);
      }
    };

    const getMicButtonContent = () => {
        if (isProcessing) {
            return <div className="text-xs text-muted-foreground animate-pulse">Transkribiere...</div>;
        }
        if (isRecording) {
            return <div className="flex items-center gap-2 text-rose-500"><span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>Aufnahme...</div>;
        }
        if (micError) {
            return <div className="text-xs text-rose-500">Zugriff fehlt</div>
        }
        return <Mic className="w-5 h-5" />;
    };


  return (
    <div className="space-y-6 flex flex-col flex-1 h-full">
      <header className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            href="/meeting"
            className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              AI Meeting
            </h1>
            <p className="text-muted-foreground text-sm">
              Live-Kollaboration mit Agenten | ID: {sessionId}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <BrainCircuit className="mr-2 h-4 w-4" /> Zusammenfassen
          </Button>
          <Button variant="outline">
            <Goal className="mr-2 h-4 w-4" /> Aufgaben extrahieren
          </Button>
          <span className="px-3 py-2 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse flex items-center gap-1.5">
            LIVE
          </span>
        </div>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
        <Card className="p-4 flex flex-col overflow-hidden">
          <h3 className="text-xs font-bold text-muted-foreground mb-6 uppercase tracking-widest flex items-center gap-2">
            <Users className="w-3 h-3" /> Teilnehmer
          </h3>
          <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1">
            {participants.map((b) => (
              <div
                key={b.id}
                className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-border bg-background/50"
              >
                <div
                  className={`w-6 h-6 rounded-lg ${
                    b.id === 'ava' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' : 'bg-muted text-muted-foreground border-border'
                  } flex items-center justify-center border`}
                >
                  <Bot className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold">{b.name}</span>
                {b.id === 'ava' && <span className="ml-auto px-2 py-0.5 rounded text-[9px] bg-amber-900/50 text-amber-400 border border-amber-700/50 uppercase font-bold">Moderator</span>}
              </div>
            ))}
          </div>
        </Card>
        <Card className="lg:col-span-3 flex flex-col overflow-hidden">
            <Tabs defaultValue="chat" className="flex-1 flex flex-col overflow-hidden">
                 <TabsList className="bg-muted/50 rounded-none border-b border-border px-4 justify-start gap-4">
                    <TabsTrigger value="chat"><Bot className="mr-2 h-4 w-4"/>Chat</TabsTrigger>
                    <TabsTrigger value="protocol"><BookText className="mr-2 h-4 w-4"/>Protokoll</TabsTrigger>
                    <TabsTrigger value="tasks"><ListTodo className="mr-2 h-4 w-4"/>Aufgaben</TabsTrigger>
                </TabsList>
                <TabsContent value="chat" className="flex-1 overflow-hidden mt-0">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar h-full">
                        <div className="flex justify-center">
                        <div className="px-4 py-2 rounded-full bg-muted border border-border text-muted-foreground text-xs italic">
                            AI Meeting gestartet. Moderator ist Ava Assist.
                        </div>
                        </div>
                        <div className="flex justify-start">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                            <Bot className="w-4 h-4" />
                            </div>
                            <div className="p-4 rounded-xl bg-muted border border-border text-sm max-w-xl">
                            <p className="text-[10px] font-bold text-amber-400 mb-1 flex items-center gap-2">Ava Assist <span className="text-amber-500/80 font-normal">(Moderator)</span></p>
                            <p>
                                Willkommen zum Meeting. Das Ziel ist die Analyse der Q4-Zahlen und die Planung der Q1-Marketing-Strategie. Leo, bitte gib uns einen Überblick über die Sales-Performance.
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="flex justify-start">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                            <Bot className="w-4 h-4" />
                            </div>
                            <div className="p-4 rounded-xl bg-muted border border-border text-sm max-w-xl">
                            <p className="text-[10px] font-bold text-blue-400 mb-1">
                                Leo Sales
                            </p>
                            <p>
                                Gerne. Die Q4-Sales haben die Prognose um 5% übertroffen, hauptsächlich getrieben durch die "Winter-Deal" Kampagne. Ich sehe hier großes Potenzial für eine Wiederholung.
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="flex justify-start">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                            <Bot className="w-4 h-4" />
                            </div>
                            <div className="p-4 rounded-xl bg-muted border border-border text-sm max-w-xl">
                            <p className="text-[10px] font-bold text-purple-400 mb-1">
                                Sophie Market
                            </p>
                            <p>
                                Interessant. Meine Daten bestätigen, dass die Social Media Anzeigen für die "Winter-Deal" Kampagne die höchste Conversion-Rate hatten. Das sollten wir für Q1 verdoppeln.
                            </p>
                            </div>
                        </div>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="protocol" className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar mt-0">
                    <h3 className="text-xl font-bold text-foreground">{mockProtocol.title}</h3>
                    <div className="text-sm space-y-4 text-foreground">
                        <div><strong className="text-muted-foreground block text-xs uppercase">Datum:</strong> {mockProtocol.date}</div>
                        <div><strong className="text-muted-foreground block text-xs uppercase">Teilnehmer:</strong> {mockProtocol.participants.join(', ')}</div>
                        <div><strong className="text-muted-foreground block text-xs uppercase">Agenda:</strong> {mockProtocol.agenda}</div>
                        <div><strong className="text-muted-foreground block text-xs uppercase">Entscheidungen:</strong> <ul className="list-disc pl-5">{mockProtocol.decisions.map((d,i) => <li key={i}>{d}</li>)}</ul></div>
                        <div><strong className="text-muted-foreground block text-xs uppercase">Key Insights:</strong> <ul className="list-disc pl-5">{mockProtocol.keyInsights.map((d,i) => <li key={i}>{d}</li>)}</ul></div>
                        <div><strong className="text-muted-foreground block text-xs uppercase">Risiken:</strong> <ul className="list-disc pl-5">{mockProtocol.risks.map((d,i) => <li key={i}>{d}</li>)}</ul></div>
                         <div><strong className="text-muted-foreground block text-xs uppercase">Nächste Schritte:</strong> <ul className="list-disc pl-5">{mockProtocol.nextSteps.map((d,i) => <li key={i}>{d}</li>)}</ul></div>
                    </div>
                </TabsContent>
                 <TabsContent value="tasks" className="flex-1 overflow-y-auto p-6 space-y-3 custom-scrollbar mt-0">
                    {mockTasks.map(task => (
                        <div key={task.id} className="p-3 rounded-lg bg-muted/50 border border-border flex justify-between items-center">
                            <div>
                                <p className="font-bold text-foreground">{task.title}</p>
                                <p className="text-xs text-muted-foreground">Owner: {task.owner}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${task.priority === 'Hoch' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'}`}>{task.priority}</span>
                                <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">{task.status}</span>
                            </div>
                        </div>
                    ))}
                </TabsContent>
            </Tabs>
          <div className="p-4 border-t border-border bg-card/50 flex gap-3">
            <div className="flex-1 relative">
              <input
                id="meeting-input"
                type="text"
                placeholder="Sprechen oder schreiben..."
                className="w-full bg-background/80 border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors pr-28"
              />
              <div className="absolute right-14 top-1/2 -translate-y-1/2 flex items-center">
                <button
                    onClick={handleMicClick}
                    className={cn(
                    'p-2 h-9 min-w-[36px] bg-muted text-muted-foreground rounded-lg hover:bg-accent hover:text-foreground transition-all flex items-center justify-center',
                    isRecording && 'bg-rose-500/10 text-rose-500 hover:bg-rose-500/20',
                    isProcessing && 'bg-blue-500/10'
                    )}
                    disabled={isProcessing}
                >
                    {getMicButtonContent()}
                </button>
              </div>
            </div>
            <Button className="p-3 rounded-xl aspect-square h-full">
              <SendHorizontal className="w-5 h-5" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
