'use client';
import { liveActivities, formatTimeSince } from "@/lib/data";
import Link from 'next/link';
import { useState, useEffect } from 'react';

export function LiveFeed() {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    return (
        <div className="flex flex-col gap-4">
            {liveActivities.slice(0, 5).map((item) => (
                <Link href={`/dashboard/activities/${item.id}`} key={item.id}>
                    <div className="flex items-center justify-between p-3 rounded-xl bg-secondary/50 border border-border hover:bg-accent/80 hover:border-primary/50 transition-colors cursor-pointer">
                        <div className="flex items-center gap-4">
                            <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center text-primary font-bold border border-border">{item.agent.avatar}</div>
                            <div><p className="text-sm font-semibold text-foreground">{item.agent.name}</p><p className="text-xs text-muted-foreground">{item.title}</p></div>
                        </div>
                        <span className="text-[10px] text-muted-foreground font-mono">{isClient ? formatTimeSince(item.createdAt) : ''}</span>
                    </div>
                </Link>
            ))}
        </div>
    )
}
