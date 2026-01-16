'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Coins,
  PiggyBank,
  TrendingUp,
  ShieldCheck,
  Clock,
  CalendarCheck,
  Users,
  Info,
  BarChart2,
  Table as TableIcon,
} from 'lucide-react';

const reportingStatsData = [
  { title: 'Umsatz durch AI', value: '€42.5k', icon: Coins, color: 'emerald' },
  { title: 'Kostenersparnis', value: '€12.8k', icon: PiggyBank, color: 'rose' },
  { title: 'Effizienzsteigerung', value: '+240%', icon: TrendingUp, color: 'blue' },
  { title: 'Fehlerreduktion', value: '-85%', icon: ShieldCheck, color: 'purple' },
];

const agentTimeData = [
    { name: 'Ava Assist', hours: 110, color: 'blue' },
    { name: 'Leo Sales', hours: 80, color: 'emerald' },
    { name: 'Nova Social', hours: 40, color: 'purple' },
    { name: 'Sam Finance', hours: 30, color: 'amber' }
];

const totalHoursMonthly = agentTimeData.reduce((acc, agent) => acc + agent.hours, 0);


export function ReportingContent() {
  const [period, setPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const multiplier = period === 'yearly' ? 12 : 1;
  const totalHours = totalHoursMonthly * multiplier;
  const workDays = Math.round(totalHours / 8);
  const fte = (totalHoursMonthly / 160).toFixed(1).replace('.', ',');
  const maxVal = Math.max(...agentTimeData.map(a => a.hours)) * multiplier;

  return (
    <div className="space-y-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Reporting & ROI
          </h1>
          <p className="text-slate-400">Finanzielle und operative Analyse.</p>
        </div>
        <div className="bg-black/20 border border-white/10 backdrop-blur-sm p-1 rounded-xl flex text-xs font-bold">
          <button
            onClick={() => setPeriod('monthly')}
            className={`px-4 py-2 rounded-lg transition-all ${
              period === 'monthly'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Monatlich
          </button>
          <button
            onClick={() => setPeriod('yearly')}
            className={`px-4 py-2 rounded-lg transition-all ${
              period === 'yearly'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Jährlich
          </button>
        </div>
      </header>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {reportingStatsData.map((s, i) => {
          const Icon = s.icon;
          return (
            <Card key={i} className="p-6 flex items-center gap-4">
              <div
                className={`p-3 rounded-xl bg-${s.color}-500/10 text-${s.color}-400`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase">
                  {s.title}
                </p>
                <h3 className="text-2xl font-bold text-white">{s.value}</h3>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Time Saving KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="p-6">
              <div className="p-2 w-fit rounded-xl bg-blue-500/10 text-blue-400 mb-2"><Clock className="w-5 h-5" /></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Zeitersparnis</p>
              <h3 className="text-2xl font-bold text-white mt-1">{totalHours.toLocaleString('de-DE')} Std.</h3>
              <p className="text-xs text-slate-500 mt-1">Durch KI-Automatisierung</p>
          </Card>
          <Card className="p-6">
              <div className="p-2 w-fit rounded-xl bg-emerald-500/10 text-emerald-400 mb-2"><CalendarCheck className="w-5 h-5" /></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Arbeitstage gespart</p>
              <h3 className="text-2xl font-bold text-white mt-1">{workDays} Tage</h3>
              <p className="text-xs text-slate-500 mt-1">Ø 8 Std. pro Arbeitstag</p>
          </Card>
          <Card className="p-6">
              <div className="p-2 w-fit rounded-xl bg-purple-500/10 text-purple-400 mb-2"><Users className="w-5 h-5" /></div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">Mitarbeiter-Äquivalent</p>
              <h3 className="text-2xl font-bold text-white mt-1">{fte} FTE</h3>
              <p className="text-xs text-slate-500 mt-1">Vollzeitstellen entlastet</p>
          </Card>
      </div>

       {/* Explanation Text */}
       <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-sm text-blue-300 flex items-center gap-3 backdrop-blur-lg">
          <Info className="w-5 h-5 shrink-0" />
          <p>Die Zeitersparnis zeigt, wie viele manuelle Arbeitsstunden deine KI-Mitarbeiter pro Zeitraum übernehmen – diese Zeit kann dein Team für wertschöpfende Aufgaben nutzen.</p>
      </div>


      {/* Visualization & Table Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Chart */}
          <Card className="p-6">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2"><BarChart2 className="w-5 h-5 text-emerald-400" /> Zeitersparnis nach Agent (Std.)</h3>
              <div className="h-64 flex items-end justify-around gap-2 px-2 pt-4 border-b border-white/10">
                  {agentTimeData.map(agent => {
                      const val = agent.hours * multiplier;
                      const heightPct = maxVal > 0 ? (val / maxVal) * 100 : 0;
                      return (
                          <div key={agent.name} className="h-full flex flex-col justify-end items-center flex-1 group relative">
                              <div className={`w-full max-w-[40px] bg-${agent.color}-500 rounded-t-lg transition-all duration-500 opacity-80 group-hover:opacity-100 relative`} style={{ height: `${heightPct}%` }}>
                                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900 border border-slate-700 text-white text-[10px] rounded whitespace-nowrap hidden group-hover:block z-10 shadow-xl">
                                      {val.toLocaleString('de-DE')} Std. ({(val/8).toFixed(1).replace('.',',')} Tage)
                                  </div>
                              </div>
                              <span className="text-[10px] text-slate-400 mt-2 font-medium truncate w-full text-center" title={agent.name}>{agent.name.split(' ')[0]}</span>
                          </div>
                      );
                  })}
              </div>
          </Card>
          
          {/* Table */}
          <Card className="p-6 overflow-hidden">
              <h3 className="text-white font-bold mb-6 flex items-center gap-2"><TableIcon className="w-5 h-5 text-blue-400" /> Details nach KI-Mitarbeiter</h3>
              <div className="overflow-x-auto">
                  <table className="w-full text-sm text-left">
                      <thead className="text-xs text-slate-500 uppercase bg-black/20">
                          <tr>
                              <th className="px-4 py-3 rounded-l-lg">Agent</th>
                              <th className="px-4 py-3 text-right">Stunden</th>
                              <th className="px-4 py-3 text-right">Tage</th>
                              <th className="px-4 py-3 rounded-r-lg text-right">Jahr (Proj.)</th>
                          </tr>
                      </thead>
                      <tbody className="text-slate-300 divide-y divide-white/10">
                          {agentTimeData.map(agent => {
                              const hMonth = agent.hours;
                              const hCurrent = hMonth * multiplier;
                              const dCurrent = (hCurrent / 8).toFixed(1).replace('.', ',');
                              const hYearProj = (hMonth * 12).toLocaleString('de-DE');

                              return (
                                  <tr key={agent.name} className="hover:bg-white/5 transition-colors border-b border-white/10 last:border-0">
                                      <td className="px-4 py-3 font-medium text-white">{agent.name}</td>
                                      <td className="px-4 py-3 text-right">{hCurrent.toLocaleString('de-DE')} Std.</td>
                                      <td className="px-4 py-3 text-right">{dCurrent} T.</td>
                                      <td className="px-4 py-3 text-right text-slate-400">{hYearProj} Std.</td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </table>
              </div>
          </Card>
      </div>
      
      {/* Placeholder */}
       <Card className="p-10 flex flex-col items-center justify-center min-h-[200px] mt-8">
          <TrendingUp className="w-12 h-12 text-slate-700 mb-4" />
          <p className="text-slate-500 italic">Detaillierte Finanz-ROI-Visualisierung wird initialisiert...</p>
      </Card>
    </div>
  );
}
