'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Calendar as CalendarIcon,
  Link as LinkIcon,
  Power,
  Plus,
  Clock,
  Users,
  FileQuestion,
  Bell,
  Plug,
  List,
  Video,
  Phone,
  Pencil,
  Copy,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { eventTypes, getDynamicQalenderBookings, qalenderTeams } from '@/lib/data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  format,
  startOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
  isSameMonth,
  startOfWeek,
  addDays,
  addWeeks,
  subWeeks,
  subDays,
  endOfWeek,
} from 'date-fns';
import { de } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet';
import React from 'react';

const tabs = [
  'Kalender',
  'Kalender verbinden',
  'Terminarten',
  'Verfügbarkeit',
  'Team & Routing',
  'Formulare',
  'Benachrichtigungen',
  'Buchungen',
];

const MonthView = ({ currentDate, bookings, onBookingClick, statusColors }: any) => {
    const calendarStart = startOfWeek(startOfMonth(currentDate), { weekStartsOn: 1 });
    const days = Array.from({ length: 42 }, (_, i) => addDays(calendarStart, i));

    return (
        <div className="grid grid-cols-7 border-l border-t border-border">
          {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map((day) => (
            <div
              key={day}
              className="text-center font-bold text-muted-foreground text-xs py-2 border-b border-r border-border bg-muted/50"
            >
              {day}
            </div>
          ))}
          {days.map((day) => {
            const dayBookings = bookings.filter((b: any) => isSameDay(b.startAtDate, day));
            return (
              <div
                key={day.toString()}
                className={cn(
                  'relative border-b border-r h-32 p-2 flex flex-col',
                  !isSameMonth(day, currentDate) && 'bg-muted/20'
                )}
              >
                <span
                  className={cn(
                    'font-bold text-xs',
                    isToday(day) &&
                      'bg-primary text-primary-foreground rounded-full h-6 w-6 flex items-center justify-center',
                    !isSameMonth(day, currentDate) && 'text-muted-foreground/50'
                  )}
                >
                  {format(day, 'd')}
                </span>
                <div className="mt-1 space-y-1 overflow-y-auto custom-scrollbar flex-1">
                  {dayBookings.map((booking: any) => (
                      <button
                        key={booking.bookingId}
                        onClick={() => onBookingClick(booking)}
                        className={cn(
                          'w-full text-left p-1 rounded-md text-[10px] font-bold truncate transition-colors hover:ring-2 ring-primary',
                          statusColors[booking.status] || statusColors.booked
                        )}
                      >
                        {format(booking.startAtDate, 'HH:mm')} {booking.guestName}
                      </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
    );
}

const WeekView = ({ currentDate, bookings, onBookingClick, statusColors }: any) => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const weekDays = Array.from({ length: 7 }, (_, i) => addDays(start, i));
    const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8am to 7pm (19:00)

    return (
        <div className="border-l border-t border-border">
            <div className="grid grid-cols-[60px_repeat(7,1fr)]">
                {/* Header */}
                <div className="border-r border-b p-2"></div>
                {weekDays.map(day => (
                    <div key={day.toString()} className="text-center font-bold text-muted-foreground text-xs py-2 border-r border-b bg-muted/50">
                        <p>{format(day, 'EEE', { locale: de })}</p>
                        <p className={cn("text-lg", isToday(day) && 'text-primary')}>{format(day, 'd')}</p>
                    </div>
                ))}
                
                {/* Body */}
                {timeSlots.map(hour => (
                    <React.Fragment key={hour}>
                        <div className="text-center text-xs font-mono text-muted-foreground p-2 border-r border-b h-20 flex items-center justify-center">
                            {`${hour}:00`}
                        </div>
                        {weekDays.map(day => (
                            <div key={day.toString()} className="relative border-r border-b h-20 p-1 space-y-1 overflow-y-auto custom-scrollbar">
                               {bookings
                                .filter((b: any) => isSameDay(b.startAtDate, day) && b.startAtDate.getHours() === hour)
                                .map((booking:any) => (
                                     <button
                                        key={booking.bookingId}
                                        onClick={() => onBookingClick(booking)}
                                        className={cn(
                                            'w-full text-left p-1 rounded-md text-[10px] font-bold truncate transition-colors hover:ring-2 ring-primary z-10',
                                            statusColors[booking.status] || statusColors.booked
                                        )}
                                     >
                                        {format(booking.startAtDate, 'HH:mm')} {booking.guestName}
                                    </button>
                                ))}
                            </div>
                        ))}
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

const DayView = ({ currentDate, bookings, onBookingClick, statusColors }: any) => {
    const timeSlots = Array.from({ length: 12 }, (_, i) => i + 8); // 8am to 7pm (19:00)

    return (
        <div className="border-l border-t border-border">
            <div className="text-center font-bold text-muted-foreground text-xs py-2 border-r border-b bg-muted/50">
                <p>{format(currentDate, 'eeee', { locale: de })}</p>
                <p className={cn("text-lg", isToday(currentDate) && 'text-primary')}>{format(currentDate, 'd. MMMM')}</p>
            </div>
            <div className="grid grid-cols-[60px_1fr]">
                 {timeSlots.map(hour => (
                    <React.Fragment key={hour}>
                        <div className="text-center text-xs font-mono text-muted-foreground p-2 border-r border-b h-20 flex items-center justify-center">
                            {`${hour}:00`}
                        </div>
                        <div className="relative border-r border-b h-20 p-1 space-y-1 overflow-y-auto custom-scrollbar">
                            {bookings
                            .filter((b: any) => isSameDay(b.startAtDate, currentDate) && b.startAtDate.getHours() === hour)
                            .map((booking:any) => (
                                    <button
                                    key={booking.bookingId}
                                    onClick={() => onBookingClick(booking)}
                                    className={cn(
                                        'w-full text-left p-1 rounded-md text-[10px] font-bold truncate transition-colors hover:ring-2 ring-primary z-10',
                                        statusColors[booking.status] || statusColors.booked
                                    )}
                                    >
                                    {format(booking.startAtDate, 'HH:mm')} {booking.guestName}
                                </button>
                            ))}
                        </div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    )
}

const CalendarView = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const dynamicBookings = getDynamicQalenderBookings().map((b) => ({
      ...b,
      startAtDate: new Date(b.startAt),
    }));
    setBookings(dynamicBookings);
  }, []);

  const statusColors: { [key: string]: string } = {
    booked: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    canceled: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
    rescheduled: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
  };

  const goToNext = () => {
    if (view === 'month') setCurrentDate(addMonths(currentDate, 1));
    if (view === 'week') setCurrentDate(addWeeks(currentDate, 1));
    if (view === 'day') setCurrentDate(addDays(currentDate, 1));
  };

  const goToPrev = () => {
    if (view === 'month') setCurrentDate(subMonths(currentDate, 1));
    if (view === 'week') setCurrentDate(subWeeks(currentDate, 1));
    if (view === 'day') setCurrentDate(subDays(currentDate, 1));
  };

  const goToToday = () => setCurrentDate(new Date());

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking);
  };

  const calendarTitle = () => {
    if (view === 'month') {
      return format(currentDate, 'MMMM yyyy', { locale: de });
    }
    if (view === 'week') {
      const start = startOfWeek(currentDate, { weekStartsOn: 1 });
      const end = endOfWeek(currentDate, { weekStartsOn: 1 });
      return `${format(start, 'd. MMM', { locale: de })} - ${format(end, 'd. MMM yyyy', { locale: de })}`;
    }
    if (view === 'day') {
      return format(currentDate, 'eeee, d. MMMM yyyy', { locale: de });
    }
    return '';
  };

  return (
    <Card>
      <div className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon" onClick={goToPrev}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={goToNext}>
              <ChevronRight className="h-4 w-4" />
            </Button>
            <Button variant="outline" onClick={goToToday}>
              Heute
            </Button>
            <h2 className="text-xl font-bold text-foreground capitalize ml-2">
              {calendarTitle()}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={view}
              onValueChange={(v) => setView(v as 'month' | 'week' | 'day')}
            >
              <SelectTrigger className="w-[120px] bg-input">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="month">Monat</SelectItem>
                <SelectItem value="week">Woche</SelectItem>
                <SelectItem value="day">Tag</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {view === 'month' && <MonthView currentDate={currentDate} bookings={bookings} onBookingClick={handleBookingClick} statusColors={statusColors} />}
        {view === 'week' && <WeekView currentDate={currentDate} bookings={bookings} onBookingClick={handleBookingClick} statusColors={statusColors} />}
        {view === 'day' && <DayView currentDate={currentDate} bookings={bookings} onBookingClick={handleBookingClick} statusColors={statusColors} />}
      </div>
      <Sheet
        open={!!selectedBooking}
        onOpenChange={(open) => !open && setSelectedBooking(null)}
      >
        <SheetContent>
          {selectedBooking && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedBooking.eventTypeName}</SheetTitle>
                <SheetDescription>
                  Buchungsdetails für {selectedBooking.guestName}.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <p>
                  <strong>Gast:</strong> {selectedBooking.guestName} (
                  {selectedBooking.guestEmail})
                </p>
                <p>
                  <strong>Datum:</strong>{' '}
                  {format(new Date(selectedBooking.startAt), 'dd. MMMM yyyy, HH:mm', {
                    locale: de,
                  })}{' '}
                  Uhr
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge variant="outline" className="capitalize">
                    {selectedBooking.status}
                  </Badge>
                </p>
                <p>
                  <strong>Zuständig:</strong> {selectedBooking.assignedOwnerId}
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline">Stornieren</Button>
                <Button>Umplanen</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </Card>
  );
};

const EventTypesView = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <h2 className="text-lg font-bold text-foreground">Terminarten</h2>
        <p className="text-sm text-muted-foreground">
          Erstellen und verwalten Sie Ihre buchbaren Events.
        </p>
      </div>
      <Button>
        <Plus className="mr-2 h-4 w-4" />
        Neue Terminart
      </Button>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {eventTypes.map((et) => (
        <Card key={et.id} className="p-5 flex flex-col">
          <div className="flex justify-between items-start">
            <h3 className="font-bold text-foreground mb-1">{et.name}</h3>
            <Badge variant={et.active ? 'default' : 'outline'} className={`text-xs ${et.active ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : ''}`}>
              {et.active ? 'Aktiv' : 'Inaktiv'}
            </Badge>
          </div>
          <p className="text-xs text-muted-foreground mb-4">
            {et.durationMinutes} Minuten • {et.meetingType === 'video' ? 'Video-Call' : 'Telefonat'}
          </p>
          <p className="text-sm text-muted-foreground flex-1 line-clamp-2">
            {et.description}
          </p>
          <Separator className="my-4" />
          <div className="flex items-center justify-between">
             <Button variant="ghost" size="sm" className="text-xs">
              <Copy className="mr-2 h-3 w-3" />
              Link kopieren
            </Button>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="h-8 w-8"><Pencil className="h-4 w-4" /></Button>
              <Switch checked={et.active} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

const AvailabilityView = () => (
    <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-1">Verfügbarkeit</h2>
        <p className="text-sm text-muted-foreground mb-6">Legen Sie fest, wann Sie für Termine zur Verfügung stehen.</p>
        <div className="space-y-4">
            <div className="p-4 border border-border rounded-xl">
                <h3 className="font-bold text-foreground text-sm mb-3">Wöchentliche Verfügbarkeit</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    {['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag'].map(day => (
                         <div key={day} className="flex items-center justify-between p-2 bg-muted/50 rounded-md">
                            <span className="font-medium text-foreground">{day}</span>
                            <span className="text-muted-foreground">09:00 - 17:00</span>
                        </div>
                    ))}
                    <div className="flex items-center justify-between p-2 bg-muted/50 rounded-md opacity-50">
                        <span className="font-medium text-foreground">Samstag</span>
                        <span className="text-muted-foreground">Nicht verfügbar</span>
                    </div>
                </div>
            </div>
             <div className="p-4 border border-dashed border-border rounded-xl text-center">
                 <Button variant="outline">
                     <Plus className="mr-2 h-4 w-4" />
                     Sondertag / Abwesenheit hinzufügen
                 </Button>
            </div>
        </div>
    </Card>
);

const TeamRoutingView = () => (
     <div className="space-y-6">
        <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-foreground">Team & Routing</h2>
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                Neues Team
            </Button>
        </div>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {qalenderTeams.map(team => (
                <Card key={team.id} className="p-6">
                    <h3 className="font-bold text-foreground mb-2">{team.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                        <Badge variant="secondary" className="capitalize">{team.routingType.replace('_', ' ')}</Badge>
                        <Badge variant="outline">{team.memberIds.length} Mitglieder</Badge>
                    </div>
                    <div className="flex -space-x-2 overflow-hidden">
                        {team.memberIds.map(m => <div key={m} className="inline-block h-8 w-8 rounded-full ring-2 ring-background bg-muted border border-border flex items-center justify-center text-xs font-bold">{m}</div>)}
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const FormsQuestionsView = () => (
  <Card className="p-6">
    <h2 className="text-lg font-bold text-foreground mb-1">Formulare & Fragen</h2>
    <p className="text-sm text-muted-foreground mb-6">
      Passen Sie die Fragen an, die Ihren Gästen vor der Buchung gestellt werden.
    </p>
     <div className="border-2 border-dashed border-border rounded-xl p-12 text-center">
        <FileQuestion className="mx-auto h-12 w-12 text-muted-foreground/50" />
        <h3 className="mt-4 text-lg font-medium text-foreground">Formular-Builder</h3>
        <p className="mt-1 text-sm text-muted-foreground">Hier können Sie bald per Drag & Drop Formulare erstellen.</p>
        <Button className="mt-6">Builder starten</Button>
      </div>
  </Card>
);

const NotificationsView = () => (
   <Card className="p-6">
    <h2 className="text-lg font-bold text-foreground mb-1">Benachrichtigungen</h2>
    <p className="text-sm text-muted-foreground mb-6">
      Verwalten Sie automatische E-Mail-Bestätigungen und Erinnerungen.
    </p>
    <div className="space-y-4">
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div>
              <Label htmlFor="confirm-guest" className="font-bold text-foreground">Bestätigung an Gast</Label>
              <p className="text-xs text-muted-foreground">Wird sofort nach der Buchung gesendet.</p>
          </div>
          <Switch id="confirm-guest" defaultChecked />
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div>
              <Label htmlFor="notify-owner" className="font-bold text-foreground">Info an Kalender-Inhaber</Label>
              <p className="text-xs text-muted-foreground">Benachrichtigt Sie über neue Termine.</p>
          </div>
          <Switch id="notify-owner" defaultChecked />
      </div>
       <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div>
              <Label htmlFor="reminder-24h" className="font-bold text-foreground">Erinnerung (24h vorher)</Label>
              <p className="text-xs text-muted-foreground">Sendet eine Erinnerung an den Gast.</p>
          </div>
          <Switch id="reminder-24h" defaultChecked />
      </div>
    </div>
  </Card>
);

const ConnectView = () => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="p-6 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center border border-blue-500/20">
              <CalendarIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">Qalender nutzen</h2>
              <p className="text-sm text-muted-foreground">
                Integrierte Kalender-Lösung
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-slate-500/10 text-slate-400 border border-slate-500/20 shrink-0">
            Optional
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
          Nutzen Sie unseren vollintegrierten Kalender für maximale Effizienz.
          Qalender findet automatisch Termine, plant Meetings und löst
          Konflikte selbstständig.
        </p>
        <div className="mt-auto pt-6 border-t border-border">
          <Button className="w-full" disabled>
            <CalendarIcon className="mr-2 h-4 w-4" />
            Qalender öffnen (bald verfügbar)
          </Button>
        </div>
      </Card>

      <Card className="p-6 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <LinkIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground">
                Externen Kalender verbinden
              </h2>
              <p className="text-sm text-muted-foreground">
                Bestehende Kalender-Konten
              </p>
            </div>
          </div>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
            Empfohlen
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
          Verbinden Sie Ihren bestehenden Kalender (z.B. Google oder Outlook),
          um die volle Kraft der QORE-KI für die Terminplanung zu nutzen.
        </p>
        <div className="mt-auto pt-6 border-t border-border">
          <Button className="w-full">
            <LinkIcon className="mr-2 h-4 w-4" />
            Kalender jetzt verbinden
          </Button>
        </div>
      </Card>
    </div>

    <Card className="p-6">
      <h3 className="text-lg font-bold text-foreground mb-6">
        Verbundene Kalender
      </h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-background border border-border">
              <CalendarIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="font-bold text-foreground">ceo@aisuite.de</p>
              <p className="text-xs text-muted-foreground">
                Verbunden seit 14.01.2024 (Google Calendar)
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2 py-1 rounded bg-emerald-900/50 text-emerald-400 border border-emerald-700/50 flex items-center gap-1.5">
              <Power className="w-3.5 h-3.5" />
              Aktiv
            </span>
            <Button variant="outline" size="sm">
              Verwalten
            </Button>
          </div>
        </div>
        <button className="w-full flex items-center justify-center p-4 rounded-xl border-2 border-dashed border-border text-muted-foreground hover:border-primary/50 hover:bg-accent/50 transition-all cursor-pointer">
          <p className="text-sm font-bold flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Weiteren Kalender verbinden
          </p>
        </button>
      </div>
    </Card>
  </div>
);

const BookingsView = () => {
    const [bookings, setBookings] = useState<any[]>([]);
  
    useEffect(() => {
        setBookings(getDynamicQalenderBookings());
    }, []);

    return (
        <Card>
            <div className="p-6">
                <h2 className="text-lg font-bold text-foreground">Buchungen</h2>
                <p className="text-sm text-muted-foreground">Eine Liste aller über Qalender gebuchten Termine.</p>
            </div>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Terminart</TableHead>
                        <TableHead>Gast</TableHead>
                        <TableHead>Datum & Uhrzeit</TableHead>
                        <TableHead>Zuständig</TableHead>
                        <TableHead>Status</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {bookings.map(b => (
                        <TableRow key={b.bookingId}>
                            <TableCell className="font-medium">{b.eventTypeName}</TableCell>
                            <TableCell>
                                <div className="font-medium">{b.guestName}</div>
                                <div className="text-xs text-muted-foreground">{b.guestEmail}</div>
                            </TableCell>
                            <TableCell>{new Date(b.startAt).toLocaleString('de-DE', { dateStyle: 'medium', timeStyle: 'short' })}</TableCell>
                            <TableCell>{b.assignedOwnerId}</TableCell>
                            <TableCell>
                               <Badge variant="outline" className="capitalize text-xs">{b.status}</Badge>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    );
}

export default function QalenderPage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const renderContent = () => {
    switch (activeTab) {
      case 'Kalender':
        return <CalendarView />;
      case 'Kalender verbinden':
        return <ConnectView />;
      case 'Terminarten':
        return <EventTypesView />;
      case 'Verfügbarkeit':
        return <AvailabilityView />;
      case 'Team & Routing':
        return <TeamRoutingView />;
      case 'Formulare':
        return <FormsQuestionsView />;
      case 'Benachrichtigungen':
        return <NotificationsView />;
       case 'Buchungen':
        return <BookingsView />;
      default:
        return <CalendarView />;
    }
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Qalender Studio
        </h1>
        <p className="text-muted-foreground">
          Ihre Zentrale für KI-gestützte Terminplanung.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-border">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-2.5 -mb-px border-b-2 text-sm font-bold whitespace-nowrap transition-all ${
              activeTab === t
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8 animate-in fade-in duration-300">{renderContent()}</div>
    </div>
  );
}
