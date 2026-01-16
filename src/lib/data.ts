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
