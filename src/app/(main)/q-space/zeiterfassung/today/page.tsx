'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Clock,
  Play,
  Square,
  Plus,
  Briefcase,
  BookOpen,
  CheckSquare,
  MoreVertical,
  BrainCircuit,
  Save,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { mockTimeEntries, mockProjects, mockTasks, mockSops } from '@/lib/data';
import { formatDistanceStrict } from 'date-fns';
import { de } from 'date-fns/locale';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';

export default function ZeiterfassungTodayPage() {
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [todayEntries, setTodayEntries] = useState(mockTimeEntries);
  const [isManualEntryOpen, setIsManualEntryOpen] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };
  
  const todayTotalMin = todayEntries.reduce((sum, entry) => sum + entry.durationMin, 0);

  const kpis = [
      { title: "Heute erfasst", value: `${Math.floor(todayTotalMin / 60)}h ${todayTotalMin % 60}m`},
      { title: "Laufender Timer", value: timerRunning ? formatTime(elapsedTime) : 'Nein' },
      { title: "Offen zur Freigabe", value: todayEntries.filter(e => e.status === 'submitted').length },
      { title: "Diese Woche", value: "8h 15m" } // mock
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map(kpi => (
              <Card key={kpi.title}>
                  <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-muted-foreground">{kpi.title}</CardTitle></CardHeader>
                  <CardContent><p className="text-2xl font-bold">{kpi.value}</p></CardContent>
              </Card>
          ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        <Card className="lg:col-span-1 p-6 space-y-4">
          <h2 className="text-lg font-bold">Zeiten erfassen</h2>
          <div className="p-4 rounded-xl bg-muted/50 border flex justify-between items-center">
            <span className="text-2xl font-mono font-bold">{formatTime(elapsedTime)}</span>
            <Button size="icon" onClick={() => setTimerRunning(!timerRunning)}>
              {timerRunning ? <Square className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </Button>
          </div>
          <div className="space-y-2">
            <Label>Kontext (Projekt, Aufgabe, etc.)</Label>
            <Select>
              <SelectTrigger className="bg-input"><SelectValue placeholder="Kontext auswählen..."/></SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Allgemein</SelectItem>
                {mockProjects.map(p => <SelectItem key={p.id} value={`proj-${p.id}`}>{p.name}</SelectItem>)}
                {mockTasks.map(t => <SelectItem key={t.id} value={`task-${t.id}`}>{t.title}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
           <div className="space-y-2">
                <Label>Notiz (optional)</Label>
                <Input className="bg-input" placeholder="Woran wird gearbeitet?"/>
            </div>
            <Button className="w-full" disabled={!timerRunning}>
              <Save className="w-4 h-4 mr-2" /> Eintrag speichern
            </Button>
            <Button variant="outline" className="w-full" onClick={() => setIsManualEntryOpen(!isManualEntryOpen)}>
              <Plus className="w-4 h-4 mr-2" /> Manueller Eintrag
            </Button>
            {isManualEntryOpen && (
                <div className="space-y-3 pt-3 border-t animate-in fade-in">
                    <h3 className="font-bold">Manueller Eintrag</h3>
                    <div className="grid grid-cols-2 gap-2">
                        <Input type="time" defaultValue="09:00" />
                        <Input type="time" defaultValue="10:30" />
                    </div>
                    <Button className="w-full">Speichern</Button>
                </div>
            )}
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-center">
                <h2 className="text-lg font-bold">Heutige Einträge</h2>
                <Button variant="outline">Woche einreichen</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {todayEntries.map(entry => (
              <div key={entry.id} className="p-3 rounded-lg border flex items-center gap-4">
                <div className="flex-1">
                  <p className="font-bold">{entry.titleSnapshot}</p>
                  <p className="text-xs text-muted-foreground">{entry.note}</p>
                  <div className="flex items-center gap-2 text-xs mt-1">
                      <Clock className="w-3 h-3 text-muted-foreground" />
                      <span>
                        {formatDistanceStrict(new Date(entry.endAt!), new Date(entry.startAt!), { locale: de })}
                      </span>
                  </div>
                </div>
                <Badge variant="outline">{entry.status}</Badge>
                <Button variant="ghost" size="icon" className="w-8 h-8"><MoreVertical className="w-4 h-4" /></Button>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
