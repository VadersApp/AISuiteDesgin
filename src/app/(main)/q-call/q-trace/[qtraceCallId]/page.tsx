// This file was created in the previous step and remains unchanged.
// For brevity, its content is not repeated here.
// In a real scenario, the full file content would be provided.
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { qtrace_calls, qtrace_drafts } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronLeft,
  User,
  Clock,
  Mic,
  FileText,
  ListTodo,
  ShieldAlert,
  BrainCircuit,
  Check,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Input } from '@/components/ui/input';


const DraftReview = ({ call, drafts }: { call: any, drafts: any[] }) => {
    return (
        <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
                Die KI hat {drafts.length} Aufgaben-Entwürfe aus diesem Gespräch extrahiert. Bitte prüfen und bestätigen Sie diese, um sie in Q-Space anzulegen.
            </p>
            {drafts.map(draft => (
                <Card key={draft.draftId} className="bg-card/50">
                    <CardHeader className="flex-row items-start justify-between">
                        <div>
                             <CardTitle className="text-base">{draft.title}</CardTitle>
                             <CardDescription>{draft.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{draft.status}</Badge>
                    </CardHeader>
                    <CardContent className="space-y-3 text-sm">
                        <div className="grid grid-cols-3 gap-4">
                            <div><Label>Zuständig</Label><Input defaultValue={draft.suggestedOwnerUserId} className="bg-input"/></div>
                            <div><Label>Fällig am</Label><Input type="date" className="bg-input"/></div>
                            <div><Label>Priorität</Label><Input defaultValue={draft.priority} className="bg-input"/></div>
                        </div>
                    </CardContent>
                    <CardFooter className="gap-2">
                        <Button size="sm"><Check className="w-4 h-4 mr-2"/> Bestätigen</Button>
                        <Button size="sm" variant="outline"><X className="w-4 h-4 mr-2"/> Ablehnen</Button>
                         <Button size="sm" variant="ghost" className="ml-auto">Bearbeiten</Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    )
}

export default function QTraceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { qtraceCallId } = params;

  const call = qtrace_calls.find(c => c.qtraceCallId === qtraceCallId);
  const drafts = qtrace_drafts.filter(d => d.qtraceCallId === qtraceCallId);

  if (!call) {
    return notFound();
  }

  const callMeta = [
    { label: 'Richtung', value: call.direction, color: call.direction === 'inbound' ? 'text-emerald-400' : 'text-blue-400' },
    { label: 'Dauer', value: `${call.durationSec}s` },
    { label: 'Provider ID', value: call.providerCallId, isMono: true },
  ];

  return (
    <div className="space-y-6">
      <header>
        <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
            <Link href="/q-call/q-trace"><ArrowLeft className="w-4 h-4 mr-1" /> Zur Q-Trace Übersicht</Link>
        </Button>
        <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-foreground">
                        Analyse für Anruf am {format(new Date(call.startedAt), 'dd.MM.yyyy HH:mm', { locale: de })}
                    </h1>
                     <p className="text-muted-foreground">
                        Teilnehmer: {call.participants.map(p => p.role).join(', ')}
                    </p>
                </div>
            </div>
             <Button variant="outline">Anruf im Provider öffnen</Button>
        </div>
      </header>
       <Tabs defaultValue="aufgaben" className="w-full">
            <TabsList>
                <TabsTrigger value="aufgaben"><ListTodo className="w-4 h-4 mr-2" /> Aufgaben ({drafts.length})</TabsTrigger>
                <TabsTrigger value="uebersicht"><BrainCircuit className="w-4 h-4 mr-2" /> Übersicht</TabsTrigger>
                <TabsTrigger value="transkript"><FileText className="w-4 h-4 mr-2" /> Transkript</TabsTrigger>
                <TabsTrigger value="audit"><ShieldAlert className="w-4 h-4 mr-2" /> Audit Trail</TabsTrigger>
            </TabsList>
            <Card className="mt-4 p-6">
                <TabsContent value="aufgaben">
                   <DraftReview call={call} drafts={drafts} />
                </TabsContent>
                <TabsContent value="uebersicht">
                    Übersicht
                </TabsContent>
                <TabsContent value="transkript">
                    Transkript
                </TabsContent>
                 <TabsContent value="audit">
                    Audit Trail
                </TabsContent>
            </Card>
       </Tabs>
    </div>
  );
}
