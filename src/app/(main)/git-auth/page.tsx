import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import { ExternalLink, KeyRound } from 'lucide-react';

export default function GitAuthPage() {
  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Git-Authentifizierung einrichten
        </h1>
        <p className="text-muted-foreground">
          Anleitung zur Verwendung von Personal Access Tokens anstelle von Passwörtern.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Das Problem: Passwort-Authentifizierung ist veraltet</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Seit 2021 unterstützen die meisten Git-Plattformen wie GitHub die Authentifizierung per Passwort für Git-Operationen über die Kommandozeile nicht mehr.
            Dies ist eine wichtige Sicherheitsmaßnahme. Wenn Sie versuchen, mit Ihrem Passwort zu pushen, wird dies fehlschlagen.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Die Lösung: Personal Access Token (PAT)</CardTitle>
          <CardDescription>
            Ein Personal Access Token ist ein sicherer, widerrufbarer Ersatz für Ihr Passwort mit definierbaren Berechtigungen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Sie erstellen es in den Einstellungen Ihrer Git-Plattform (z.B. GitHub) und verwenden es, wenn Sie von der Kommandozeile nach Ihrem Passwort gefragt werden.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Anleitung: PAT für GitHub erstellen</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 text-sm">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">1</div>
              <div>
                <p className="font-bold">Gehen Sie zu Ihren Entwicklereinstellungen auf GitHub.</p>
                <Button variant="outline" size="sm" asChild className="mt-2">
                  <Link href="https://github.com/settings/tokens" target="_blank">
                    GitHub Token-Einstellungen öffnen <ExternalLink className="ml-2 h-3 w-3" />
                  </Link>
                </Button>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">2</div>
              <div>
                <p className="font-bold">Erstellen Sie ein neues Token.</p>
                <p className="text-muted-foreground">Klicken Sie auf <span className="font-semibold text-foreground">Generate new token</span> und wählen Sie <span className="font-semibold text-foreground">Generate new token (classic)</span>.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">3</div>
              <div>
                <p className="font-bold">Wählen Sie die Berechtigungen (Scopes).</p>
                <p className="text-muted-foreground">Geben Sie Ihrem Token einen Namen (z.B. "Firebase Studio") und wählen Sie mindestens den <code className="font-mono bg-muted px-1 py-0.5 rounded">repo</code>-Bereich aus. Dies erlaubt das Pushen in Ihre Repositories.</p>
              </div>
            </div>
             <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted flex items-center justify-center font-bold">4</div>
              <div>
                <p className="font-bold">Token generieren und kopieren.</p>
                <p className="text-muted-foreground">Klicken Sie auf <span className="font-semibold text-foreground">Generate token</span>. <strong className="text-destructive">WICHTIG:</strong> Kopieren Sie das Token sofort. Sie werden es aus Sicherheitsgründen nie wieder sehen können. Speichern Sie es an einem sicheren Ort (z. B. ein Passwort-Manager).</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Token verwenden</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Wenn Sie das nächste Mal `git push` ausführen und nach Ihrem Passwort gefragt werden, geben Sie anstelle Ihres Passworts das soeben erstellte Personal Access Token ein.
          </p>
          <div className="p-4 bg-muted/50 rounded-lg border border-border font-mono text-xs sm:text-sm text-foreground overflow-x-auto">
            <p className="text-muted-foreground">$ git push origin main</p>
            <p>Username for 'https://github.com': IHR_BENUTZERNAME</p>
            <p>Password for 'https://IHR_BENUTZERNAME@github.com': <span className="text-primary font-bold">{'{HIER_DAS_TOKEN_EINFÜGEN}'}</span></p>
          </div>
           <div className="mt-4 p-4 rounded-xl bg-blue-500/10 text-blue-300 border border-blue-500/20 text-sm flex items-start gap-3">
             <KeyRound className="w-5 h-5 mt-1 shrink-0"/>
             <div>
                <h4 className="font-bold text-blue-200">Tipp für die Zukunft</h4>
                <p className="text-blue-300/80">Richten Sie einen Credential Helper ein, um das Token sicher zu speichern und nicht bei jedem Push erneut eingeben zu müssen. Anleitungen dazu finden Sie in der Dokumentation Ihrer Git-Plattform.</p>
             </div>
           </div>
        </CardContent>
      </Card>

    </div>
  );
}
