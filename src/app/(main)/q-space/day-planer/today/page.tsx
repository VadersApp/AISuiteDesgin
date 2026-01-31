'use client';
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { mockQuickTasks, mockWorkspaceTasks } from '@/lib/data';
import { BrainCircuit, Plus, ArrowLeft } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';

const TaskPool = () => {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="flex-row items-center justify-between">
                <h2 className="text-lg font-bold">Aufgaben-Pool</h2>
                <div className="flex items-center gap-2">
                    <Button size="sm"><BrainCircuit className="w-4 h-4 mr-2"/> KI-Plan erstellen</Button>
                    <Button size="sm" variant="outline"><Plus className="w-4 h-4 mr-2"/> Aufgabe</Button>
                </div>
            </CardHeader>
            <Separator />
            <ScrollArea className="flex-1">
                <CardContent className="p-4 space-y-4">
                    <div>
                        <h3 className="text-sm font-bold text-muted-foreground mb-2">Aus dem Workspace</h3>
                        <div className="space-y-2">
                            {mockWorkspaceTasks.map(task => (
                                <div key={task.id} className="p-3 bg-muted/50 rounded-lg flex items-center gap-3">
                                    <Checkbox id={`ws-task-${task.id}`} />
                                    <div>
                                        <Label htmlFor={`ws-task-${task.id}`} className="font-medium text-sm">{task.title}</Label>
                                        <p className="text-xs text-muted-foreground">{task.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                     <div>
                        <h3 className="text-sm font-bold text-muted-foreground mb-2">Eigene Aufgaben</h3>
                        <div className="space-y-2">
                            {mockQuickTasks.map(task => (
                                <div key={task.id} className="p-3 bg-muted/50 rounded-lg flex items-center gap-3">
                                    <Checkbox id={`qt-task-${task.id}`} />
                                     <div>
                                        <Label htmlFor={`qt-task-${task.id}`} className="font-medium text-sm">{task.title}</Label>
                                        <p className="text-xs text-muted-foreground">{task.note}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </ScrollArea>
        </Card>
    )
}

const Timeline = () => {
    const hours = Array.from({length: 11}, (_, i) => i + 8); // 8am to 6pm

    // Mock data for scheduled blocks
    const scheduledBlocks = [
        { start: 9, end: 9.75, title: "Daily Standup", type: "meeting" },
        { start: 10, end: 11.5, title: "Review Q1 presentation slides", type: "task" },
        { start: 14, end: 16, title: "Prepare for board meeting", type: "task" },
    ];

    return (
        <Card className="h-full">
             <CardHeader className="flex-row items-center justify-between">
                <h2 className="text-lg font-bold">Tagesplan</h2>
                <div className="flex items-center gap-2">
                     <p className="text-sm font-bold text-emerald-400">On Track</p>
                    <Button size="sm" variant="outline">Re-Plan</Button>
                </div>
            </CardHeader>
             <Separator />
            <ScrollArea className="h-[calc(100%-4rem)]">
                <div className="p-4 relative">
                    {hours.map(hour => (
                        <div key={hour} className="flex items-start h-24 border-b border-dashed">
                            <span className="text-xs text-muted-foreground -translate-y-1/2 pr-2">{`${hour.toString().padStart(2, '0')}:00`}</span>
                        </div>
                    ))}
                    {scheduledBlocks.map(block => {
                        const top = (block.start - 8) * 6 + 'rem'; // 6rem per hour (h-24)
                        const height = (block.end - block.start) * 6 + 'rem';
                        return (
                            <div 
                                key={block.title} 
                                className="absolute left-12 right-4 p-2 rounded-lg text-white" 
                                style={{ top, height, backgroundColor: block.type === 'meeting' ? '#3b82f6' : '#10b981' }}
                            >
                                <p className="text-xs font-bold">{block.title}</p>
                            </div>
                        )
                    })}
                </div>
            </ScrollArea>
        </Card>
    )
}


export default function DayPlanerTodayPage() {
    return (
        <div className="h-full">
            <header className="mb-6">
                <Button variant="ghost" asChild className="mb-2 h-auto p-0 text-sm text-muted-foreground hover:text-foreground">
                    <Link href="/q-space"><ArrowLeft className="w-4 h-4 mr-1" /> Zur Übersicht</Link>
                </Button>
                <h1 className="text-2xl font-bold">Day Planer</h1>
                <p className="text-muted-foreground">Dein KI-gestützter Tagesplan</p>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-15rem)]">
                <TaskPool />
                <Timeline />
            </div>
        </div>
    );
}
