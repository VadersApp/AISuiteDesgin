import { PageHeader } from "@/components/page-header";
import { KpiCard } from "@/components/dashboard/kpi-card";
import { DollarSign, Users, CheckCircle, BarChart } from "lucide-react";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { RecentActivity } from "@/components/dashboard/recent-activity";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Executive Dashboard"
        description="An at-a-glance overview of key performance indicators and system status."
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Revenue"
          value="$45,231.89"
          change="+20.1% from last month"
          icon={<DollarSign className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Active Users"
          value="+2350"
          change="+180.1% from last month"
          icon={<Users className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="Tasks Completed"
          value="+12,234"
          change="+19% from last month"
          icon={<CheckCircle className="h-5 w-5 text-muted-foreground" />}
        />
        <KpiCard
          title="API Calls"
          value="+573"
          change="+201 since last hour"
          icon={<BarChart className="h-5 w-5 text-muted-foreground" />}
        />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>AI Usage Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <RecentActivity />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
