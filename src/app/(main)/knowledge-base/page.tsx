import { PageHeader } from "@/components/page-header";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { kbDepartments } from "@/lib/data";
import { Card } from "@/components/ui/card";

export default function KnowledgeBasePage() {
  return (
     <div className="space-y-8 pb-20">
        <header><h1 className="text-3xl font-bold text-white tracking-tight">Wissensdatenbank</h1><p className="text-slate-400 italic">Das zentrale Gehirn Ihrer AISUITE.</p></header>
        
        <div className="mt-12 pt-8 border-t border-slate-700/50">
            <header className="mb-6">
                <h2 className="text-2xl font-bold text-white tracking-tight mb-2">Abteilungs-Wissensdatenbank</h2>
                <p className="text-slate-400 text-sm">Lade Dokumente gezielt pro Abteilung hoch, damit die KI in diesem Kontext korrekt arbeiten kann.</p>
            </header>
            
            <Accordion type="single" collapsible className="w-full space-y-4">
              {kbDepartments.map(dept => (
                <AccordionItem value={dept.slug} key={dept.slug} className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden">
                  <AccordionTrigger className="w-full flex items-center justify-between p-4 bg-[#1E293B]/60 hover:bg-[#1E293B]/80 text-left transition-colors hover:no-underline">
                    <div className="flex items-center gap-3">
                        <Search className="w-5 h-5 text-blue-400"/>
                        <span className="text-sm font-bold text-white">{dept.name}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                      <div className="p-6 bg-slate-900/30">
                        <p className="text-slate-400 italic">Details for {dept.name} will be shown here.</p>
                      </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
    </div>
  );
}
