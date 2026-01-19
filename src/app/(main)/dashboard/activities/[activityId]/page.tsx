'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import { liveActivities } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Bot, Activity, Shield, FileText, ExternalLink, PlusSquare, MessageSquare } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function ActivityDetailPage() {
    const params = useParams();
    const router = useRouter();
    const activityId = params.activityId as string;

    const activity = liveActivities.find(act => act.id === activityId);

    if (!activity) {
        notFound();
    }
    
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
                             <Button variant="outline" className="justify-start" disabled>
                                <ExternalLink className="mr-2 h-4 w-4"/>
                                Im Ursprung öffnen
                            </Button>
                             <Button variant="outline" className="justify-start" disabled>
                                <PlusSquare className="mr-2 h-4 w-4"/>
                                Als Aufgabe anlegen
                            </Button>
                             <Button variant="outline" className="justify-start" disabled>
                                <MessageSquare className="mr-2 h-4 w-4"/>
                                Notiz hinzufügen
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
