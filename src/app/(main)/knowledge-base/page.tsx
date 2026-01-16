'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { kbDepartments, mockKbFiles, kbDocTypes } from '@/lib/data';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Folder, Upload, FileText, Download } from 'lucide-react';

export default function KnowledgeBasePage() {
  const { toast } = useToast();

  const handleUpload = () => {
    toast({
      title: 'Upload gestartet',
      description: 'Ihr Mock-Upload wurde gestartet.',
    });
  };

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Wissensdatenbank
        </h1>
        <p className="text-slate-400 italic">
          Das zentrale Gehirn Ihrer AISUITE.
        </p>
      </header>

      <div className="mt-12 pt-8 border-t border-slate-700/50">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">
            Abteilungs-Wissensdatenbank
          </h2>
          <p className="text-slate-400 text-sm">
            Lade Dokumente gezielt pro Abteilung hoch, damit die KI in diesem
            Kontext korrekt arbeiten kann.
          </p>
        </header>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {kbDepartments.map((dept) => {
            const files = mockKbFiles[dept.slug] || [];
            const hasFiles = files.length > 0;
            const badgeColor = hasFiles ? 'emerald' : 'amber';
            const badgeText = hasFiles ? 'Vorhanden' : 'Fehlt';

            return (
              <AccordionItem
                value={dept.slug}
                key={dept.slug}
                className="bg-slate-800/40 border border-slate-700/50 rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="w-full flex items-center justify-between p-4 bg-[#1E293B]/60 hover:bg-[#1E293B]/80 text-left transition-colors hover:no-underline">
                  <div className="flex items-center gap-3">
                    <Folder className="w-5 h-5 text-blue-400" />
                    <span className="text-sm font-bold text-white">
                      {dept.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-${badgeColor}-500/10 text-${badgeColor}-400 border border-${badgeColor}-500/20`}
                    >
                      {badgeText}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="p-6 bg-slate-900/30">
                    {/* Upload Zone */}
                    <div className="border-2 border-dashed border-slate-700/60 rounded-xl p-6 mb-6 text-center hover:border-blue-500/50 hover:bg-slate-800/50 transition-all">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <div className="p-3 bg-slate-800 rounded-full text-slate-400">
                          <Upload className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-white mb-1">
                            Dateien für {dept.name} hochladen
                          </p>
                          <p className="text-xs text-slate-500">
                            PDF, DOCX, XLSX (Max 25MB)
                          </p>
                        </div>
                        <div className="flex gap-2 mt-2 w-full max-w-xs">
                          <Select>
                            <SelectTrigger className="bg-slate-950 border-slate-700 rounded-lg text-xs text-white px-3 py-2 flex-1 focus:border-blue-500 outline-none">
                              <SelectValue placeholder="Dokumenttyp wählen..." />
                            </SelectTrigger>
                            <SelectContent>
                              {kbDocTypes.map((t) => (
                                <SelectItem key={t} value={t}>
                                  {t}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <Button
                            onClick={handleUpload}
                            size="sm"
                            className="text-xs"
                          >
                            Upload
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* File List */}
                    <div>
                      <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-3">
                        Vorhandene Dateien
                      </h4>
                      {files.length > 0 ? (
                        <div className="space-y-2">
                          {files.map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-slate-600 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <FileText className="w-4 h-4 text-slate-400" />
                                <div>
                                  <p className="text-xs font-bold text-white">
                                    {f.name}
                                  </p>
                                  <p className="text-[10px] text-slate-500">
                                    {f.type} • {f.date}
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-slate-700 text-slate-300">
                                  {f.status}
                                </span>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="w-7 h-7"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-xs text-slate-600 italic">
                          Noch keine Dokumente für diesen Bereich hochgeladen.
                        </p>
                      )}
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
