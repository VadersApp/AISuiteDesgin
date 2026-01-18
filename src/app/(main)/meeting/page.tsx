'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { bots } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Bot, Users, Search, CheckCircle, PlusCircle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

type Bot = (typeof bots)[0];

const meetingModes = [
    'Brainstorming',
    'Problemlösung',
    'Strategie & Planung',
    'Review / Feedback',
    'Entscheidungsvorlage'
];

export default function AiMeetingSetupPage() {
  const router = useRouter();
  const [selectedAgents, setSelectedAgents] = useState<Bot[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleAgent = (agent: Bot) => {
    setSelectedAgents((prev) =>
      prev.some((a) => a.id === agent.id)
        ? prev.filter((a) => a.id !== agent.id)
        : [...prev, agent]
    );
  };

  const filteredBots = bots.filter(
    (bot) =>
      bot.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bot.role.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleStartMeeting = () => {
    // In a real app, you'd create a session and get a real ID
    const sessionId = 'meeting-' + Date.now();
    router.push(`/meeting/session/${sessionId}`);
  };

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          AI Meeting
        </h1>
        <p className="text-muted-foreground">
          Wähle die KI-Mitarbeiter aus, die am Meeting teilnehmen sollen.
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left: Agent Selection */}
        <div className="lg:col-span-2 space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                    placeholder="Suche nach Name oder Rolle..."
                    className="pl-9 bg-input"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filteredBots.map(bot => {
                    const isSelected = selectedAgents.some(a => a.id === bot.id);
                    return (
                         <Card key={bot.id} className={cn("p-4 flex flex-col items-start gap-3 cursor-pointer transition-all border-2", isSelected ? 'border-primary bg-primary/5' : 'hover:border-border')}>
                            <div className="flex justify-between items-center w-full">
                                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center border border-border">
                                    <Bot className="w-5 h-5 text-muted-foreground" />
                                </div>
                                <Button size="icon" variant={isSelected ? 'default' : 'outline'} className="w-7 h-7" onClick={() => toggleAgent(bot)}>
                                    {isSelected ? <CheckCircle className="w-4 h-4" /> : <PlusCircle className="w-4 h-4" />}
                                </Button>
                            </div>
                            <div>
                                <h3 className="font-bold text-sm text-foreground">{bot.name}</h3>
                                <p className="text-xs text-muted-foreground">{bot.role}</p>
                            </div>
                        </Card>
                    )
                })}
            </div>
        </div>

        {/* Right: Setup */}
        <div className="lg:col-span-1 space-y-6 sticky top-24">
            <Card className="p-6">
                 <h2 className="text-lg font-bold text-foreground mb-4">Teilnehmer</h2>
                 <div className="space-y-2 mb-6 min-h-[50px]">
                    {selectedAgents.length > 0 ? selectedAgents.map(agent => (
                        <div key={agent.id} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                            <div>
                                <p className="text-sm font-bold text-foreground">{agent.name}</p>
                                <p className="text-[10px] text-muted-foreground uppercase">{agent.role}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="w-6 h-6" onClick={() => toggleAgent(agent)}>
                                <X className="w-3.5 h-3.5" />
                            </Button>
                        </div>
                    )) : <p className="text-xs text-muted-foreground italic text-center py-4">Noch keine Teilnehmer ausgewählt.</p>}
                 </div>

                <h2 className="text-lg font-bold text-foreground mb-4 border-t border-border pt-6">Meeting-Setup</h2>
                <div className="space-y-4">
                     <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">Titel</label>
                        <Input defaultValue="AI Meeting" className="bg-input mt-1" />
                    </div>
                     <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">Agenda / Ziel</label>
                        <Textarea placeholder="Was soll im Meeting geklärt werden?" className="bg-input mt-1" rows={4} />
                    </div>
                    <div>
                        <label className="text-xs font-bold text-muted-foreground uppercase">Modus</label>
                        <Select defaultValue="Problemlösung">
                            <SelectTrigger className="w-full bg-input mt-1">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                {meetingModes.map(mode => <SelectItem key={mode} value={mode}>{mode}</SelectItem>)}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <Button 
                    className="w-full mt-8" 
                    disabled={selectedAgents.length === 0}
                    onClick={handleStartMeeting}
                >
                    AI Meeting starten ({selectedAgents.length})
                </Button>
            </Card>
        </div>
      </div>
    </div>
  );
}
