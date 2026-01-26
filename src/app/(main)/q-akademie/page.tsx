'use client';

import { useState, useRef, useEffect, type FormEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { mockCourses, mockParticipants, mockLearningPaths, qOnboardingModules, mockAcademyVideos, mockAcademyDocs } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';


const modules = [
    { name: 'Übersicht', icon: LayoutDashboard },
    { name: 'Q-Onboarding', icon: GraduationCap },
    { name: 'Kurse', icon: BookCopy },
    { name: 'Lernpfade', icon: Network },
    { name: 'Inhalte', icon: FolderKanban },
    { name: 'Teilnehmer', icon: Users },
    { name: 'Abteilungen & Rollen', icon: Building },
    { name: 'Fortschritt & Reports', icon: BarChart3 },
    { name: 'Zertifikate', icon: Award },
    { name: 'Einstellungen', icon: Settings },
];

type RecordingMode = 'screen' | 'screen-cam' | 'camera';

const VideoRecorderDialog = ({ open, onOpenChange, onVideoSaved }: { open: boolean, onOpenChange: (open: boolean) => void, onVideoSaved: (video: any) => void }) => {
    const { toast } = useToast();
    const [step, setStep] = useState<'mode-selection' | 'recording' | 'preview' | 'uploading'>('mode-selection');
    const [recordingMode, setRecordingMode] = useState<RecordingMode | null>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);

    const resetState = () => {
        stopStream();
        setStep('mode-selection');
        setRecordingMode(null);
        setRecordedVideoUrl(null);
        setRecordedChunks([]);
        setError(null);
        setStream(null);
        setMediaRecorder(null);
    };
    
    useEffect(() => {
        if (!open) {
            resetState();
        }
    }, [open]);

    const stopStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleStartRecording = async () => {
        if (!recordingMode) return;
        setError(null);
        
        try {
            let finalStream: MediaStream;

            if (recordingMode === 'camera') {
                finalStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            } else {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
                if (recordingMode === 'screen-cam') {
                    const cameraStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
                    
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');
                    if (!ctx) throw new Error('Canvas context not available');

                    const screenVideo = document.createElement('video');
                    screenVideo.srcObject = screenStream;
                    screenVideo.muted = true;
                    screenVideo.play();

                    const camVideo = document.createElement('video');
                    camVideo.srcObject = cameraStream;
                    camVideo.muted = true;
                    camVideo.play();

                    await Promise.all([
                        new Promise(resolve => screenVideo.onloadedmetadata = resolve),
                        new Promise(resolve => camVideo.onloadedmetadata = resolve)
                    ]);
                    
                    canvas.width = screenVideo.videoWidth;
                    canvas.height = screenVideo.videoHeight;
                    
                    const draw = () => {
                        ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
                        const camWidth = canvas.width / 5;
                        const camHeight = (camVideo.videoHeight / camVideo.videoWidth) * camWidth;
                        ctx.drawImage(camVideo, canvas.width - camWidth - 20, canvas.height - camHeight - 20, camWidth, camHeight);
                        requestAnimationFrame(draw);
                    };
                    draw();
                    
                    const canvasStream = canvas.captureStream();
                    const audioTrack = screenStream.getAudioTracks()[0];
                    if (audioTrack) {
                         canvasStream.addTrack(audioTrack.clone());
                    }
                    finalStream = canvasStream;

                } else { // screen only
                    finalStream = screenStream;
                }
            }

            setStream(finalStream);
            
            if (videoRef.current) {
                videoRef.current.srcObject = finalStream;
                videoRef.current.play();
            }

            const recorder = new MediaRecorder(finalStream);
            setMediaRecorder(recorder);
            recorder.ondataavailable = (e) => setRecordedChunks(prev => [...prev, e.data]);
            recorder.onstop = () => {
                setRecordedChunks(currentChunks => {
                    const blob = new Blob(currentChunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    setRecordedVideoUrl(url);
                    setStep('preview');
                    return currentChunks;
                });
                finalStream.getTracks().forEach(track => track.stop());
            };
            setRecordedChunks([]);
            recorder.start();
            setStep('recording');

        } catch (err: any) {
            console.error('Error accessing media devices.', err);
            setError(`Zugriff auf Medien verweigert: ${err.message}. Bitte Berechtigungen in den Browsereinstellungen prüfen.`);
            setRecordingMode(null);
            setStep('mode-selection');
        }
    };
    
    const stopRecording = () => {
        mediaRecorder?.stop();
    };

    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const title = formData.get('title') as string;
        
        setStep('uploading');
        setTimeout(() => {
            const newVideo = {
                id: `vid-${Date.now()}`,
                title: title || 'Unbenanntes Video',
                duration: '0:42', // Mock
                uploader: 'Dr. Müller',
                date: new Date().toLocaleDateString('de-DE')
            };
            onVideoSaved(newVideo);
            toast({ title: "Video gespeichert", description: "Ihre Aufnahme wurde der Bibliothek hinzugefügt." });
            onOpenChange(false);
        }, 2000);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-3xl">
                <DialogHeader>
                    <DialogTitle>Video aufnehmen</DialogTitle>
                     {step === 'mode-selection' && <DialogDescription>Wählen Sie einen Aufnahmemodus, um zu beginnen.</DialogDescription>}
                     {step !== 'mode-selection' && <DialogDescription>Nehmen Sie ein Video auf, um es in Ihren Kursen zu verwenden.</DialogDescription>}
                </DialogHeader>

                {error && <Alert variant="destructive"><AlertTitle>Fehler</AlertTitle><AlertDescription>{error}</AlertDescription></Alert>}

                {step === 'mode-selection' && (
                    <RadioGroup onValueChange={(v: RecordingMode) => setRecordingMode(v)} className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
                        {[
                            { value: 'screen', label: 'Bildschirmvideo', icon: ScreenShare, desc: 'Bildschirm & Mikrofon' },
                            { value: 'screen-cam', label: 'Bildschirm & Kamera', icon: ScreenShare, desc: 'Bildschirm, Mikro & Kamera (PiP)' },
                            { value: 'camera', label: 'Nur Kamera', icon: Camera, desc: 'Kamera & Mikrofon' }
                        ].map(mode => (
                             <Label key={mode.value} htmlFor={mode.value} className={cn("p-4 border rounded-lg cursor-pointer hover:bg-accent", recordingMode === mode.value && 'border-primary ring-2 ring-primary')}>
                                <RadioGroupItem value={mode.value} id={mode.value} className="sr-only"/>
                                <div className="flex flex-col items-center text-center gap-2">
                                    <mode.icon className="w-8 h-8 text-primary"/>
                                    <span className="font-bold">{mode.label}</span>
                                    <span className="text-xs text-muted-foreground">{mode.desc}</span>
                                </div>
                            </Label>
                        ))}
                    </RadioGroup>
                )}

                {(step === 'recording' || step === 'preview') && (
                    <div className="bg-black rounded-lg aspect-video relative flex items-center justify-center">
                        <video ref={videoRef} className={cn("w-full h-full", step === 'preview' && 'hidden')} autoPlay muted />
                        {step === 'preview' && <video src={recordedVideoUrl || ''} className="w-full h-full" controls />}
                    </div>
                )}
                
                <div className="mt-4 flex justify-center">
                   {step === 'mode-selection' && (
                      <Button onClick={handleStartRecording} disabled={!recordingMode} size="lg"><Play className="mr-2"/> Aufnahme starten</Button>
                   )}
                   {step === 'recording' && (
                      <Button onClick={stopRecording} variant="destructive" size="lg"><StopCircle className="mr-2"/> Aufnahme stoppen</Button>
                   )}
                </div>

                 {step === 'preview' && (
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="space-y-2">
                           <Label htmlFor="title">Titel</Label>
                           <Input id="title" name="title" placeholder="Video-Titel" required className="bg-input" />
                        </div>
                        <div className="space-y-2">
                           <Label htmlFor="description">Beschreibung</Label>
                           <Textarea id="description" name="description" placeholder="Kurze Beschreibung des Videoinhalts..." className="bg-input" />
                        </div>
                         <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={() => resetState()}>Erneut aufnehmen</Button>
                            <Button type="submit">Speichern & Hochladen</Button>
                        </div>
                    </form>
                )}
                 {step === 'uploading' && (
                    <div className="flex items-center justify-center flex-col gap-2 text-muted-foreground py-10">
                        <Loader2 className="animate-spin w-8 h-8" />
                        <p>Video wird verarbeitet & hochgeladen...</p>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};


const OverviewView = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-foreground">Übersicht</h2>
            <p className="text-muted-foreground">Die Q-Akademie ist dein zentrales System für Schulungen und internes Wissen.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
                <CardHeader><CardTitle>Aktive Kurse</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">2</p></CardContent>
            </Card>
            <Card>
                <CardHeader><CardTitle>Teilnehmer gesamt</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">45</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Abgeschlossene Kurse</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">128</p></CardContent>
            </Card>
             <Card>
                <CardHeader><CardTitle>Offene Schulungen</CardTitle></CardHeader>
                <CardContent><p className="text-4xl font-bold">15</p></CardContent>
            </Card>
        </div>
         <div>
            <h3 className="text-lg font-bold text-foreground mb-4">Schnellaktionen</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <Button variant="outline">Kurs erstellen</Button>
                <Button variant="outline">Video hochladen</Button>
                <Button variant="outline">Lernpfad anlegen</Button>
            </div>
        </div>
    </div>
);

const QOnboardingView = () => (
    <div className="space-y-6">
        <div>
            <h2 className="text-2xl font-bold text-foreground">Q-Onboarding</h2>
            <p className="text-muted-foreground">Ihr systemkritisches Onboarding für den erfolgreichen Start mit QORE.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {qOnboardingModules.map((module, index) => (
                <Card key={index} className="flex flex-col p-6">
                    <div className="flex-1">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center border border-primary/20 mb-4">
                            <GraduationCap className="w-5 h-5"/>
                        </div>
                        <h3 className="font-bold text-foreground mb-1">{module.title}</h3>
                        <p className="text-xs text-muted-foreground mb-4">{module.description}</p>
                    </div>
                    <div>
                        <Progress value={module.progress} className="h-2"/>
                        <p className="text-xs text-muted-foreground mt-1.5">{module.progress}% abgeschlossen</p>
                    </div>
                </Card>
            ))}
        </div>
    </div>
);

const CoursesView = () => (
    <div>
        <div className="flex justify-between items-center mb-6">
             <Tabs defaultValue="unternehmenskurse" className="w-full">
                <TabsList>
                    <TabsTrigger value="q-kurse">Q-Kurse</TabsTrigger>
                    <TabsTrigger value="unternehmenskurse">Unternehmenskurse</TabsTrigger>
                    <TabsTrigger value="eigene-kurse">Eigene Kurse</TabsTrigger>
                </TabsList>
            </Tabs>
             <Button><Plus className="mr-2 h-4 w-4"/> Kurs erstellen</Button>
        </div>
        <Tabs defaultValue="unternehmenskurse">
            <TabsContent value="q-kurse">
                <div className="text-center py-12 text-muted-foreground italic">Keine Q-Kurse verfügbar.</div>
            </TabsContent>
            <TabsContent value="unternehmenskurse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.map(course => (
                        <Card key={course.id} className="flex flex-col">
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                                    <Badge variant={course.status === 'Veröffentlicht' ? 'default' : 'secondary'}>{course.status}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground pt-1">{course.description}</p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-sm text-muted-foreground flex items-center justify-between">
                                    <span>{course.modules} Module</span>
                                    <span>{course.enrolled} Teilnehmer</span>
                                </div>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button variant="outline" className="w-full">Kurs verwalten</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="eigene-kurse">
                 <div className="text-center py-12 text-muted-foreground italic">Sie haben noch keine eigenen Kurse erstellt.</div>
            </TabsContent>
        </Tabs>
    </div>
);

const InhalteView = ({videos, setVideos}: {videos: any[], setVideos: any}) => (
    <div>
        <Tabs defaultValue="videos">
            <TabsList className="mb-6">
                <TabsTrigger value="videos">Videos</TabsTrigger>
                <TabsTrigger value="dokumente">Dokumente</TabsTrigger>
                <TabsTrigger value="wissensbausteine">Wissensbausteine</TabsTrigger>
            </TabsList>
            <TabsContent value="videos">
                <Card>
                    <CardHeader><Button><Plus className="w-4 h-4 mr-2"/> Video hochladen</Button></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Dauer</TableHead><TableHead>Uploader</TableHead><TableHead>Datum</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {videos.map(v => (
                                    <TableRow key={v.id} className="cursor-pointer">
                                        <TableCell className="font-medium flex items-center gap-2"><Video className="w-4 h-4 text-muted-foreground"/> {v.title}</TableCell>
                                        <TableCell>{v.duration}</TableCell>
                                        <TableCell>{v.uploader}</TableCell>
                                        <TableCell>{v.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="dokumente">
                 <Card>
                    <CardHeader><Button><Plus className="w-4 h-4 mr-2"/> Dokument hochladen</Button></CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Typ</TableHead><TableHead>Größe</TableHead><TableHead>Uploader</TableHead><TableHead>Datum</TableHead></TableRow></TableHeader>
                            <TableBody>
                                {mockAcademyDocs.map(d => (
                                    <TableRow key={d.id} className="cursor-pointer">
                                        <TableCell className="font-medium flex items-center gap-2"><FileIcon className="w-4 h-4 text-muted-foreground"/> {d.title}</TableCell>
                                        <TableCell><Badge variant="outline">{d.type}</Badge></TableCell>
                                        <TableCell>{d.size}</TableCell>
                                        <TableCell>{d.uploader}</TableCell>
                                        <TableCell>{d.date}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="wissensbausteine">
                 <Card>
                    <CardHeader><Button><Plus className="w-4 h-4 mr-2"/> Wissensbaustein erstellen</Button></CardHeader>
                    <CardContent>
                        <div className="text-center py-12 text-muted-foreground italic">Keine Wissensbausteine vorhanden.</div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
);

const LearningPathsView = () => (
    <Card>
        <CardHeader><CardTitle>Lernpfade</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader><TableRow><TableHead>Titel</TableHead><TableHead>Anzahl Kurse</TableHead><TableHead>Zugewiesen an</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockLearningPaths.map(lp => (
                        <TableRow key={lp.id} className="cursor-pointer">
                            <TableCell className="font-medium">{lp.title}</TableCell>
                            <TableCell>{lp.courses}</TableCell>
                            <TableCell>{lp.assigned}</TableCell>
                            <TableCell><Badge variant={lp.mandatory ? 'destructive' : 'outline'}>{lp.mandatory ? 'Pflicht' : 'Optional'}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const ParticipantsView = () => (
    <Card>
        <CardHeader><CardTitle>Teilnehmer</CardTitle></CardHeader>
        <CardContent>
            <Table>
                <TableHeader><TableRow><TableHead>Name</TableHead><TableHead>Abteilung</TableHead><TableHead>Kurse</TableHead><TableHead>Fortschritt</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockParticipants.map(p => (
                        <TableRow key={p.id} className="cursor-pointer">
                            <TableCell className="font-medium">{p.name}</TableCell>
                            <TableCell>{p.department}</TableCell>
                            <TableCell>{p.courses}</TableCell>
                            <TableCell>{p.progress}%</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const GenericView = ({ title }: { title: string }) => (
    <Card>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground italic">Ansicht für "{title}" wird aufgebaut.</p>
        </CardContent>
    </Card>
);


export default function QAkademiePage() {
    const [activeModule, setActiveModule] = useState(modules[0].name);
    const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
    const [videos, setVideos] = useState(mockAcademyVideos);

    const handleVideoSaved = (newVideo: any) => {
        setVideos(prev => [newVideo, ...prev]);
    };

    const renderModule = () => {
        switch (activeModule) {
            case 'Übersicht': return <OverviewView />;
            case 'Q-Onboarding': return <QOnboardingView />;
            case 'Kurse': return <CoursesView />;
            case 'Lernpfade': return <LearningPathsView />;
            case 'Inhalte': return <InhalteView videos={videos} setVideos={setVideos} />;
            case 'Teilnehmer': return <ParticipantsView />;
            case 'Abteilungen & Rollen': return <GenericView title="Abteilungen & Rollen" />;
            case 'Fortschritt & Reports': return <GenericView title="Fortschritt & Reports" />;
            case 'Zertifikate': return <GenericView title="Zertifikate" />;
            case 'Einstellungen': return <GenericView title="Einstellungen" />;
            default: return <OverviewView />;
        }
    };

    return (
        <div className="flex h-full min-h-[calc(100vh-10rem)]">
            <aside className="w-56 border-r border-border pr-4 space-y-1">
                <p className="px-3 pb-2 text-xs font-bold uppercase text-muted-foreground">Q-Akademie</p>
                {modules.map((mod) => {
                    const Icon = mod.icon;
                    return (
                        <Button
                            key={mod.name}
                            variant={activeModule === mod.name ? 'secondary' : 'ghost'}
                            onClick={() => setActiveModule(mod.name)}
                            className="w-full justify-start text-sm"
                        >
                            <Icon className="mr-2 h-4 w-4" />
                            {mod.name}
                        </Button>
                    )
                })}
            </aside>

            <main className="flex-1 pl-6 space-y-6">
                <header className="flex justify-between items-center">
                     <div className="relative w-96">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input type="text" placeholder="Kurse, Videos, Inhalte durchsuchen..." className="pl-9 bg-input" />
                    </div>
                    <div className="flex items-center gap-3">
                         <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                               <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Erstellen
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>Kurs erstellen</DropdownMenuItem>
                                <DropdownMenuItem>Lernpfad erstellen</DropdownMenuItem>
                                <DropdownMenuItem>Video hochladen</DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => setIsRecordingDialogOpen(true)}>Video aufnehmen</DropdownMenuItem>
                                <DropdownMenuItem>Dokument hochladen</DropdownMenuItem>
                                <DropdownMenuItem>Wissensbaustein erstellen</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                <div className="animate-in fade-in duration-300">
                    {renderModule()}
                </div>
            </main>
            <VideoRecorderDialog open={isRecordingDialogOpen} onOpenChange={setIsRecordingDialogOpen} onVideoSaved={handleVideoSaved} />
        </div>
    );
}
