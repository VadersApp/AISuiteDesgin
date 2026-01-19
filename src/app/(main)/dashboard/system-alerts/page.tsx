'use client';
import { Card } from '@/components/ui/card';
import Link from 'next/link';
import { AlertTriangle, Info, ShieldAlert, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const alerts = [
    { id: 'esc-2910', title: 'Vertragskündigung erkannt', type: 'Eskalation', severity: 'critical', status: 'In Prüfung', time: 'Vor 2 Stunden' },
    { id: 'warn-api-limit', title: 'API Limit bei 90%', type: 'Systemwarnung', severity: 'warning', status: 'Offen', time: 'Gerade eben' },
    { id: 'info-backup', title: 'Datenbank-Backup erfolgreich', type: 'System-Info', severity: 'info', status: 'Gelöst', time: 'Vor 8 Stunden' }
];

const severityMap: { [key: string]: { color: string, icon: React.ElementType } } = {
    info: { color: 'blue', icon: Info },
    warning: { color: 'amber', icon: AlertTriangle },
    critical: { color: 'rose', icon: ShieldAlert },
};

export default function SystemAlertsPage() {
    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-bold text-foreground tracking-tight">Systemmeldungen</h1>
                <p className="text-muted-foreground">Übersicht aller Systemwarnungen und Eskalationen.</p>
            </header>

            <Card className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full sm:w-80">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                            placeholder="Meldungen durchsuchen..."
                            className="pl-9 bg-input"
                        />
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto">
                         <Select defaultValue="all">
                            <SelectTrigger className="w-full sm:w-[180px] bg-input">
                                <SelectValue placeholder="Typ filtern..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Alle Typen</SelectItem>
                                <SelectItem value="escalation">Eskalation</SelectItem>
                                <SelectItem value="system_warning">Systemwarnung</SelectItem>
                                <SelectItem value="system_info">System-Info</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select defaultValue="all">
                            <SelectTrigger className="w-full sm:w-[180px] bg-input">
                                <SelectValue placeholder="Status filtern..." />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Alle Status</SelectItem>
                                <SelectItem value="open">Offen</SelectItem>
                                <SelectItem value="in_progress">In Prüfung</SelectItem>
                                <SelectItem value="resolved">Gelöst</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-3">
                    {alerts.map(item => {
                        const severity = severityMap[item.severity] || severityMap.info;
                        const SeverityIcon = severity.icon;

                        return (
                            <Link href={`/dashboard/system-alerts/${item.id}`} key={item.id}>
                                <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border hover:bg-accent/80 hover:border-primary/50 transition-colors cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center border", `bg-${severity.color}-500/10 text-${severity.color}-400 border-${severity.color}-500/20`)}>
                                            <SeverityIcon className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">{item.title}</p>
                                            <p className="text-xs text-muted-foreground">
                                              <Badge variant="outline" className="mr-2 capitalize">{item.type.replace(/_/g, ' ')}</Badge> 
                                              {item.status}
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground font-mono hidden sm:block">{item.time}</span>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </Card>
        </div>
    );
}
