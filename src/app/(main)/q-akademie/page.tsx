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
  FileQuestion,
  CheckSquare,
  CheckCircle,
  GitBranch,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { mockCourses, mockParticipants, mockLearningPaths, qOnboardingModules, mockAcademyVideos, mockAcademyDocs, mockCertificates } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';


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
    const [recordedChunks, setRecordedChunks] = useState<Blob[]>([]);
    const [recordedVideoUrl, setRecordedVideoUrl] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const [error, setError] = useState<string | null>(null);
    const animationFrameId = useRef<number | null>(null);
    const mediaStreamsRef = useRef<MediaStream[]>([]);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);

    const cleanup = () => {
        if (animationFrameId.current) {
            cancelAnimationFrame(animationFrameId.current);
            animationFrameId.current = null;
        }
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        mediaStreamsRef.current.forEach(s => {
            s.getTracks().forEach(track => track.stop());
        });
        mediaStreamsRef.current = [];
        mediaRecorderRef.current = null;
    };
    
    const resetState = () => {
        cleanup();
        if (recordedVideoUrl) {
            URL.revokeObjectURL(recordedVideoUrl);
        }
        setStep('mode-selection');
        setRecordingMode(null);
        setRecordedVideoUrl(null);
        setRecordedChunks([]);
        setError(null);
    };

    useEffect(() => {
        // Full cleanup when the dialog is closed, regardless of how.
        if (!open) {
            resetState();
        }
        // Ensure unmount cleanup
        return () => {
          cleanup();
        }
    }, [open]);

    const handleStartRecording = async () => {
        if (!recordingMode) return;
        setError(null);
        
        try {
            let displayStream: MediaStream;
            let recorderStream: MediaStream;

            if (recordingMode === 'camera') {
                const cameraAudioStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                mediaStreamsRef.current.push(cameraAudioStream);
                displayStream = cameraAudioStream;
                recorderStream = cameraAudioStream;
            } else {
                const screenStream = await navigator.mediaDevices.getDisplayMedia({ video: { cursor: "always" }, audio: true });
                mediaStreamsRef.current.push(screenStream);

                if (recordingMode === 'screen-cam') {
                    const cameraStream = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 180 }, audio: false });
                    mediaStreamsRef.current.push(cameraStream);
                    
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
                        new Promise<void>(resolve => screenVideo.onloadedmetadata = () => resolve()),
                        new Promise<void>(resolve => camVideo.onloadedmetadata = () => resolve())
                    ]);
                    
                    canvas.width = screenVideo.videoWidth;
                    canvas.height = screenVideo.videoHeight;
                    
                    const draw = () => {
                        ctx.drawImage(screenVideo, 0, 0, canvas.width, canvas.height);
                        const camWidth = canvas.width / 6;
                        const camHeight = (camVideo.videoHeight / camVideo.videoWidth) * camWidth;
                        ctx.drawImage(camVideo, canvas.width - camWidth - 20, canvas.height - camHeight - 20, camWidth, camHeight);
                        animationFrameId.current = requestAnimationFrame(draw);
                    };
                    draw();
                    
                    recorderStream = canvas.captureStream(30);
                    const audioTracks = screenStream.getAudioTracks();
                    if (audioTracks.length > 0) {
                         recorderStream.addTrack(audioTracks[0]);
                    }
                    displayStream = recorderStream;
                } else {
                    displayStream = screenStream;
                    recorderStream = screenStream;
                }
            }

            if (videoRef.current) {
                videoRef.current.srcObject = displayStream;
                videoRef.current.play().catch(e => console.error("Video play failed", e));
            }

            const recorder = new MediaRecorder(recorderStream, { mimeType: 'video/webm' });
            mediaRecorderRef.current = recorder;
            
            recorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    setRecordedChunks(prev => [...prev, e.data]);
                }
            };
            
            recorder.onstop = () => {
                setRecordedChunks(currentChunks => {
                    if (currentChunks.length === 0) {
                        cleanup();
                        return [];
                    }
                    const blob = new Blob(currentChunks, { type: 'video/webm' });
                    const url = URL.createObjectURL(blob);
                    setRecordedVideoUrl(url);
                    setStep('preview');
                    cleanup();
                    return [];
                });
            };

            setRecordedChunks([]);
            recorder.start();
            setStep('recording');

        } catch (err: any) {
            console.error('Error accessing media devices.', err);
            setError(`Zugriff auf Medien verweigert: ${err.message}. Bitte Berechtigungen in den Browsereinstellungen prüfen.`);
            resetState();
        }
    };
    
    const stopRecording = () => {
        mediaRecorderRef.current?.stop();
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
                duration: '0:42',
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
                            <Button type="button" variant="outline" onClick={() => { resetState(); setStep('mode-selection'); }}>Erneut aufnehmen</Button>
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

const CoursesView = ({ onCreate, onCourseSelect }: { onCreate: () => void, onCourseSelect: (course: any) => void }) => (
    <div>
        <Tabs defaultValue="unternehmenskurse" className="w-full">
            <div className="flex justify-between items-center mb-6">
                <TabsList>
                    <TabsTrigger value="q-kurse">Q-Kurse</TabsTrigger>
                    <TabsTrigger value="unternehmenskurse">Unternehmenskurse</TabsTrigger>
                    <TabsTrigger value="eigene-kurse">Eigene Kurse</TabsTrigger>
                </TabsList>
                <Button variant="outline" onClick={onCreate}><Plus className="mr-2 h-4 w-4"/> Kurs erstellen</Button>
            </div>
            <TabsContent value="q-kurse">
                <div className="text-center py-12 text-muted-foreground italic">Keine Q-Kurse verfügbar.</div>
            </TabsContent>
            <TabsContent value="unternehmenskurse">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {mockCourses.map(course => (
                        <Card key={course.id} className="flex flex-col cursor-pointer hover:border-primary/50" onClick={() => onCourseSelect(course)}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <CardTitle className="line-clamp-2">{course.title}</CardTitle>
                                    <Badge variant={course.status === 'Veröffentlicht' ? 'default' : 'secondary'}>{course.status}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground pt-1">{course.description}</p>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <div className="text-sm text-muted-foreground flex items-center justify-between">
                                    <span>{course.modulesCount} Module</span>
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

const InhalteView = ({videos, setVideos, onRecordVideo, onUploadVideo, onUploadDoc, onCreateWissen}: {videos: any[], setVideos: any, onRecordVideo: () => void, onUploadVideo: () => void, onUploadDoc: () => void, onCreateWissen: () => void}) => (
    <div>
         <div className="flex justify-between items-center mb-6">
            <Tabs defaultValue="videos" className="w-full">
                <TabsList>
                    <TabsTrigger value="videos">Videos</TabsTrigger>
                    <TabsTrigger value="dokumente">Dokumente</TabsTrigger>
                    <TabsTrigger value="wissensbausteine">Wissensbausteine</TabsTrigger>
                </TabsList>
            </Tabs>
             <DropdownMenu>
                <DropdownMenuTrigger asChild>
                   <Button variant="outline">
                        <Plus className="mr-2 h-4 w-4" />
                        Inhalt erstellen
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onSelect={onUploadVideo}><Upload className="mr-2 h-4 w-4" />Video hochladen</DropdownMenuItem>
                    <DropdownMenuItem onSelect={onRecordVideo}><Video className="mr-2 h-4 w-4" />Video aufnehmen</DropdownMenuItem>
                    <DropdownMenuItem onSelect={onUploadDoc}><FileIcon className="mr-2 h-4 w-4" />Dokument hochladen</DropdownMenuItem>
                    <DropdownMenuItem onSelect={onCreateWissen}><BrainCircuit className="mr-2 h-4 w-4" />Wissensbaustein erstellen</DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        <Tabs defaultValue="videos">
            <TabsContent value="videos">
                <Card>
                    <CardHeader></CardHeader>
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
                    <CardHeader></CardHeader>
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
                    <CardHeader></CardHeader>
                    <CardContent>
                        <div className="text-center py-12 text-muted-foreground italic">Keine Wissensbausteine vorhanden.</div>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    </div>
);

const LearningPathsView = ({ onCreate }: { onCreate: () => void }) => (
    <Card>
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Lernpfade</CardTitle>
            <Button variant="outline" onClick={onCreate}><Plus className="mr-2 h-4 w-4"/> Lernpfad erstellen</Button>
        </CardHeader>
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

const ParticipantsView = ({ onCreate }: { onCreate: () => void }) => (
    <Card>
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Teilnehmer</CardTitle>
            <Button variant="outline" onClick={onCreate}><Plus className="mr-2 h-4 w-4"/> Teilnehmer hinzufügen</Button>
        </CardHeader>
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

const CertificatesView = ({ onCreate }: { onCreate: () => void }) => (
    <Card>
        <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Zertifikate</CardTitle>
            <Button variant="outline" onClick={onCreate}><Plus className="mr-2 h-4 w-4"/> Zertifikat erstellen</Button>
        </CardHeader>
        <CardContent>
            <Table>
                <TableHeader><TableRow><TableHead>Zertifikat</TableHead><TableHead>Voraussetzung</TableHead><TableHead>Gültigkeit</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
                <TableBody>
                    {mockCertificates.map(cert => (
                        <TableRow key={cert.id} className="cursor-pointer">
                            <TableCell className="font-medium">{cert.title}</TableCell>
                            <TableCell>{cert.requirement}</TableCell>
                            <TableCell>{cert.validity}</TableCell>
                            <TableCell><Badge variant={cert.status === 'Erhalten' ? 'default' : 'secondary'}>{cert.status}</Badge></TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </CardContent>
    </Card>
);

const GenericView = ({ title, onCreate }: { title: string, onCreate?: () => void }) => {
    if (title === "Fortschritt & Reports") {
        return (
             <div className="space-y-6">
                <h2 className="text-2xl font-bold text-foreground">{title}</h2>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card>
                        <CardHeader><CardTitle className="text-base">Aufgaben-Abschlussquote</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">92%</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Prüfungs-Bestehensquote</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">88%</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Ø Bearbeitungsdauer</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">2.5 Tage</p></CardContent>
                    </Card>
                    <Card>
                        <CardHeader><CardTitle className="text-base">Zertifikatsquote</CardTitle></CardHeader>
                        <CardContent><p className="text-4xl font-bold">75%</p></CardContent>
                    </Card>
                </div>
                 <Card>
                    <CardHeader>
                        <CardTitle className="text-base">Häufigste Fehlerquellen in Prüfungen</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc pl-5 text-sm space-y-1">
                            <li>Frage "Welche Daten gelten als personenbezogen?" (DSGVO-Kurs)</li>
                            <li>Szenario "Umgang mit Einwänden" (Sales Onboarding)</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        )
    }
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>{title}</CardTitle>
                {onCreate && (
                    <Button variant="outline" onClick={onCreate}>
                        <Plus className="mr-2 h-4 w-4" /> Erstellen
                    </Button>
                )}
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground italic">Ansicht für "{title}" wird aufgebaut.</p>
            </CardContent>
        </Card>
    );
};


// New interactive components
const lessonIcons: { [key: string]: React.ElementType } = {
  video: Video,
  dokument: FileIcon,
  quiz: FileQuestion,
  task: CheckSquare,
  confirmation: CheckCircle,
  decision: GitBranch,
  prüfung: Award,
};

const QuizLektionView = ({ lesson }: { lesson: any }) => (
    <div>
        <h3 className="font-bold text-lg mb-4">{lesson.title}</h3>
        <p className="text-sm text-muted-foreground mb-6">Bitte beantworten Sie die folgende Frage.</p>
        <div className="space-y-4">
            <p className="font-medium">Frage 1: Was ist der Hauptzweck der DSGVO?</p>
            <RadioGroup defaultValue="b">
                <div className="flex items-center space-x-2"><RadioGroupItem value="a" id="r1" /><Label htmlFor="r1">Datenmonetarisierung</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="b" id="r2" /><Label htmlFor="r2">Schutz personenbezogener Daten</Label></div>
                <div className="flex items-center space-x-2"><RadioGroupItem value="c" id="r3" /><Label htmlFor="r3">Beschleunigung von Datenübertragungen</Label></div>
            </RadioGroup>
            <Button className="mt-4">Antwort absenden</Button>
        </div>
    </div>
);

const AufgabeLektionView = ({ lesson }: { lesson: any }) => (
    <div>
        <h3 className="font-bold text-lg mb-4">{lesson.title}</h3>
        <p className="text-sm text-muted-foreground mb-6">Bitte bearbeiten und reichen Sie die folgende Aufgabe ein.</p>
        <div className="space-y-4">
             <div className="p-4 bg-muted/50 rounded-lg border">
                <h4 className="font-bold text-sm">Aufgabenstellung</h4>
                <p className="text-sm mt-1">Erstellen Sie einen kurzen Entwurf für einen Pitch (max. 3 Sätze), der unser Kernprodukt einem potenziellen Kunden vorstellt.</p>
             </div>
             <Textarea placeholder="Ihre Antwort hier..." rows={5} className="bg-input"/>
             <Input type="file" className="bg-input"/>
             <Button>Aufgabe einreichen</Button>
        </div>
    </div>
);

const BestaetigungLektionView = ({ lesson }: { lesson: any }) => (
    <div>
        <h3 className="font-bold text-lg mb-4">{lesson.title}</h3>
        <div className="p-4 bg-muted/50 rounded-lg border space-y-2">
            <h4 className="font-bold text-sm">Unsere Werte</h4>
            <ul className="list-disc list-inside text-sm">
                <li>Integrität und Transparenz</li>
                <li>Fokus auf den Kundenerfolg</li>
                <li>Mut zur Innovation</li>
            </ul>
        </div>
        <div className="flex items-center space-x-2 mt-6">
            <Checkbox id="terms" />
            <Label htmlFor="terms" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Ich habe die Werte gelesen und verstanden.
            </Label>
        </div>
        <Button className="mt-4">Bestätigen & weiter</Button>
    </div>
);

const EntscheidungLektionView = ({ lesson }: { lesson: any }) => (
    <div>
        <h3 className="font-bold text-lg mb-4">{lesson.title}</h3>
        <div className="p-4 bg-muted/50 rounded-lg border mb-6">
            <h4 className="font-bold text-sm">Szenario</h4>
            <p className="text-sm mt-1">Ein potenzieller Kunde sagt am Telefon: "Ihre Lösung ist zu teuer." Wie reagieren Sie?</p>
        </div>
        <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start text-left h-auto py-2">A) Preis sofort reduzieren.</Button>
            <Button variant="outline" className="w-full justify-start text-left h-auto py-2">B) Nach dem Budget fragen und den Wert der Lösung betonen.</Button>
            <Button variant="outline" className="w-full justify-start text-left h-auto py-2">C) Gespräch beenden.</Button>
        </div>
    </div>
);

const PruefungLektionView = ({ lesson }: { lesson: any }) => (
    <div>
        <h3 className="font-bold text-lg mb-2">{lesson.title}</h3>
        <p className="text-sm text-muted-foreground mb-6">Schließen Sie diese Prüfung ab, um Ihr Wissen zu bestätigen.</p>
        <Card className="bg-muted/50 border-border p-4 mb-6">
            <h4 className="font-bold text-sm mb-3">Prüfungsdetails</h4>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                <p><strong className="text-muted-foreground">Mindestquote:</strong> {lesson.details.passingGrade}%</p>
                <p><strong className="text-muted-foreground">Zeitlimit:</strong> {lesson.details.timeLimit} Minuten</p>
                <p><strong className="text-muted-foreground">Versuche:</strong> {lesson.details.attempts}</p>
                <p><strong className="text-muted-foreground">Status:</strong> Noch nicht begonnen</p>
            </div>
        </Card>
        <Button className="w-full">Prüfung starten</Button>
    </div>
);


const LessonSheet = ({ lesson, onOpenChange }: { lesson: any | null, onOpenChange: (open: boolean) => void }) => {
    
    const renderContent = () => {
        if (!lesson) return null;
        switch(lesson.type) {
            case 'quiz': return <QuizLektionView lesson={lesson} />;
            case 'task': return <AufgabeLektionView lesson={lesson} />;
            case 'confirmation': return <BestaetigungLektionView lesson={lesson} />;
            case 'decision': return <EntscheidungLektionView lesson={lesson} />;
            case 'prüfung': return <PruefungLektionView lesson={lesson} />;
            default:
                return (
                    <div>
                        <h3 className="font-bold text-lg mb-4">{lesson.title}</h3>
                        <p className="text-muted-foreground">Inhalt für Lektionstyp '{lesson.type}' wird hier angezeigt.</p>
                    </div>
                );
        }
    }

    return (
        <Sheet open={!!lesson} onOpenChange={onOpenChange}>
            <SheetContent className="sm:max-w-xl w-full">
                <SheetHeader>
                    <SheetTitle>Lektion</SheetTitle>
                    <SheetDescription>Absolvieren Sie diese Lektion, um im Kurs fortzufahren.</SheetDescription>
                </SheetHeader>
                <div className="py-8">
                   {renderContent()}
                </div>
            </SheetContent>
        </Sheet>
    )
};


const CourseDetailView = ({ course, onBack }: { course: any, onBack: () => void }) => {
    const [selectedLesson, setSelectedLesson] = useState<any | null>(null);

    return (
        <div className="space-y-6">
            <header>
                <Button variant="ghost" onClick={onBack} className="mb-4">
                    <ChevronLeft className="mr-2 h-4 w-4" />
                    Zurück zur Kursübersicht
                </Button>
                <h2 className="text-2xl font-bold text-foreground">{course.title}</h2>
                <p className="text-muted-foreground">{course.description}</p>
            </header>
            <div>
                 <Accordion type="single" collapsible className="w-full space-y-3" defaultValue={course.modules[0]?.id}>
                    {(course.modules || []).map((module: any) => (
                        <AccordionItem value={module.id} key={module.id} className="bg-card/80 border border-border rounded-xl overflow-hidden">
                           <AccordionTrigger className="p-4 hover:no-underline">{module.title}</AccordionTrigger>
                           <AccordionContent className="p-4 pt-0">
                               <div className="space-y-2">
                                  {(module.lessons || []).map((lesson: any) => {
                                      const Icon = lessonIcons[lesson.type] || FileIcon;
                                      return (
                                        <div key={lesson.id} onClick={() => setSelectedLesson(lesson)} className="flex items-center gap-3 p-3 rounded-lg hover:bg-accent cursor-pointer">
                                            <Icon className="w-4 h-4 text-primary" />
                                            <span className="text-sm font-medium">{lesson.title}</span>
                                            {lesson.type === 'prüfung' && lesson.details.isMandatory && (
                                                <Badge variant="outline" className="ml-2 border-amber-500/50 text-amber-400">Pflicht</Badge>
                                            )}
                                            {lesson.duration && <span className="ml-auto text-xs text-muted-foreground">{lesson.duration}</span>}
                                        </div>
                                      );
                                  })}
                               </div>
                               <Button variant="outline" size="sm" className="mt-4 w-full">
                                   <Plus className="mr-2 h-4 w-4" /> Lektion hinzufügen
                               </Button>
                           </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>
             <LessonSheet lesson={selectedLesson} onOpenChange={(open) => !open && setSelectedLesson(null)} />
        </div>
    )
};


export default function QAkademiePage() {
    const [activeModule, setActiveModule] = useState(modules[0].name);
    const [isRecordingDialogOpen, setIsRecordingDialogOpen] = useState(false);
    const [isCreateCourseOpen, setIsCreateCourseOpen] = useState(false);
    const [isCreateLpOpen, setIsCreateLpOpen] = useState(false);
    const [isAddParticipantOpen, setIsAddParticipantOpen] = useState(false);
    const [isCreateCertOpen, setIsCreateCertOpen] = useState(false);
    const [isCreateDeptOpen, setIsCreateDeptOpen] = useState(false);
    const [isCreateRoleOpen, setIsCreateRoleOpen] = useState(false);
    const [activeCourse, setActiveCourse] = useState<any | null>(null);
    
    const [videos, setVideos] = useState(mockAcademyVideos);

    const handleVideoSaved = (newVideo: any) => {
        setVideos(prev => [newVideo, ...prev]);
    };

    const renderModule = () => {
        switch (activeModule) {
            case 'Übersicht': return <OverviewView />;
            case 'Q-Onboarding': return <QOnboardingView />;
            case 'Kurse': 
                if (activeCourse) {
                    return <CourseDetailView course={activeCourse} onBack={() => setActiveCourse(null)} />;
                }
                return <CoursesView onCreate={() => setIsCreateCourseOpen(true)} onCourseSelect={setActiveCourse} />;
            case 'Lernpfade': return <LearningPathsView onCreate={() => setIsCreateLpOpen(true)} />;
            case 'Inhalte': return <InhalteView videos={videos} setVideos={setVideos} onRecordVideo={() => setIsRecordingDialogOpen(true)} onUploadVideo={() => {}} onUploadDoc={() => {}} onCreateWissen={() => {}} />;
            case 'Teilnehmer': return <ParticipantsView onCreate={() => setIsAddParticipantOpen(true)} />;
            case 'Abteilungen & Rollen': return <GenericView title="Abteilungen & Rollen" />;
            case 'Fortschritt & Reports': return <GenericView title="Fortschritt & Reports" />;
            case 'Zertifikate': return <CertificatesView onCreate={() => setIsCreateCertOpen(true)} />;
            case 'Einstellungen': return <GenericView title="Einstellungen" />;
            default: return <OverviewView />;
        }
    };
    
     const renderHeaderActions = () => {
        // This is handled by the kontext-sensitive buttons now.
        return null;
    };

    const handleModuleClick = (moduleName: string) => {
        setActiveCourse(null); // Reset course view when changing module
        setActiveModule(moduleName);
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
                            onClick={() => handleModuleClick(mod.name)}
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
                </header>

                <div className="animate-in fade-in duration-300">
                    {renderModule()}
                </div>
            </main>
            <VideoRecorderDialog open={isRecordingDialogOpen} onOpenChange={(open) => {
                if (!open) {
                    // This is the explicit cleanup call that was missing
                    const recorderDialog = document.querySelector('[role="dialog"]');
                    if (recorderDialog) {
                       // A bit of a hacky way to ensure cleanup if state isn't enough
                       const closeButton = recorderDialog.querySelector('button[aria-label="Close"]');
                       // @ts-ignore
                       if(closeButton) closeButton.click();
                    }
                }
                setIsRecordingDialogOpen(open);
            }} onVideoSaved={handleVideoSaved} />
            
            {/* Placeholder Dialogs */}
            <Dialog open={isCreateCourseOpen} onOpenChange={setIsCreateCourseOpen}><DialogContent><DialogHeader><DialogTitle>Kurs erstellen</DialogTitle></DialogHeader><p>Funktionalität wird aufgebaut.</p></DialogContent></Dialog>
            <Dialog open={isCreateLpOpen} onOpenChange={setIsCreateLpOpen}><DialogContent><DialogHeader><DialogTitle>Lernpfad erstellen</DialogTitle></DialogHeader><p>Funktionalität wird aufgebaut.</p></DialogContent></Dialog>
            <Dialog open={isAddParticipantOpen} onOpenChange={setIsAddParticipantOpen}><DialogContent><DialogHeader><DialogTitle>Teilnehmer hinzufügen</DialogTitle></DialogHeader><p>Funktionalität wird aufgebaut.</p></DialogContent></Dialog>
            <Dialog open={isCreateCertOpen} onOpenChange={setIsCreateCertOpen}><DialogContent><DialogHeader><DialogTitle>Zertifikat erstellen</DialogTitle></DialogHeader><p>Funktionalität wird aufgebaut.</p></DialogContent></Dialog>
            <Dialog open={isCreateDeptOpen} onOpenChange={setIsCreateDeptOpen}><DialogContent><DialogHeader><DialogTitle>Abteilung erstellen</DialogTitle></DialogHeader><p>Funktionalität wird aufgebaut.</p></DialogContent></Dialog>
            <Dialog open={isCreateRoleOpen} onOpenChange={setIsCreateRoleOpen}><DialogContent><DialogHeader><DialogTitle>Rolle erstellen</DialogTitle></DialogHeader><p>Funktionalität wird aufgebaut.</p></DialogContent></Dialog>

        </div>
    );
}

