'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { kpiMitarbeiter } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  ChevronRight,
  User,
  Building,
  TrendingUp,
  TrendingDown,
  ArrowRight,
  Info,
  CalendarClock,
  Briefcase,
  AlertCircle,
  FileCheck,
  FileX,
  Link as LinkIcon,
  CircleOff,
  UserCheck as UserCheckIcon,
  Users as UsersIcon,
  Flame,
  HeartPulse,
  Send,
  Bot as BotIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';

const TaskChat = () => (
  <Card>
    <CardContent className="p-0">
      <div className="h-[400px] overflow-y-auto p-4 space-y-4">
        <div className="text-center text-xs text-muted-foreground py-1">
          Aufgabe &quot;Deployment-Verzug (+3 Tage)&quot;
        </div>
        <div className="flex items-start gap-3 justify-end">
          <div className="p-3 rounded-lg bg-primary text-primary-foreground max-w-xs">
            <p className="text-xs font-bold mb-1">Dr. Müller</p>
            <p className="text-sm">
              Ben, was ist der Grund für den Blocker beim Deployment?
            </p>
          </div>
          <Avatar>
            <AvatarFallback>DM</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>BW</AvatarFallback>
          </Avatar>
          <div className="p-3 rounded-lg bg-muted max-w-xs">
            <p className="text-xs font-bold mb-1 text-foreground">Ben Weber</p>
            <p className="text-sm text-muted-foreground">
              Ein unvorhergesehenes Problem mit der Testumgebung. Ich arbeite
              daran.
            </p>
          </div>
        </div>
      </div>
      <div className="p-3 border-t border-border">
        <div className="relative">
          <Textarea
            placeholder="Nachricht..."
            className="bg-input pr-12"
            rows={1}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

const ProjectChat = () => (
  <Card>
    <CardContent className="p-0">
      <div className="h-[200px] overflow-y-auto p-4 space-y-4">
        <div className="text-center text-xs text-muted-foreground py-1">
          Projekt &quot;Core-Backend Refactoring&quot;
        </div>
        <div className="flex items-start gap-3">
          <Avatar>
            <AvatarFallback>BW</AvatarFallback>
          </Avatar>
          <div className="p-3 rounded-lg bg-muted max-w-xs">
            <p className="text-xs font-bold mb-1 text-foreground">Ben Weber</p>
            <p className="text-sm text-muted-foreground">
              Meilenstein 2 ist abgeschlossen.
            </p>
          </div>
        </div>
      </div>
      <div className="p-3 border-t border-border">
        <div className="relative">
          <Textarea
            placeholder="Nachricht zum Projekt..."
            className="bg-input pr-12"
            rows={1}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute right-2 top-1/2 -translate-y-1/2"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default function MitarbeiterDetailPage() {
  const params = useParams();
  const userId = params.userId as string;
  const employee = kpiMitarbeiter.find((m) => m.id === userId);
  const router = useRouter();

  if (!employee) {
    notFound();
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Stabil':
        return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10';
      case 'Beobachtung':
        return 'text-amber-400 border-amber-500/20 bg-amber-500/10';
      case 'Warnung':
        return 'text-orange-400 border-orange-500/20 bg-orange-500/10';
      case 'Eskalation':
        return 'text-rose-400 border-rose-500/20 bg-rose-500/10';
      default:
        return 'text-slate-400 border-slate-500/20';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-5 h-5 text-emerald-400" />;
      case 'down':
        return <TrendingDown className="w-5 h-5 text-rose-400" />;
      case 'stable':
        return <ArrowRight className="w-5 h-5 text-slate-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Link href="/q-space" className="hover:text-foreground">
            Q-Space
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">Mitarbeiter</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-foreground font-medium">{employee.name}</span>
        </div>
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-foreground">
            Mitarbeiter-Profil: {employee.name}
          </h1>
          <Button variant="outline" onClick={() => router.back()}>
            ← Zurück zur Übersicht
          </Button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground" />{' '}
                Basisinformationen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <p className="text-lg font-bold text-foreground">
                {employee.name}
              </p>
              <div className="text-muted-foreground space-y-2">
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" /> {employee.role}
                </div>
                <div className="flex items-center gap-2">
                  <UsersIcon className="w-4 h-4" /> {employee.team}
                </div>
                <div className="flex items-center gap-2">
                  <Building className="w-4 h-4" /> {employee.abteilung}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <HeartPulse className="w-4 h-4 text-muted-foreground" />{' '}
                KPI-Status
              </CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <p className="text-5xl font-bold text-foreground">
                  {employee.zWert}%
                </p>
                <div>
                  <Badge
                    className={cn('text-md', getStatusColor(employee.status))}
                    variant="outline"
                  >
                    {employee.status}
                  </Badge>
                  <div className="flex items-center gap-2 mt-2">
                    {getTrendIcon(employee.trend as any)}
                    <span className="text-sm text-muted-foreground">Trend</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 mb-2">
                <FileCheck className="w-4 h-4 text-muted-foreground" />
                Offene Aufgaben
              </CardTitle>
              <p className="text-3xl font-bold">
                {employee.activeTasks -
                  (employee.overdueTasks + employee.blockedTasks)}
              </p>
            </Card>
            <Card className="p-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-muted-foreground" />
                Überfällig
              </CardTitle>
              <p className="text-3xl font-bold text-amber-400">
                {employee.overdueTasks}
              </p>
            </Card>
            <Card className="p-4">
              <CardTitle className="text-sm font-bold flex items-center gap-2 mb-2">
                <CircleOff className="w-4 h-4 text-muted-foreground" />
                Blockiert
              </CardTitle>
              <p className="text-3xl font-bold text-rose-400">
                {employee.blockedTasks}
              </p>
            </Card>
          </div>
          <Card>
            <Tabs defaultValue="details">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />{' '}
                      Aktive Projekte
                    </CardTitle>
                  </div>
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="kommunikation">Kommunikation</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <TabsContent value="details">
                <CardContent>
                  {employee.activeProjects > 0 ? (
                    <p>
                      {employee.name} ist Owner von {employee.activeProjects}{' '}
                      aktiven Projekten.
                    </p>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Keine aktiven Projekte als Owner.
                    </p>
                  )}
                </CardContent>
              </TabsContent>
              <TabsContent value="kommunikation">
                <CardContent>
                  <ProjectChat />
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
          <Card>
            <Tabs defaultValue="details">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-base flex items-center gap-2">
                      <FileX className="w-4 h-4 text-muted-foreground" />{' '}
                      KPI-Abzüge
                    </CardTitle>
                  </div>
                  <TabsList>
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="kommunikation">Kommunikation</TabsTrigger>
                  </TabsList>
                </div>
              </CardHeader>
              <TabsContent value="details">
                <CardContent>
                  {employee.kpiBreakdown.length > 0 ? (
                    <ul className="space-y-2 list-disc pl-5 text-sm text-muted-foreground">
                      {employee.kpiBreakdown.map((item, index) => (
                        <li key={index}>
                          <span className="font-bold text-foreground">
                            -{item.deduction} Punkte:
                          </span>{' '}
                          {item.reason}
                          <Link
                            href="#"
                            className="inline-block ml-2 text-primary hover:underline text-xs"
                          >
                            <LinkIcon className="inline w-3 h-3 mr-1" />
                            Details
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground italic">
                      Keine Abzüge im aktuellen Zeitraum.
                    </p>
                  )}
                </CardContent>
              </TabsContent>
              <TabsContent value="kommunikation">
                <CardContent>
                  <TaskChat />
                </CardContent>
              </TabsContent>
            </Tabs>
          </Card>
          {employee.eskalation === 'Ja' && (
            <Card className="border-rose-500/50 bg-rose-500/5">
              <CardHeader>
                <CardTitle className="text-rose-400 flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Eskalationsstatus
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <strong className="text-muted-foreground">Status:</strong>{' '}
                  <Badge variant="destructive">Offen</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <strong className="text-muted-foreground">Gespräch:</strong>{' '}
                  <Badge variant="secondary">Nicht geplant</Badge>
                </div>
                <Separator className="my-4 bg-rose-500/20" />
                <p className="text-sm text-rose-300">
                  Analyse durch KI vorbereitet. Gespräch kann jetzt geplant
                  werden.
                </p>
                <Button className="w-full">
                  <CalendarClock className="mr-2 h-4 w-4" /> Gespräch
                  automatisch planen
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
