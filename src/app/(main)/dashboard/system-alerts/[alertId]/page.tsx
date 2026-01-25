'use client';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import {
  ChevronLeft,
  AlertTriangle,
  Mail,
  Clock,
  Activity,
  Info,
  Quote,
  ExternalLink,
  ListChecks,
  User,
  X,
  Cpu,
  Database,
  Zap,
  Bot as BotIcon,
  Send,
  MessageSquare,
  ArrowLeft,
  Search as SearchIcon,
  Plus,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useParams, useRouter, notFound } from 'next/navigation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chatThreads, chatMessages } from '@/lib/data';
import { Badge } from '@/components/ui/badge';


const ChatInbox = ({
  isOpen,
  onOpenChange,
  activeThreadId,
  onThreadSelect,
}: {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  activeThreadId: string | null;
  onThreadSelect: (threadId: string | null) => void;
}) => {
  const threads = chatThreads;
  const messages = activeThreadId ? chatMessages[activeThreadId] || [] : [];
  const activeThread = threads.find((t) => t.id === activeThreadId);

  if (!isOpen) {
    return null;
  }

  return (
    <Card className="fixed inset-0 z-50 flex flex-col shadow-2xl animate-in slide-in-from-bottom-5 fade-in-50 rounded-2xl md:inset-auto md:bottom-6 md:left-6 md:w-[420px] md:h-[70vh] md:max-h-[calc(100vh-5rem)]">
      {activeThread ? (
        <>
          <div className="p-4 border-b border-border flex items-center gap-3 flex-shrink-0">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onThreadSelect(null)}
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h3 className="font-bold text-foreground leading-tight">
                {activeThread.title}
              </h3>
              <p className="text-xs text-muted-foreground capitalize">
                {activeThread.contextType}
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {messages.map((msg: any) => (
                <div
                  key={msg.id}
                  className={cn(
                    'flex items-start gap-3',
                    msg.sender.name === 'Dr. Müller' && 'justify-end'
                  )}
                >
                  {msg.sender.name !== 'Dr. Müller' && (
                    <Avatar className="w-8 h-8 border">
                      <AvatarFallback>
                        {msg.sender.avatar === 'Bot' ? (
                          <BotIcon className="w-4 h-4" />
                        ) : (
                          msg.sender.avatar
                        )}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      'max-w-xs p-3 rounded-xl text-sm',
                      msg.type === 'system' &&
                        'text-center w-full text-xs text-muted-foreground italic',
                      msg.type === 'ai_summary' &&
                        'bg-blue-500/10 border border-blue-500/20 text-blue-300',
                      msg.type === 'user' &&
                        (msg.sender.name === 'Dr. Müller'
                          ? 'bg-primary text-primary-foreground rounded-br-none'
                          : 'bg-muted rounded-bl-none')
                    )}
                  >
                    <p
                      className={cn(
                        'text-xs font-bold mb-1',
                        msg.sender.name === 'Dr. Müller'
                          ? 'text-primary-foreground/80'
                          : 'text-foreground/80'
                      )}
                    >
                      {msg.sender.name}
                    </p>
                    <p>{msg.text}</p>
                  </div>
                  {msg.sender.name === 'Dr. Müller' && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>DM</AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border mt-auto">
            <div className="relative">
              <Textarea
                placeholder="Nachricht..."
                className="bg-input pr-12"
                rows={1}
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="p-4 border-b border-border flex items-center justify-between flex-shrink-0">
            <h2 className="font-bold text-lg text-foreground">Kommunikation</h2>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => onOpenChange(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 border-b border-border">
            <div className="relative mt-2">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Suchen..." className="pl-9 bg-input" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="p-2 space-y-1">
              {threads.map((thread) => (
                <div
                  key={thread.id}
                  onClick={() => onThreadSelect(thread.id)}
                  className="p-3 rounded-lg hover:bg-muted cursor-pointer"
                >
                  <div className="flex justify-between items-start">
                    <p className="font-bold text-sm text-foreground line-clamp-1">
                      {thread.title}
                    </p>
                    {thread.unreadCount > 0 && (
                      <Badge className="bg-primary">{thread.unreadCount}</Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-1">
                    {thread.lastMessageSnippet}
                  </p>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t border-border mt-auto">
            <Button className="w-full">
              <Plus className="w-4 h-4 mr-2" /> Neue Nachricht
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

type Measure = {
  text: string;
  status: string;
};

type Escalation = typeof initialEscalation;

const initialEscalation = {
  id: 'ESC-2910',
  status: 'In Prüfung',
  responsible: 'Nicht zugewiesen',
  context:
    'Kunde hat in der letzten E-Mail vom 14.01. explizit "Kündigung zum nächstmöglichen Zeitpunkt" erwähnt. Sentiment-Analyse: Negativ (-0.8).',
  measures: [
    { text: 'Kundenhistorie prüfen (Tickets, Rechnungen)', status: 'Offen' },
    { text: 'Termin zur Klärung anbieten', status: 'Offen' },
    { text: 'Kulanz/Angebot vorbereiten', status: 'Offen' },
    { text: 'Verantwortlichen zuweisen', status: 'Offen' },
  ],
  notes: '',
};

const EscalationDetailView = ({
  onOpenChat,
}: {
  onOpenChat: (threadId: string | null) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [escalation, setEscalation] = useState<Escalation>(initialEscalation);
  const [editData, setEditData] = useState<Escalation>(escalation);

  const handleEdit = () => {
    setEditData(escalation);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleSave = () => {
    setEscalation(editData);
    setIsEditing(false);
  };

  const handleEditDataChange = (field: keyof Escalation, value: any) => {
    setEditData((prev) => ({ ...prev, [field]: value }));
  };

  const handleMeasureChange = (
    index: number,
    field: 'text' | 'status',
    value: string
  ) => {
    const newMeasures = [...editData.measures];
    newMeasures[index] = { ...newMeasures[index], [field]: value };
    setEditData((prev) => ({ ...prev, measures: newMeasures }));
  };

  const statusColor =
    escalation.status === 'Neu'
      ? 'rose'
      : escalation.status === 'In Prüfung'
      ? 'amber'
      : 'emerald';

  if (isEditing) {
    return (
      <div className="space-y-8 pb-20">
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={handleCancel}
              className="h-9 w-9"
            >
              <X className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-white tracking-tight">
                Eskalation bearbeiten
              </h1>
              <p className="text-slate-400 mt-1">
                Änderungen werden nach dem Speichern übernommen.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={handleCancel}>
              Abbrechen
            </Button>
            <Button
              onClick={handleSave}
              className="bg-emerald-600 hover:bg-emerald-500"
            >
              Speichern
            </Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="p-6">
              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                Status
              </label>
              <Select
                value={editData.status}
                onValueChange={(value) => handleEditDataChange('status', value)}
              >
                <SelectTrigger className="w-full bg-slate-900 border-slate-700 mb-4">
                  <SelectValue placeholder="Status wählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Neu">Neu</SelectItem>
                  <SelectItem value="In Prüfung">In Prüfung</SelectItem>
                  <SelectItem value="Gelöst">Gelöst</SelectItem>
                </SelectContent>
              </Select>

              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                Kontext / Begründung
              </label>
              <Textarea
                value={editData.context}
                onChange={(e) => handleEditDataChange('context', e.target.value)}
                rows={6}
                className="bg-slate-900 border-slate-700"
              />
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                Verantwortlich
              </label>
              <Input
                value={editData.responsible}
                onChange={(e) =>
                  handleEditDataChange('responsible', e.target.value)
                }
                className="bg-slate-900 border-slate-700 mb-4"
              />

              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                Maßnahmen
              </label>
              <div className="space-y-3 mb-4">
                {editData.measures.map((m, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={m.text}
                      onChange={(e) =>
                        handleMeasureChange(index, 'text', e.target.value)
                      }
                      className="bg-slate-800 border-slate-700/50 text-sm"
                    />
                    <Select
                      value={m.status}
                      onValueChange={(value) =>
                        handleMeasureChange(index, 'status', value)
                      }
                    >
                      <SelectTrigger className="w-[120px] bg-slate-900 border-slate-700 text-xs">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Offen">Offen</SelectItem>
                        <SelectItem value="In Arbeit">In Arbeit</SelectItem>
                        <SelectItem value="Erledigt">Erledigt</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <label className="text-xs font-bold text-slate-400 uppercase block mb-2">
                Notiz
              </label>
              <Textarea
                value={editData.notes}
                onChange={(e) => handleEditDataChange('notes', e.target.value)}
                rows={3}
                placeholder="Interne Notiz hinzufügen..."
                className="bg-slate-900 border-slate-700"
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl bg-[#1E293B] border border-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white tracking-tight break-words">
                Eskalation: Vertragskündigung erkannt
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-${statusColor}-500/10 text-${statusColor}-400 border border-${statusColor}-500/20`}
              >
                {escalation.status}
              </span>
            </div>
            <p className="text-slate-400 mt-1">
              Hier siehst du die erkannten Hinweise, Kontext und die empfohlenen
              nächsten Schritte.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="cursor-default">
            Ansehen
          </Button>
          <Button onClick={handleEdit}>Bearbeiten</Button>
        </div>
      </header>

      <Tabs defaultValue="details" className="w-full">
        <TabsList className="mb-6 grid w-full grid-cols-3">
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="kommunikation">Kommunikation</TabsTrigger>
          <TabsTrigger value="aktivitaet">Aktivität</TabsTrigger>
        </TabsList>
        <TabsContent value="details">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-500" /> Erkannter
                  Hinweis
                </h3>
                <div className="space-y-2">
                  <p className="text-white font-medium text-lg">
                    Kündigungsabsicht im Schriftverkehr erkannt
                  </p>
                  <div className="flex items-center gap-4 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Activity className="w-3 h-3" /> Sicherheit: 78%
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-3 h-3" /> Quelle: E-Mail #9281
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" /> 14.01. 10:42
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Info className="w-4 h-4 text-blue-400" /> Kontext / Begründung
                </h3>
                <div className="text-slate-300 text-sm leading-relaxed">
                  {escalation.context}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Quote className="w-4 h-4 text-slate-500" /> Auszug
                </h3>
                <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 italic text-slate-400 text-sm mb-4">
                  "...hiermit möchte ich meinen Vertrag zum nächstmöglichen
                  Zeitpunkt kündigen. Bitte senden Sie mir eine Bestätigung..."
                </div>
                <button className="text-xs font-bold text-slate-500 flex items-center gap-1 hover:text-white transition-colors cursor-not-allowed opacity-50">
                  <ExternalLink className="w-3 h-3" /> Original ansehen (nicht
                  verfügbar)
                </button>
              </Card>
            </div>

            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <ListChecks className="w-4 h-4 text-emerald-400" /> Empfohlene
                  Maßnahmen
                </h3>
                <div className="space-y-3">
                  {escalation.measures.map((m, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-slate-800/40 rounded-xl border border-slate-700/30"
                    >
                      <span className="text-sm text-slate-300">{m.text}</span>
                      <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-slate-900 text-slate-500 border border-slate-700">
                        {m.status}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
                  <User className="w-4 h-4 text-purple-400" /> Zuständigkeit
                </h3>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 border border-slate-700">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">
                      {escalation.responsible}
                    </p>
                    <p className="text-xs text-slate-500">Verantwortlich</p>
                  </div>
                </div>

                <h4 className="text-xs font-bold text-slate-500 uppercase mb-3">
                  Verlauf
                </h4>
                <div className="space-y-4 pl-2 border-l border-slate-700/50 ml-1">
                  <div className="pl-4 relative before:absolute before:left-[-5px] before:top-1.5 before:w-2.5 before:h-2.5 before:rounded-full before:bg-slate-700 before:border-2 before:border-[#1E293B]">
                    <p className="text-xs text-slate-300">
                      Eskalation erkannt durch AI
                    </p>
                    <span className="text-[10px] text-slate-500">
                      Vor 2 Stunden
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4">
                  Notiz
                </h3>
                <p className="text-sm text-slate-400 italic mb-2">
                  {escalation.notes || 'Keine Notizen vorhanden.'}
                </p>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="kommunikation">
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Der Chat zu dieser Eskalation ist jetzt im Chat-Drawer verfügbar.
              </p>
              <Button onClick={() => onOpenChat('esc-2910-chat')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                Chat öffnen
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="aktivitaet">
          <Card>
            <CardContent>
              <p className="text-muted-foreground italic text-center py-12">
                Der Aktivitäts-Feed wird hier angezeigt.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

const ApiLimitWarningView = () => {
  return (
    <div className="space-y-8 pb-20">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="p-2 rounded-xl bg-[#1E293B] border border-slate-700/50 text-slate-400 hover:text-white transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-white tracking-tight break-words">
                API Limit fast erreicht
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-amber-500/10 text-amber-400 border border-amber-500/20`}
              >
                Offen
              </span>
            </div>
            <p className="text-slate-400 mt-1">
              Details zur Systemwarnung und empfohlene Maßnahmen.
            </p>
          </div>
        </div>
        <Button>Als erledigt markieren</Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-500" />{' '}
              Zusammenfassung
            </h3>
            <p className="text-white font-medium text-lg">
              Das Nutzungslimit der Google Gemini API ist zu 90% erreicht.
            </p>
            <div className="text-slate-300 text-sm leading-relaxed mt-2">
              Bei Überschreitung können Anfragen an die KI fehlschlagen, was die
              Funktionalität der gesamten Plattform beeinträchtigt.
            </div>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Info className="w-4 h-4 text-blue-400" /> Technischer Kontext
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-400">Quelle/Modul:</span>
                <span className="font-bold text-white">LLM Provider API</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Aktueller Wert:</span>
                <span className="font-bold text-white">90% Auslastung</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Grenzwert:</span>
                <span className="font-bold text-white">100%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Betroffene Funktionen:</span>
                <span className="font-bold text-white">Alle KI-Funktionen</span>
              </div>
            </div>
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-400" /> Empfohlene Maßnahmen
            </h3>
            <p className="text-sm text-slate-300 mb-4">
              Führen Sie ein Upgrade Ihres API-Plans durch, um eine
              unterbrechungsfreie Nutzung sicherzustellen.
            </p>
            <Button className="w-full">
              <ExternalLink className="mr-2 h-4 w-4" /> Zum Provider
            </Button>
          </Card>
          <Card className="p-6">
            <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-purple-400" /> Verlauf
            </h3>
            <div className="space-y-4 pl-2 border-l border-slate-700/50 ml-1">
              <div className="pl-4 relative before:absolute before:left-[-5px] before:top-1.5 before:w-2.5 before:h-2.5 before:rounded-full before:bg-slate-700 before:border-2 before:border-[#1E293B]">
                <p className="text-xs text-slate-300">
                  Warnung erkannt durch System-Monitoring
                </p>
                <span className="text-[10px] text-slate-500">
                  Gerade eben
                </span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default function SystemAlertDetailPage() {
  const params = useParams();
  const alertId = params.alertId as string;
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChatThread, setActiveChatThread] = useState<string | null>(null);

  const handleOpenChat = (threadId: string | null) => {
    setActiveChatThread(threadId);
    setIsChatOpen(true);
  };

  const renderContent = () => {
    switch (alertId) {
      case 'esc-2910':
        return <EscalationDetailView onOpenChat={handleOpenChat} />;
      case 'warn-api-limit':
        return <ApiLimitWarningView />;
      default:
        notFound();
    }
  };

  const totalUnread = chatThreads.reduce(
    (sum, t) => sum + (t.unreadCount || 0),
    0
  );

  return (
    <>
      {renderContent()}
      <Button
        size="icon"
        onClick={() => {
          setActiveChatThread(null);
          setIsChatOpen(true);
        }}
        className="fixed bottom-6 left-6 h-14 w-14 rounded-full shadow-2xl z-40"
      >
        <MessageSquare />
        {totalUnread > 0 && (
          <Badge className="absolute -top-1 -right-1 h-6 w-6 justify-center p-0">
            {totalUnread}
          </Badge>
        )}
      </Button>
      <ChatInbox
        isOpen={isChatOpen}
        onOpenChange={setIsChatOpen}
        activeThreadId={activeChatThread}
        onThreadSelect={setActiveChatThread}
      />
    </>
  );
}
