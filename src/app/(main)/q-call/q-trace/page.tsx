'use client';

import { useState, useEffect } from 'react';
import { qtrace_settings as mockQTraceSettings, qtrace_calls } from '@/lib/data';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bot, ArrowLeft, Loader2 } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

const SetupScreen = ({ onActivate }: { onActivate: () => void }) => (
    <Card className="mt-8 text-center p-12 max-w-2xl mx-auto">
        <Bot className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold">Q-Trace ist nicht aktiviert</h2>
        <p className="text-muted-foreground mt-2 max-w-md mx-auto">
            Q-Trace analysiert Telefonate und erstellt Aufgaben-Entwürfe. Audio wird nur kurzzeitig gespeichert.
        </p>
        <Button onClick={onActivate} className="mt-6">
            Q-Trace jetzt aktivieren
        </Button>
    </Card>
);

const QTraceOverview = () => {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Q-Trace Übersicht</CardTitle>
                <div className="text-xs">
                    <span className="text-muted-foreground">Status:</span>
                    <span className="font-bold text-emerald-400"> Aktiv</span>
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Datum</TableHead>
                            <TableHead>Richtung</TableHead>
                            <TableHead>Teilnehmer</TableHead>
                            <TableHead>Transkript</TableHead>
                            <TableHead>Aufgaben</TableHead>
                            <TableHead>Aktion</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {qtrace_calls.map((call) => (
                            <TableRow key={call.qtraceCallId}>
                                <TableCell className="font-mono text-xs">
                                    {format(new Date(call.startedAt), "dd.MM.yy HH:mm")}
                                    <p className="text-muted-foreground">{formatDistanceToNow(new Date(call.startedAt), { addSuffix: true, locale: de })}</p>
                                </TableCell>
                                <TableCell className="capitalize">{call.direction}</TableCell>
                                <TableCell>{call.participants.map(p => p.role).join(', ')}</TableCell>
                                <TableCell><Badge variant={call.transcript.status === 'ready' ? 'default' : 'secondary'}>{call.transcript.status}</Badge></TableCell>
                                <TableCell><Badge variant={call.qtrace.status === 'draft_ready' ? 'destructive' : 'secondary'}>{call.qtrace.draftCount} Entwürfe</Badge></TableCell>
                                <TableCell>
                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={`/q-call/q-trace/${call.qtraceCallId}`}>Details</Link>
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
};

export default function QTracePage() {
    const [settings, setSettings] = useState<typeof mockQTraceSettings | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // In a real app, this would be a fetch call to Firestore or a server endpoint
        // that internally might call qtraceInitSettings if needed.
        setTimeout(() => {
            setSettings(mockQTraceSettings);
            setLoading(false);
        }, 500);
    }, []);

    const handleActivate = () => {
        // This simulates calling the `qtraceSetEnabled` callable function.
        setLoading(true);
        setTimeout(() => {
            const newSettings = { ...settings!, enabled: true };
            // In a real app, this would be the result of the callable function
            setSettings(newSettings);
            // Also update the mock data source so subsequent reloads reflect the change
            mockQTraceSettings.enabled = true;
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="space-y-6">
            <header>
                <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                    <Link href="/qcall"><ArrowLeft className="w-4 h-4 mr-1" /> Zur Q-Call Übersicht</Link>
                </Button>
                <h1 className="text-2xl font-bold text-foreground tracking-tight">Q-Trace</h1>
                <p className="text-muted-foreground">Anrufe transkribieren & Aufgaben extrahieren.</p>
            </header>
            
            {loading && (
                <div className="flex justify-center items-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </div>
            )}

            {!loading && settings && !settings.enabled && (
                <SetupScreen onActivate={handleActivate} />
            )}

            {!loading && settings && settings.enabled && (
                <QTraceOverview />
            )}
        </div>
    );
}
