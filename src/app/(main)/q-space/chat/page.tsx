'use client';

import { useState, Suspense, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  MessageSquare,
  ArrowLeft,
  Search as SearchIcon,
  Plus,
  X,
  Bot as BotIcon,
  CheckSquare,
  Folder,
  Flame,
  Users,
  User as UserIcon,
  Send,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import {
  kpiMitarbeiter,
  chatThreads,
  chatMessages,
  teamChatsData,
} from '@/lib/data';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';

const ChatContent = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const threadIdFromParams = searchParams.get('threadId');

  const [activeThreadId, setActiveThreadId] = useState<string | null>(
    threadIdFromParams
  );
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('threads');

  const threads = chatThreads;
  const messages = activeThreadId ? chatMessages[activeThreadId] || [] : [];
  const activeThread = threads.find((t) => t.id === activeThreadId);

  const handleThreadSelect = (threadId: string | null) => {
    setActiveThreadId(threadId);
    // Also update URL but without full navigation
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (threadId) {
      newSearchParams.set('threadId', threadId);
    } else {
      newSearchParams.delete('threadId');
    }
    router.replace(`/q-space/chat?${newSearchParams.toString()}`);
  };

  const getContextIcon = (contextType: string) => {
    switch (contextType) {
      case 'task':
        return <CheckSquare className="w-3 h-3" />;
      case 'project':
        return <Folder className="w-3 h-3" />;
      case 'escalation':
        return <Flame className="w-3 h-3" />;
      case 'team':
        return <Users className="w-3 h-3" />;
      case 'dm':
        return <UserIcon className="w-3 h-3" />;
      default:
        return <MessageSquare className="w-3 h-3" />;
    }
  };

  const getContextDisplay = (contextType: string) => {
    switch (contextType) {
      case 'task': return 'Projekte · Aufgabe';
      case 'project': return 'Projekte · Projekt';
      case 'escalation': return 'Projekte · Eskalation';
      case 'thread': return 'Projekte';
      case 'team': return 'Team-Chat';
      case 'dm': return 'Direktnachricht';
      default: return contextType;
    }
  };

  const getContextUrl = (thread: (typeof threads)[0] | undefined) => {
      if (!thread) return '/q-space';
      switch (thread.contextType) {
          case 'task':
              // Assuming a structure like /workspace/tasks/{taskId}
              // This is a placeholder as the exact route is not defined in the prompt.
              return `/q-space/workspace/tasks`;
          case 'project':
               return `/q-space/workspace/projects`;
          case 'escalation':
              return `/dashboard/system-alerts/${thread.contextId}`;
          default:
              return '/q-space';
      }
  }

  const filteredThreads = useMemo(() => {
    return threads.filter(t => {
      if (t.isArchived) return false;

      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = t.title.toLowerCase().includes(searchTermLower) || t.lastMessageSnippet.toLowerCase().includes(searchTermLower);

      if (!matchesSearch) return false;

      switch (activeTab) {
        case 'threads':
          return ['task', 'project', 'escalation', 'thread'].includes(t.contextType);
        case 'teams':
          return t.contextType === 'team';
        case 'direkt':
          return t.contextType === 'dm';
        default:
          return true; // Should not happen
      }
    });
  }, [threads, searchTerm, activeTab]);

  return (
    <div className="grid grid-cols-12 gap-6 h-full">
      {/* Left Column: Inbox */}
      <Card className="col-span-12 md:col-span-4 flex flex-col h-full">
        <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
              <Button variant="outline" size="icon" asChild className="h-8 w-8">
                  <Link href="/q-space">
                      <ArrowLeft className="w-4 h-4" />
                  </Link>
              </Button>
              <CardTitle className="text-lg">Chat</CardTitle>
          </div>
        </CardHeader>
        <div className="p-4 border-b border-border">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="threads">Projekte</TabsTrigger>
              <TabsTrigger value="teams">Teams</TabsTrigger>
              <TabsTrigger value="direkt">Direkt</TabsTrigger>
            </TabsList>
            <div className="relative mt-4">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Suchen..." className="pl-9 bg-input" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
            </div>
          </Tabs>
        </div>
        <ScrollArea className="flex-1">
             <div className="p-2 space-y-1">
                {filteredThreads.length > 0 ? filteredThreads.map((thread) => (
                    <div 
                        key={thread.id} 
                        onClick={() => handleThreadSelect(thread.id)} 
                        className={cn(
                            "p-3 rounded-lg hover:bg-muted cursor-pointer",
                            activeThreadId === thread.id && "bg-muted"
                        )}
                    >
                        <div className="flex justify-between items-start">
                            <p className="font-bold text-sm text-foreground line-clamp-1 flex items-center gap-2">
                                {getContextIcon(thread.contextType)} {thread.title}
                            </p>
                            {thread.unreadCount > 0 && (<Badge className="bg-primary">{thread.unreadCount}</Badge>)}
                        </div>
                        <p className="text-xs text-muted-foreground line-clamp-1 mt-1">{thread.lastMessageSnippet}</p>
                    </div>
                )) : (
                  <div className="text-center p-8 text-sm text-muted-foreground italic">
                    Keine Konversationen in dieser Ansicht.
                  </div>
                )}
            </div>
        </ScrollArea>
        <div className="p-4 border-t border-border mt-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" /> Neue Nachricht
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[385px]">
              <DropdownMenuItem>Neues Projekt</DropdownMenuItem>
              <DropdownMenuItem>Neuer Team-Chat</DropdownMenuItem>
              <DropdownMenuItem>Neue Direktnachricht</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>

      {/* Right Column: Active Chat */}
      <Card className="col-span-12 md:col-span-8 flex flex-col h-full">
        {activeThread ? (
          <>
            <CardHeader className="p-4 border-b border-border flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base">{activeThread.title}</CardTitle>
                <p className="text-xs text-muted-foreground">
                  {getContextDisplay(activeThread.contextType)}
                </p>
              </div>
              <Button asChild variant="outline">
                <Link href={getContextUrl(activeThread)}>
                    Zum Kontext
                </Link>
              </Button>
            </CardHeader>
            <ScrollArea className="flex-1 p-4 bg-muted/20">
              <div className="space-y-4">
                {messages.map((msg: any) => (
                  <div
                    key={msg.id}
                    className={cn(
                      'flex items-start gap-3',
                      msg.sender.name === 'Dr. Müller' && 'justify-end'
                    )}
                  >
                    {msg.sender.name !== 'Dr. Müller' && (
                      <Avatar className="w-8 h-8 border">
                        <AvatarFallback>
                          {msg.sender.avatar === 'Bot' ? (
                            <BotIcon className="w-4 h-4" />
                          ) : (
                            msg.sender.avatar
                          )}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        'max-w-md p-3 rounded-xl text-sm shadow-sm',
                        msg.type === 'system' &&
                          'text-center w-full text-xs text-muted-foreground italic bg-transparent shadow-none',
                        msg.type === 'ai_summary' &&
                          'bg-blue-500/10 border border-blue-500/20 text-blue-300',
                        msg.type === 'user' &&
                          (msg.sender.name === 'Dr. Müller'
                            ? 'bg-primary text-primary-foreground rounded-br-none'
                            : 'bg-card border border-border rounded-bl-none')
                      )}
                    >
                      {msg.type !== 'system' && (
                        <p
                          className={cn(
                            'text-xs font-bold mb-1',
                            msg.sender.name === 'Dr. Müller'
                              ? 'text-primary-foreground/80'
                              : 'text-foreground/80'
                          )}
                        >
                          {msg.sender.name}
                        </p>
                      )}
                      <p>{msg.text}</p>
                    </div>
                    {msg.sender.name === 'Dr. Müller' && (
                      <Avatar className="w-8 h-8">
                        <AvatarFallback>DM</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="p-4 border-t border-border mt-auto bg-card">
              <div className="relative">
                <Textarea
                  placeholder="Nachricht..."
                  className="bg-input pr-12"
                  rows={1}
                />
                <Button
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <MessageSquare className="w-12 h-12 mb-4" />
            <p className="font-bold">Kein Chat ausgewählt</p>
            <p className="text-sm">Wählen Sie links eine Konversation aus.</p>
          </div>
        )}
      </Card>
    </div>
  );
};

export default function QSpaceChatPage() {
  return (
    <div className="h-[calc(100vh-8rem-3rem)]">
      <Suspense fallback={<div>Loading...</div>}>
        <ChatContent />
      </Suspense>
    </div>
  );
}
