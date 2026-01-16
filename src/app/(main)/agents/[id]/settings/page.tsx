'use client';

import { useState } from 'react';
import { bots } from '@/lib/data';
import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, Bot as BotIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AgentSettingsPage({ params }: { params: { id: string } }) {
    const { toast } = useToast();
    const router = useRouter();
    const bot = bots.find(b => b.id === params.id);

    const [isAgentActive, setIsAgentActive] = useState(true);
    const [language, setLanguage] = useState('Deutsch');
    const [responseStyle, setResponseStyle] = useState('Professionell');

    if (!bot) {
        notFound();
    }

    const handleSave = () => {
        toast({
            title: "Einstellungen gespeichert",
            description: `Die Konfiguration für ${bot.name} wurde aktualisiert.`,
        });
        router.push(`/agents/${bot.id}`);
    };
    
    const responseStyles = ['Professionell', 'Freundlich', 'Kurz & knapp', 'Detailliert'];

    return (
        <div className="space-y-8 pb-10 max-w-2xl mx-auto">
            <header className="flex items-center gap-4">
                <Link href={`/agents/${bot.id}`} className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center border border-primary/20">
                        <BotIcon className="w-5 h-5" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-foreground tracking-tight">{bot.name} Einstellungen</h1>
                        <p className="text-muted-foreground text-sm font-medium">{bot.role}</p>
                    </div>
                </div>
            </header>

            <div className="space-y-6">
                <Card>
                    <div className="p-6">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Allgemein</h3>
                        <div className="space-y-6">
                            <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                                <div>
                                    <Label htmlFor="agent-active" className="font-bold text-foreground">Agent aktiviert</Label>
                                    <p className="text-xs text-muted-foreground">Agent ist verfügbar und kann Anfragen bearbeiten.</p>
                                </div>
                                <Switch id="agent-active" checked={isAgentActive} onCheckedChange={setIsAgentActive} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="language" className="font-bold text-foreground">Bevorzugte Sprache</Label>
                                <Select value={language} onValueChange={setLanguage}>
                                    <SelectTrigger id="language" className="w-full bg-background/50">
                                        <SelectValue placeholder="Sprache wählen" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Deutsch">Deutsch</SelectItem>
                                        <SelectItem value="English">English</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                </Card>
                
                <Card>
                    <div className="p-6">
                        <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">Verhalten</h3>
                        <div className="space-y-4">
                            <div>
                                <Label className="font-bold text-foreground">Antwortstil</Label>
                                <p className="text-xs text-muted-foreground mb-3">Definiert die Tonalität und Ausführlichkeit der KI-Antworten.</p>
                                <div className="grid grid-cols-2 gap-3">
                                    {responseStyles.map(style => (
                                        <Button
                                            key={style}
                                            variant={responseStyle === style ? 'default' : 'outline'}
                                            onClick={() => setResponseStyle(style)}
                                            className="justify-center"
                                        >
                                            {style}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </Card>

                <div className="flex justify-end gap-3 pt-4">
                    <Button variant="outline" onClick={() => router.back()}>Abbrechen</Button>
                    <Button onClick={handleSave}>Einstellungen speichern</Button>
                </div>
            </div>
        </div>
    );
}
