"use client";

import { Bot, Send, User, CornerDownLeft, CircleDashed } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState, useRef, FormEvent, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Card } from "../ui/card";

type Message = {
  id: number;
  sender: "user" | "ai";
  text: string;
};

type ChatInterfaceProps = {
  initialPrompts: string[];
};

export function ChatInterface({ initialPrompts }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: messageText,
    };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: Date.now() + 1,
        sender: "ai",
        text: `This is a simulated response to: "${messageText}". In a real application, this would be a response from a GenAI model.`,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSendMessage(input);
    setInput("");
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
        const viewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
        if (viewport) {
            viewport.scrollTop = viewport.scrollHeight;
        }
    }
  }, [messages]);

  return (
    <div className="flex flex-col h-full bg-transparent">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.length === 0 && (
             <div className="flex flex-col items-center justify-center h-full text-center">
                <Bot className="w-16 h-16 text-primary mb-4"/>
                <h2 className="text-2xl font-semibold">How can I help you today?</h2>
             </div>
          )}
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex items-start gap-4",
                message.sender === "user" ? "justify-end" : ""
              )}
            >
              {message.sender === "ai" && (
                <Avatar className="h-9 w-9 border border-primary">
                  <AvatarFallback>
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "max-w-md rounded-xl px-4 py-3 text-sm",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p>{message.text}</p>
              </div>
              {message.sender === "user" && (
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    <User className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isLoading && (
             <div className="flex items-start gap-4">
                <Avatar className="h-9 w-9 border border-primary">
                  <AvatarFallback>
                    <Bot className="h-5 w-5" />
                  </AvatarFallback>
                </Avatar>
                <div className="max-w-md rounded-xl px-4 py-3 bg-muted flex items-center">
                    <CircleDashed className="h-5 w-5 animate-spin"/>
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 pt-0">
        {messages.length === 0 && (
           <div className="grid grid-cols-2 gap-2 mb-4">
            {initialPrompts.slice(0, 4).map((prompt, i) => (
                <Card key={i} className="p-3 text-sm cursor-pointer hover:bg-muted" onClick={() => handleSendMessage(prompt)}>
                    {prompt}
                </Card>
            ))}
           </div>
        )}
        <Card className="relative">
          <form onSubmit={handleSubmit}>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="pr-20 min-h-[4rem] border-0 focus-visible:ring-0 shadow-none resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSubmit(e);
                }
              }}
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
              <span className="text-xs text-muted-foreground hidden md:inline-flex items-center gap-1">
                <CornerDownLeft className="w-3 h-3"/> Send
              </span>
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
