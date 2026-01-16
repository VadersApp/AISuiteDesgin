import { Card } from "@/components/ui/card";
import { toolList } from "@/lib/data";
import {
  Globe,
  FileEdit,
  Presentation,
  Image,
  Video,
  Share2,
  Volume2,
  Palette,
  Workflow,
  Command,
  Code,
  ArrowUpRight,
} from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  globe: Globe,
  "file-edit": FileEdit,
  presentation: Presentation,
  image: Image,
  video: Video,
  "share-2": Share2,
  "volume-2": Volume2,
  palette: Palette,
  workflow: Workflow,
  command: Command,
  code: Code,
};

export default function ToolsPage() {
  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          AI Tools
        </h1>
        <p className="text-muted-foreground">Ihre spezialisierten Studios.</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {toolList.map((t) => {
          const Icon = iconMap[t.icon];
          return (
            <Card
              key={t.id}
              className="p-6 group cursor-pointer hover:border-primary transition-all flex flex-col h-full"
            >
              <div className="mb-4">
                <div
                  className={`w-12 h-12 rounded-2xl bg-${t.color}-500/10 text-${t.color}-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}
                >
                  {Icon && <Icon className="w-6 h-6" />}
                </div>
                <h3
                  className="text-lg font-bold text-foreground mb-2 uppercase italic tracking-tight line-clamp-2"
                  title={t.title}
                >
                  {t.title}
                </h3>
                <p
                  className="text-xs text-muted-foreground leading-relaxed line-clamp-3"
                  title={t.desc}
                >
                  {t.desc}
                </p>
              </div>
              <div className="flex justify-end mt-auto pt-2">
                <div className="p-2 rounded-lg bg-muted text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
