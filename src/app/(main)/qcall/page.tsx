import { Card } from "@/components/ui/card";
import { Phone } from "lucide-react";

export default function QcallPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Qcall
        </h1>
        <p className="text-muted-foreground">Ihr entwickelter AI Telefonassistent.</p>
      </header>
      <Card className="p-10 flex flex-col items-center justify-center min-h-[400px] border-dashed">
          <Phone className="w-16 h-16 text-muted-foreground/50 mb-6" />
          <h2 className="text-xl font-bold text-foreground">Qcall Studio</h2>
          <p className="text-muted-foreground mt-2">Dieser Bereich befindet sich im Aufbau.</p>
      </Card>
    </div>
  );
}
