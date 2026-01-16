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
        { name: 'Brand_Guidelines_2024.pdf', type: 'Richtlinien', date: '10.01.2024', status: 'verarbeitet' },
        { name: 'Campaign_Q1_Assets.zip', type: 'Marketing Assets', date: '12.01.2024', status: 'in Verarbeitung' }
    ],
    'vertrieb-sales': [
        { name: 'Sales_Pitch_Deck_v3.pptx', type: 'Sales Scripts', date: '05.01.2024', status: 'verarbeitet' }
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
    { id: 'code', title: 'Code & developer Studio', icon: 'code', color: 'blue', desc: 'Entwicklung.' },
    { id: 'qmail', title: 'Qmail', icon: 'mail', color: 'rose', desc: 'KI-gestütztes E-Mail Management.' }
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

export const liveFeed = [
    { name: "Ava Assist", action: "Ticket #8291 gelöst", time: "10:42" },
    { name: "Leo Sales", action: "Lead qualifiziert", time: "10:38" },
    { name: "Mila HR", action: "Eskalation gefiltert", time: "10:25" }
];

export const reportingStats = [
    { title: 'Umsatz durch AI', value: '€42.5k', icon: 'coins', color: 'emerald' },
    { title: 'Kostenersparnis', value: '€12.8k', icon: 'piggy-bank', color: 'rose' },
    { title: 'Effizienzsteigerung', value: '+240%', icon: 'trending-up', color: 'blue' },
    { title: 'Fehlerreduktion', value: '-85%', icon: 'shield-check', color: 'purple' }
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
