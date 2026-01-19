'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { liveActivities } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bot, Activity, Shield, FileText, ExternalLink, PlusSquare, MessageSquare, Calendar as CalendarIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useState, type FormEvent } from 'react';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

export default function ActivityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { toast } = useToast();
    const activityId = params.activityId as string;

    const activity = liveActivities.find(act => act.id === activityId);

    const [dueDate, setDueDate] = useState<Date | undefined>();

    if (!activity) {
        notFound();
    }

    const handleOpenOrigin = () => {
        // This is a simplified mapping. A real app would have a more robust system.
        const type = activity.reference.type.toLowerCase();
        let path = '/dashboard'; // Default fallback

        if (type.includes('ticket')) path = '/qhub';
        else if (type.includes('lead')) path = '/qsales';
        else if (type.includes('bewerbung')) path = '/departments/hr';
        else if (type.includes('system')) path = '/admin';

        router.push(path);
    };

    const handleCreateTask = (e: FormEvent) => {
        e.preventDefault();
        // In a real app, this would submit to a backend.
        toast({
            title: "Aufgabe erstellt",
            description: "Die Aufgabe wurde erfolgreich angelegt.",
        });
        // Here you would typically close the dialog.
        // For this example, we'll rely on the user clicking the close button.
    };
    
    const handleAddNote = (e: FormEvent) => {
        e.preventDefault();
        toast({
            title: "Notiz gespeichert",
            description: "Ihre Notiz wurde der Aktivität hinzugefügt.",
        });
    };
    
    const severityMap: { [key: string]: { color: string, icon: React.ElementType } } = {
        info: { color: 'blue', icon: Activity },
        warning: { color: 'amber', icon: Shield },
        critical: { color: 'rose', icon: Shield },
    };
    
    const severity = severityMap[activity.severity] || severityMap.info;
    const SeverityIcon = severity.icon;

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <header className="flex items-center gap-4">
                <Button variant="outline" size="icon" className="h-9 w-9" onClick={() => router.back()}>
                    <ChevronLeft className="w-5 h-5" />
                </Button>
                <div className="flex items-center gap-3">
                     <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", `bg-${severity.color}-500/10 text-${severity.color}-400 border-${severity.color}-500/20`)}>
                        <SeverityIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground">{activity.title}</h1>
                        <p className="text-sm text-muted-foreground">
                            Ausgeführt von <span className="font-semibold text-foreground">{activity.agent.name}</span> • {new Date(activity.createdAt).toLocaleString('de-DE')}
                        </p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
                <div className="md:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-3">Zusammenfassung</h3>
                        <p className="text-sm text-foreground">{activity.description}</p>
                    </Card>

                    <Card className="p-6">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">Kontext / Referenz</h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Referenz-Typ:</span>
                                <span className="font-bold text-foreground">{activity.reference.type}</span>
                            </div>
                             <div className="flex justify-between items-center text-sm">
                                <span className="text-muted-foreground">Referenz-ID:</span>
                                <span className="font-mono text-foreground bg-muted px-2 py-0.5 rounded-md border">{activity.reference.id}</span>
                            </div>
                            {Object.entries(activity.reference.context).map(([key, value]) => (
                                <div key={key} className="flex justify-between items-center text-sm pt-3 border-t border-border/50">
                                    <span className="text-muted-foreground capitalize">{key}:</span>
                                    <span className="font-bold text-foreground">{value as string}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div className="space-y-4 md:sticky md:top-24">
                     <Card className="p-4">
                        <h3 className="text-xs font-bold text-muted-foreground uppercase mb-4">Aktionen</h3>
                        <div className="flex flex-col gap-2">
                             <Button variant="outline" className="justify-start" onClick={handleOpenOrigin}>
                                <ExternalLink className="mr-2 h-4 w-4"/>
                                Im Ursprung öffnen
                            </Button>
                            <Dialog>
                                <DialogTrigger asChild>
                                     <Button variant="outline" className="justify-start">
                                        <PlusSquare className="mr-2 h-4 w-4"/>
                                        Als Aufgabe anlegen
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Aufgabe anlegen</DialogTitle>
                                        <DialogDescription>
                                            Erstellen Sie eine neue Aufgabe basierend auf dieser Aktivität.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleCreateTask}>
                                        <div className="space-y-4 py-4">
                                            <div className="space-y-2">
                                                <Label htmlFor="task-title">Titel</Label>
                                                <Input id="task-title" defaultValue={`Follow-up zu: ${activity.title}`} className="bg-input"/>
                                            </div>
                                            <div className="space-y-2">
                                                <Label htmlFor="task-desc">Beschreibung</Label>
                                                <Textarea id="task-desc" defaultValue={activity.description} className="bg-input"/>
                                            </div>
                                             <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-2">
                                                    <Label>Fällig am</Label>
                                                    <Popover>
                                                        <PopoverTrigger asChild>
                                                            <Button
                                                                variant={"outline"}
                                                                className={cn(
                                                                    "w-full justify-start text-left font-normal bg-input",
                                                                    !dueDate && "text-muted-foreground"
                                                                )}
                                                            >
                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                {dueDate ? format(dueDate, "PPP") : <span>Datum wählen</span>}
                                                            </Button>
                                                        </PopoverTrigger>
                                                        <PopoverContent className="w-auto p-0">
                                                            <Calendar
                                                                mode="single"
                                                                selected={dueDate}
                                                                onSelect={setDueDate}
                                                                initialFocus
                                                            />
                                                        </PopoverContent>
                                                    </Popover>
                                                </div>
                                                <div className="space-y-2">
                                                    <Label htmlFor="task-prio">Priorität</Label>
                                                    <Select defaultValue="Mittel">
                                                        <SelectTrigger id="task-prio" className="bg-input">
                                                            <SelectValue />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            <SelectItem value="Niedrig">Niedrig</SelectItem>
                                                            <SelectItem value="Mittel">Mittel</SelectItem>
                                                            <SelectItem value="Hoch">Hoch</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                </div>
                                             </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="submit">Aufgabe erstellen</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                             <Dialog>
                                <DialogTrigger asChild>
                                     <Button variant="outline" className="justify-start">
                                        <MessageSquare className="mr-2 h-4 w-4"/>
                                        Notiz hinzufügen
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Notiz hinzufügen</DialogTitle>
                                        <DialogDescription>
                                            Fügen Sie eine Notiz zu dieser Aktivität hinzu. Sie wird im Kontext gespeichert.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <form onSubmit={handleAddNote}>
                                        <div className="py-4">
                                            <Label htmlFor="note-text" className="sr-only">Notiz</Label>
                                            <Textarea id="note-text" placeholder="Ihre Notiz..." rows={5} className="bg-input" />
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button type="submit">Notiz speichern</Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
