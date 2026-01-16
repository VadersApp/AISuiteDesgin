import { PageHeader } from "@/components/page-header";
import { OverviewChart } from "@/components/dashboard/overview-chart";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts";

const roiData = [
  { month: "January", roi: 186 },
  { month: "February", roi: 305 },
  { month: "March", roi: 237 },
  { month: "April", roi: 273 },
  { month: "May", roi: 209 },
  { month: "June", roi: 214 },
];

const roiChartConfig = {
  roi: {
    label: "ROI (%)",
    color: "hsl(var(--primary))",
  },
} satisfies ChartConfig;

const costData = [
  { name: "Infrastructure", value: 400, fill: "var(--color-infra)" },
  { name: "API Usage", value: 300, fill: "var(--color-api)" },
  { name: "Licensing", value: 300, fill: "var(--color-license)" },
  { name: "Support", value: 200, fill: "var(--color-support)" },
];
const costChartConfig = {
  infra: { label: "Infrastructure", color: "hsl(var(--chart-1))" },
  api: { label: "API Usage", color: "hsl(var(--chart-2))" },
  license: { label: "Licensing", color: "hsl(var(--chart-3))" },
  support: { label: "Support", color: "hsl(var(--chart-4))" },
} satisfies ChartConfig

export default function ReportingPage() {
  return (
    <>
      <PageHeader
        title="Reporting & ROI"
        description="Financial and operational metrics for measuring return on investment."
      />
      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>ROI Over Time</CardTitle>
            <CardDescription>Return on investment percentage month-over-month.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={roiChartConfig} className="h-[250px] w-full">
              <BarChart data={roiData}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="roi" fill="var(--color-roi)" radius={4} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>AI Usage by Department</CardTitle>
            </CardHeader>
            <CardContent>
              <OverviewChart />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Cost Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <ChartContainer config={costChartConfig} className="h-[250px] w-full">
                <PieChart>
                  <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                  <Pie data={costData} dataKey="value" nameKey="name" innerRadius={60}>
                    {costData.map((entry) => (
                      <Cell key={`cell-${entry.name}`} fill={entry.fill} />
                    ))}
                  </Pie>
                </PieChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
