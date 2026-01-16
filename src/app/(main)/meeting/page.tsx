import { bots } from "@/lib/data";
import { Users, SendHorizontal, Bot } from 'lucide-react';

export default function MeetingPage() {

    return (
        <div className="space-y-8 h-[calc(100vh-8rem)] flex flex-col">
            <header className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">AI Meeting</h1>
                    <p className="text-slate-400">Live Kollaboration mit Agenten.</p>
                </div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 animate-pulse">Live Session</span>
            </header>
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 flex-1 min-h-0">
                <div className="bg-black/20 border border-white/10 backdrop-blur-lg rounded-2xl p-4 flex flex-col overflow-hidden">
                    <h3 className="text-xs font-bold text-slate-500 mb-6 uppercase tracking-widest flex items-center gap-2"><Users className="w-3 h-3" /> Teilnehmer</h3>
                    <div className="space-y-2 overflow-y-auto custom-scrollbar pr-1">
                        {bots.map(b => (
                             <button key={b.id} className="w-full flex items-center gap-3 p-2.5 rounded-xl border border-white/10 text-slate-400 hover:border-slate-600 bg-white/5 hover:bg-white/10 transition-all group">
                                <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center text-slate-500 group-hover:text-white border border-slate-700/50"><Bot className="w-3.5 h-3.5" /></div>
                                <span className="text-xs font-bold">{b.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
                <div className="lg:col-span-3 bg-black/20 border border-white/10 backdrop-blur-lg rounded-2xl flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                        <div className="flex justify-center">
                                <div className="px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-slate-500 text-xs italic">AI Meeting gestartet. Teilnehmer werden synchronisiert...</div>
                        </div>
                    </div>
                    <div className="p-4 border-t border-white/10 bg-black/20 flex gap-3">
                        <input type="text" placeholder="Sprechen oder schreiben..." className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" />
                        <button className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-500 transition-all"><SendHorizontal className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        </div>
    )
}
