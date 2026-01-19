import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { LiveFeed } from "@/components/dashboard/live-feed";
import { ManagementActions } from "@/components/dashboard/management-actions";
import { Card } from "@/components/ui/card";
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Executive Overview
        </h1>
        <p className="text-muted-foreground">
          Willkommen zurück, Dr. Müller. Hier ist der aktuelle Status.
        </p>
      </header>
      <DashboardStats />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold text-foreground">
              Live-Aktivitäten
            </h2>
            <Link href="/dashboard/activities" className="text-sm font-bold text-primary hover:underline">
              Alle anzeigen
            </Link>
          </div>
          <LiveFeed />
        </Card>
        <ManagementActions />
      </div>
    </div>
  );
}
