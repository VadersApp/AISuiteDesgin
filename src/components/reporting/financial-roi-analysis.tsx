'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { agentTimeData } from '@/lib/data';
import { Info } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';

const HOURLY_RATE = 60; // EUR

const AGENT_COSTS: { [key: string]: number } = {
    'Ava Assist': 2000,
    'Leo Sales': 2000,
    'Nova Social': 2000,
    'Sam Finance': 2000,
};

const financialChartConfig = {
  kosten: { label: 'Kosten', color: 'hsl(var(--destructive))' },
  einsparung: { label: 'Einsparung', color: 'hsl(var(--chart-2))' },
  kumulativ: { label: 'Kumulierte Ersparnis', color: 'hsl(var(--primary))' },
} satisfies ChartConfig;

export function FinancialRoiAnalysis() {
    const [period, setPeriod] = useState('30d');
    const [loading, setLoading] = useState(false);

    const data = useMemo(() => {
        setLoading(true);
        const days = period === '7d' ? 7 : period === '30d' ? 30 : period === '90d' ? 90 : 365;
        const granularity = period === '12m' ? 'monthly' : 'daily';

        const totalMonthlyHours = agentTimeData.reduce((acc, agent) => acc + agent.hours, 0);
        const totalMonthlySavings = totalMonthlyHours * HOURLY_RATE;
        const totalMonthlyCosts = Object.values(AGENT_COSTS).reduce((acc, cost) => acc + cost, 0);

        const dailySavings = totalMonthlySavings / 30;
        const dailyCosts = totalMonthlyCosts / 30;
        
        const monthlySavingsPerAgent = agentTimeData.map(agent => ({
            name: agent.name,
            savings: agent.hours * HOURLY_RATE,
            cost: AGENT_COSTS[agent.name] || 0,
        }));

        let cumulativeNet = 0;
        
        const chartData = Array.from({ length: granularity === 'daily' ? days : 12 }, (_, i) => {
            const savings = granularity === 'daily' ? dailySavings : totalMonthlySavings;
            const costs = granularity === 'daily' ? dailyCosts : totalMonthlyCosts;
            cumulativeNet += savings - costs;
            
            return {
                name: granularity === 'daily' ? `Tag ${i + 1}` : `Monat ${i + 1}`,
                kosten: costs,
                einsparung: savings,
                kumulativ: cumulativeNet
            };
        });

        const periodMultiplier = days / 30;
        const periodSavings = totalMonthlySavings * periodMultiplier;
        const periodCosts = totalMonthlyCosts * periodMultiplier;
        const periodNetBenefit = periodSavings - periodCosts;
        const roiFactor = periodCosts > 0 ? (periodSavings / periodCosts) : 0;
        
        const netDailySavings = dailySavings - dailyCosts;
        const breakEvenInDays = netDailySavings <= 0 ? null : Math.ceil(totalMonthlyCosts / netDailySavings);
        const breakEvenDate = breakEvenInDays ? new Date(Date.now() + breakEvenInDays * 24 * 60 * 60 * 1000) : null;
        
        const netMonthlyBenefit = totalMonthlySavings - totalMonthlyCosts;
        const paybackPeriodInMonths = netMonthlyBenefit <=0 ? null : totalMonthlyCosts / netMonthlyBenefit;

        setTimeout(() => setLoading(false), 500);

        return {
            totalCosts: periodCosts,
            totalSavings: periodSavings,
            netBenefit: periodNetBenefit,
            chartData,
            tableData: monthlySavingsPerAgent.map(d => ({
                ...d,
                net: d.savings - d.cost,
                roi: d.cost > 0 ? (d.savings / d.cost) : 0,
            })),
            breakEven: {
                days: breakEvenInDays,
                date: breakEvenDate?.toLocaleDateString('de-DE'),
            },
            roi: {
                factor: roiFactor,
                percentage: roiFactor > 0 ? (roiFactor - 1) * 100 : 0,
            },
            paybackPeriod: paybackPeriodInMonths
        };
    }, [period]);

    if (loading) {
        return (
             <Card className="mt-8">
                <CardHeader>
                    <Skeleton className="h-8 w-1/2" />
                    <Skeleton className="h-4 w-3/4" />
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid grid-cols-3 gap-4">
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                        <Skeleton className="h-20 w-full" />
                    </div>
                    <Skeleton className="h-64 w-full" />
                    <div className="grid grid-cols-2 gap-4">
                        <Skeleton className="h-24 w-full" />
                        <Skeleton className="h-24 w-full" />
                    </div>
                    <Skeleton className="h-48 w-full" />
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="mt-8">
            <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <CardTitle>Finanz-ROI (Details)</CardTitle>
                    <CardDescription>Kosten, Einsparungen und ROI-Projektion</CardDescription>
                </div>
                <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger className="w-full md:w-[180px] bg-black/20">
                        <SelectValue placeholder="Zeitraum" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7d">7 Tage</SelectItem>
                        <SelectItem value="30d">30 Tage</SelectItem>
                        <SelectItem value="90d">90 Tage</SelectItem>
                        <SelectItem value="12m">12 Monate</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="p-4 bg-black/20">
                        <p className="text-xs text-slate-400 font-bold uppercase">Kosten im Zeitraum</p>
                        <p className="text-2xl font-bold text-white">€{data.totalCosts.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                    </Card>
                     <Card className="p-4 bg-black/20">
                        <p className="text-xs text-slate-400 font-bold uppercase">Einsparung im Zeitraum</p>
                        <p className="text-2xl font-bold text-emerald-400">€{data.totalSavings.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
                    </Card>
                     <Card className="p-4 bg-black/20">
                        <p className="text-xs text-slate-400 font-bold uppercase">Netto-Nutzen im Zeitraum</p>
                        <p className={`text-2xl font-bold ${data.netBenefit >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                            €{data.netBenefit.toLocaleString('de-DE', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                        </p>
                    </Card>
                </div>

                 <div>
                     <ChartContainer config={financialChartConfig} className="h-64 w-full">
                        <ComposedChart data={data.chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                             <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                             <XAxis dataKey="name" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} tickLine={false} axisLine={false} />
                             <YAxis yAxisId="left" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value/1000}k`} />
                             <YAxis yAxisId="right" orientation="right" tick={{ fill: 'hsl(var(--primary))', fontSize: 10 }} tickLine={false} axisLine={false} tickFormatter={(value) => `€${value/1000}k`} />
                            <Tooltip content={<ChartTooltipContent indicator="dot" />} cursor={{fill: 'rgba(255,255,255,0.1)'}} />
                             <Legend />
                             <Bar yAxisId="left" dataKey="kosten" fill="var(--color-kosten)" radius={[4, 4, 0, 0]} barSize={20} />
                             <Bar yAxisId="left" dataKey="einsparung" fill="var(--color-einsparung)" radius={[4, 4, 0, 0]} barSize={20} />
                             <Line yAxisId="right" type="monotone" dataKey="kumulativ" stroke="var(--color-kumulativ)" strokeWidth={2} dot={false} />
                        </ComposedChart>
                    </ChartContainer>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4 bg-black/20">
                         <CardTitle className="text-base mb-2">Break-even</CardTitle>
                         <div className="space-y-2 text-sm">
                             <div className="flex justify-between">
                                 <span className="text-slate-400">Erreicht in:</span>
                                 <span className="font-bold text-white">{data.breakEven.days ? `${data.breakEven.days} Tagen` : 'Nicht erreicht'}</span>
                             </div>
                             <div className="flex justify-between">
                                 <span className="text-slate-400">Datum (projiziert):</span>
                                 <span className="font-bold text-white">{data.breakEven.date || 'N/A'}</span>
                             </div>
                         </div>
                    </Card>
                     <Card className="p-4 bg-black/20">
                        <CardTitle className="text-base mb-2">ROI Kennzahlen</CardTitle>
                         <div className="space-y-2 text-sm">
                             <div className="flex justify-between">
                                 <span className="text-slate-400">ROI Faktor:</span>
                                 <span className="font-bold text-white">{data.roi.factor.toFixed(2)}x</span>
                             </div>
                             <div className="flex justify-between">
                                 <span className="text-slate-400">ROI %:</span>
                                 <span className="font-bold text-white">{data.roi.percentage.toFixed(1)}%</span>
                             </div>
                              <div className="flex justify-between">
                                 <span className="text-slate-400">Payback Period:</span>
                                 <span className="font-bold text-white">{data.paybackPeriod ? `${data.paybackPeriod.toFixed(1)} Monate` : 'N/A'}</span>
                             </div>
                         </div>
                    </Card>
                </div>
                
                <div>
                     <h3 className="text-white font-bold mb-4">Kosten & Nutzen – Aufschlüsselung nach KI-Mitarbeiter</h3>
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/10 hover:bg-transparent">
                            <TableHead className="text-slate-400">Agent</TableHead>
                            <TableHead className="text-right text-slate-400">Kosten/Monat</TableHead>
                            <TableHead className="text-right text-slate-400">Ersparnis/Monat</TableHead>
                            <TableHead className="text-right text-slate-400">Netto/Monat</TableHead>
                            <TableHead className="text-right text-slate-400">ROI Faktor</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {data.tableData.map((agent, index) => (
                            <TableRow key={index} className="border-white/10">
                              <TableCell className="font-medium text-white">{agent.name}</TableCell>
                              <TableCell className="text-right font-mono">€{agent.cost.toLocaleString('de-DE')}</TableCell>
                              <TableCell className="text-right font-mono text-emerald-400">€{agent.savings.toLocaleString('de-DE')}</TableCell>
                              <TableCell className={`text-right font-mono ${agent.net >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                                  €{agent.net.toLocaleString('de-DE')}
                              </TableCell>
                              <TableCell className="text-right font-mono">{agent.roi.toFixed(2)}x</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                       <div className="text-xs text-slate-500 italic mt-3 flex items-center gap-2">
                        <Info className="w-3.5 h-3.5" />
                        <p>Kosten pro Agent sind Schätzwerte basierend auf Standard-Lizenzmodellen.</p>
                       </div>
                </div>

            </CardContent>
        </Card>
    );
}
