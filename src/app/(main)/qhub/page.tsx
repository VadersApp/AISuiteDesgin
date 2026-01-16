import { Card } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function QhubPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Qhub
        </h1>
        <p className="text-muted-foreground">Ihre zentrale CRM-Lösung.</p>
      </header>
      <Card className="p-10 flex flex-col items-center justify-center min-h-[400px] border-dashed">
          <Users className="w-16 h-16 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-bold text-foreground">CRM Studio</h2>
          <p className="text-muted-foreground mt-2">Dieses Feature befindet sich im Aufbau.</p>
      </Card>
    </div>
  );
}
