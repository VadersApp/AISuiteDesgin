'use client';

import { bots } from '@/lib/data';
import { notFound, useParams } from 'next/navigation';
import { ChevronLeft, Bot as BotIcon, Star, MessageSquare, Clock, Target, TrendingUp, Zap, FileText, CheckCircle, ShieldCheck, Activity, AlertCircle, Shield, AlertTriangle, Calendar, PieChart, Plus, Settings } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const iconMap: {[key: string]: React.ElementType} = {
    star: Star,
    'message-square': MessageSquare,
    clock: Clock,
    target: Target,
    'trending-up': TrendingUp,
    zap: Zap,
    'file-text': FileText,
    'check-circle': CheckCircle,
    'shield-check': ShieldCheck,
    activity: Activity,
    'alert-circle': AlertCircle,
    shield: Shield,
    'alert-triangle': AlertTriangle,
    'pie-chart': PieChart,
    plus: Plus
}

const agentSetcards: { [key: string]: any } = {
    ava: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "Zentrale KI-Assistenz für Inbound-Kommunikation und operativen Kundenservice.",
        faehigkeiten: {
            "Kommunikation & Service": [
                "Annahme eingehender Telefonanrufe",
                "Beantwortung von Kundenanfragen",
                "Reklamations- & Eskalationsmanagement",
            ],
            "Organisation & Support": [
                "Erfassung & Kategorisierung von Anliegen",
                "Statusabfragen (Tickets, Termine, Vorgänge)",
                "Termin- & Kalenderkoordination",
                "Ticket- & Vorgangserfassung",
                "Meeting-Vorbereitung & Protokolle",
            ],
            "Dokumente & Kontext": [
                "E-Mail-Management inkl. Antwortentwürfen",
                "Dokumenten- & Textassistenz",
                "Kontextverständnis über Q-Core & Q-Space",
                "Automatische Eskalation bei kritischen Fällen",
            ],
        },
        abgrenzung: ["Kein Outbound", "Kein Vertrieb"],
        mehrwert: "Professioneller Kundenservice bei maximaler Entlastung interner Ressourcen.",
    },
    leo: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "KI-Vertriebsmitarbeiter für aktive Lead-Ansprache und Umsatzgenerierung.",
        faehigkeiten: {
            "Outbound-Vertrieb": [
                "Outbound-Telefonie",
                "Aktive Lead-Ansprache (Telefon, E-Mail, Chat)",
                "Lead-Qualifizierung & Bedarfsanalyse",
                "Einwandbehandlung",
                "Angebots-Follow-ups",
            ],
            "Sales-Steuerung": [
                "Terminvereinbarung für Closer",
                "Pipeline-Pflege & Deal-Tracking",
                "CRM-Steuerung (Q-Hub)",
                "Abschluss- & Conversion-Tracking",
            ],
        },
        abgrenzung: ["Kein Inbound-Kundenservice", "Keine Support-Ticketbearbeitung"],
        mehrwert: "Planbarer, skalierbarer Vertrieb mit messbarer Conversion-Steigerung.",
    },
    mila: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "KI-Personalmanagerin für Recruiting und HR-Strukturen.",
        faehigkeiten: {
            "Recruiting": [
                "Bewerber-Screening & Vorauswahl",
                "Interview- & Terminorganisation",
                "Erstellung von Stellenanzeigen",
            ],
            "HR & People": [
                "Onboarding-Begleitung",
                "Mitarbeiterkommunikation",
                "HR-Dokumentenvorbereitung",
                "Rollen- & Aufgabenstrukturierung",
            ],
            "Analyse": [
                "KPI-Tracking (Fluktuation, Time-to-Hire)",
                "Feedback- & Stimmungsanalyse",
            ],
        },
        mehrwert: "Schnellere Einstellungen und klar strukturierte HR-Prozesse.",
    },
    nova: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "KI-Social-Media-Managerin für operative Social-Media-Präsenz.",
        faehigkeiten: {
            "Content & Publishing": [
                "Redaktions- & Contentplanung",
                "Post-, Story- & Reel-Konzepte",
                "Texterstellung für Social Media",
                "Automatisiertes Posting",
            ],
            "Community & Analyse": [
                "Community-Management (Kommentare & DMs)",
                "Marken- & Tonalitätswahrung",
                "Reichweiten- & Engagement-Analyse",
                "Kampagnenunterstützung",
            ],
        },
        abgrenzung: ["Keine Markenpositionierung", "Keine übergeordnete Marketingstrategie"],
        mehrwert: "Konsistente Social-Media-Präsenz und kontinuierliche Sichtbarkeit.",
    },
    sophie: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "KI-Marketingstrategin für Marke, Positionierung und Wachstum.",
        faehigkeiten: {
            "Strategie & Marke": [
                "Markenpositionierung & Messaging",
                "Zielgruppen- & Marktanalysen",
                "Definition von Markenwerten & Tonalität",
            ],
            "Marketing & Wachstum": [
                "Kampagnen- & Funnel-Konzeption",
                "Werbetexte (Ads, Landingpages)",
                "Conversion-Optimierung",
            ],
            "Steuerung": [
                "Marketing-Roadmaps",
                "KPI-Monitoring (Leads, CAC, ROAS)",
                "Abstimmung mit Vertrieb & Social Media",
            ],
        },
        abgrenzung: ["Kein operatives Social-Media-Posting", "Kein Community-Management"],
        mehrwert: "Klare Marke, konsistente Kommunikation und strategisches Wachstum.",
    },
    sam: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "KI-Finanzmanager für Transparenz und finanzielle Steuerung.",
        faehigkeiten: {
            "Finanzmanagement": [
                "Rechnungs- & Belegmanagement",
                "Kosten- & Umsatzübersichten",
                "Liquiditäts-Monitoring",
                "Finanz-KPIs & Reports",
                "Budgetplanung & Forecasts",
                "Abweichungs- & Risikoerkennung",
                "Vorbereitung für Buchhaltung & Steuerberater",
                "Margen- & Preisanalysen",
            ],
        },
        mehrwert: "Fundierte Finanzentscheidungen durch vollständige Transparenz.",
    },
    taro: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "KI-IT-Support und Wissensmanager für Systeme und Prozesse.",
        faehigkeiten: {
            "IT Management": [
                "Interner IT-Support (First Level)",
                "Fehleranalyse & Lösungsvorschläge",
                "Wissensdatenbank-Aufbau & Pflege",
                "Tool- & Systemerklärungen",
                "Prozess- & Systemdokumentation",
                "Schulungsunterstützung",
                "Schnittstelle zu externen IT-Dienstleistern",
                "Systemstabilitäts-Überwachung",
            ],
        },
        mehrwert: "Stabile Systeme und schneller interner Support.",
    },
    pax: {
        title: "Fähigkeiten & Zuständigkeiten",
        role: "KI-Projektmanager für Planung, Koordination und Umsetzung.",
        faehigkeiten: {
            "Projektmanagement": [
                "Projekt- & Aufgabenplanung",
                "Ressourcen- & Zeitmanagement",
                "Meilenstein- & Fortschrittstracking",
                "Status- & Management-Reports",
                "Abhängigkeits- & Risikoerkennung",
                "Team- & Aufgabenkoordination",
                "Eskalationsmanagement",
                "Projektdokumentation & Lessons Learned",
            ],
        },
        mehrwert: "Strukturierte Projekte mit hoher Termintreue.",
    },
};

const AgentSetcard = ({ data }: { data: any }) => (
    <Card className="p-6">
        <h3 className="text-lg font-bold text-foreground mb-4">{data.title}</h3>
        <div className="space-y-4 text-sm">
            <div>
                <h4 className="font-bold text-xs uppercase text-muted-foreground tracking-wider">Rolle</h4>
                <p className="text-foreground mt-1">{data.role}</p>
            </div>
            <div>
                <h4 className="font-bold text-xs uppercase text-muted-foreground tracking-wider">Fähigkeiten</h4>
                <div className="space-y-3 mt-2">
                    {Object.entries(data.faehigkeiten).map(([section, skills]: [string, any]) => (
                        <div key={section}>
                            <p className="font-semibold text-foreground/90">{section}:</p>
                            <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-1">
                                {skills.map((skill: string) => <li key={skill}>{skill}</li>)}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            {data.abgrenzung && (
                <div>
                    <h4 className="font-bold text-xs uppercase text-muted-foreground tracking-wider">Abgrenzung</h4>
                    <ul className="list-disc list-inside text-muted-foreground space-y-1 mt-2">
                        {data.abgrenzung.map((item: string) => <li key={item}>{item}</li>)}
                    </ul>
                </div>
            )}
            <div>
                <h4 className="font-bold text-xs uppercase text-muted-foreground tracking-wider">Mehrwert</h4>
                <p className="text-foreground mt-1">{data.mehrwert}</p>
            </div>
        </div>
    </Card>
);

export default function BotSetcardPage() {
    const params = useParams<{ id: string }>();
    const bot = bots.find(b => b.id === params.id);
    const setcardData = agentSetcards[params.id];

    if (!bot) {
        notFound();
    }

    return (
        <div className="space-y-8 pb-10">
            <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className='flex items-center gap-4'>
                    <Link href="/agents" className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0">
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold text-foreground tracking-tight break-words line-clamp-2">{bot.name}</h1>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">Online</span>
                        </div>
                        <p className="text-muted-foreground font-medium mt-1 break-words">{bot.role}</p>
                    </div>
                </div>
                <Link href={`/agents/${bot.id}/settings`}>
                    <Button>
                        <Settings className="mr-2 h-4 w-4" />
                        Konfiguration
                    </Button>
                </Link>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="space-y-6">
                    <Card className="p-10 flex flex-col items-center text-center relative overflow-hidden">
                        <div className="w-24 h-24 rounded-3xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-6 shadow-inner border border-emerald-500/20 ring-4 ring-emerald-500/5">
                            <BotIcon className="w-12 h-12" />
                        </div>
                        <h2 className="text-xl font-bold text-foreground">Agent Profile</h2>
                        <div className="w-full grid grid-cols-3 gap-2 mt-8 px-2">
                            {bot.kpis.map(kpi => {
                                const Icon = iconMap[kpi.icon];
                                return (
                                    <div key={kpi.label} className="bg-muted/50 p-3 rounded-xl border border-border flex flex-col items-center gap-1">
                                        {Icon && <Icon className="w-3.5 h-3.5 text-emerald-400 mb-1" />}
                                        <span className="text-sm font-bold text-foreground">{kpi.value}</span>
                                        <span className="text-[8px] text-muted-foreground font-bold uppercase tracking-wide text-center">{kpi.label}</span>
                                    </div>
                                )
                            })}
                        </div>
                    </Card>

                    {setcardData && <AgentSetcard data={setcardData} />}
                    
                    <Card className="bg-amber-500/[0.02] border border-amber-500/10 p-6">
                        <h3 className="text-xs font-bold text-amber-500 uppercase mb-4 flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5" /> Compliance</h3>
                        <p className="text-[11px] text-muted-foreground leading-relaxed italic">{bot.complianceNote}</p>
                    </Card>
                </div>
                <div className="lg:col-span-2 space-y-6">
                    <Card className="bg-blue-500/[0.02] border border-blue-500/10 p-6">
                        <h3 className="text-xs font-bold text-blue-400 uppercase mb-4 flex items-center gap-2"><Activity className="w-3.5 h-3.5" /> Aktuelle Tätigkeit</h3>
                        <p className="text-sm text-foreground leading-relaxed">{bot.currentActivity}</p>
                    </Card>
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2"><FileText className="w-5 h-5 text-emerald-400" /> Fokus-Berichte</h2>
                        <div className="space-y-4">
                            {bot.focusReports.map(report => (
                                <div key={report.title} className="p-5 rounded-2xl bg-secondary/50 border border-border hover:bg-accent/80 transition-colors cursor-pointer">
                                   <div className="flex justify-between items-center mb-2">
                                      <span className="text-[10px] font-bold text-muted-foreground uppercase font-mono flex items-center gap-1"><Calendar className="w-3 h-3 inline mr-1" />{report.date}</span>
                                      <span className="px-2 py-0.5 rounded-full text-[9px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase font-black">{report.type}</span>
                                   </div>
                                   <h4 className="text-sm font-bold text-foreground mb-2">{report.title}</h4>
                                   <p className="text-xs text-muted-foreground leading-relaxed">{report.content}</p>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
