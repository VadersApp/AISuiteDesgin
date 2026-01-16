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
        userMessage.innerHTML = `<div class="max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm bg-blue-600 text-white shadow-lg rounded-tr-none">${msg}</div>`;
        chat.appendChild(userMessage);
        
        input.value = '';
        chat.scrollTop = chat.scrollHeight;

        setTimeout(() => {
             const typingId = 'typing-' + Date.now();
             const typingElement = document.createElement('div');
             typingElement.id = typingId;
             typingElement.className = "flex justify-start animate-in slide-in-from-bottom-2 duration-300";
             typingElement.innerHTML = `
                <div class="p-4 rounded-2xl text-sm bg-slate-800/80 text-slate-400 border border-slate-700 rounded-tl-none flex gap-1 items-center">
                    <span class="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce"></span>
                    <span class="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-75" style="animation-delay: 75ms;"></span>
                    <span class="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce delay-150" style="animation-delay: 150ms;"></span>
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
                    <div class="max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none">
                        <span class="block text-[10px] font-bold text-blue-400 mb-1 uppercase">Ava Assist</span>
                        Ich habe Ihre Anfrage verstanden. Ich analysiere die Datenbank und melde mich gleich mit einer Lösung.
                    </div>`;
                chat.appendChild(responseElement);
                chat.scrollTop = chat.scrollHeight;
             }, 1500);
        }, 400);
    }

  return (
    <div className="flex h-[calc(100vh-12rem)] gap-6">
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1E293B]/50 border border-slate-700/50 rounded-2xl relative shadow-2xl">
            <div className="p-4 border-b border-slate-700/50 bg-[#1E293B]/80 backdrop-blur-md flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-900/50"><MessageSquare className="w-4 h-4" /></div>
                <div>
                    <p className="text-sm font-bold text-white">AISUITE Chat</p>
                    <p className="text-[10px] text-emerald-400 font-medium">8 Agents online</p>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-8 pt-6 space-y-6 custom-scrollbar" id="chat-messages">
                <div className="flex justify-start">
                    <div className="max-w-[85%] md:max-w-[70%] p-4 rounded-2xl text-sm bg-slate-800/80 text-slate-200 border border-slate-700 rounded-tl-none">Willkommen bei der AISUITE Kommunikation. Wie kann ich heute helfen?</div>
                </div>
            </div>
            <div className="p-4 bg-slate-900/30 border-t border-slate-700/50">
                <div className="max-w-4xl mx-auto flex gap-3">
                    <input type="text" id="chat-input" placeholder="Frag deine AISUITE..." className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors" onKeyDown={(e) => e.key === 'Enter' && sendMessage()} />
                    <button onClick={sendMessage} className="p-3 bg-blue-600 text-white rounded-xl shadow-lg hover:bg-blue-500 transition-all hover:scale-105 active:scale-95"><Send className="w-5 h-5" /></button>
                </div>
            </div>
        </div>
    </div>
  );
}
