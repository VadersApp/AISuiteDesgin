'use client';
import { useState, useEffect, useMemo } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Square, Coffee, ArrowLeft } from 'lucide-react';
import { format, subDays, isToday, isWithinInterval, startOfWeek, endOfWeek, startOfMonth, eachDayOfInterval, startOfToday, endOfMonth } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn } from '@/lib/utils';

const formatTime = (totalSeconds: number) => {
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
  const [workState, setWorkState] = useState<'idle' | 'working' | 'paused'>('idle');
  const [workStartTime, setWorkStartTime] = useState<Date | null>(null);
  const [pauseStartTime, setPauseStartTime] = useState<Date | null>(null);
  const [totalBreakSeconds, setTotalBreakSeconds] = useState(0);
  const [elapsedWorkTime, setElapsedWorkTime] = useState(0);
  const [elapsedPauseTime, setElapsedPauseTime] = useState(0);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (workState === 'working') {
      timer = setInterval(() => {
        setElapsedWorkTime(workStartTime ? Math.floor((Date.now() - workStartTime.getTime()) / 1000) : 0);
      }, 1000);
    } else if (workState === 'paused') {
      timer = setInterval(() => {
        setElapsedPauseTime(pauseStartTime ? Math.floor((Date.now() - pauseStartTime.getTime()) / 1000) : 0);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [workState, workStartTime, pauseStartTime]);

  const dashboardData = useMemo(() => {
    const today = new Date();
    const targetWorkMinPerDay = 480; // 8 hours
    const workdays = [1, 2, 3, 4, 5]; // Mon-Fri

    // Mocking previous entries for calculation. In a real app, this would come from Firestore.
    const mockPreviousEntries = [
        { date: subDays(today, 1), totalWorkMin: 495 }, // Yesterday: 8h 15m
        { date: subDays(today, 2), totalWorkMin: 470 }, // Day before: 7h 50m
        { date: subDays(today, 3), totalWorkMin: 510 },
        { date: subDays(today, 4), totalWorkMin: 480 },
    ];

    const todayNetWorkMinutes = elapsedWorkTime > 0 ? Math.max(0, Math.floor((elapsedWorkTime - totalBreakSeconds - elapsedPauseTime) / 60)) : 0;
    
    const todayEntry = { date: today, totalWorkMin: todayNetWorkMinutes };

    const allEntriesForCalc = [...mockPreviousEntries.filter(e => e.date < startOfToday()), todayEntry];
    
    // Today
    const todayWorkMin = todayNetWorkMinutes;
    
    // Week
    const startOfThisWeek = startOfWeek(today, { weekStartsOn: 1 });
    const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
    const weekWorkMin = allEntriesForCalc
        .filter(e => isWithinInterval(e.date, { start: startOfThisWeek, end: endOfThisWeek }))
        .reduce((sum, e) => sum + e.totalWorkMin, 0);

    // Month
    const startOfThisMonth = startOfMonth(today);
    const monthWorkMin = allEntriesForCalc
        .filter(e => isWithinInterval(e.date, { start: startOfThisMonth, end: today }))
        .reduce((sum, e) => sum + e.totalWorkMin, 0);
    
    // Saldo
    const daysInMonthSoFar = eachDayOfInterval({ start: startOfThisMonth, end: today });
    const workdaysSoFar = daysInMonthSoFar.filter(day => workdays.includes(day.getDay())).length;
    const monthTargetMin = workdaysSoFar * targetWorkMinPerDay;
    const saldoMin = monthWorkMin - monthTargetMin;

    return {
        today: formatMinutesToHHMM(todayWorkMin),
        week: formatMinutesToHHMM(weekWorkMin),
        month: formatMinutesToHHMM(monthWorkMin),
        saldo: formatSaldo(saldoMin),
        todayPause: formatHoursAndMinutes(Math.floor((totalBreakSeconds + elapsedPauseTime) / 60)),
    };
  }, [elapsedWorkTime, totalBreakSeconds, elapsedPauseTime]);

  const handleStartWork = () => {
    setWorkState('working');
    setWorkStartTime(new Date());
  };

  const handlePause = () => {
    if (workState === 'working') {
      setWorkState('paused');
      setPauseStartTime(new Date());
    } else if (workState === 'paused' && pauseStartTime) {
      setTotalBreakSeconds(prev => prev + Math.floor((Date.now() - pauseStartTime.getTime()) / 1000));
      setWorkState('working');
      setPauseStartTime(null);
      setElapsedPauseTime(0);
    }
  };

  const handleEndWork = () => {
    if (workStartTime) {
        // Here you would save the final entry to Firestore
        console.log('Work ended. Total work time, total break time etc. would be saved.');
    }
    setWorkState('idle');
    setWorkStartTime(null);
    setPauseStartTime(null);
    setTotalBreakSeconds(0);
    setElapsedWorkTime(0);
    setElapsedPauseTime(0);
  };
  
  const netWorkTime = formatMinutesToHHMM(Math.max(0, Math.floor((elapsedWorkTime - totalBreakSeconds - elapsedPauseTime) / 60)));


  const weeklyData = [
      { day: 'Mo', hours: '08:15' },
      { day: 'Di', hours: '07:50' },
      { day: 'Mi', hours: netWorkTime },
      { day: 'Do', hours: '--:--' },
      { day: 'Fr', hours: '--:--' },
  ];
  const weeklyTotalMinutes = 495 + 470 + Math.max(0, Math.floor((elapsedWorkTime - totalBreakSeconds - elapsedPauseTime) / 60));
  const weeklyTotal = formatHoursAndMinutes(weeklyTotalMinutes);

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
        <p className="text-muted-foreground">Einfache, gesetzeskonforme Erfassung Ihrer Arbeitszeit.</p>
      </header>

      {/* Dashboard */}
      <Card className="p-0">
        <div className="flex items-center justify-around divide-x divide-border overflow-x-auto no-scrollbar">
            <StatItem label="Heute" value={dashboardData.today} />
            <StatItem label="Woche" value={dashboardData.week} />
            <StatItem label="Monat" value={dashboardData.month} />
            <StatItem label="Gesamt Monat" value={dashboardData.month} />
            <StatItem label="Saldo" value={dashboardData.saldo} />
        </div>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Heutiger Arbeitstag: {format(new Date(), 'eeee, dd. MMMM yyyy', {locale: de})}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center p-4 bg-muted/50 rounded-xl border">
            <div>
              <p className="text-xs font-bold text-muted-foreground">Arbeitsbeginn</p>
              <p className="text-2xl font-bold">{workStartTime ? format(workStartTime, 'HH:mm') : '--:--'}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">Pausenzeit</p>
              <p className="text-2xl font-bold">{formatTime(totalBreakSeconds + elapsedPauseTime)}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-muted-foreground">Arbeitsende</p>
              <p className="text-2xl font-bold">{workState === 'idle' && workStartTime ? format(new Date(), 'HH:mm') : '--:--'}</p>
            </div>
             <div>
              <p className="text-xs font-bold text-muted-foreground">Arbeitszeit (netto)</p>
              <p className="text-2xl font-bold text-emerald-400">{netWorkTime}</p>
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
          
           {workState === 'working' && elapsedWorkTime > 6 * 3600 && totalBreakSeconds < 30 * 60 && (
                <p className="text-center text-amber-400 text-xs italic">Hinweis: Bei mehr als 6 Stunden Arbeit sind 30 Minuten Pause gesetzlich vorgeschrieben.</p>
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
