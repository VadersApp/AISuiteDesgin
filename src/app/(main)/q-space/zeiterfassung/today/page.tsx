'use client';
import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Square, Coffee, ArrowLeft, AlertTriangle } from 'lucide-react';
import { format as formatDateFns, subDays, isToday, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, eachDayOfInterval, startOfToday, endOfMonth } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

// Helper to format seconds into hh:mm:ss
const formatTime = (totalSeconds: number) => {
  totalSeconds = Math.floor(totalSeconds);
   if (isNaN(totalSeconds) || totalSeconds < 0) totalSeconds = 0;
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formatHoursAndMinutes = (totalMinutes: number) => {
    if (isNaN(totalMinutes) || totalMinutes < 0) totalMinutes = 0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

const formatMinutesToHHMM = (totalMinutes: number) => {
    if (isNaN(totalMinutes) || totalMinutes < 0) totalMinutes = 0;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
};

const formatSaldo = (minutes: number) => {
    if (isNaN(minutes)) minutes = 0;
    const sign = minutes >= 0 ? '+' : '-';
    const absMinutes = Math.abs(minutes);
    return `${sign}${formatMinutesToHHMM(absMinutes)}`;
};


export default function ZeiterfassungTodayPage() {
  const [now, setNow] = useState(new Date());
  const [workState, setWorkState] = useState<'idle' | 'working' | 'paused'>('idle');
  const [workStartTime, setWorkStartTime] = useState<Date | null>(null);
  const [workEndTime, setWorkEndTime] = useState<Date | null>(null);
  const [pauseStartTime, setPauseStartTime] = useState<Date | null>(null);
  const [accumulatedBreakSeconds, setAccumulatedBreakSeconds] = useState(0);
  const [finalTimes, setFinalTimes] = useState<{ work: number; pause: number } | null>(null);

  const [pauseHintShown, setPauseHintShown] = useState(false);
  const [endHintShown, setEndHintShown] = useState(false);

  // Live timer effect
  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Reminder and Tab Close Warning effects
  useEffect(() => {
    // --- Tab Close Warning ---
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (workState === 'working' || workState === 'paused') {
        e.preventDefault();
        e.returnValue = 'Die Arbeitszeiterfassung läuft noch. Möchten Sie die Seite wirklich verlassen?';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    // --- Reminder Logic ---
    if (workState === 'working' && workStartTime) {
        const netWorkSeconds = (now.getTime() - workStartTime.getTime()) / 1000 - accumulatedBreakSeconds;
        const totalElapsedSeconds = (now.getTime() - workStartTime.getTime()) / 1000;

        // Pause reminder
        if (netWorkSeconds >= 6 * 3600 && accumulatedBreakSeconds === 0 && !pauseHintShown) {
            setPauseHintShown(true);
        }

        // End of work reminder
        if (totalElapsedSeconds >= 10 * 3600 && !endHintShown) {
            setEndHintShown(true);
        }
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [now, workState, workStartTime, accumulatedBreakSeconds, pauseHintShown, endHintShown]);

  // Derived values for display
 const { netWorkSeconds, totalPauseSeconds } = useMemo(() => {
    if (finalTimes) {
      return { netWorkSeconds: finalTimes.work, totalPauseSeconds: finalTimes.pause };
    }
    if (!workStartTime) {
      return { netWorkSeconds: 0, totalPauseSeconds: 0 };
    }

    let currentNetWorkSeconds = 0;
    let currentTotalPauseSeconds = accumulatedBreakSeconds;

    if (workState === 'working') {
      currentNetWorkSeconds = (now.getTime() - workStartTime.getTime()) / 1000 - accumulatedBreakSeconds;
    } else if (workState === 'paused' && pauseStartTime) {
      currentNetWorkSeconds = (pauseStartTime.getTime() - workStartTime.getTime()) / 1000 - accumulatedBreakSeconds;
      currentTotalPauseSeconds += (now.getTime() - pauseStartTime.getTime()) / 1000;
    } else if (workState === 'idle' && workEndTime && workStartTime) {
      // This state is after work has ended for the day
      currentNetWorkSeconds = (workEndTime.getTime() - workStartTime.getTime()) / 1000 - accumulatedBreakSeconds;
      currentTotalPauseSeconds = accumulatedBreakSeconds;
    }
    
    return { netWorkSeconds: Math.max(0, currentNetWorkSeconds), totalPauseSeconds: Math.max(0, currentTotalPauseSeconds) };

  }, [now, workState, workStartTime, pauseStartTime, accumulatedBreakSeconds, finalTimes, workEndTime]);

  const dashboardData = useMemo(() => {
    const todayNetWorkMinutes = Math.floor(Math.max(0, netWorkSeconds) / 60);

    const today = new Date();
    const targetWorkMinPerDay = 480; // 8 hours
    const workdays = [1, 2, 3, 4, 5]; // Mon-Fri

    const mockPreviousEntries = [
        { date: subDays(today, 1), totalWorkMin: 495 },
        { date: subDays(today, 2), totalWorkMin: 470 },
    ];
    
    const todayEntry = { date: today, totalWorkMin: todayNetWorkMinutes };
    const allEntriesForCalc = [...mockPreviousEntries.filter(e => e.date < startOfToday()), todayEntry];
    
    const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
    const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
    const weekWorkMin = allEntriesForCalc.filter(e => isWithinInterval(e.date, { start: startOfThisWeek, end: endOfThisWeek })).reduce((sum, e) => sum + e.totalWorkMin, 0);

    const startOfThisMonth = startOfMonth(today);
    const monthWorkMin = allEntriesForCalc.filter(e => isWithinInterval(e.date, { start: startOfThisMonth, end: today })).reduce((sum, e) => sum + e.totalWorkMin, 0);
    
    const daysInMonthSoFar = eachDayOfInterval({ start: startOfThisMonth, end: today });
    const workdaysSoFar = daysInMonthSoFar.filter(day => workdays.includes(day.getDay())).length;
    const monthTargetMin = workdaysSoFar * targetWorkMinPerDay;
    const saldoMin = monthWorkMin - monthTargetMin;

    return {
        today: formatMinutesToHHMM(todayNetWorkMinutes),
        week: formatMinutesToHHMM(weekWorkMin),
        month: formatMinutesToHHMM(monthWorkMin),
        saldo: formatSaldo(saldoMin),
        prognose: "N/A"
    };
  }, [netWorkSeconds]);

  const handleStartWork = () => {
    setWorkState('working');
    setWorkStartTime(new Date());
    setWorkEndTime(null);
    setAccumulatedBreakSeconds(0);
    setPauseStartTime(null);
    setPauseHintShown(false);
    setEndHintShown(false);
    setFinalTimes(null);
  };

  const handlePause = () => {
    if (workState === 'working' && workStartTime) {
      setWorkState('paused');
      setPauseStartTime(new Date());
    } else if (workState === 'paused' && pauseStartTime) {
      const pauseDuration = (new Date().getTime() - pauseStartTime.getTime()) / 1000;
      setAccumulatedBreakSeconds(prev => prev + pauseDuration);
      setWorkState('working');
      setPauseStartTime(null);
    }
  };

  const handleEndWork = () => {
    if (!workStartTime) return;
    const endTime = new Date();

    let finalPauseSecs = accumulatedBreakSeconds;
    if (workState === 'paused' && pauseStartTime) {
        finalPauseSecs += (endTime.getTime() - pauseStartTime.getTime()) / 1000;
    }
    
    const finalWorkSecs = (endTime.getTime() - workStartTime.getTime()) / 1000 - finalPauseSecs;

    setWorkEndTime(endTime);
    setFinalTimes({ work: finalWorkSecs, pause: finalPauseSecs });
    setWorkState('idle');
  };
  
  const weeklyData = [
      { day: 'Mo', hours: '08:15' },
      { day: 'Di', hours: '07:50' },
      { day: 'Mi', hours: dashboardData.today },
      { day: 'Do', hours: '--:--' },
      { day: 'Fr', hours: '--:--' },
  ];
  const weeklyTotal = formatHoursAndMinutes(495 + 470 + Math.floor(Math.max(0, netWorkSeconds)/60));

  const StatItem = ({ label, value }: { label: string, value: string }) => (
    <div className="text-center px-6 py-2 min-w-[100px] flex-1">
        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{label}</p>
        <p className="text-lg font-semibold text-foreground">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <header>
        <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
          <Link href="/q-space"><ArrowLeft className="w-4 h-4 mr-1" /> Zur Übersicht</Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Zeiterfassung</h1>
      </header>

      <Card className="p-0 overflow-hidden">
        <div className="flex items-center justify-around divide-x divide-border overflow-x-auto no-scrollbar h-14">
            <StatItem label="Heute" value={dashboardData.today} />
            <StatItem label="Woche" value={dashboardData.week} />
            <StatItem label="Monat" value={dashboardData.month} />
            <StatItem label="Gesamt Monat" value={dashboardData.month} />
            <StatItem label="Saldo" value={dashboardData.saldo} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Heutiger Arbeitstag: {formatDateFns(new Date(), 'eeee, dd. MMMM yyyy', {locale: de})}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-4 bg-muted/50 rounded-xl border">
            <div>
              <p className="text-xs font-bold text-muted-foreground">Arbeitsbeginn</p>
              <p className="text-2xl font-bold">{workStartTime ? formatDateFns(workStartTime, 'HH:mm') : '--:--'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">Pausenzeit</p>
              <p className="text-2xl font-bold">{formatTime(totalPauseSeconds)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">Arbeitsende</p>
              <p className="text-2xl font-bold">{workEndTime ? formatDateFns(workEndTime, 'HH:mm') : '--:--'}</p>
            </div>
             <div>
              <p className="text-xs font-bold text-muted-foreground">Arbeitszeit (netto)</p>
              <p className="text-2xl font-bold text-emerald-400">{formatTime(netWorkSeconds)}</p>
            </div>
          </div>
          
          <div className="flex justify-center gap-4">
            <Button size="lg" onClick={handleStartWork} disabled={workState !== 'idle'} className="bg-emerald-600 hover:bg-emerald-500">
              <Play className="mr-2"/> Arbeit starten
            </Button>
            <Button size="lg" onClick={handlePause} disabled={workState === 'idle'} variant="outline" className="w-48">
              <Coffee className="mr-2"/> {workState === 'paused' ? 'Pause beenden' : 'Pause starten'}
            </Button>
            <Button size="lg" onClick={handleEndWork} disabled={workState === 'idle'} variant="destructive">
              <Square className="mr-2"/> Arbeit beenden
            </Button>
          </div>
          
           {pauseHintShown && (
                <div className="text-center text-amber-400 text-xs italic p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4"/>
                    Hinweis: Bei mehr als 6 Stunden Arbeit sind 30 Minuten Pause gesetzlich vorgeschrieben.
                </div>
           )}
           {endHintShown && (
                 <div className="text-center text-amber-400 text-xs italic p-2 bg-amber-500/10 rounded-lg border border-amber-500/20 flex items-center justify-center gap-2">
                    <AlertTriangle className="w-4 h-4"/>
                    Arbeitszeit läuft noch – bitte prüfen, ob du dich ausstempeln musst.
                </div>
           )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <div className="flex justify-between items-center">
                <CardTitle>Wochenübersicht</CardTitle>
                <p className="text-sm">Gesamt: <span className="font-bold text-primary">{weeklyTotal}</span></p>
            </div>
        </CardHeader>
        <CardContent>
           <Table>
               <TableHeader>
                   <TableRow>
                       <TableHead>Tag</TableHead>
                       <TableHead className="text-right">Arbeitszeit (netto)</TableHead>
                   </TableRow>
               </TableHeader>
               <TableBody>
                   {weeklyData.map(d => (
                       <TableRow key={d.day}>
                           <TableCell className="font-medium">{d.day}</TableCell>
                           <TableCell className="text-right font-mono">{d.hours}</TableCell>
                       </TableRow>
                   ))}
               </TableBody>
           </Table>
        </CardContent>
      </Card>
    </div>
  );
}
