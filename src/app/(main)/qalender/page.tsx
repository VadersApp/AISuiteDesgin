'use client';

import React from 'react';
import { useState, useRef, useEffect, type FormEvent, useCallback } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from '@/components/ui/sheet';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '@/components/ui/accordion';
import {
  LayoutDashboard,
  BookCopy,
  Network,
  FolderKanban,
  Users,
  Building,
  BarChart3,
  Award,
  Settings,
  Search,
  Plus,
  GraduationCap,
  Video,
  File as FileIcon,
  BrainCircuit,
  Camera,
  Mic,
  ScreenShare,
  StopCircle,
  Play,
  Loader2,
  Check,
  Radio,
  Upload,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  FileQuestion,
  CheckSquare,
  CheckCircle,
  GitBranch,
  ThumbsUp,
  ThumbsDown,
  ListTodo,
  FileClock,
  BookOpenCheck,
  MoreHorizontal,
  Info,
  Sparkles,
  MessageSquare,
  Calendar as CalendarIcon,
  Link as LinkIcon,
  Power,
  Clock,
  FileText,
  Phone,
  Pencil,
  Copy,
  Trash2,
  Bell,
  Plug,
  List,
  Mail,
  Send,
  AlertTriangle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { mockCourses, mockParticipants, mockLearningPaths, qOnboardingModules, mockAcademyVideos, mockAcademyDocs, mockCertificates, kpiMitarbeiter, departmentsConfig, eventTypes, getDynamicQalenderBookings, qalenderTeams } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Switch } from '@/components/ui/switch';
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
  endOfWeek,
} from 'date-fns';
import { de } from 'date-fns/locale';


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

const SmartReminders = ({ reminders, onRemindersChange, appointmentContext, providerStatus, defaults }: { reminders: any, onRemindersChange: (newReminders: any) => void, appointmentContext: any, providerStatus: any, defaults: any }) => {
    const { toast } = useToast();
    const [aiSuggestion, setAiSuggestion] = React.useState<any>(null);
    const isUsingDefaults = !reminders?.override;
    const effectiveReminders = isUsingDefaults ? defaults : reminders;

    // Mock AI Suggestion Logic
    React.useEffect(() => {
        if (effectiveReminders?.ai?.enabled) {
            // In a real app, call a service: getSmartReminderSuggestion(appointmentContext)
            const suggestion = {
                channels: { email: true, whatsapp: true, sms: false },
                triggers: [{ value: 24, unit: 'hours' }, { value: 2, unit: 'hours' }],
                reason: "Für diesen Termin sind Erinnerungen per E-Mail und WhatsApp 24h & 2h vorher empfohlen."
            };
            setAiSuggestion(suggestion);
        } else {
            setAiSuggestion(null);
        }
    }, [effectiveReminders?.ai?.enabled, appointmentContext]);

    const handleToggleOverride = () => {
        const newOverrideState = !isUsingDefaults;
        const newReminders = newOverrideState
            ? { ...defaults, override: true } // Start with defaults when overriding
            : { override: false }; // Clear specific settings when switching back
        onRemindersChange(newReminders);
    };

    const ensureOverride = (updates: Partial<typeof reminders>) => {
        onRemindersChange({
            ...reminders,
            ...updates,
            override: true,
        });
    };

    const handleChannelChange = (channel: 'email' | 'whatsapp' | 'sms', checked: boolean) => {
        const newChannels = { ...reminders.channels, [channel]: checked };
        ensureOverride({ channels: newChannels, enabled: Object.values(newChannels).some(c => c) && reminders.triggers.length > 0 });
    };

    const handleTriggerChange = (index: number, field: 'value' | 'unit', value: string | number) => {
        const newTriggers = [...reminders.triggers];
        newTriggers[index] = { ...newTriggers[index], [field]: value };
        ensureOverride({ triggers: newTriggers });
    };

    const addTrigger = () => {
        const newTriggers = [...reminders.triggers, { value: 1, unit: 'days' }];
        ensureOverride({ triggers: newTriggers, enabled: Object.values(reminders.channels).some(c => c) && newTriggers.length > 0 });
    };
    
    const removeTrigger = (index: number) => {
        const newTriggers = reminders.triggers.filter((_: any, i: number) => i !== index);
        ensureOverride({ triggers: newTriggers, enabled: Object.values(reminders.channels).some(c => c) && newTriggers.length > 0 });
    };

    const applyAiSuggestion = () => {
        if (aiSuggestion) {
            ensureOverride({ channels: aiSuggestion.channels, triggers: aiSuggestion.triggers, enabled: true });
        }
    };
    
    const toggleAi = (enabled: boolean) => {
        ensureOverride({ ai: { ...reminders.ai, enabled } });
    }

    return (
        <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="reminders">
                <AccordionTrigger>
                    <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4"/>
                        <span className="font-bold">Erinnerungen (Smart · KI-gestützt)</span>
                    </div>
                </AccordionTrigger>
                <AccordionContent className="pt-4 space-y-6">
                    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                        <Label htmlFor="use-defaults" className="font-bold">Voreinstellung verwenden</Label>
                        <Switch id="use-defaults" checked={isUsingDefaults} onCheckedChange={handleToggleOverride} />
                    </div>

                    {!isUsingDefaults && (
                        <div className="space-y-6 border-t border-border pt-6 animate-in fade-in">
                            {reminders.channels.whatsapp && !providerStatus.whatsapp.connected && (
                                <Alert variant="destructive" className="text-xs">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="font-bold">WhatsApp nicht verbunden</AlertTitle>
                                    <AlertDescription>
                                        Um Erinnerungen per WhatsApp zu senden, verbinden Sie bitte einen Provider in den Benachrichtigungs-Einstellungen.
                                    </AlertDescription>
                                </Alert>
                            )}
                            {reminders.channels.sms && !providerStatus.sms.connected && (
                                <Alert variant="destructive" className="text-xs">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle className="font-bold">SMS nicht verbunden</AlertTitle>
                                    <AlertDescription>
                                        Um Erinnerungen per SMS zu senden, verbinden Sie bitte einen Provider in den Benachrichtigungs-Einstellungen.
                                    </AlertDescription>
                                </Alert>
                            )}
                            {/* Channel Selection */}
                            <div className="space-y-2">
                                <Label>Kanäle</Label>
                                <div className="flex items-center gap-6">
                                    <div className="flex items-center gap-2"><Checkbox id="email" checked={reminders.channels.email} onCheckedChange={(c) => handleChannelChange('email', !!c)} /><Label htmlFor="email">E-Mail</Label></div>
                                    <div className="flex items-center gap-2"><Checkbox id="whatsapp" checked={reminders.channels.whatsapp} onCheckedChange={(c) => handleChannelChange('whatsapp', !!c)} /><Label htmlFor="whatsapp">WhatsApp</Label></div>
                                    <div className="flex items-center gap-2"><Checkbox id="sms" checked={reminders.channels.sms} onCheckedChange={(c) => handleChannelChange('sms', !!c)} /><Label htmlFor="sms">SMS</Label></div>
                                </div>
                            </div>
                            
                            {/* Trigger Points */}
                            <div className="space-y-2">
                                <Label>Erinnerungszeitpunkte</Label>
                                <div className="space-y-2">
                                    {reminders.triggers.map((trigger: any, index: number) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <Input type="number" min="1" max="30" value={trigger.value} onChange={(e) => handleTriggerChange(index, 'value', parseInt(e.target.value))} className="w-20 bg-input" />
                                            <Select value={trigger.unit} onValueChange={(v) => handleTriggerChange(index, 'unit', v)}>
                                                <SelectTrigger className="w-32 bg-input"><SelectValue /></SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="minutes">Minuten</SelectItem>
                                                    <SelectItem value="hours">Stunden</SelectItem>
                                                    <SelectItem value="days">Tage</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <Button variant="ghost" size="icon" onClick={() => removeTrigger(index)} className="w-8 h-8"><Trash2 className="w-4 h-4 text-muted-foreground"/></Button>
                                        </div>
                                    ))}
                                    <Button variant="outline" size="sm" onClick={addTrigger}><Plus className="w-4 h-4 mr-2"/> Zeitpunkt hinzufügen</Button>
                                </div>
                            </div>
                            
                            {/* AI Suggestions */}
                            <div className="space-y-4 pt-4 border-t border-border">
                                <div className="flex items-center justify-between">
                                    <Label htmlFor="ai-toggle" className="flex items-center gap-2 font-bold"><BrainCircuit className="w-4 h-4 text-blue-400"/> KI-Vorschläge aktiv</Label>
                                    <Switch id="ai-toggle" checked={reminders.ai.enabled} onCheckedChange={toggleAi} />
                                </div>
                                {reminders.ai.enabled && aiSuggestion && (
                                    <Card className="bg-blue-500/5 border-blue-500/10 p-4">
                                        <CardTitle className="text-sm text-blue-300 mb-2">KI-Empfehlung</CardTitle>
                                        <CardDescription className="text-xs text-blue-200/80 mb-4">{aiSuggestion.reason}</CardDescription>
                                        <Button size="sm" onClick={applyAiSuggestion}>Übernehmen</Button>
                                    </Card>
                                )}
                            </div>
                        </div>
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
};

const MonthView = ({ currentDate, bookings, onBookingClick, statusColors, onDayClick }: any) => {
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
                onClick={() => onDayClick(day)}
                className={cn(
                  'relative border-b border-r h-32 p-2 flex flex-col hover:bg-accent/50 transition-colors cursor-pointer',
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
                        onClick={(e) => { e.stopPropagation(); onBookingClick(booking); }}
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

const WeekView = ({ currentDate, bookings, onBookingClick, onSlotClick, statusColors }: any) => {
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
                            <div 
                                key={day.toString()} 
                                className="relative border-r border-b h-20 p-1 space-y-1 overflow-y-auto custom-scrollbar hover:bg-accent/50 transition-colors cursor-pointer"
                                onClick={() => onSlotClick(day, hour)}
                            >
                               {bookings
                                .filter((b: any) => isSameDay(b.startAtDate, day) && b.startAtDate.getHours() === hour)
                                .map((booking:any) => (
                                     <button
                                        key={booking.bookingId}
                                        onClick={(e) => { e.stopPropagation(); onBookingClick(booking); }}
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

const DayView = ({ currentDate, bookings, onBookingClick, onSlotClick, statusColors }: any) => {
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
                        <div 
                            className="relative border-r border-b h-20 p-1 space-y-1 overflow-y-auto custom-scrollbar hover:bg-accent/50 transition-colors cursor-pointer"
                            onClick={() => onSlotClick(currentDate, hour)}
                        >
                            {bookings
                            .filter((b: any) => isSameDay(b.startAtDate, currentDate) && b.startAtDate.getHours() === hour)
                            .map((booking:any) => (
                                    <button
                                    key={booking.bookingId}
                                    onClick={(e) => { e.stopPropagation(); onBookingClick(booking); }}
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

const CalendarView = ({ providers, reminderDefaults }: { providers: any, reminderDefaults: any }) => {
  const { toast } = useToast();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [editedBooking, setEditedBooking] = useState<any | null>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [isCreateSheetOpen, setIsCreateSheetOpen] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<Date | null>(null);
  const [newBookingData, setNewBookingData] = useState<any>(null);


  useEffect(() => {
    const dynamicBookings = getDynamicQalenderBookings().map((b) => ({
      ...b,
      startAtDate: new Date(b.startAt),
    }));
    setBookings(dynamicBookings);
  }, []);

  useEffect(() => {
    if (selectedBooking) {
      const initialReminders = selectedBooking.smartReminders ? {
        override: false,
        ...selectedBooking.smartReminders,
      } : {
        override: false,
        enabled: reminderDefaults.enabled,
        channels: { ...reminderDefaults.channels },
        triggers: [...reminderDefaults.triggers],
        ai: { ...reminderDefaults.ai }
      };
      setEditedBooking({ ...selectedBooking, smartReminders: initialReminders });
    }
  }, [selectedBooking, reminderDefaults]);

  const statusColors: { [key: string]: string } = {
    booked: 'bg-primary/20 text-primary-foreground border-primary/30',
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
  
  const handleDayClick = (day: Date) => {
    setCurrentDate(day);
    setView('day');
  };
  
  const handleSlotClick = (day: Date, hour: number) => {
    const newDate = new Date(day);
    newDate.setHours(hour, 0, 0, 0);
    setSelectedSlot(newDate);
    handleCreateSheetOpen(true);
  };
  
  const handleCreateSheetOpen = (open: boolean) => {
      if (open) {
        setNewBookingData({
            eventTypeName: '',
            guestName: '',
            guestEmail: '',
            smartReminders: {
                override: false,
                enabled: reminderDefaults.enabled,
                channels: { ...reminderDefaults.channels },
                triggers: [...reminderDefaults.triggers],
                ai: { ...reminderDefaults.ai }
            }
        });
    } else {
        setNewBookingData(null);
    }
    setIsCreateSheetOpen(open);
  }

  const handleCreateBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!selectedSlot || !newBookingData) return;

    const formData = new FormData(event.currentTarget);
    const guestName = formData.get('guestName') as string;
    const guestEmail = formData.get('guestEmail') as string;
    const eventTypeName = formData.get('eventType') as string;

    if (!guestName || !guestEmail || !eventTypeName) {
        toast({
            variant: "destructive",
            title: "Fehler",
            description: "Bitte füllen Sie alle Felder aus.",
        });
        return;
    }
    
    const newBooking = {
        ...newBookingData,
        bookingId: `bk-${Date.now()}`,
        eventTypeName: eventTypeName,
        guestName,
        guestEmail,
        startAt: selectedSlot.toISOString(),
        startAtDate: selectedSlot,
        assignedOwnerId: 'Mein Kalender',
        status: 'booked',
    };

    setBookings(prev => [...prev, newBooking]);
    setIsCreateSheetOpen(false);
    setNewBookingData(null);
    toast({
        title: "Termin erstellt",
        description: `${eventTypeName} für ${guestName} wurde gebucht.`,
    });
  };

  const handleSaveBookingChanges = () => {
    // In a real app, send `editedBooking` to the backend
    setBookings(prev => prev.map(b => b.bookingId === editedBooking.bookingId ? editedBooking : b));
    setSelectedBooking(null);
    setEditedBooking(null);
    toast({ title: "Termin aktualisiert" });
  }

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

        {view === 'month' && <MonthView currentDate={currentDate} bookings={bookings} onBookingClick={handleBookingClick} statusColors={statusColors} onDayClick={handleDayClick} />}
        {view === 'week' && <WeekView currentDate={currentDate} bookings={bookings} onBookingClick={handleBookingClick} statusColors={statusColors} onSlotClick={handleSlotClick} />}
        {view === 'day' && <DayView currentDate={currentDate} bookings={bookings} onBookingClick={handleBookingClick} statusColors={statusColors} onSlotClick={handleSlotClick} />}
      </div>
      <Sheet
        open={!!selectedBooking}
        onOpenChange={(open) => {
            if (!open) {
                setSelectedBooking(null);
                setEditedBooking(null);
            }
        }}
      >
        <SheetContent>
          {editedBooking && (
            <>
              <SheetHeader>
                <SheetTitle>{editedBooking.eventTypeName}</SheetTitle>
                <SheetDescription>
                  Buchungsdetails für {editedBooking.guestName}.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4 space-y-4">
                <p>
                  <strong>Gast:</strong> {editedBooking.guestName} (
                  {editedBooking.guestEmail})
                </p>
                <p>
                  <strong>Datum:</strong>{' '}
                  {format(new Date(editedBooking.startAt), 'dd. MMMM yyyy, HH:mm', {
                    locale: de,
                  })}{' '}
                  Uhr
                </p>
                <p>
                  <strong>Status:</strong>{' '}
                  <Badge variant="outline" className="capitalize">
                    {editedBooking.status}
                  </Badge>
                </p>
                <p>
                  <strong>Zuständig:</strong> {editedBooking.assignedOwnerId}
                </p>
                 <Separator />
                    <SmartReminders 
                        reminders={editedBooking.smartReminders}
                        onRemindersChange={(newReminders) => setEditedBooking((prev: any) => ({ ...prev, smartReminders: newReminders }))}
                        appointmentContext={editedBooking}
                        providerStatus={providers}
                        defaults={reminderDefaults}
                    />
              </div>
              <div className="mt-6 flex gap-2">
                <Button variant="outline">Stornieren</Button>
                <Button onClick={handleSaveBookingChanges}>Änderungen speichern</Button>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
      <Sheet
        open={isCreateSheetOpen}
        onOpenChange={handleCreateSheetOpen}
      >
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Neuen Termin erstellen</SheetTitle>
            <SheetDescription>
              {selectedSlot ? `Für ${format(selectedSlot, "eeee, d. MMMM yyyy 'um' HH:mm 'Uhr'", { locale: de })}` : 'Bitte Zeitfenster im Kalender auswählen.'}
            </SheetDescription>
          </SheetHeader>
         {newBookingData && (
          <form onSubmit={handleCreateBooking} className="py-4 space-y-4">
            <div>
              <Label htmlFor="guestName">Name des Gasts</Label>
              <Input id="guestName" name="guestName" required className="bg-input" />
            </div>
            <div>
              <Label htmlFor="guestEmail">E-Mail des Gasts</Label>
              <Input id="guestEmail" name="guestEmail" type="email" required className="bg-input" />
            </div>
            <div>
              <Label htmlFor="eventType">Terminart</Label>
              <Select required name="eventType">
                <SelectTrigger className="bg-input">
                  <SelectValue placeholder="Terminart wählen..." />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((et) => (
                    <SelectItem key={et.id} value={et.name}>
                      {et.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
             <Separator />
             <SmartReminders 
                reminders={newBookingData.smartReminders}
                onRemindersChange={(newReminders) => setNewBookingData((prev: any) => ({ ...prev, smartReminders: newReminders }))}
                appointmentContext={newBookingData}
                providerStatus={providers}
                defaults={reminderDefaults}
            />
            <div className="mt-6 flex justify-end gap-2 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsCreateSheetOpen(false)}>
                Abbrechen
              </Button>
              <Button type="submit" disabled={!selectedSlot}>Termin erstellen</Button>
            </div>
          </form>
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
            <Badge variant={et.active ? 'default' : 'outline'} className={`text-xs ${et.active ? 'bg-primary/20 text-primary border-primary/20' : ''}`}>
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

const ProviderConnectDialog = ({ open, onOpenChange, channel, onConnect }: { open: boolean, onOpenChange: (open: boolean) => void, channel: 'whatsapp' | 'sms' | null, onConnect: (channel: 'whatsapp' | 'sms', data: any) => void }) => {
    const { toast } = useToast();
    if (!channel) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());
        onConnect(channel, data);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{channel === 'whatsapp' ? 'WhatsApp' : 'SMS'} Provider verbinden</DialogTitle>
                    <DialogDescription>
                        Geben Sie die API-Daten für Ihren Provider ein, um den Kanal zu aktivieren.
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label>Provider</Label>
                            <Select name="provider" defaultValue={channel === 'whatsapp' ? 'meta' : 'twilio'}>
                                <SelectTrigger className="bg-input"><SelectValue /></SelectTrigger>
                                <SelectContent>
                                    {channel === 'whatsapp' ? (
                                        <SelectItem value="meta">Meta Cloud API</SelectItem>
                                    ) : (
                                        <SelectItem value="twilio">Twilio</SelectItem>
                                    )}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="apiKey">API Key / Token</Label>
                            <Input id="apiKey" name="apiKey" type="password" className="bg-input" required />
                        </div>
                        {channel === 'whatsapp' && (
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumberId">Phone Number ID</Label>
                                <Input id="phoneNumberId" name="phoneNumberId" className="bg-input" required />
                            </div>
                        )}
                        <div className="space-y-2">
                            <Label htmlFor="sender">Sender Nummer / ID</Label>
                            <Input id="sender" name="sender" className="bg-input" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
                        <Button type="submit">Verbinden & Speichern</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const TestSendDialog = ({ open, onOpenChange, channel }: { open: boolean, onOpenChange: (open: boolean) => void, channel: string | null }) => {
    const { toast } = useToast();
    if (!channel) return null;

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        toast({ title: "Test gesendet", description: `Eine Testnachricht wurde über ${channel} versendet.`});
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Testnachricht senden: {channel}</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="py-4 space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="recipient">{channel === 'E-Mail' ? 'Empfänger-E-Mail' : 'Empfänger-Nummer (E.164)'}</Label>
                            <Input id="recipient" type={channel === 'E-Mail' ? 'email' : 'tel'} placeholder={channel === 'E-Mail' ? 'test@example.com' : '+491701234567'} className="bg-input" required />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>Abbrechen</Button>
                        <Button type="submit">Test senden</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

const NotificationsView = ({ providers, setProviders, reminderDefaults, onReminderDefaultsChange }: { providers: any, setProviders: any, reminderDefaults: any, onReminderDefaultsChange: (newDefaults: any) => void }) => {
    const { toast } = useToast();
    const [isConnectDialogOpen, setIsConnectDialogOpen] = useState(false);
    const [isTestDialogOpen, setIsTestDialogOpen] = useState(false);
    const [currentChannel, setCurrentChannel] = useState<'whatsapp' | 'sms' | 'E-Mail' | null>(null);
    const [localDefaults, setLocalDefaults] = useState(reminderDefaults);
    const [smsCharCount, setSmsCharCount] = useState(0);

    useEffect(() => {
        setLocalDefaults(reminderDefaults);
        setSmsCharCount(reminderDefaults.templates?.sms?.body?.length || 0);
    }, [reminderDefaults]);

    const handleConnectClick = (channel: 'whatsapp' | 'sms') => {
        setCurrentChannel(channel);
        setIsConnectDialogOpen(true);
    };
    
    const handleConnect = (channel: 'whatsapp' | 'sms', data: any) => {
        setProviders((prev: any) => ({
            ...prev,
            [channel]: {
                connected: true,
                provider: data.provider === 'meta' ? 'Meta Cloud API' : 'Twilio',
                sender: data.sender
            }
        }));
        setIsConnectDialogOpen(false);
        toast({ title: "Provider erfolgreich verbunden", description: `Der ${channel === 'whatsapp' ? 'WhatsApp' : 'SMS'} Kanal ist jetzt aktiv.` });
    };

    const handleDisconnect = (channel: 'whatsapp' | 'sms') => {
        setProviders((prev: any) => ({ ...prev, [channel]: { connected: false, provider: null, sender: null } }));
        toast({ title: "Verbindung getrennt", variant: "destructive" });
    };

    const handleTestClick = (channel: 'whatsapp' | 'sms' | 'E-Mail') => {
        setCurrentChannel(channel);
        setIsTestDialogOpen(true);
    }
    
    const handleDefaultsChange = (field: string, value: any) => {
        setLocalDefaults((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleDefaultChannelChange = (channel: 'email' | 'whatsapp' | 'sms', checked: boolean) => {
        const newChannels = { ...localDefaults.channels, [channel]: checked };
        handleDefaultsChange('channels', newChannels);
        handleDefaultsChange('enabled', Object.values(newChannels).some(c => c) && localDefaults.triggers.length > 0);
    };
    
    const handleDefaultTriggerChange = (index: number, field: 'value' | 'unit', value: string | number) => {
        const newTriggers = [...localDefaults.triggers];
        newTriggers[index] = { ...newTriggers[index], [field]: value };
        handleDefaultsChange('triggers', newTriggers);
    };

    const addDefaultTrigger = () => {
        const newTriggers = [...localDefaults.triggers, { value: 1, unit: 'days' }];
        handleDefaultsChange('triggers', newTriggers);
        handleDefaultsChange('enabled', Object.values(localDefaults.channels).some(c => c));
    };
    
    const removeDefaultTrigger = (index: number) => {
        const newTriggers = localDefaults.triggers.filter((_: any, i: number) => i !== index);
        handleDefaultsChange('triggers', newTriggers);
        handleDefaultsChange('enabled', Object.values(localDefaults.channels).some(c => c) && newTriggers.length > 0);
    };

    const handleSaveDefaults = () => {
        onReminderDefaultsChange(localDefaults);
        toast({ title: 'Voreinstellungen gespeichert' });
    }

    const handleTemplateChange = (channel: 'email' | 'whatsapp' | 'sms', field: 'subject' | 'body', value: string) => {
        setLocalDefaults((prev: any) => {
            const newTemplates = { ...prev.templates };
            if (field === 'subject') {
                newTemplates[channel].subject = value;
            } else {
                newTemplates[channel].body = value;
            }
            return { ...prev, templates: newTemplates };
        });
        if(channel === 'sms' && field === 'body') {
            setSmsCharCount(value.length);
        }
    };

    const resetTemplate = (channel: 'email' | 'whatsapp' | 'sms') => {
        const defaultTemplates = {
            email: { subject: "Erinnerung: Termin am {{date}} um {{time}}", body: "Hallo {{customer_name}},\n\nhier ist eine Erinnerung an deinen Termin am {{date}} um {{time}}.\n{{location_or_link}}\n\nVerschieben: {{reschedule_link}}\nAbsagen: {{cancel_link}}\n\nViele Grüße\n{{company_name}}" },
            whatsapp: { body: "Hallo {{customer_name}}, Erinnerung an deinen Termin am {{date}} um {{time}}. {{location_or_link}}" },
            sms: { body: "Erinnerung: Termin {{date}} {{time}}. {{location_or_link}}" }
        };
        handleTemplateChange(channel, 'body', defaultTemplates[channel].body);
        if (channel === 'email') {
            handleTemplateChange(channel, 'subject', defaultTemplates[channel].subject);
        }
    };
    
    const placeholders = [ "{{customer_name}}", "{{date}}", "{{time}}", "{{timezone}}", "{{appointment_type}}", "{{duration}}", "{{location_or_link}}", "{{reschedule_link}}", "{{cancel_link}}", "{{company_name}}" ];

    const providerChannels = [
        { key: 'email', name: 'E-Mail', icon: Mail },
        { key: 'whatsapp', name: 'WhatsApp', icon: MessageSquare },
        { key: 'sms', name: 'SMS', icon: Bell }
    ] as const;

    return (
        <div className="space-y-8">
            <Card className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-1">Workflow-Benachrichtigungen</h2>
                <p className="text-sm text-muted-foreground mb-6">
                    Legen Sie fest, wann und wie Nutzer und Gäste über den Status eines Termins informiert werden.
                </p>
                <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                        <div><Label htmlFor="confirm-guest" className="font-bold text-foreground">Bestätigung an Gast</Label><p className="text-xs text-muted-foreground">Wird sofort nach der Buchung gesendet.</p></div>
                        <Switch id="confirm-guest" defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                        <div><Label htmlFor="notify-owner" className="font-bold text-foreground">Info an Kalender-Inhaber</Label><p className="text-xs text-muted-foreground">Benachrichtigt Sie über neue Termine.</p></div>
                        <Switch id="notify-owner" defaultChecked />
                    </div>
                </div>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Smart Reminders – Voreinstellungen</CardTitle>
                    <CardDescription>Legen Sie globale Standards für automatische Terminerinnerungen fest.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-6">
                     <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border">
                        <Label htmlFor="defaults-enabled" className="font-bold">Erinnerungen standardmäßig aktiv</Label>
                        <Switch id="defaults-enabled" checked={localDefaults.enabled} onCheckedChange={(c) => handleDefaultsChange('enabled', c)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Standard-Kanäle</Label>
                        <div className="flex items-center gap-6 p-3 rounded-lg bg-muted/50 border">
                            <div className="flex items-center gap-2"><Checkbox id="def-email" checked={localDefaults.channels.email} onCheckedChange={(c) => handleDefaultChannelChange('email', !!c)} /><Label htmlFor="def-email">E-Mail</Label></div>
                            <div className="flex items-center gap-2"><Checkbox id="def-whatsapp" checked={localDefaults.channels.whatsapp} onCheckedChange={(c) => handleDefaultChannelChange('whatsapp', !!c)} /><Label htmlFor="def-whatsapp">WhatsApp</Label></div>
                            <div className="flex items-center gap-2"><Checkbox id="def-sms" checked={localDefaults.channels.sms} onCheckedChange={(c) => handleDefaultChannelChange('sms', !!c)} /><Label htmlFor="def-sms">SMS</Label></div>
                        </div>
                    </div>
                    <div className="space-y-2">
                         <Label>Standard-Zeitpunkte</Label>
                         <div className="space-y-2 p-3 rounded-lg bg-muted/50 border">
                             {localDefaults.triggers.map((trigger: any, index: number) => (
                                 <div key={index} className="flex items-center gap-2">
                                     <Input type="number" min="1" max="30" value={trigger.value} onChange={(e) => handleDefaultTriggerChange(index, 'value', parseInt(e.target.value))} className="w-20 bg-input" />
                                     <Select value={trigger.unit} onValueChange={(v) => handleDefaultTriggerChange(index, 'unit', v)}>
                                         <SelectTrigger className="w-32 bg-input"><SelectValue /></SelectTrigger>
                                         <SelectContent>
                                             <SelectItem value="minutes">Minuten</SelectItem>
                                             <SelectItem value="hours">Stunden</SelectItem>
                                             <SelectItem value="days">Tage</SelectItem>
                                         </SelectContent>
                                     </Select>
                                     <Button variant="ghost" size="icon" onClick={() => removeDefaultTrigger(index)} className="w-8 h-8"><Trash2 className="w-4 h-4 text-muted-foreground"/></Button>
                                 </div>
                             ))}
                             <Button variant="outline" size="sm" onClick={addDefaultTrigger}><Plus className="w-4 h-4 mr-2"/> Zeitpunkt hinzufügen</Button>
                         </div>
                    </div>

                    <Separator className="my-6" />

                    <div>
                        <h4 className="font-bold text-foreground">Erinnerungstexte (Standard)</h4>
                        <p className="text-sm text-muted-foreground">Definieren Sie die Standardtexte für Ihre Erinnerungen.</p>
                    </div>

                    <Tabs defaultValue="email" className="w-full">
                        <TabsList>
                            <TabsTrigger value="email">E-Mail</TabsTrigger>
                            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
                            <TabsTrigger value="sms">SMS</TabsTrigger>
                        </TabsList>
                        <TabsContent value="email" className="mt-4 space-y-4">
                            <div className="space-y-2"><Label htmlFor="tpl-email-subject">Betreff</Label><Input id="tpl-email-subject" value={localDefaults.templates.email.subject} onChange={(e) => handleTemplateChange('email', 'subject', e.target.value)} className="bg-input"/></div>
                            <div className="space-y-2"><Label htmlFor="tpl-email-body">Nachricht</Label><Textarea id="tpl-email-body" value={localDefaults.templates.email.body} onChange={(e) => handleTemplateChange('email', 'body', e.target.value)} rows={6} className="bg-input"/></div>
                            <div className="flex flex-wrap gap-2 pt-2"><Button size="sm" variant="outline" onClick={() => toast({title: "KI-Prüfung gestartet"})}>🧠 Text prüfen</Button><Button size="sm" variant="outline" onClick={() => toast({title: "KI-Vorschlag wird generiert"})}>🧠 Umformulieren</Button><Button size="sm" variant="outline" onClick={() => resetTemplate('email')}>Zurücksetzen</Button></div>
                        </TabsContent>
                         <TabsContent value="whatsapp" className="mt-4 space-y-4">
                             <div className="space-y-2"><Label htmlFor="tpl-wa-body">Nachricht</Label><Textarea id="tpl-wa-body" value={localDefaults.templates.whatsapp.body} onChange={(e) => handleTemplateChange('whatsapp', 'body', e.target.value)} rows={4} className="bg-input"/></div>
                             <div className="flex flex-wrap gap-2 pt-2"><Button size="sm" variant="outline" onClick={() => toast({title: "KI-Prüfung gestartet"})}>🧠 Text prüfen</Button><Button size="sm" variant="outline" onClick={() => toast({title: "KI-Vorschlag wird generiert"})}>🧠 Umformulieren</Button><Button size="sm" variant="outline" onClick={() => resetTemplate('whatsapp')}>Zurücksetzen</Button></div>
                         </TabsContent>
                         <TabsContent value="sms" className="mt-4 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tpl-sms-body">Nachricht</Label>
                                <Textarea id="tpl-sms-body" value={localDefaults.templates.sms.body} onChange={(e) => handleTemplateChange('sms', 'body', e.target.value)} rows={3} className="bg-input"/>
                                <p className="text-xs text-muted-foreground text-right">{smsCharCount} / 160 Zeichen</p>
                            </div>
                             <div className="flex flex-wrap gap-2 pt-2"><Button size="sm" variant="outline" onClick={() => toast({title: "KI-Prüfung gestartet"})}>🧠 Text prüfen</Button><Button size="sm" variant="outline" onClick={() => toast({title: "KI-Vorschlag wird generiert"})}>🧠 Umformulieren</Button><Button size="sm" variant="outline" onClick={() => resetTemplate('sms')}>Zurücksetzen</Button></div>
                         </TabsContent>
                    </Tabs>
                    
                    <div className="pt-4 border-t border-border">
                        <Label className="text-xs font-bold uppercase text-muted-foreground">Verfügbare Platzhalter</Label>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 mt-2">
                            {placeholders.map(p => <code key={p} className="text-xs p-1 bg-muted rounded-md font-mono">{p}</code>)}
                        </div>
                    </div>

                    <div className="space-y-4 pt-6 border-t">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="def-ai-toggle" className="flex items-center gap-2 font-bold"><BrainCircuit className="w-4 h-4 text-blue-400"/> KI-Vorschläge global aktiv</Label>
                            <Switch id="def-ai-toggle" checked={localDefaults.ai.enabled} onCheckedChange={(c) => handleDefaultsChange('ai', { ...localDefaults.ai, enabled: c })} />
                        </div>
                         <div className="flex items-center justify-between">
                            <Label htmlFor="def-fallback-toggle" className="font-bold">Fallback aktivieren</Label>
                            <Switch id="def-fallback-toggle" checked={localDefaults.fallback.enabled} onCheckedChange={(c) => handleDefaultsChange('fallback', { ...localDefaults.fallback, enabled: c })} />
                        </div>
                    </div>
                 </CardContent>
                 <CardFooter>
                     <Button onClick={handleSaveDefaults}>Voreinstellungen speichern</Button>
                 </CardFooter>
            </Card>

            <Card className="p-6">
                <h2 className="text-lg font-bold text-foreground mb-1">Kanäle & Provider</h2>
                <p className="text-sm text-muted-foreground mb-6">Verbinden Sie externe Dienste für den Versand via WhatsApp oder SMS.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {providerChannels.map(channelInfo => {
                        const Icon = channelInfo.icon;
                        const provider = providers[channelInfo.key];
                        return (
                            <Card key={channelInfo.key} className="p-4 flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-3">
                                            <Icon className="w-5 h-5 text-muted-foreground"/>
                                            <h3 className="font-bold text-foreground">{channelInfo.name}</h3>
                                        </div>
                                        <Badge variant={provider.connected ? 'default' : 'outline'} className={cn(provider.connected ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : '')}>
                                            {provider.connected ? 'Verbunden' : 'Nicht verbunden'}
                                        </Badge>
                                    </div>
                                    <div className="mt-4 text-xs space-y-1">
                                        <p><strong className="text-muted-foreground">Provider:</strong> {provider.provider || '---'}</p>
                                        <p><strong className="text-muted-foreground">Sender:</strong> {provider.sender || '---'}</p>
                                    </div>
                                </div>
                                <div className="mt-6 flex gap-2">
                                    {provider.connected ? (
                                        <>
                                            <Button variant="outline" size="sm" onClick={() => handleTestClick(channelInfo.name)}><Send className="w-3.5 h-3.5 mr-2"/>Test</Button>
                                            {channelInfo.key !== 'email' && <Button variant="destructive" size="sm" onClick={() => handleDisconnect(channelInfo.key)}><Trash2 className="w-3.5 h-3.5 mr-2"/>Trennen</Button>}
                                        </>
                                    ) : (
                                        channelInfo.key !== 'email' && <Button variant="default" size="sm" onClick={() => handleConnectClick(channelInfo.key)} className="w-full"><LinkIcon className="w-3.5 h-3.5 mr-2"/>Verbinden</Button>
                                    )}
                                </div>
                            </Card>
                        )
                    })}
                </div>
            </Card>

            <ProviderConnectDialog 
                open={isConnectDialogOpen}
                onOpenChange={setIsConnectDialogOpen}
                channel={currentChannel as 'whatsapp' | 'sms' | null}
                onConnect={handleConnect}
            />
            <TestSendDialog
                 open={isTestDialogOpen}
                 onOpenChange={setIsTestDialogOpen}
                 channel={currentChannel}
            />
        </div>
    )
};


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
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-primary/20 text-primary border-primary/20 shrink-0">
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
            <span className="text-xs font-bold px-2 py-1 rounded bg-primary/20 text-primary border border-primary/20 flex items-center gap-1.5">
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
                        <TableHead>Datum &amp; Uhrzeit</TableHead>
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
  const [providers, setProviders] = useState({
      email: { connected: true, provider: 'System-Standard (SMTP)', sender: 'ceo@aisuite.de' },
      whatsapp: { connected: false, provider: null, sender: null },
      sms: { connected: false, provider: null, sender: null }
  });
  
  const [smartReminderDefaults, setSmartReminderDefaults] = useState({
    enabled: true,
    channels: { email: true, whatsapp: false, sms: false },
    triggers: [{ value: 24, unit: 'hours' }, { value: 1, unit: 'hours' }],
    ai: { enabled: true },
    fallback: { enabled: true },
    templates: {
      email: { subject: "Erinnerung: Termin am {{date}} um {{time}}", body: "Hallo {{customer_name}},\n\nhier ist eine Erinnerung an deinen Termin am {{date}} um {{time}}.\n{{location_or_link}}\n\nVerschieben: {{reschedule_link}}\nAbsagen: {{cancel_link}}\n\nViele Grüße\n{{company_name}}" },
      whatsapp: { body: "Hallo {{customer_name}}, Erinnerung an deinen Termin am {{date}} um {{time}}. {{location_or_link}}" },
      sms: { body: "Erinnerung: Termin {{date}} {{time}}. {{location_or_link}}" }
    }
  });

  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const renderContent = () => {
    switch (activeTab) {
      case 'Kalender':
        return <CalendarView providers={providers} reminderDefaults={smartReminderDefaults} />;
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
        return <NotificationsView providers={providers} setProviders={setProviders} reminderDefaults={smartReminderDefaults} onReminderDefaultsChange={setSmartReminderDefaults} />;
       case 'Buchungen':
        return <BookingsView />;
      default:
        return <CalendarView providers={providers} reminderDefaults={smartReminderDefaults} />;
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

      <div className="mt-8 animate-in fade-in duration-300">
          {isClient ? renderContent() : null}
      </div>
    </div>
  );
}
