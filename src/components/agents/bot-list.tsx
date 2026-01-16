'use client';
import { bots } from '@/lib/data';
import { Bot, Plus, Star, MessageSquare, Clock, Target, TrendingUp, Zap, FileText, CheckCircle, ShieldCheck, Activity, AlertCircle, Shield, AlertTriangle } from 'lucide-react';
import Link from 'next/link';
import { Card } from '@/components/ui/card';

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
    'alert-triangle': AlertTriangle
}

export function BotList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {bots.map((b) => (
        <Link href={`/agents/${b.id}`} key={b.id}>
        <Card
          className="group flex flex-col p-6 cursor-pointer hover:border-emerald-500/40 min-h-[220px] transition-all active:scale-[0.98]"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-foreground leading-none group-hover:text-emerald-400 transition-colors">
                  {b.name}
                </h3>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-wide">
                  {b.role}
                </p>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.6)]"></div>
          </div>
          <p className="text-xs text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
            {b.desc}
          </p>
          <div className="grid grid-cols-2 gap-3 mt-auto">
            <div className="bg-background/50 dark:bg-black/20 rounded-xl p-3 border border-border text-center group-hover:bg-accent/80 transition-colors">
              <p className="text-[9px] text-muted-foreground font-bold uppercase">
                Aufgaben
              </p>
              <p className="text-lg font-bold text-foreground">{b.tasksCount}</p>
            </div>
            <div className="bg-background/50 dark:bg-black/20 rounded-xl p-3 border border-border text-center group-hover:bg-accent/80 transition-colors">
              <p className="text-[9px] text-muted-foreground font-bold uppercase">
                Ersparnis
              </p>
              <p className="text-lg font-bold text-primary">{b.timeSaved}</p>
            </div>
          </div>
        </Card>
        </Link>
      ))}
    </div>
  );
}
