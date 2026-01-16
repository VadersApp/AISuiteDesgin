'use client';
import { Bot, Send, MessageSquare } from "lucide-react";

export default function ChatPage() {

    const sendMessage = () => {
        const input = document.getElementById('chat-input') as HTMLInputElement;
        const msg = input.value;
        if (!msg) return;
        const chat = document.getElementById('chat-messages');
        if (!chat) return;

        const userMessage = document.createElement('div');
        userMessage.className = "flex justify-end animate-in slide-in-from-bottom-2 duration-300";
        userMessage.innerHTML = `<div class="max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm bg-primary text-primary-foreground shadow-lg rounded-tr-none">${msg}</div>`;
        chat.appendChild(userMessage);
        
        input.value = '';
        chat.scrollTop = chat.scrollHeight;

        setTimeout(() => {
             const typingId = 'typing-' + Date.now();
             const typingElement = document.createElement('div');
             typingElement.id = typingId;
             typingElement.className = "flex justify-start animate-in slide-in-from-bottom-2 duration-300";
             typingElement.innerHTML = `
                <div class="p-4 rounded-2xl text-sm bg-muted text-muted-foreground border border-border rounded-tl-none flex gap-1 items-center">
                    <span class="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce"></span>
                    <span class="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce delay-75" style="animation-delay: 75ms;"></span>
                    <span class="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full animate-bounce delay-150" style="animation-delay: 150ms;"></span>
                </div>`;
             chat.appendChild(typingElement);
             chat.scrollTop = chat.scrollHeight;

             setTimeout(() => {
                const typingMessage = document.getElementById(typingId);
                if (typingMessage) {
                    typingMessage.remove();
                }
                const responseElement = document.createElement('div');
                responseElement.className = "flex justify-start animate-in slide-in-from-bottom-2 duration-300";
                responseElement.innerHTML = `
                    <div class="max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm bg-muted text-foreground border border-border rounded-tl-none">
                        <span class="block text-[10px] font-bold text-primary mb-1 uppercase">Ava Assist</span>
                        Ich habe Ihre Anfrage verstanden. Ich analysiere die Datenbank und melde mich gleich mit einer Lösung.
                    </div>`;
                chat.appendChild(responseElement);
                chat.scrollTop = chat.scrollHeight;
             }, 1500);
        }, 400);
    }

  return (
    <div className="flex flex-col flex-1 gap-6">
        <div className="flex-1 flex flex-col overflow-hidden bg-card/50 border border-border rounded-2xl relative shadow-2xl backdrop-blur-lg">
            <div className="p-4 border-b border-border bg-card/80 backdrop-blur-lg flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/50"><MessageSquare className="w-4 h-4" /></div>
                <div>
                    <p className="text-sm font-bold text-foreground">QORE Chat</p>
                    <p className="text-[10px] text-emerald-400 font-medium">8 Agents online</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-6 custom-scrollbar" id="chat-messages">
                <div className="flex justify-start">
                    <div className="max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm bg-muted text-foreground border border-border rounded-tl-none">Willkommen bei der QORE Kommunikation. Wie kann ich heute helfen?</div>
                </div>
            </div>
            <div className="p-4 bg-card/50 border-t border-border">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <input type="text" id="chat-input" placeholder="Frag deine QORE..." className="flex-1 bg-background/80 border border-input rounded-xl px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary transition-colors" onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
                    <button onClick={sendMessage} className="p-3 bg-primary text-primary-foreground rounded-xl shadow-lg hover:bg-primary/90 transition-all hover:scale-105 active:scale-95"><Send className="w-5 h-5" /></button>
                </div>
            </div>
        </div>
    </div>
  );
}
