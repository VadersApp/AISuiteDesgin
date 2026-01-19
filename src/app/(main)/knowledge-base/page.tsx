'use client';

import { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
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
import { Folder, Upload, FileText, Download, Package, FolderCheck, FolderX } from 'lucide-react';
import { Input } from '@/components/ui/input';

export default function KnowledgeBasePage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    toast({
      title: 'Upload gestartet',
      description: 'Ihr Mock-Upload wurde gestartet.',
    });
    setSelectedFile(null);
  };
  
  // Calculate stats
  const allFiles = Object.values(mockKbFiles).flat();
  const totalStorageUsed = allFiles.reduce((acc, file) => acc + (file.size || 0), 0);
  const maxStorage = 50 * 1024; // 50 GB in MB
  const storagePercentage = (totalStorageUsed / maxStorage) * 100;
  const departmentsWithData = Object.keys(mockKbFiles).filter(key => mockKbFiles[key]?.length > 0).length;
  const departmentsWithoutData = kbDepartments.length - departmentsWithData;

  const kpiStats = [
      { title: 'Gesamter Speicher genutzt', value: `${(totalStorageUsed / 1024).toFixed(1)} GB / 50 GB`, icon: Package, progress: storagePercentage },
      { title: 'Dateien gesamt', value: allFiles.length, icon: FileText },
      { title: 'Abteilungen mit Wissen', value: departmentsWithData, icon: FolderCheck },
      { title: 'Abteilungen ohne Wissen', value: departmentsWithoutData, icon: FolderX },
  ];

  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Wissensdatenbank
        </h1>
        <p className="text-muted-foreground italic">
          Das zentrale Gehirn von QORE.
        </p>
      </header>

      {/* Upload-Zentrale */}
      <Card className="p-6">
        <h2 className="text-lg font-bold text-foreground mb-4">Upload-Zentrale</h2>
        <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 hover:bg-accent/50 transition-all">
            <Input id="global-upload" type="file" className="hidden" onChange={handleFileChange} />
            <label htmlFor="global-upload" className="cursor-pointer">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="p-3 bg-muted rounded-full text-muted-foreground">
                  <Upload className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-sm font-bold text-foreground mb-1">
                    {selectedFile ? selectedFile.name : 'Datei auswählen oder hier ablegen'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    PDF, DOCX, XLSX, etc. (Max 25MB)
                  </p>
                </div>
              </div>
            </label>
        </div>
        {selectedFile && (
             <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Select required>
                    <SelectTrigger className="w-full sm:w-auto flex-1 bg-input">
                        <SelectValue placeholder="Abteilung auswählen..." />
                    </SelectTrigger>
                    <SelectContent>
                        {kbDepartments.map(d => (
                            <SelectItem key={d.slug} value={d.slug}>{d.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Button onClick={handleUpload} className="w-full sm:w-auto">
                    <Upload className="mr-2 h-4 w-4" /> Wissen hochladen
                </Button>
            </div>
        )}
      </Card>
      
      {/* Wissens-Status Dashboard */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiStats.map(stat => {
              const Icon = stat.icon;
              return (
              <Card key={stat.title} className="p-4 flex flex-col gap-2">
                 <div className="flex items-center gap-3">
                    <div className="p-2 w-fit rounded-xl bg-blue-500/10 text-blue-400">
                        <Icon className="w-4 h-4" />
                    </div>
                     <p className="text-muted-foreground text-[10px] font-bold uppercase tracking-wide flex-1">{stat.title}</p>
                 </div>
                 <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                 {stat.progress !== undefined && <Progress value={stat.progress} className="h-2" />}
              </Card>
          )})}
      </div>

      <div className="mt-12 pt-8 border-t border-border">
        <header className="mb-6">
          <h2 className="text-2xl font-bold text-foreground tracking-tight mb-2">
            Abteilungs-Wissensübersicht
          </h2>
          <p className="text-muted-foreground text-sm">
            Verwalte das Wissen für jede Abteilung, um die kontextbezogene Arbeit der KI sicherzustellen.
          </p>
        </header>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {kbDepartments.map((dept) => {
            const files = mockKbFiles[dept.slug] || [];
            const hasFiles = files.length > 0;
            const badgeColor = hasFiles ? 'emerald' : 'amber';
            const badgeText = hasFiles ? 'Vorhanden' : 'Fehlt';
            const deptStorage = files.reduce((acc, file) => acc + (file.size || 0), 0);
            
            return (
              <AccordionItem
                value={dept.slug}
                key={dept.slug}
                className="bg-card/80 border border-border rounded-xl overflow-hidden"
              >
                <AccordionTrigger className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-accent/80 text-left transition-colors hover:no-underline">
                  <div className="flex items-center gap-3 min-w-0">
                    <Folder className="w-5 h-5 text-blue-400 shrink-0" />
                    <div className="min-w-0">
                        <span className="text-sm font-bold text-foreground truncate">
                          {dept.name}
                        </span>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                            <span>{files.length} Dateien</span>
                            <span>•</span>
                            <span>{deptStorage.toFixed(1)} MB</span>
                        </div>
                    </div>
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
                  <div className="p-6 bg-background/50 space-y-6">
                     <p className="text-xs italic text-muted-foreground text-center bg-muted/30 p-2 rounded-md">Diese Dokumente werden genutzt, damit die KI in diesem Kontext korrekt arbeiten kann.</p>
                     
                    {/* File List */}
                    <div>
                      <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-3">
                        Vorhandene Dateien
                      </h4>
                      {files.length > 0 ? (
                        <div className="space-y-2">
                          {files.map((f, i) => (
                            <div
                              key={i}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border hover:border-border/80 transition-colors"
                            >
                              <div className="flex items-center gap-3 min-w-0">
                                <FileText className="w-4 h-4 text-muted-foreground shrink-0" />
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-foreground truncate" title={f.name}>
                                    {f.name}
                                  </p>
                                  <p className="text-[10px] text-muted-foreground">
                                    {f.type} • {f.date} • {f.size || 0} MB
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-[9px] uppercase px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">
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
                        <p className="text-xs text-muted-foreground italic text-center py-4">
                          Noch keine Dokumente für diesen Bereich hochgeladen.
                        </p>
                      )}
                    </div>
                     <div className="pt-6 border-t border-border">
                        <Button variant="outline" className="w-full">
                            <Upload className="mr-2 h-4 w-4" /> Weitere Dateien für {dept.name} hochladen
                        </Button>
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
