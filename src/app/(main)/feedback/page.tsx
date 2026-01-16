import { Card } from '@/components/ui/card';
import { List } from 'lucide-react';

export default function FeedbackPage() {
  return (
    <div className="space-y-8 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Feedback
        </h1>
        <p className="text-slate-400">
          Hilf uns, das System zu verbessern: Bugs, Ideen und Wünsche direkt
          hier einreichen.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <p className="text-center text-slate-400 italic">
              Feedback form placeholder.
            </p>
          </Card>
        </div>

        <div>
          <Card className="p-6 h-full flex flex-col">
            <h2 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <List className="w-5 h-5 text-emerald-400" /> Meine Einsendungen
            </h2>

            <div className="space-y-3 flex-1 overflow-y-auto custom-scrollbar pr-1 max-h-[600px]">
              <p className="text-xs text-slate-500 italic text-center py-8">
                Noch keine Einsendungen.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
