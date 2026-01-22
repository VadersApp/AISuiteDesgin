'use client';

import { useState, useMemo, useEffect } from 'react';
import { liveActivities, bots, formatTimeSince } from '@/lib/data';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, SlidersHorizontal, Bot, Activity, Shield } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ActivitiesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedAgent, setSelectedAgent] = useState('all');
    const [selectedType, setSelectedType] = useState('all');
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const activityTypes = useMemo(() => [...new Set(liveActivities.map(a => a.type))], []);

    const severityMap: { [key: string]: { color: string, icon: React.ElementType } } = {
        info: { color: 'blue', icon: Activity },
        warning: { color: 'amber', icon: Shield },
        critical: { color: 'rose', icon: Shield },
    };

    const filteredActivities = useMemo(() => {
        return liveActivities
            .filter(activity => {
                if (selectedAgent !== 'all' && activity.agent.id !== selectedAgent) return false;
                if (selectedType !== 'all' && activity.type !== selectedType) return false;
                if (searchTerm && !(
                    activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    activity.agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    activity.reference.id.toLowerCase().includes(searchTerm.toLowerCase())
                )) return false;
                return true;
            })
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }, [searchTerm, selectedAgent, selectedType]);

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Aktivitäten</h1>
                <p className="text-muted-foreground">Übersicht aller System- und Agentenaktivitäten.</p>
            </header>

            <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Aktivitäten durchsuchen..."
                            className="pl-9 bg-input"
                            value={searchTerm}
                            onChange={e => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <Select value={selectedAgent} onValueChange={setSelectedAgent}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-input">
                                <SelectValue placeholder="Agent filtern..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Alle Agenten</SelectItem>
                                {bots.map(bot => (
                                    <SelectItem key={bot.id} value={bot.id}>{bot.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={selectedType} onValueChange={setSelectedType}>
                            <SelectTrigger className="w-full sm:w-[180px] bg-input">
                                <SelectValue placeholder="Typ filtern..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Alle Typen</SelectItem>
                                {activityTypes.map(type => (
                                    <SelectItem key={type} value={type} className="capitalize">{type.replace(/_/g, ' ')}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex flex-col gap-4">
                    {filteredActivities.length > 0 ? filteredActivities.map(item => {
                        const severity = severityMap[item.severity] || severityMap.info;
                        const SeverityIcon = severity.icon;

                        return (
                            <Link href={`/dashboard/activities/${item.id}`} key={item.id}>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border hover:bg-accent/80 hover:border-primary/50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", `bg-${severity.color}-500/10 text-${severity.color}-400 border-${severity.color}-500/20`)}>
                                            <SeverityIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">{item.agent.name} • <span className="capitalize">{item.type.replace(/_/g, ' ')}</span></p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono hidden sm:block">{isClient ? formatTimeSince(item.createdAt) : ''}</span>
                                </div>
                            </Link>
                        )
                    }) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <p>Keine Aktivitäten für die aktuellen Filter gefunden.</p>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    )
}
