import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { User, Bell, Palette, KeyRound, Shield, Pencil, Trash2 } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Einstellungen
        </h1>
        <p className="text-muted-foreground">
          Verwalten Sie Ihr Konto und die Systemeinstellungen.
        </p>
      </header>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 bg-muted/50 h-auto p-1.5">
          <TabsTrigger value="profile" className="py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground">
            <User className="w-4 h-4 mr-2" />
            Profil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground">
            <Bell className="w-4 h-4 mr-2" />
            Benachrichtigungen
          </TabsTrigger>
          <TabsTrigger value="appearance" className="py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground">
            <Palette className="w-4 h-4 mr-2" />
            Darstellung
          </TabsTrigger>
          <TabsTrigger value="security" className="py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground">
            <Shield className="w-4 h-4 mr-2" />
            Sicherheit
          </TabsTrigger>
          <TabsTrigger value="api" className="py-2.5 data-[state=active]:bg-background data-[state=active]:text-foreground">
            <KeyRound className="w-4 h-4 mr-2" />
            API-Schlüssel
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Profil-Einstellungen</CardTitle>
              <CardDescription>
                Aktualisieren Sie hier Ihre persönlichen Daten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                 <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-600 to-slate-400 flex-shrink-0"></div>
                 <div>
                    <h3 className="text-lg font-bold text-foreground">Dr. Müller</h3>
                    <p className="text-sm text-muted-foreground">CEO</p>
                 </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" defaultValue="Dr. Müller" className="bg-input" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-Mail</Label>
                  <Input id="email" type="email" defaultValue="ceo@aisuite.de" disabled className="bg-muted disabled:opacity-70" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border px-6 py-4 justify-end">
              <Button>Änderungen speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Benachrichtigungen</CardTitle>
              <CardDescription>
                Wählen Sie, wie Sie benachrichtigt werden möchten.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                   <div>
                       <Label htmlFor="email-notifications" className="font-bold text-foreground">E-Mail Benachrichtigungen</Label>
                       <p className="text-xs text-muted-foreground">Zusammenfassungen und wichtige Alerts per Mail erhalten.</p>
                   </div>
                   <Switch id="email-notifications" defaultChecked />
               </div>
               <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                   <div>
                       <Label htmlFor="push-notifications" className="font-bold text-foreground">Push-Benachrichtigungen</Label>
                       <p className="text-xs text-muted-foreground">System-Updates und Eskalationen sofort sehen. (In-App)</p>
                   </div>
                   <Switch id="push-notifications" defaultChecked />
               </div>
               <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                   <div>
                       <Label htmlFor="task-notifications" className="font-bold text-foreground">Neue Aufgaben</Label>
                       <p className="text-xs text-muted-foreground">Benachrichtigen, wenn eine KI eine neue Aufgabe erstellt.</p>
                   </div>
                   <Switch id="task-notifications" />
               </div>
            </CardContent>
            <CardFooter className="border-t border-border px-6 py-4 justify-end">
              <Button>Einstellungen speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Tab */}
        <TabsContent value="appearance">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Darstellung</CardTitle>
              <CardDescription>
                Passen Sie das Aussehen der AISUITE an.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Theme</Label>
                 <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                   <div>
                       <p className="font-bold text-foreground">Dark Mode</p>
                       <p className="text-xs text-muted-foreground">Derzeit ist nur der Dark Mode verfügbar.</p>
                   </div>
                   <Switch checked disabled />
               </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Sicherheit</CardTitle>
              <CardDescription>
                Verwalten Sie Ihre Sicherheitseinstellungen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                   <div>
                       <Label className="font-bold text-foreground">Passwort ändern</Label>
                       <p className="text-xs text-muted-foreground">Ändern Sie regelmäßig Ihr Passwort für mehr Sicherheit.</p>
                   </div>
                   <Button variant="outline">Passwort ändern</Button>
               </div>
               <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                   <div>
                       <Label htmlFor="2fa" className="font-bold text-foreground">Zwei-Faktor-Authentifizierung (2FA)</Label>
                       <p className="text-xs text-muted-foreground">Fügen Sie eine zusätzliche Sicherheitsebene hinzu.</p>
                   </div>
                   <Switch id="2fa" />
               </div>
            </CardContent>
             <CardFooter className="border-t border-border px-6 py-4 justify-end">
              <Button>Sicherheitseinstellungen speichern</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        
        {/* API Tab */}
        <TabsContent value="api">
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>API-Schlüssel</CardTitle>
              <CardDescription>
                Verwalten Sie Ihre API-Schlüssel für Integrationen.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                <div>
                  <p className="font-bold text-foreground font-mono text-sm">sk-.....-a1b2</p>
                  <p className="text-xs text-muted-foreground">Google Gemini API (LLM Provider)</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-emerald-900/50 text-emerald-400 border border-emerald-500/20">Aktiv</span>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-foreground"><Pencil className="w-4 h-4"/></Button>
                  <Button variant="ghost" size="icon" className="w-8 h-8 text-muted-foreground hover:text-rose-400"><Trash2 className="w-4 h-4"/></Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="border-t border-border px-6 py-4 justify-end">
              <Button>Neuen API-Schlüssel erstellen</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
