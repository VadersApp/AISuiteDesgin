'use client';

import { useState } from 'react';
import { workflows } from '@/lib/data';
import { Card } from '@/components/ui/card';
import { Zap, PlayCircle, Timer, Repeat, FileText, PlusCircle, Archive } from 'lucide-react';
import { Button } from '@/components/ui/button';

const statusMap: {[key: string]: {color: string, icon: React.ElementType}} = {
    'Aktiv': { color: 'emerald', icon: PlayCircle },
    'Inaktiv': { color: 'slate', icon: PlayCircle },
    'Entwurf': { color: 'amber', icon: FileText },
    'Archiviert': {color: 'slate', icon: Archive}
}

export default function WorkflowStudioPage() {
    const tabs = ["Alle Workflows", "Aktiv", "Inaktiv", "Entwurf", "Archiviert"];
    const [activeTab, setActiveTab] = useState(tabs[0]);

    const filteredWorkflows = workflows.filter(wf => {
        if (activeTab === "Alle Workflows") return true;
        return wf.status === activeTab;
    });

    return (
        <div className="space-y-8 pb-20">
            <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Workflow Studio</h1>
                    <p className="text-slate-400">Automatisierungscenter.</p>
                </div>
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Neuer Workflow
                </Button>
            </header>
            
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {tabs.map((t) => (
                    <button
                        key={t}
                        onClick={() => setActiveTab(t)}
                        className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
                            activeTab === t
                                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                                : "bg-[#1E293B]/50 border-slate-700/50 text-slate-500 hover:text-white hover:bg-slate-800"
                        }`}
                    >
                        {t}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-300">
                {filteredWorkflows.map(wf => {
                    const StatusIcon = statusMap[wf.status]?.icon || FileText;
                    const statusColor = statusMap[wf.status]?.color || 'slate';

                    return (
                        <Card key={wf.id} className="p-6 flex flex-col justify-between hover:border-blue-500/50 transition-all group">
                           <div>
                             <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl bg-${statusColor}-500/10 text-${statusColor}-400 flex items-center justify-center border border-${statusColor}-500/20`}>
                                        <StatusIcon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white leading-tight line-clamp-2 group-hover:text-blue-400 transition-colors">{wf.name}</h3>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-${statusColor}-500/10 text-${statusColor}-400 border border-${statusColor}-500/20`}>{wf.status}</span>
                            </div>
                            <p className="text-xs text-slate-400 mb-6 line-clamp-3 leading-relaxed">{wf.description}</p>
                           </div>

                            <div className="mt-auto pt-4 border-t border-slate-700/50 space-y-3 text-xs text-slate-400">
                                <div className="flex items-center justify-between">
                                    <span className="font-bold flex items-center gap-1.5"><Zap className="w-3 h-3 text-amber-400"/> Trigger</span>
                                    <span className="font-mono text-slate-300 text-right">{wf.trigger}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold flex items-center gap-1.5"><Repeat className="w-3 h-3 text-blue-400"/> Runs</span>
                                    <span className="font-mono text-slate-300">{wf.runs.toLocaleString('de-DE')}</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-bold flex items-center gap-1.5"><Timer className="w-3 h-3 text-purple-400"/> Last Run</span>
                                    <span className="font-mono text-slate-300">{wf.lastRun}</span>
                                </div>
                            </div>
                        </Card>
                    );
                })}

                {filteredWorkflows.length === 0 && (
                     <Card className="md:col-span-2 lg:col-span-3 p-12 flex flex-col items-center justify-center text-center border-dashed">
                        <Archive className="w-10 h-10 text-slate-600 mb-4"/>
                        <h3 className="text-white font-bold">Keine Workflows in dieser Ansicht</h3>
                        <p className="text-sm text-slate-500 mt-1">Erstelle einen neuen Workflow oder wähle eine andere Ansicht.</p>
                    </Card>
                )}
            </div>
        </div>
    );
}
