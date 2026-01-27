import { formatDistanceToNow } from 'date-fns';
import { de } from 'date-fns/locale';

export const bots = [
    { name: 'Ava Assist', id: 'ava', role: 'Support-Spezialistin', desc: 'Beantwortet Kundenanfragen und managt Tickets basierend auf der FAQ.', tasksCount: 14, timeSaved: '142h', kpis: [{ label: 'Zufriedenh.', value: '98%', icon: 'star' }, { label: 'Tickets', value: '1.2k', icon: 'message-square' }, { label: 'Response', value: '0.8s', icon: 'clock' }], currentActivity: 'Analysiert aktuell 14 offene Tickets in der Warteschlange.', lastAction: { desc: 'Beschwerde #8291 erfolgreich gelöst.', time: 'Vor 12 Minuten' }, complianceNote: 'DSGVO konform. Datenanonymisierung aktiv.', focusReports: [{ date: 'HEUTE', title: 'Sentiment Q1', content: 'Kundenzufriedenheit um 14% gestiegen.', type: 'Performance' }] },
    { name: 'Leo Sales', id: 'leo', role: 'Vertriebs-Lead', desc: 'Qualifiziert Leads und bereitet CRM-Einträge für den Vertrieb vor.', tasksCount: 42, timeSaved: '98h', kpis: [{ label: 'Conv. Rate', value: '32%', icon: 'target' }, { label: 'Pipeline', value: '250k€', icon: 'trending-up' }, { label: 'Leads/Tag', value: '150', icon: 'zap' }], currentActivity: 'Scannt LinkedIn-Profile von Target-Accounts.', lastAction: { desc: 'Meeting-Zusage erhalten.', time: 'Vor 4 Stunden' }, complianceNote: 'Anti-Spam Richtlinien aktiv.', focusReports: [{ date: '05. JAN', title: 'Qualitätsbericht', content: 'Wahrscheinlichkeit erhöht.', type: 'Performance' }] },
    { name: 'Mila HR', id: 'mila', role: 'Recruiting-KI', desc: 'Screent Lebensläufe und koordiniert Bewerbungsgespräche.', tasksCount: 120, timeSaved: '115h', kpis: [{ label: 'Hire-Time', value: '14 T.', icon: 'clock' }, { label: 'Screening', value: '450', icon: 'file-text' }, { label: 'Match Rate', value: '92%', icon: 'star' }], currentActivity: 'Vergleicht 120 CVs.', lastAction: { desc: 'Terminkoordinierung abgeschlossen.', time: 'Vor 2 Stunden' }, complianceNote: 'AGG-konform.', focusReports: [{ date: '02. JAN', title: 'Diversity Report', content: 'Objektivität gesteigert.', type: 'Performance' }] },
    { name: 'Nova Social', id: 'nova', role: 'Social Media Expertin', desc: 'Plant Content und interagiert mit Followern auf LinkedIn.', tasksCount: 25, timeSaved: '64h', kpis: [{ label: 'Engagement', value: '8.5%', icon: 'message-square' }, { label: 'Posts/Mt', value: '120', icon: 'plus' }, { label: 'Sentiment', value: 'Positiv', icon: 'star' }], currentActivity: 'Generiert Beitragsentwürfe.', lastAction: { desc: 'Post veröffentlicht.', time: 'Vor 45 Minuten' }, complianceNote: 'Safety-Modul gewährleistet.', focusReports: [{ date: '01. JAN', title: 'Wachstumsbericht', content: '1.2k neue Follower.', type: 'Performance' }] },
    { name: 'Sophie Market', id: 'sophie', role: 'Ads Managerin', desc: 'Optimiert Werbebudgets und führt A/B Tests durch.', tasksCount: 8, timeSaved: '52h', kpis: [{ label: 'ROAS', value: '4.2x', icon: 'trending-up' }, { label: 'CTR', value: '0.8%', icon: 'target' }, { label: 'Spend', value: '15k€', icon: 'pie-chart' }], currentActivity: 'Gebotsanpassung für Google Ads.', lastAction: { desc: 'Retargeting-Satz erstellt.', time: 'Gestern' }, complianceNote: 'Budgetdeckelungen garantiert.', focusReports: [{ date: '30. DEZ', title: 'Spend Analyse', content: 'Conversion-Kosten um 12% gesenkt.', type: 'Performance' }] },
    { name: 'Sam Finance', id: 'sam', role: 'Buchhaltungs-Bot', desc: 'Prüft Rechnungen und gleicht Zahlungen mit Konten ab.', tasksCount: 850, timeSaved: '180h', kpis: [{ label: 'Genauigkeit', value: '99.9%', icon: 'shield-check' }, { label: 'Belege/Mt', value: '850', icon: 'file-text' }, { label: 'Speed', value: '< 2m', icon: 'zap' }], currentActivity: 'Kontoabgleich der OP-Listen.', lastAction: { desc: 'USt-Voranmeldung vorbereitet.', time: 'Gestern' }, complianceNote: 'Schreibgeschützter Zugriff.', focusReports: [{ date: '31. DEZ', title: 'Monatsabschluss', content: 'Null Fehlerquote.', type: 'Performance' }] },
    { name: 'Taro Tech', id: 'taro', role: 'IT-Administrator', desc: 'Überwacht System-Uptimes und führt Backups durch.', tasksCount: 12, timeSaved: '44h', kpis: [{ label: 'Uptime', value: '100%', icon: 'activity' }, { label: 'Patches', value: '12', icon: 'shield-check' }, { label: 'Alerts', value: '2.4k', icon: 'alert-circle' }], currentActivity: 'Prüft Server-Latenzwerte.', lastAction: { desc: 'Patch v4.2 ausgerollt.', time: 'Vor 10 Stunden' }, complianceNote: 'ISO 27001 konform.', focusReports: [{ date: '03. JAN', title: 'Audit Report', content: 'Integrität verifiziert.', type: 'Performance' }] },
    { name: 'Pax PM', id: 'pax', role: 'Projekt-Manager', desc: 'Verwaltet Timelines und erinnert Teams an Deadlines.', tasksCount: 56, timeSaved: '92h', kpis: [{ label: 'Completion', value: '95%', icon: 'check-circle' }, { label: 'Deadlines', value: '98%', icon: 'clock' }, { label: 'Effizienz', value: '85%', icon: 'zap' }], currentActivity: 'Aktualisiert Meilensteine.', lastAction: { desc: 'Follow-up gesendet.', time: 'Vor 1 Stunde' }, complianceNote: 'Berechtigungs-Level 4.', focusReports: [{ date: '04. JAN', title: 'Status Update', content: 'Projekt im Plan.', type: 'Performance' }] },
    { name: 'Clara Compliance', id: 'clara', role: 'Compliance-Officer', desc: 'Überwacht interne Richtlinien und rechtliche Vorgaben.', tasksCount: 5, timeSaved: '12h', kpis: [{ label: 'Audit', value: '100%', icon: 'shield' }, { label: 'Checks', value: '45', icon: 'file-text' }, { label: 'Risiko', value: 'Low', icon: 'alert-triangle' }], currentActivity: 'Prüft neue Datenschutzrichtlinien.', lastAction: { desc: 'Compliance-Check abgeschlossen.', time: 'Vor 30 Minuten' }, complianceNote: 'Rechtssicher & DSGVO-konform.', focusReports: [{ date: 'HEUTE', title: 'Audit Log', content: 'Alle Systeme konform.', type: 'Security' }] }
];

export const departmentsConfig = [
    { id: 'gf', name: 'Geschäftsführung & Strategie', desc: 'Strategische Ausrichtung und Unternehmensführung.', agents: ['Ava Assist'] },
    { id: 'sales', name: 'Vertrieb & Sales', desc: 'Akquise, Kundenbetreuung und Umsatzsteigerung.', agents: ['Leo Sales'] },
    { id: 'marketing', name: 'Marketing', desc: 'Markenkommunikation, Kampagnen und Social Media.', agents: ['Sophie Market', 'Nova Social'] },
    { id: 'social', name: 'Social Media', desc: 'Content-Planung, Posting, Community & Publishing', agents: ['Nova Social'] },
    { id: 'support', name: 'Kundenservice / Support', desc: 'Kundenanfragen, Tickets und Problemlösung.', agents: ['Ava Assist'] },
    { id: 'backoffice', name: 'Backoffice & Administration', desc: 'Organisatorische Aufgaben und Verwaltung.', agents: ['Ava Assist'] },
    { id: 'finance', name: 'Finanzen & Controlling', desc: 'Buchhaltung, Rechnungsprüfung und Finanzplanung.', agents: ['Sam Finance'] },
    { id: 'hr', name: 'Personalwesen (HR)', desc: 'Recruiting, Onboarding und Mitarbeiterverwaltung.', agents: ['Mila HR'] },
    { id: 'it', name: 'IT / Technik / Prozesse', desc: 'Systemadministration, Sicherheit und Infrastruktur.', agents: ['Taro Tech'] },
    { id: 'pm', name: 'Projektmanagement', desc: 'Projektplanung, Überwachung und Koordination.', agents: ['Pax PM'] },
    { id: 'knowledge', name: 'Wissensdatenbank', desc: 'Informationsmanagement und Dokumentation.', agents: ['Taro Tech', 'Ava Assist'] },
    { id: 'legal', name: 'Recht & Compliance', desc: 'Rechtliche Absicherung und Richtlinieneinhaltung.', agents: ['Clara Compliance'] }, 
    { id: 'qa', name: 'Qualitätssicherung', desc: 'Standards, Tests und Qualitätskontrolle.', agents: ['Ava Assist'] }, 
    { id: 'purchase', name: 'Einkauf & Partner', desc: 'Beschaffung und Partner-Management.', agents: ['Sophie Market'] }
];

export const kbDepartments = [
    { name: 'Geschäftsführung & Strategie', slug: 'geschaeftsfuehrung-strategie' },
    { name: 'Vertrieb & Sales', slug: 'vertrieb-sales' },
    { name: 'Marketing', slug: 'marketing' },
    { name: 'Social Media', slug: 'social-media' },
    { name: 'Kundenservice / Support', slug: 'kundenservice-support' },
    { name: 'Backoffice & Administration', slug: 'backoffice-administration' },
    { name: 'Finanzen & Controlling', slug: 'finanzen-controlling' },
    { name: 'Personalwesen (HR)', slug: 'personalwesen-hr' },
    { name: 'IT / Technik / Prozesse', slug: 'it-technik-prozesse' },
    { name: 'Projektmanagement', slug: 'projektmanagement' },
    { name: 'Recht & Compliance', slug: 'recht-compliance' },
    { name: 'Qualitätssicherung', slug: 'qualitaetssicherung' },
    { name: 'Einkauf & Partner', slug: 'einkauf-partner' }
];

export const kbDocTypes = [
    "Prozesse / SOPs", "Vorlagen", "Richtlinien", "Schulung", 
    "Kundenfälle / Beispiele", "Verträge / Rechtliches", 
    "Marketing Assets", "Sales Scripts", "Sonstiges"
];

export const mockKbFiles: { [key: string]: any[] } = {
    'marketing': [
        { name: 'Brand_Guidelines_2024.pdf', type: 'Richtlinien', date: '10.01.2024', status: 'verarbeitet', size: 5.2 },
        { name: 'Campaign_Q1_Assets.zip', type: 'Marketing Assets', date: '12.01.2024', status: 'in Verarbeitung', size: 22.7 }
    ],
    'vertrieb-sales': [
        { name: 'Sales_Pitch_Deck_v3.pptx', type: 'Sales Scripts', date: '05.01.2024', status: 'verarbeitet', size: 8.9 }
    ]
};

export const toolList = [
    { id: 'blog', title: 'Blog Studio', icon: 'globe', color: 'purple', desc: 'Content-Erstellung & SEO-Artikel.' },
    { id: 'dana', title: 'Dana Documents', icon: 'file-edit', color: 'blue', desc: 'Dokumenten-Automatisierung.' },
    { id: 'presentation', title: 'Präsentations studio', icon: 'presentation', color: 'amber', desc: 'KI-Slides & Pitch-Decks.' },
    { id: 'image', title: 'Bild KI Studio', icon: 'image', color: 'emerald', desc: 'Bildgenerierung & Bearbeitung.' },
    { id: 'video', title: 'Video KI Studio', icon: 'video', color: 'rose', desc: 'Sprechavatare & Video-Schnitt.' },
    { id: 'social', title: 'Social media studio', icon: 'share-2', color: 'purple', desc: 'Posting-Planung.' },
    { id: 'voice', title: 'Voice & Script Studio', icon: 'volume-2', color: 'blue', desc: 'Sprachsynthese.' },
    { id: 'brand', title: 'Designsystem & Brandstudio', icon: 'palette', color: 'amber', desc: 'Brand-Assets.' },
    { id: 'automation', title: 'Automation & OPS Studio', icon: 'workflow', color: 'indigo', desc: 'Workflows.' },
    { id: 'prompt', title: 'AI Dispatch & prompt Studio', icon: 'command', color: 'zinc', desc: 'Prompts.' },
    { id: 'code', title: 'Code & developer Studio', icon: 'code', color: 'blue', desc: 'Entwicklung.' }
];

export const tasks = [
    { id: 'T-1024', title: 'Kundenantwort (#8291) prüfen', from: 'Ava Assist', status: 'Review nötig', color: '#f59e0b' },
    { id: 'T-1025', title: 'Lead-Check "TechSolutions"', from: 'Leo Sales', status: 'In Bearbeitung', color: '#3b82f6' }
];

export const newsItems = [
    { title: 'Update: Leo Sales v4.2', cat: 'System', desc: 'Genauigkeit im B2B-Scoring steigt um 12%.', prio: 'info' },
    { title: 'Feature: Blog Studio', cat: 'Release', desc: 'Ab sofort für alle Pro-User verfügbar.', prio: 'success' }
];

export const dashboardStats = [
    { title: 'KI-Agenten', value: '8', icon: 'bot', color: 'blue' },
    { title: 'Abteilungen', value: '8', icon: 'layers', color: 'purple' },
    { title: 'Auto-Tasks', value: '4.1k', icon: 'zap', color: 'amber' },
    { title: 'Aufgaben', value: '152', icon: 'check-square', color: 'emerald' },
    { title: 'Ersparnis', value: '512h', icon: 'clock', color: 'blue' },
    { title: 'ROI', value: '3.4x', icon: 'trending-up', color: 'emerald' }
];

export const liveActivities = [
    { 
        id: 'act_001',
        agent: { name: 'Ava Assist', id: 'ava', avatar: 'AA' },
        title: 'Ticket #8291 gelöst', 
        description: 'Die Kundenanfrage bezüglich der Rechnung wurde erfolgreich abgeschlossen und der Status auf "geschlossen" gesetzt.',
        type: 'ticket_resolved',
        reference: { type: 'Ticket', id: '#8291', context: { Kunde: 'Max Mustermann', Priorität: 'Mittel' } },
        createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 minutes ago
        severity: 'info'
    },
    { 
        id: 'act_002',
        agent: { name: 'Leo Sales', id: 'leo', avatar: 'LS' },
        title: 'Lead "Innovatech" qualifiziert', 
        description: 'Der Lead wurde als "Hot" eingestuft und ein Termin wurde zur Vereinbarung vorgeschlagen. Nächster Schritt: Anruf.',
        type: 'lead_qualified',
        reference: { type: 'Lead', id: 'lead-001', context: { Phase: 'Qualifiziert', Wert: '25.000€' } },
        createdAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(), // 12 minutes ago
        severity: 'info'
    },
    { 
        id: 'act_003',
        agent: { name: 'Mila HR', id: 'mila', avatar: 'MH' },
        title: 'Eskalation gefiltert', 
        description: 'Eine dringende Bewerbung für die "Senior Developer" Position wurde zur manuellen Prüfung weitergeleitet.',
        type: 'escalation',
        reference: { type: 'Bewerbung', id: 'app-582', context: { Position: 'Senior Developer', Kandidat: 'John Doe' } },
        createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45 minutes ago
        severity: 'warning'
    },
    { 
        id: 'act_004',
        agent: { name: 'Taro Tech', id: 'taro', avatar: 'TT' },
        title: 'System-Backup erfolgreich', 
        description: 'Das tägliche Backup der Hauptdatenbank wurde ohne Fehler abgeschlossen.',
        type: 'system_backup',
        reference: { type: 'System', id: 'DB_MAIN', context: { Größe: '25.4 GB', Dauer: '12 min' } },
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
        severity: 'info'
    }
];

export const formatTimeSince = (dateString: string) => {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true, locale: de });
};

export const reportingStats = [
    { title: 'Umsatz durch AI', value: '€42.5k', icon: 'coins', color: 'emerald' },
    { title: 'Kostenersparnis', value: '€12.8k', icon: 'piggy-bank', color: 'rose' },
    { title: 'Effizienzsteigerung', value: '+240%', icon: 'trending-up', color: 'blue' },
    { title: 'Fehlerreduktion', value: '-85%', icon: 'shield-check', color: 'purple' }
];

export const agentTimeData = [
    { name: 'Ava Assist', hours: 110, color: 'blue' },
    { name: 'Leo Sales', hours: 80, color: 'emerald' },
    { name: 'Nova Social', hours: 40, color: 'purple' },
    { name: 'Sam Finance', hours: 30, color: 'amber' }
];

export const tasksMockByDepartment: { [key: string]: any[] } = {
    'gf': [
        { title: "KPI-Review vorbereiten", desc: "Quartalszahlen analysieren", prio: "Hoch", due: "Diese Woche", status: "Offen", agent: "Ava Assist", prioColor: "rose" },
        { title: "Entscheidungsvorlage: Prioritäten Q1", desc: "Strategische Ausrichtung finalisieren", prio: "Mittel", due: "Nächste Woche", status: "In Arbeit", agent: "Ava Assist", prioColor: "amber" }
    ],
    'sales': [
        { title: "Lead-Liste A anrufen: 25 Kontakte", desc: "Fokus auf Tech-Sektor", prio: "Hoch", due: "Heute", status: "Offen", agent: "Leo Sales", prioColor: "rose" },
        { title: "Follow-ups senden: Termin-NoShows", desc: "Nachfass-Mails versenden", prio: "Mittel", due: "Morgen", status: "Offen", agent: "Leo Sales", prioColor: "amber" }
    ],
    'marketing': [
        { title: "Landingpage-Text finalisieren", desc: "SEO-Optimierung prüfen", prio: "Hoch", due: "Morgen", status: "In Arbeit", agent: "Sophie Market", prioColor: "rose" },
        { title: "Meta-Ad-Creatives briefen", desc: "Für Q1 Kampagne", prio: "Mittel", due: "Diese Woche", status: "Offen", agent: "Sophie Market", prioColor: "amber" }
    ],
    'social': [
        { title: "Redaktionsplan KW erstellen", desc: "Themen: Innovation, Team", prio: "Hoch", due: "Heute", status: "Erledigt", agent: "Nova Social", prioColor: "rose" },
        { title: "3 LinkedIn-Posts produzieren", desc: "Grafiken und Texte", prio: "Mittel", due: "Mittwoch", status: "In Arbeit", agent: "Nova Social", prioColor: "amber" }
    ],
    'support': [
        { title: "Top 10 Supportfälle clustern", desc: "Für FAQ-Update", prio: "Mittel", due: "Freitag", status: "Offen", agent: "Ava Assist", prioColor: "amber" }
    ],
    'backoffice': [
        { title: "Dokumentenablage: Kundenordner prüfen", desc: "Vollständigkeitscheck", prio: "Niedrig", due: "Ende Monat", status: "Offen", agent: "Ava Assist", prioColor: "slate" }
    ],
    'finance': [
        { title: "OPOS prüfen: 10 offene Posten", desc: "Mahnwesen vorbereiten", prio: "Hoch", due: "Heute", status: "Offen", agent: "Sam Finance", prioColor: "rose" }
    ],
    'hr': [
        { title: "Bewerber-Screening: 12 Profile", desc: "Shortlist erstellen", prio: "Mittel", due: "Morgen", status: "In Arbeit", agent: "Mila HR", prioColor: "amber" }
    ],
    'it': [
        { title: "Workflow X testen & Fehler dokumentieren", desc: "Nach Deployment v2.1", prio: "Hoch", due: "Heute", status: "In Arbeit", agent: "Taro Tech", prioColor: "rose" }
    ],
    'pm': [
        { title: "Projektplan aktualisieren", desc: "Meilensteine verschieben", prio: "Mittel", due: "Diese Woche", status: "Offen", agent: "Pax PM", prioColor: "amber" }
    ],
    'legal': [
        { title: "DSGVO-Dokumente prüfen: AVV", desc: "Neue Vorlagen checken", prio: "Hoch", due: "Sofort", status: "Offen", agent: "Clara Compliance", prioColor: "rose" }
    ],
    'qa': [
        { title: "Qualitätscheck: 10 Calls bewerten", desc: "Zufallsstichprobe Support", prio: "Mittel", due: "Freitag", status: "Offen", agent: "Ava Assist", prioColor: "amber" }
    ],
    'purchase': [
        { title: "Tool-Lizenzliste aktualisieren", desc: "Ablaufdaten prüfen", prio: "Niedrig", due: "Nächste Woche", status: "Offen", agent: "Sophie Market", prioColor: "slate" }
    ]
};

export const mockActivities = [
    { time: 'vor 5 Min.', action: 'Monatsbericht generiert', status: 'abgeschlossen', color: 'green' },
    { time: 'vor 12 Min.', action: 'E-Mail Analyse gestartet', status: 'läuft', color: 'blue' },
    { time: 'vor 45 Min.', action: 'Ticket #9921 eskaliert', status: 'wartet', color: 'amber' },
    { time: 'vor 1 Std.', action: 'Meeting-Protokoll abgelegt', status: 'abgeschlossen', color: 'green' },
    { time: 'vor 2 Std.', action: 'Datenbank-Backup', status: 'abgeschlossen', color: 'green' }
];

export const socialMediaActivities = [
    { time: 'vor 2 Min.', action: 'Redaktionsplan für Woche erstellt', status: 'abgeschlossen', color: 'green' },
    { time: 'vor 15 Min.', action: 'Posting für LinkedIn vorbereitet', status: 'in prüfung', color: 'blue' },
    { time: 'vor 32 Min.', action: 'Kommentare/DMs kategorisiert', status: 'läuft', color: 'blue' },
    { time: 'vor 1 Std.', action: 'Hashtag-Cluster aktualisiert', status: 'abgeschlossen', color: 'green' },
    { time: 'vor 3 Std.', action: 'Performance-Auswertung angelegt', status: 'abgeschlossen', color: 'purple' }
];

export const workflows = [
    // Aktiv
    {
        id: 'wf-001',
        name: 'Kunden-Onboarding Automation',
        description: 'Sendet Willkommens-E-Mails und erstellt interne Aufgaben, wenn ein neuer Kunde im CRM erfasst wird.',
        status: 'Aktiv',
        trigger: 'Neuer Kunde im CRM',
        lastRun: 'Vor 2 Stunden',
        runs: 142,
        avgTime: '45s'
    },
    {
        id: 'wf-002',
        name: 'Social Media Content Freigabe',
        description: 'Startet einen Freigabeprozess in Slack, wenn Nova Social einen neuen Post-Entwurf erstellt.',
        status: 'Aktiv',
        trigger: 'Neuer Post-Entwurf',
        lastRun: 'Vor 45 Minuten',
        runs: 88,
        avgTime: '5min'
    },
    {
        id: 'wf-006',
        name: 'IT Support Ticket Routing',
        description: 'Leitet IT-Support-Tickets basierend auf Keywords an den richtigen Agenten oder das richtige Team weiter.',
        status: 'Aktiv',
        trigger: 'Neues IT-Ticket',
        lastRun: 'Vor 5 Minuten',
        runs: 291,
        avgTime: '12s'
    },
    // Inaktiv
    {
        id: 'wf-003',
        name: 'Rechnungserinnerung (Mahnwesen)',
        description: 'Prüft täglich offene Posten und versendet automatisch Zahlungserinnerungen in 3 Stufen.',
        status: 'Inaktiv',
        trigger: 'Täglich um 08:00',
        lastRun: 'Gestern, 08:00',
        runs: 340,
        avgTime: '2min'
    },
    // Entwurf
    {
        id: 'wf-004',
        name: 'Monatliches KPI Reporting',
        description: 'Sammelt am Monatsende alle relevanten Agenten-KPIs und erstellt einen Bericht für die Geschäftsführung.',
        status: 'Entwurf',
        trigger: 'Monatsende',
        lastRun: 'Nie',
        runs: 0,
        avgTime: 'N/A'
    },
    // Archiviert
    {
        id: 'wf-005',
        name: 'Q4-2023 Marketing Kampagne',
        description: 'Automatisierte Auswertung der alten Q4-Marketing-Kampagne.',
        status: 'Archiviert',
        trigger: 'Manuell',
        lastRun: '28. Dez 2023',
        runs: 1,
        avgTime: '15min'
    }
];

export const qsalesLeads = [
  {
    id: 'lead-001',
    name: 'Dr. Eva Schmidt',
    company: 'Innovatech GmbH',
    status: 'Neu',
    lastActivity: 'Gestern',
    nextAction: 'Morgen, 10:00',
    priority: 'Hoch',
    agent: 'Leo Sales',
    agentAvatar: 'LS',
    profile: {
      email: 'eva.schmidt@innovatech.de',
      phone: '+49 176 12345678',
      source: 'LinkedIn',
    },
    callHistory: [
      { date: '14.01.2024', result: 'Nicht erreicht', duration: '0:32' },
    ],
    notes: [
      { date: '14.01.2024', text: 'Erster Versuch. Mailbox.' },
    ],
    aiRecommendation: {
      nextStatus: 'Kontaktiert',
      bestTime: 'Morgen, 10-12 Uhr',
      probability: 75,
    }
  },
  {
    id: 'lead-002',
    name: 'Markus Weber',
    company: 'Quantum Solutions',
    status: 'Follow-up geplant',
    lastActivity: 'Vor 3 Tagen',
    nextAction: 'Heute, 14:30',
    priority: 'Hoch',
    agent: 'Leo Sales',
    agentAvatar: 'LS',
    profile: {
      email: 'markus.weber@quantum.com',
      phone: '+49 151 87654321',
      source: 'Webinar',
    },
    callHistory: [
      { date: '11.01.2024', result: 'Gespräch geführt', duration: '8:45' },
    ],
    notes: [
      { date: '11.01.2024', text: 'Gutes Gespräch, Interesse an Produkt B. Follow-up mit Details senden.' },
    ],
    aiRecommendation: {
      nextStatus: 'Termin gelegt',
      bestTime: 'Jetzt',
      probability: 85,
    }
  },
  {
    id: 'lead-003',
    name: 'Julia Richter',
    company: 'NextGen Robotics',
    status: 'Kontaktiert',
    lastActivity: 'Heute',
    nextAction: 'In 2 Tagen',
    priority: 'Mittel',
    agent: 'Leo Sales',
    agentAvatar: 'LS',
     profile: {
      email: 'j.richter@nextgen-robotics.io',
      phone: '+49 162 11223344',
      source: 'Messe',
    },
    callHistory: [
       { date: '15.01.2024', result: 'Kurzes Gespräch', duration: '2:15' },
    ],
    notes: [
      { date: '15.01.2024', text: 'Info-Mail ist raus, möchte sich melden.' },
    ],
    aiRecommendation: {
      nextStatus: 'Follow-up geplant',
      bestTime: 'Nachmittag',
      probability: 60,
    }
  },
    {
    id: 'lead-004',
    name: 'Tom Bauer',
    company: 'Data-Sphere AG',
    status: 'Termin gelegt',
    lastActivity: 'Gestern',
    nextAction: '20.01. 11:00',
    priority: 'Mittel',
    agent: 'Leo Sales',
    agentAvatar: 'LS',
     profile: {
      email: 't.bauer@data-sphere.de',
      phone: '+49 179 55667788',
      source: 'Kaltakquise',
    },
    callHistory: [
       { date: '14.01.2024', result: 'Termin vereinbart', duration: '5:30' },
    ],
    notes: [
      { date: '14.01.2024', text: 'Demo für den 20.01. terminiert. Einladung ist raus.' },
    ],
    aiRecommendation: {
      nextStatus: 'Abschlussbereit',
      bestTime: 'Während des Termins',
      probability: 90,
    }
  },
   {
    id: 'lead-005',
    name: 'Sophie Lang',
    company: 'Cloudnomads',
    status: 'Verloren',
    lastActivity: 'Vor 1 Woche',
    nextAction: '-',
    priority: 'Niedrig',
    agent: 'Leo Sales',
    agentAvatar: 'LS',
     profile: {
      email: 'sophie@cloudnomads.com',
      phone: '+49 152 44332211',
      source: 'Empfehlung',
    },
    callHistory: [
       { date: '08.01.2024', result: 'Absage', duration: '3:05' },
    ],
    notes: [
      { date: '08.01.2024', text: 'Kein Budget für Q1. Evtl. in Q2 erneut versuchen.' },
    ],
    aiRecommendation: {
      nextStatus: '-',
      bestTime: 'Nächstes Quartal',
      probability: 20,
    }
  }
];

export const eventTypes = [
  { id: 'et-1', name: 'Erstgespräch 30 Min', slug: 'erstgespraech-30', description: 'Ein kurzes Kennenlernen, um Ihre Anforderungen zu besprechen.', durationMinutes: 30, meetingType: 'video', active: true },
  { id: 'et-2', name: 'Technische Demo 60 Min', slug: 'tech-demo-60', description: 'Eine detaillierte Vorführung unserer Plattform und ihrer Funktionen.', durationMinutes: 60, meetingType: 'video', active: true },
  { id: 'et-3', name: 'Support-Call 15 Min', slug: 'support-15', description: 'Schnelle Hilfe bei technischen Fragen oder Problemen.', durationMinutes: 15, meetingType: 'phone', active: false },
];

export const qalenderBookings = [
    { bookingId: 'bk-1', eventTypeName: 'Erstgespräch 30 Min', guestName: 'Max Mustermann', guestEmail: 'max@beispiel.com', startAt: '2024-02-10T10:00:00.000Z', assignedOwnerId: 'Leo Sales', status: 'booked' },
    { bookingId: 'bk-2', eventTypeName: 'Technische Demo 60 Min', guestName: 'Erika Musterfrau', guestEmail: 'erika@beispiel.de', startAt: '2024-02-11T14:30:00.000Z', assignedOwnerId: 'Leo Sales', status: 'booked' },
    { bookingId: 'bk-3', eventTypeName: 'Erstgespräch 30 Min', guestName: 'John Doe', guestEmail: 'john.d@example.com', startAt: '2024-02-08T09:00:00.000Z', assignedOwnerId: 'Anna M.', status: 'canceled' },
];

export const qalenderTeams = [
    { id: 'team-1', name: 'Sales Team', slug: 'sales', memberIds: ['LS', 'AM'], routingType: 'round_robin' },
    { id: 'team-2', name: 'Support Team', slug: 'support', memberIds: ['AA', 'TS'], routingType: 'least_busy' },
];

export function getDynamicQalenderBookings() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    tomorrow.setHours(7, 31, 0, 0);

    const dayAfter = new Date(today);
    dayAfter.setDate(today.getDate() + 2);
    dayAfter.setHours(10, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(today.getDate() - 1);
    yesterday.setHours(14, 0, 0, 0);

    return [
        { bookingId: 'bk-1', eventTypeName: 'Erstgespräch 30 Min', guestName: 'Max Mustermann', guestEmail: 'max@beispiel.com', startAt: tomorrow.toISOString(), assignedOwnerId: 'Leo Sales', status: 'booked' },
        { bookingId: 'bk-2', eventTypeName: 'Technische Demo 60 Min', guestName: 'Erika Musterfrau', guestEmail: 'erika@beispiel.de', startAt: dayAfter.toISOString(), assignedOwnerId: 'Leo Sales', status: 'booked' },
        { bookingId: 'bk-3', eventTypeName: 'Erstgespräch 30 Min', guestName: 'John Doe', guestEmail: 'john.d@example.com', startAt: yesterday.toISOString(), assignedOwnerId: 'Anna M.', status: 'canceled' },
    ];
}

export const mockContacts = [
    { id: 1, name: 'John Doe', company: 'Innovate GmbH', email: 'john.doe@innovate.de', status: 'Neu', owner: 'Leo Sales' },
    { id: 2, name: 'Jane Smith', company: 'Data Corp', email: 'jane.s@datacorp.co', status: 'Qualifiziert', owner: 'Leo Sales' }
];

export const mockCompanies = [
    { id: 1, name: 'Innovate GmbH', industry: 'Technologie', owner: 'Leo Sales' },
    { id: 2, name: 'Data Corp', industry: 'Datenanalyse', owner: 'Leo Sales' }
];

export const mockDeals = [
    { id: 1, name: 'Innovate GmbH - Q1 Projekt', stage: 'Angebot', value: '€50,000', owner: 'Leo Sales', slaDue: 'morgen', inactiveDays: 0, nextStep: 'Angebot nachfassen' },
    { id: 2, name: 'Data Corp - Analyse-Software', stage: 'Discovery', value: '€40,000', owner: 'Leo Sales', slaDue: 'in 3 Tagen', inactiveDays: 5, nextStep: 'Bedarf klären' },
    { id: 3, name: 'Test Deal 1', stage: 'Angebot', value: '€10,000', owner: 'Leo Sales', slaDue: 'heute', inactiveDays: 1, nextStep: 'Feedback einholen' },
    { id: 4, name: 'Test Deal 2', stage: 'Verhandlung', value: '€25,000', owner: 'Leo Sales', slaDue: null, inactiveDays: 0, nextStep: 'Vertrag senden' }
];

export const pipelineStages = ['Discovery', 'Qualifiziert', 'Angebot', 'Verhandlung', 'Gewonnen', 'Verloren'];


export const kpiMitarbeiter = [
    { id: 'ben-weber', role: 'Developer', name: 'Ben Weber', abteilung: 'IT', team: 'Core-Backend', mitarbeitertyp: 'Mensch', zWert: 65, status: 'Eskalation', trend: 'down', letzteAbweichung: 'Deployment-Verzug (+3 Tage)', eskalation: 'Ja', prevZ: 72, activeTasks: 8, activeProjects: 2, overdueTasks: 3, blockedTasks: 1, kpiBreakdown: [{deduction: 7, reason: 'Deployment-Verzug (+3 Tage)'}, {deduction: 2, reason: '2 überfällige Aufgaben'}] },
    { id: 'anna-schmidt', role: 'Sales Manager', name: 'Anna Schmidt', abteilung: 'Vertrieb', team: 'Enterprise', mitarbeitertyp: 'Mensch', zWert: 78, status: 'Warnung', trend: 'down', letzteAbweichung: 'Zielverfehlung Q4 (-15%)', eskalation: 'Nein', prevZ: 81, activeTasks: 5, activeProjects: 3, overdueTasks: 1, blockedTasks: 0, kpiBreakdown: [{deduction: 3, reason: 'Zielverfehlung Q4 (-15%)'}] },
    { id: 'sophie-lang', role: 'Marketing Manager', name: 'Sophie Lang', abteilung: 'Marketing', team: 'Performance', mitarbeitertyp: 'Mensch', zWert: 85, status: 'Beobachtung', trend: 'up', letzteAbweichung: 'Budgetüberschreitung (+5%)', eskalation: 'Nein', prevZ: 83, activeTasks: 3, activeProjects: 1, overdueTasks: 0, blockedTasks: 0, kpiBreakdown: [{deduction: 2, reason: 'Budgetüberschreitung (+5%)'}] },
    { id: 'dr-mueller', role: 'exec', name: 'Dr. Müller', abteilung: 'Geschäftsführung', team: 'Management', mitarbeitertyp: 'Mensch', zWert: 95, status: 'Stabil', trend: 'stable', letzteAbweichung: 'Keine', eskalation: 'Nein', prevZ: 95, activeTasks: 2, activeProjects: 4, overdueTasks: 0, blockedTasks: 0, kpiBreakdown: [] },
    { id: 'sam-finance', role: 'Accountant', name: 'Sam Finance', abteilung: 'Finanzen & Controlling', team: 'Finance', mitarbeitertyp: 'Mensch', zWert: 98, status: 'Stabil', trend: 'stable', letzteAbweichung: 'Keine', eskalation: 'Nein', prevZ: 98, activeTasks: 1, activeProjects: 0, overdueTasks: 0, blockedTasks: 0, kpiBreakdown: [] },
    { id: 'clara-compliance', role: 'Compliance Officer', name: 'Clara Compliance', abteilung: 'Recht & Compliance', team: 'Legal', mitarbeitertyp: 'Mensch', zWert: 99, status: 'Stabil', trend: 'stable', letzteAbweichung: 'Keine', eskalation: 'Nein', prevZ: 99, activeTasks: 2, activeProjects: 0, overdueTasks: 0, blockedTasks: 0, kpiBreakdown: [] },
    { id: 'mila-hr', role: 'dept_head', name: 'Mila HR', abteilung: 'Personalwesen (HR)', team: 'HR', mitarbeitertyp: 'Mensch', zWert: 96, status: 'Stabil', trend: 'up', letzteAbweichung: 'Keine', eskalation: 'Nein', prevZ: 94, activeTasks: 4, activeProjects: 1, overdueTasks: 0, blockedTasks: 0, kpiBreakdown: [] },
].sort((a, b) => a.zWert - b.zWert);

export const gesamtZufriedenheit = Math.round(kpiMitarbeiter.reduce((acc, m) => acc + m.zWert, 0) / kpiMitarbeiter.length);
export const gruenerBereichCount = kpiMitarbeiter.filter(m => m.zWert >= 90).length;
export const aktiveWarnungenCount = kpiMitarbeiter.filter(m => m.zWert >= 70 && m.zWert < 80).length;
export const beobachtungCount = kpiMitarbeiter.filter(m => m.zWert >= 80 && m.zWert < 90).length;
export const aktiveEskalationenCount = kpiMitarbeiter.filter(m => m.zWert < 70).length;

export const topKennzahlen = [
    { title: 'Ø Zufriedenheit gesamt', value: `${gesamtZufriedenheit}%`, icon: 'HeartPulse', color: 'blue', href: '/q-space/kpi-dashboard/zufriedenheit' },
    { title: 'Mitarbeiter im grünen Bereich', value: gruenerBereichCount, icon: 'UserCheck', color: 'emerald', href: '/q-space/kpi-dashboard/gruen' },
    { title: 'Aktive Warnungen', value: aktiveWarnungenCount + beobachtungCount, icon: 'AlertTriangle', color: 'amber', href: '/q-space/kpi-dashboard/warnungen' },
    { title: 'Aktive Eskalationen', value: aktiveEskalationenCount, icon: 'Flame', color: 'rose', href: '/q-space/kpi-dashboard/eskalationen' }
];

export const teamChatsData = [
    {
        id: 'tc-1',
        name: 'Core-Backend Team',
        description: 'Koordination für das Core-Backend Team.',
        kind: 'team',
        teamId: 'core-backend-team-id', // Fictional ID
        deptId: 'it'
    },
    {
        id: 'tc-2',
        name: 'Projekt "Phoenix" Gruppe',
        description: 'Abteilungsübergreifende Gruppe für das Projekt Phoenix.',
        kind: 'group',
        teamId: null,
        deptId: 'it'
    }
];

export const chatThreads = [
    {
        id: 'esc-2910-chat',
        contextType: 'escalation',
        contextId: 'esc-2910',
        title: 'Eskalation: Vertragskündigung erkannt',
        participants: ['dr-mueller', 'ben-weber'], // User IDs
        lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        lastMessageSnippet: 'Verstanden, danke für die Info.',
        unreadCount: 1,
        isArchived: false,
    },
    {
        id: 'task-ben-1-chat',
        contextType: 'task',
        contextId: 'task-ben-1',
        title: 'Deployment-Verzug (+3 Tage)',
        participants: ['dr-mueller', 'ben-weber'],
        lastMessageAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        lastMessageSnippet: 'Ein unvorhergesehenes Problem mit der Testumgebung. Ich arbeite daran.',
        unreadCount: 0,
        isArchived: false,
    },
    {
        id: 'proj-1-chat',
        contextType: 'project',
        contextId: 'proj-1',
        title: 'Core-Backend Refactoring',
        participants: ['ben-weber'],
        lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        lastMessageSnippet: 'Meilenstein 2 ist abgeschlossen.',
        unreadCount: 0,
        isArchived: true,
    },
    {
        id: 'team-chat-1',
        contextType: 'team',
        contextId: 'tc-1',
        title: 'Core-Backend Team',
        participants: ['ben-weber', 'dr-mueller'],
        lastMessageAt: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
        lastMessageSnippet: 'Das Staging-System ist wieder online.',
        unreadCount: 2,
        isArchived: false,
    },
    {
        id: 'dm-mueller-schmidt',
        contextType: 'dm',
        contextId: 'dm-1',
        title: 'Anna Schmidt',
        participants: ['dr-mueller', 'anna-schmidt'],
        lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        lastMessageSnippet: 'Ja, passt für mich. Bis morgen.',
        unreadCount: 0,
        isArchived: false,
    },
    {
        id: 'dm-weber-lang',
        contextType: 'dm',
        contextId: 'dm-2',
        title: 'Sophie Lang',
        participants: ['ben-weber', 'sophie-lang'],
        lastMessageAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        lastMessageSnippet: 'Klar, ich schaue es mir an.',
        unreadCount: 0,
        isArchived: false,
    }
];

export const chatMessages: { [key: string]: any[] } = {
    'esc-2910-chat': [
        { id: 1, type: 'system', text: 'Eskalation automatisch durch KPI-Engine ausgelöst', createdAt: 'vor 2 Stunden', sender: { name: 'System', avatar: 'Bot' } },
        { id: 2, type: 'user', text: 'Hallo Ben, ich habe die Eskalation gesehen. Lass uns die Woche einen Termin finden, um über die KPIs und die Gründe zu sprechen. Die KI wird einen Terminvorschlag senden.', createdAt: 'vor 1 Stunde', sender: { name: 'Dr. Müller', avatar: 'DM' } },
        { id: 3, type: 'user', text: 'Verstanden, danke für die Info.', createdAt: 'vor 55 Minuten', sender: { name: 'Ben Weber', avatar: 'BW' } },
        { id: 4, type: 'ai_summary', text: 'Gespräch wurde zur Kenntnis genommen. Terminplanung wird eingeleitet.', createdAt: 'vor 50 Minuten', sender: { name: 'KI-Zusammenfassung', avatar: 'Bot' } }
    ],
    'task-ben-1-chat': [
        { id: 1, type: 'system', text: 'Aufgabe "Deployment-Verzug (+3 Tage)" wurde als blockiert markiert.', createdAt: 'vor 1 Tag', sender: { name: 'System', avatar: 'Bot' } },
        { id: 2, type: 'user', text: 'Ben, was ist der Grund für den Blocker beim Deployment?', createdAt: 'vor 45 Minuten', sender: { name: 'Dr. Müller', avatar: 'DM' } },
        { id: 3, type: 'user', text: 'Ein unvorhergesehenes Problem mit der Testumgebung. Ich arbeite daran.', createdAt: 'vor 30 Minuten', sender: { name: 'Ben Weber', avatar: 'BW' } },
    ],
    'proj-1-chat': [
         { id: 1, type: 'user', text: 'Meilenstein 2 ist abgeschlossen.', createdAt: 'vor 5 Stunden', sender: { name: 'Ben Weber', avatar: 'BW' } },
    ],
    'team-chat-1': [
        { id: 1, type: 'system', text: 'Dr. Müller hat den Chat erstellt.', createdAt: 'vor 2 Tagen', sender: { name: 'System', avatar: 'Bot' } },
        { id: 2, type: 'user', text: '@Ben Weber Ist das Staging-System down? Das Deployment für Task-123 schlägt fehl.', createdAt: 'vor 15 Minuten', sender: { name: 'Dr. Müller', avatar: 'DM' } },
        { id: 3, type: 'user', text: 'Ja, gab ein Problem mit dem letzten Build. Ich starte es gerade neu.', createdAt: 'vor 12 Minuten', sender: { name: 'Ben Weber', avatar: 'BW' } },
        { id: 4, type: 'user', text: 'Das Staging-System ist wieder online.', createdAt: 'vor 10 Minuten', sender: { name: 'Ben Weber', avatar: 'BW' } },
    ],
    'dm-mueller-schmidt': [
        { id: 1, type: 'user', text: 'Hallo Anna, können wir morgen kurz über die Q1-Vertriebsziele sprechen? Passt 10 Uhr?', createdAt: 'Gestern', sender: { name: 'Dr. Müller', avatar: 'DM' } },
        { id: 2, type: 'user', text: 'Ja, passt für mich. Bis morgen.', createdAt: 'Gestern', sender: { name: 'Anna Schmidt', avatar: 'AS' } },
    ],
    'dm-weber-lang': [
         { id: 1, type: 'user', text: 'Hey Sophie, hast du kurz Zeit für eine Frage zum Marketing-Budget?', createdAt: 'vor 2 Tagen', sender: { name: 'Ben Weber', avatar: 'BW' } },
         { id: 2, type: 'user', text: 'Klar, ich schaue es mir an.', createdAt: 'vor 2 Tagen', sender: { name: 'Sophie Lang', avatar: 'SL' } },
    ]
};

export const invitesData = [
  {
    inviteId: 'inv-001',
    email: 'new.dev@example.com',
    firstName: 'Max',
    lastName: 'Mustermann',
    role: 'employee',
    deptId: 'IT',
    teamId: 'Core-Backend',
    status: 'pending',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days from now
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
  },
  {
    inviteId: 'inv-002',
    email: 's.jones@marketingcorp.com',
    firstName: 'Sarah',
    lastName: 'Jones',
    role: 'team_lead',
    deptId: 'Marketing',
    teamId: 'Performance',
    status: 'sent',
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
    {
    inviteId: 'inv-003',
    email: 'c.brown@salesforce.com',
    firstName: 'Chris',
    lastName: 'Brown',
    role: 'employee',
    deptId: 'Vertrieb',
    teamId: 'Enterprise',
    status: 'accepted',
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9),
    acceptedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2)
  },
    {
    inviteId: 'inv-004',
    email: 'l.green@analytics.com',
    firstName: 'Laura',
    lastName: 'Green',
    role: 'dept_head',
    deptId: 'IT',
    teamId: null,
    status: 'expired',
    expiresAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 8),
  },
];

export const docFolders = [
  // 01_Unternehmensführung
  { id: 'folder-gf', name: '01_Unternehmensführung', deptId: 'Geschäftsführung', parentFolderId: null },
  { id: 'folder-gf-1', name: 'Strategie', deptId: 'Geschäftsführung', parentFolderId: 'folder-gf' },
  { id: 'folder-gf-2', name: 'Ziele_KPIs', deptId: 'Geschäftsführung', parentFolderId: 'folder-gf' },
  { id: 'folder-gf-3', name: 'Organisation_Struktur', deptId: 'Geschäftsführung', parentFolderId: 'folder-gf' },
  { id: 'folder-gf-4', name: 'Entscheidungen', deptId: 'Geschäftsführung', parentFolderId: 'folder-gf' },
  { id: 'folder-gf-5', name: 'Meetings_Protokolle', deptId: 'Geschäftsführung', parentFolderId: 'folder-gf' },
  { id: 'folder-gf-6', name: 'Gesellschafter', deptId: 'Geschäftsführung', parentFolderId: 'folder-gf' },

  // 02_Finanzen
  { id: 'folder-finance', name: '02_Finanzen', deptId: 'Finanzen & Controlling', parentFolderId: null },
  { id: 'folder-finance-1', name: 'Buchhaltung', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance' },
  { id: 'folder-finance-1-1', name: 'Eingangsrechnungen', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance-1' },
  { id: 'folder-finance-1-2', name: 'Ausgangsrechnungen', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance-1' },
  { id: 'folder-finance-1-3', name: 'Belege', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance-1' },
  { id: 'folder-finance-1-4', name: 'Abschlüsse', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance-1' },
  { id: 'folder-finance-2', name: 'Steuern', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance' },
  { id: 'folder-finance-3', name: 'Liquidität', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance' },
  { id: 'folder-finance-4', name: 'Controlling', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance' },
  { id: 'folder-finance-5', name: 'Budgets', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance' },
  { id: 'folder-finance-6', name: 'Verträge_Finanzen', deptId: 'Finanzen & Controlling', parentFolderId: 'folder-finance' },

  // 03_Vertrieb
  { id: 'folder-sales', name: '03_Vertrieb', deptId: 'Vertrieb', parentFolderId: null },
  { id: 'folder-sales-1', name: 'Angebote', deptId: 'Vertrieb', parentFolderId: 'folder-sales' },
  { id: 'folder-sales-2', name: 'Präsentationen', deptId: 'Vertrieb', parentFolderId: 'folder-sales' },
  { id: 'folder-sales-3', name: 'Preislisten', deptId: 'Vertrieb', parentFolderId: 'folder-sales' },
  { id: 'folder-sales-4', name: 'Vertriebsprozesse', deptId: 'Vertrieb', parentFolderId: 'folder-sales' },
  { id: 'folder-sales-5', name: 'Skripte_Leitfäden', deptId: 'Vertrieb', parentFolderId: 'folder-sales' },
  { id: 'folder-sales-6', name: 'Abschlüsse', deptId: 'Vertrieb', parentFolderId: 'folder-sales' },

  // 04_Marketing
  { id: 'folder-marketing', name: '04_Marketing', deptId: 'Marketing', parentFolderId: null },
  { id: 'folder-marketing-1', name: 'Kampagnen', deptId: 'Marketing', parentFolderId: 'folder-marketing' },
  { id: 'folder-marketing-2', name: 'Inhalte_Content', deptId: 'Marketing', parentFolderId: 'folder-marketing' },
  { id: 'folder-marketing-3', name: 'Social_Media', deptId: 'Marketing', parentFolderId: 'folder-marketing' },
  { id: 'folder-marketing-4', name: 'Werbemittel', deptId: 'Marketing', parentFolderId: 'folder-marketing' },
  { id: 'folder-marketing-5', name: 'Branding', deptId: 'Marketing', parentFolderId: 'folder-marketing' },
  { id: 'folder-marketing-6', name: 'Analysen_Reportings', deptId: 'Marketing', parentFolderId: 'folder-marketing' },

  // 05_Kunden
  { id: 'folder-customers', name: '05_Kunden', deptId: 'Vertrieb', parentFolderId: null },
  { id: 'folder-customers-1', name: 'Kundenakten', deptId: 'Vertrieb', parentFolderId: 'folder-customers' },
  { id: 'folder-customers-2', name: 'Verträge', deptId: 'Vertrieb', parentFolderId: 'folder-customers' },
  { id: 'folder-customers-3', name: 'Kommunikation', deptId: 'Vertrieb', parentFolderId: 'folder-customers' },
  { id: 'folder-customers-4', name: 'Projekte_Kunden', deptId: 'Vertrieb', parentFolderId: 'folder-customers' },
  { id: 'folder-customers-5', name: 'Feedback_Reklamationen', deptId: 'Vertrieb', parentFolderId: 'folder-customers' },

  // 06_Produkte_Leistungen
  { id: 'folder-products', name: '06_Produkte_Leistungen', deptId: 'IT', parentFolderId: null },
  { id: 'folder-products-1', name: 'Produktbeschreibungen', deptId: 'IT', parentFolderId: 'folder-products' },
  { id: 'folder-products-2', name: 'Leistungsübersichten', deptId: 'IT', parentFolderId: 'folder-products' },
  { id: 'folder-products-3', name: 'Preise', deptId: 'IT', parentFolderId: 'folder-products' },
  { id: 'folder-products-4', name: 'Weiterentwicklung', deptId: 'IT', parentFolderId: 'folder-products' },
  { id: 'folder-products-5', name: 'Dokumentation', deptId: 'IT', parentFolderId: 'folder-products' },

  // 07_Personal
  { id: 'folder-hr', name: '07_Personal', deptId: 'Personalwesen (HR)', parentFolderId: null },
  { id: 'folder-hr-1', name: 'Recruiting', deptId: 'Personalwesen (HR)', parentFolderId: 'folder-hr' },
  { id: 'folder-hr-2', name: 'Onboarding', deptId: 'Personalwesen (HR)', parentFolderId: 'folder-hr' },
  { id: 'folder-hr-3', name: 'Schulungen', deptId: 'Personalwesen (HR)', parentFolderId: 'folder-hr' },
  { id: 'folder-hr-4', name: 'Richtlinien', deptId: 'Personalwesen (HR)', parentFolderId: 'folder-hr' },
  { id: 'folder-hr-5', name: 'Mitarbeiterentwicklung', deptId: 'Personalwesen (HR)', parentFolderId: 'folder-hr' },
  { id: 'folder-hr-6', name: 'Offboarding', deptId: 'Personalwesen (HR)', parentFolderId: 'folder-hr' },

  // 08_Projekte
  { id: 'folder-projects', name: '08_Projekte', deptId: 'Geschäftsführung', parentFolderId: null },
  { id: 'folder-projects-1', name: 'Projekt_A', deptId: 'Geschäftsführung', parentFolderId: 'folder-projects' },
  { id: 'folder-projects-2', name: 'Projekt_B', deptId: 'Geschäftsführung', parentFolderId: 'folder-projects' },
  { id: 'folder-projects-3', name: 'Projekt_C', deptId: 'Geschäftsführung', parentFolderId: 'folder-projects' },

  // 09_IT_Systeme
  { id: 'folder-it', name: '09_IT_Systeme', deptId: 'IT', parentFolderId: null },
  { id: 'folder-it-1', name: 'Zugänge', deptId: 'IT', parentFolderId: 'folder-it' },
  { id: 'folder-it-2', name: 'Dokumentationen', deptId: 'IT', parentFolderId: 'folder-it' },
  { id: 'folder-it-3', name: 'Integrationen', deptId: 'IT', parentFolderId: 'folder-it' },
  { id: 'folder-it-4', name: 'Sicherheit', deptId: 'IT', parentFolderId: 'folder-it' },
  { id: 'folder-it-5', name: 'Backups', deptId: 'IT', parentFolderId: 'folder-it' },

  // 10_Recht_Compliance
  { id: 'folder-legal', name: '10_Recht_Compliance', deptId: 'Recht & Compliance', parentFolderId: null },
  { id: 'folder-legal-1', name: 'Verträge', deptId: 'Recht & Compliance', parentFolderId: 'folder-legal' },
  { id: 'folder-legal-2', name: 'Datenschutz', deptId: 'Recht & Compliance', parentFolderId: 'folder-legal' },
  { id: 'folder-legal-3', name: 'Richtlinien', deptId: 'Recht & Compliance', parentFolderId: 'folder-legal' },
  { id: 'folder-legal-4', name: 'Prüfungen', deptId: 'Recht & Compliance', parentFolderId: 'folder-legal' },
  { id: 'folder-legal-5', name: 'Versicherungen', deptId: 'Recht & Compliance', parentFolderId: 'folder-legal' },

  // 99_Archiv
  { id: 'folder-archive', name: '99_Archiv', deptId: 'Geschäftsführung', parentFolderId: null },
  { id: 'folder-archive-1', name: 'Abgeschlossen', deptId: 'Geschäftsführung', parentFolderId: 'folder-archive' },
  { id: 'folder-archive-2', name: 'Historisch', deptId: 'Geschäftsführung', parentFolderId: 'folder-archive' },
  { id: 'folder-archive-3', name: 'Altversionen', deptId: 'Geschäftsführung', parentFolderId: 'folder-archive' },
];

export const mockDocs = [
    { 
        id: 'doc-1',
        title: 'Unternehmensstrategie 2025',
        ownerUserId: 'dr-mueller',
        ownerName: 'Dr. Müller',
        deptId: 'Geschäftsführung',
        folderId: 'folder-gf-1',
        tags: ['strategy', 'q1', 'planning'],
        status: 'active',
        versionCurrent: 2.1,
        fileName: 'unternehmensstrategie_2025_v2.1.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 2.5 * 1024 * 1024,
        updatedAt: '2024-07-20T10:00:00Z',
        aiAnalysis: {
            documentType: 'Strategiepapier',
            purposeSummary: 'Definiert die strategischen Ziele und Prioritäten des Unternehmens für das Jahr 2025.',
            businessProcess: 'Unternehmensführung',
            criticality: 'high',
            suggestedLinks: {
                sopIds: [],
                taskIds: ['task-q1-planning'],
                projectIds: ['proj-strategie-2025'],
            },
            confidence: 95,
            analyzedAt: '2024-07-22T10:00:00Z',
        },
    },
    { 
        id: 'doc-2',
        title: 'Security Policy - Remote Work',
        ownerUserId: 'ben-weber',
        ownerName: 'Ben Weber',
        deptId: 'IT',
        folderId: 'folder-it-4',
        tags: ['security', 'policy', 'remote'],
        status: 'active',
        versionCurrent: 1.0,
        fileName: 'remote_work_policy.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        sizeBytes: 150 * 1024,
        updatedAt: '2024-07-19T14:30:00Z',
        aiAnalysis: {
            documentType: 'Richtlinie',
            purposeSummary: 'Legt die Sicherheitsregeln für die Arbeit im Home-Office fest.',
            businessProcess: 'IT / Sicherheit',
            criticality: 'high',
            suggestedLinks: {
                sopIds: ['sop-remote-work'],
                taskIds: [],
                projectIds: [],
            },
            confidence: 98,
            analyzedAt: '2024-07-22T10:05:00Z',
        },
    },
    {
        id: 'doc-3',
        title: 'Pitch Deck Innovatech',
        ownerUserId: 'anna-schmidt',
        ownerName: 'Anna Schmidt',
        deptId: 'Vertrieb',
        folderId: 'folder-sales-2',
        tags: ['pitch', 'innovatech', 'q1'],
        status: 'active',
        versionCurrent: 1.2,
        fileName: 'Pitch_Innovatech_final.pptx',
        mimeType: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        sizeBytes: 5.8 * 1024 * 1024,
        updatedAt: '2024-07-21T09:00:00Z',
        aiAnalysis: {
            documentType: 'Präsentation',
            purposeSummary: 'Verkaufspräsentation für den potenziellen Kunden Innovatech.',
            businessProcess: 'Vertrieb',
            criticality: 'medium',
            suggestedLinks: {
                sopIds: [],
                taskIds: [],
                projectIds: ['proj-innovatech-deal'],
            },
            confidence: 92,
            analyzedAt: '2024-07-22T10:10:00Z',
        },
    },
    {
        id: 'doc-4',
        title: 'General IT Documentation',
        ownerUserId: 'ben-weber',
        ownerName: 'Ben Weber',
        deptId: 'IT',
        folderId: 'folder-it-2',
        tags: ['it', 'general'],
        status: 'active',
        versionCurrent: 1.0,
        fileName: 'it_general.docx',
        mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        sizeBytes: 50 * 1024,
        updatedAt: '2024-06-19T14:30:00Z',
        aiAnalysis: {
            documentType: 'Dokumentation',
            purposeSummary: 'Allgemeine technische Dokumentation für interne IT-Systeme.',
            businessProcess: 'IT',
            criticality: 'medium',
            suggestedLinks: {
                sopIds: [],
                taskIds: [],
                projectIds: [],
            },
            confidence: 88,
            analyzedAt: '2024-07-22T10:15:00Z',
        },
    },
    {
        id: 'doc-5',
        title: 'Onboarding Prozess für neue Sales-Mitarbeiter',
        ownerUserId: 'mila-hr',
        ownerName: 'Mila HR',
        deptId: 'Personalwesen (HR)',
        folderId: 'folder-hr-2',
        tags: ['onboarding', 'sales', 'prozess', 'hr'],
        status: 'active',
        versionCurrent: 1.0,
        fileName: 'Onboarding_Process_New_Sales_Team.pdf',
        mimeType: 'application/pdf',
        sizeBytes: 780 * 1024,
        updatedAt: '2024-07-22T11:00:00Z',
        aiAnalysis: {
            documentType: 'Prozessdokument (SOP)',
            purposeSummary: 'Beschreibt den Schritt-für-Schritt-Prozess für das Onboarding neuer Mitarbeiter im Vertrieb.',
            businessProcess: 'Personalwesen (HR)',
            criticality: 'high',
            suggestedLinks: {
                sopIds: ['sop-onboarding-sales'],
                taskIds: [],
                projectIds: [],
            },
            confidence: 96,
            analyzedAt: '2024-07-22T11:05:00Z',
        },
    }
];

export const mockSops = [
    { id: 1, title: 'Prozess für neue Kundenanfragen', status: 'Aktiv', deptId: 'Vertrieb' }
];

export const mockProjects = [
    { id: 'proj-strategie-2025', name: 'Unternehmensstrategie 2025', owner: 'Dr. Müller', status: 'Aktiv' },
    { id: 'proj-innovatech-deal', name: 'Innovatech Deal Q1', owner: 'Anna Schmidt', status: 'Aktiv' },
    { id: 'proj-1', name: 'Core-Backend Refactoring', owner: 'Ben Weber', status: 'Abgeschlossen' },
    { id: 'phoenix-project', name: 'Projekt Phoenix', owner: 'Dr. Müller', status: 'Planung' },
];

export const mockTasks = Object.values(tasksMockByDepartment).flat().map((task, index) => ({
  ...(task as any),
  id: `task-mock-${index + 1}`,
  owner: (task as any).agent,
}));

export const qOnboardingModules = [
  { title: 'Willkommen im Q-System', description: 'Eine Einführung in die Philosophie und die Kernkomponenten von QORE.', progress: 100 },
  { title: 'Q-Core verstehen', description: 'Lernen Sie, wie das zentrale Gehirn von QORE funktioniert.', progress: 100 },
  { title: 'Q-Space & Workspace-Logik', description: 'Meistern Sie die Navigation und die bereichsbasierte Arbeitsweise.', progress: 50 },
  { title: 'KI-Mitarbeiter Überblick', description: 'Verstehen Sie die Rollen und Fähigkeiten Ihrer digitalen Kollegen.', progress: 0 },
  { title: 'Q-Tools & Zusammenspiel', description: 'Ein Überblick über die spezialisierten Werkzeuge und deren Synergien.', progress: 0 },
  { title: 'Sicherheit, Daten & Compliance', description: 'Die Grundprinzipien für einen sicheren und konformen Betrieb.', progress: 0 },
  { title: 'Abschluss & Systemfreigabe', description: 'Der letzte Schritt zur vollständigen Freischaltung aller Funktionen.', progress: 0 },
];

export const mockAcademyVideos = [
    { id: 'vid-1', title: 'Einführung in Q-Space', duration: '5:42', uploader: 'Dr. Müller', date: '14.01.2024' },
    { id: 'vid-2', title: 'Effektives Lead Management mit Leo Sales', duration: '12:10', uploader: 'Anna Schmidt', date: '15.01.2024' },
];

export const mockAcademyDocs = [
    { id: 'adoc-1', title: 'Onboarding Checkliste für Sales', type: 'PDF', size: '1.2 MB', uploader: 'Mila HR', date: '10.01.2024' },
    { id: 'adoc-2', title: 'Brand Guidelines 2024', type: 'PDF', size: '5.8 MB', uploader: 'Sophie Market', date: '08.01.2024' },
];

export const mockCourses = [
    { 
        id: 1, 
        title: 'Onboarding für Sales-Team', 
        description: 'Grundlagen für neue Vertriebsmitarbeiter.', 
        modulesCount: 2, 
        enrolled: 12, 
        status: 'Veröffentlicht',
        modules: [
            {
                id: 'm1',
                title: 'Einführung in die Sales-Strategie',
                lessons: [
                    { id: 'l1-1', title: 'Willkommensvideo', type: 'video', duration: '5:42' },
                    { id: 'l1-2', title: 'Verständnisprüfung: Unsere Werte', type: 'confirmation' },
                    { id: 'l1-3', title: 'Grundlagen-Quiz', type: 'quiz' },
                ]
            },
            {
                id: 'm2',
                title: 'Praktische Anwendung',
                lessons: [
                    { id: 'l2-1', title: 'Aufgabe: Erster Pitch-Entwurf', type: 'task' },
                    { id: 'l2-2', title: 'Entscheidungs-Szenario: Umgang mit Einwänden', type: 'decision' },
                ]
            }
        ]
    },
    { 
        id: 2, 
        title: 'DSGVO-Basisschulung', 
        description: 'Rechtliche Grundlagen für alle Mitarbeiter.', 
        modulesCount: 2, 
        enrolled: 45, 
        status: 'Veröffentlicht',
        modules: [
             {
                id: 'm3',
                title: 'Grundlagen der DSGVO',
                lessons: [
                    { id: 'l3-1', title: 'Was ist die DSGVO?', type: 'video', duration: '12:10' },
                    { id: 'l3-2', title: 'Bestätigung der Richtlinien', type: 'confirmation' },
                ]
            },
            {
                id: 'm4',
                title: 'Abschlussprüfung',
                lessons: [
                    { id: 'l4-1', title: 'Finales Prüfungsszenario', type: 'prüfung', details: { isMandatory: true, passingGrade: 80, timeLimit: 15, attempts: 2 } }
                ]
            }
        ]
    },
    { 
        id: 3, 
        title: 'Führungskräfte-Training Q1', 
        description: 'Entwurf für das kommende Quartal.', 
        modulesCount: 0,
        enrolled: 0, 
        status: 'Entwurf',
        modules: []
    },
];

export const mockParticipants = [
    { id: 1, name: 'Anna Schmidt', role: 'Sales Manager', department: 'Vertrieb', courses: 3, progress: 80 },
    { id: 2, name: 'Ben Weber', role: 'Developer', department: 'IT', courses: 2, progress: 100 },
];

export const mockLearningPaths = [
    { id: 1, title: 'Onboarding Vertrieb', courses: 3, assigned: 'Vertrieb', mandatory: true },
    { id: 2, title: 'Führungskräfte Entwicklung', courses: 5, assigned: 'Management', mandatory: false },
];

export const mockCertificates = [
    { id: 1, title: 'Q-Onboarding abgeschlossen', requirement: 'Q-Onboarding', validity: 'Unbegrenzt', status: 'Erhalten' },
    { id: 2, title: 'DSGVO-Experte', requirement: 'DSGVO-Basisschulung', validity: '12 Monate', status: 'Offen' },
];

export const execKpiData = {
    kpis: [
        { title: "Umsatz (heute)", value: "€12.5k", icon: "DollarSign", color: "emerald", change: "+5% vs. Gestern" },
        { title: "Forecast (gewichtet)", value: "€2.1M", icon: "TrendingUp", color: "blue", change: "+2% vs. Vorwoche" },
        { title: "Offene Risiken", value: "3", icon: "Flame", color: "rose", change: "1 neues seit gestern" },
        { title: "Prozess-Staus", value: "1", icon: "Workflow", color: "amber", change: "Stage 'Angebot' > 7d" },
    ],
    processKpis: [
        { metric: "Ø Zeit in 'Discovery'", value: "3.2 Tage" },
        { metric: "Ø Zeit in 'Angebot'", value: "8.1 Tage" },
        { metric: "Conversion Rate (Lead → Deal)", value: "28%" },
        { metric: "SLA Breaches (Deals)", value: "2" },
    ],
    agentKpis: [
        { agent: "AVA", actions: 1208, successRate: "99.1%" },
        { agent: "LEO", actions: 450, successRate: "97.8%" },
        { agent: "SOPHIE", actions: 210, successRate: "99.5%" },
        { agent: "NOVA", actions: 350, successRate: "100%" },
    ],
    attribution: {
        dealName: "Innovatech - Q3 Projekt",
        timeline: [
            { event: "Social Engagement", channel: "LinkedIn", source: "NOVA", timestamp: "vor 28 Tagen" },
            { event: "E-Mail Click", channel: "E-Mail", source: "SOPHIE", timestamp: "vor 15 Tagen" },
            { event: "Lead Created", channel: "Webformular", source: "System", timestamp: "vor 14 Tagen" },
            { event: "Deal Created", channel: "Manuell", source: "Anna Schmidt", timestamp: "vor 12 Tagen" },
        ]
    }
};
