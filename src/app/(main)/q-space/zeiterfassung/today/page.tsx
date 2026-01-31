'use client';
import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Play, Square, Coffee, ArrowLeft } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

const formatTime = (totalSeconds: number) => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

const formatHoursAndMinutes = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
}

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
  
  const totalWorkDuration = workStartTime ? formatTime(elapsedWorkTime) : '--:--:--';
  const totalBreakDuration = formatTime(totalBreakSeconds + elapsedPauseTime);
  const netWorkTime = formatHoursAndMinutes(Math.floor((elapsedWorkTime - totalBreakSeconds - elapsedPauseTime) / 60));


  const weeklyData = [
      { day: 'Mo', hours: '8:05' },
      { day: 'Di', hours: '7:45' },
      { day: 'Mi', hours: '8:15' },
      { day: 'Do', hours: '--:--' },
      { day: 'Fr', hours: '--:--' },
  ];
  const weeklyTotal = "24:05";


  return (
    <div className="space-y-6">
      <header>
        <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
          <Link href="/q-space"><ArrowLeft className="w-4 h-4 mr-1" /> Zur Übersicht</Link>
        </Button>
        <h1 className="text-2xl font-bold text-foreground">Zeiterfassung</h1>
        <p className="text-muted-foreground">Einfache, gesetzeskonforme Erfassung Ihrer Arbeitszeit.</p>
      </header>

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
              <p className="text-2xl font-bold">{totalBreakDuration}</p>
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
