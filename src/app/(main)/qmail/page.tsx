import { Card } from "@/components/ui/card";
import { Mail } from "lucide-react";

export default function QmailPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Qmail
        </h1>
        <p className="text-muted-foreground">KI-gestütztes E-Mail Management.</p>
      </header>
      <Card className="p-10 flex flex-col items-center justify-center min-h-[400px] border-dashed">
          <Mail className="w-16 h-16 text-muted-foreground/50 mb-6" />
          <h2 className="text-xl font-bold text-foreground">Qmail Studio</h2>
          <p className="text-muted-foreground mt-2">Dieser Bereich befindet sich im Aufbau.</p>
      </Card>
    </div>
  );
}
