import { Card } from "@/components/ui/card";
import { Settings2 } from "lucide-react";

export default function SettingsPage() {
  return (
    <div>
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Einstellungen
        </h1>
      </header>
      <Card className="mt-10 p-8 text-slate-400 italic flex items-center gap-3">
        <Settings2 className="w-5 h-5" />
        Konfigurationsmenü wird geladen...
      </Card>
    </div>
  );
}
