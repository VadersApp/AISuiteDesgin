import { departmentsConfig, bots, tasksMockByDepartment, mockActivities, socialMediaActivities } from '@/lib/data';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { ChevronLeft, Bot as BotIcon, Activity, CheckSquare, Square } from 'lucide-react';


export default function DepartmentDetailPage({ params }: { params: { id: string } }) {
    const dept = departmentsConfig.find(d => d.id === params.id);

    if (!dept) {
        notFound();
    }
    
    const deptAgents = dept.agents.map(agentName => bots.find(b => b.name === agentName)).filter(Boolean);
    const deptTasks = tasksMockByDepartment[dept.id] || [];
    let activitiesToRender = mockActivities;
    if (dept.id === 'social') {
        activitiesToRender = socialMediaActivities;
    }
    const statusColor = dept.agents.length > 0 ? 'emerald' : 'slate';


    return (
        <div className="space-y-8 pb-10">
            <header className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Link href="/departments" className="p-2 rounded-xl bg-card border border-border text-muted-foreground hover:text-foreground transition-colors shrink-0">
                    <ChevronLeft className="w-5 h-5" />
                </Link>
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                        <h1 className="text-3xl font-bold text-foreground tracking-tight break-words line-clamp-2">{dept.name}</h1>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-${statusColor}-500/10 text-${statusColor}-400 border border-${statusColor}-500/20 shrink-0`}>
                            {dept.agents.length > 0 ? 'Aktiv' : 'Inaktiv'}
                        </span>
                    </div>
                    <p className="text-muted-foreground font-medium mt-1 break-words">{dept.desc}</p>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-6">
                    <Card className="p-6">
                        <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2"><BotIcon className="w-5 h-5 text-blue-400" /> Zuständige KI-Mitarbeiter</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {deptAgents.length > 0 ? deptAgents.map(agent => (
                                agent && <div key={agent.id} className="bg-muted/50 border border-border rounded-xl p-4 flex gap-4 items-center">
                                    <div className="w-10 h-10 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/30">
                                        <BotIcon className="w-5 h-5" />
                                    </div>
                                    <div className="min-w-0 flex-1">
                                        <h4 className="text-sm font-bold text-foreground truncate">{agent.name}</h4>
                                        <p className="text-[10px] text-blue-400 dark:text-blue-300 font-bold uppercase mb-1 break-words line-clamp-2">{agent.role}</p>
                                        <p className="text-xs text-muted-foreground italic truncate">"{agent.currentActivity || 'Wartet auf Input...'}"</p>
                                    </div>
                                </div>
                            )) : (
                                <div className="p-4 text-muted-foreground text-sm italic border border-dashed border-border rounded-xl md:col-span-2">Keine KI-Mitarbeiter zugewiesen.</div>
                            )}
                        </div>
                    </Card>
                    
                    <Card className="p-6">
                        <header className="mb-6">
                            <h2 className="text-lg font-bold text-foreground flex items-center gap-2"><CheckSquare className="w-5 h-5 text-amber-400" /> Aufgaben</h2>
                            <p className="text-xs text-muted-foreground mt-1">Von der zuständigen KI erstellt – für menschliche Mitarbeiter zur Umsetzung.</p>
                        </header>
                        <div className="space-y-3">
                            {deptTasks.length > 0 ? deptTasks.map((t, i) => {
                                const prioColorClasses: {[key:string]: string} = {
                                    rose: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
                                    amber: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
                                    slate: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
                                };
                                const prioClass = prioColorClasses[t.prioColor] || prioColorClasses.slate;
                                return (
                                <div key={i} className="bg-muted/50 border border-border rounded-xl p-4 flex flex-col gap-3 hover:bg-accent/80 transition-colors">
                                    <div className="flex flex-wrap justify-between items-start gap-3">
                                        <div className="min-w-0 flex-1">
                                            <div className="flex flex-wrap items-center gap-2 mb-1">
                                                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${prioClass} shrink-0`}>{t.prio}</span>
                                                <span className="text-sm font-bold text-foreground break-words line-clamp-2">{t.title}</span>
                                            </div>
                                            <p className="text-xs text-muted-foreground break-words line-clamp-3">{t.desc}</p>
                                        </div>
                                        <div className="text-right shrink-0 flex flex-col items-end">
                                            <span className="block text-[10px] text-muted-foreground font-mono mb-1 whitespace-nowrap">Fällig: {t.due}</span>
                                            <span className="inline-block px-2 py-0.5 rounded-full text-[9px] font-bold uppercase bg-secondary text-secondary-foreground whitespace-nowrap">{t.status}</span>
                                        </div>
                                    </div>
                                    <div className="flex flex-wrap justify-between items-center gap-2 pt-3 border-t border-border">
                                        <div className="flex items-center gap-2 min-w-0">
                                            <div className="w-5 h-5 rounded-full bg-blue-900/50 flex items-center justify-center text-[10px] text-blue-400 border border-blue-500/20 shrink-0"><BotIcon className="w-3 h-3" /></div>
                                            <span className="text-[10px] text-muted-foreground truncate">Erstellt von <span className="text-foreground/80">{t.agent}</span></span>
                                        </div>
                                        <button className="flex items-center gap-1.5 text-[10px] font-bold text-muted-foreground hover:text-emerald-400 transition-colors shrink-0">
                                            <Square className="w-3.5 h-3.5" /> Erledigen
                                        </button>
                                    </div>
                                </div>
                            )}) : (
                                <div className="p-4 text-muted-foreground text-sm italic border border-dashed border-border rounded-xl">Keine offenen Aufgaben.</div>
                            )}
                        </div>
                    </Card>
                </div>
                <div>
                    <Card className="p-6 h-full">
                        <h2 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-400" /> Was gerade gemacht wird</h2>
                        <div className="space-y-6 relative before:absolute before:left-2 before:top-2 before:h-[calc(100%-1rem)] before:w-0.5 before:bg-border">
                            {activitiesToRender.map((act, i) => {
                                 const statusColorClass = {
                                    green: 'bg-green-500 border-green-500/50',
                                    blue: 'bg-blue-500 border-blue-500/50',
                                    amber: 'bg-amber-500 border-amber-500/50',
                                    purple: 'bg-purple-500 border-purple-500/50',
                                }[act.color] || 'bg-slate-500 border-slate-500/50';

                                return(
                                <div key={i} className="relative pl-6">
                                    <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full bg-background border flex items-center justify-center z-10 ${statusColorClass.replace('bg-','border-')}`}>
                                        <div className={`w-1.5 h-1.5 rounded-full ${statusColorClass}`}></div>
                                    </div>
                                    <div className="flex flex-wrap justify-between items-start gap-2">
                                        <div className="min-w-0 flex-1">
                                            <p className="text-sm text-foreground font-medium break-words line-clamp-2">{act.action}</p>
                                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider block mt-0.5">{act.status}</span>
                                        </div>
                                        <span className="text-[10px] text-muted-foreground font-mono shrink-0 whitespace-nowrap">{act.time}</span>
                                    </div>
                                </div>
                            )})}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
