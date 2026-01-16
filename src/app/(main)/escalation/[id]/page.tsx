import { Card } from '@/components/ui/card';
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
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const currentEscalation = {
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

export default function EscalationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const statusColor =
    currentEscalation.status === 'Neu'
      ? 'rose'
      : currentEscalation.status === 'In Prüfung'
      ? 'amber'
      : 'emerald';

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
                {currentEscalation.status}
              </span>
            </div>
            <p className="text-slate-400 mt-1">
              Hier siehst du die erkannten Hinweise, Kontext und die empfohlenen
              nächsten Schritte.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="cursor-default">Ansehen</Button>
          <Button>Bearbeiten</Button>
        </div>
      </header>

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
              {currentEscalation.context}
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
              {currentEscalation.measures.map((m, i) => (
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
                  {currentEscalation.responsible}
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
              {currentEscalation.notes || 'Keine Notizen vorhanden.'}
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
