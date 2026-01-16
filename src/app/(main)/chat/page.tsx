import { getInitialPrompts } from "@/ai/flows/initial-ai-assistant-prompt";
import { ChatInterface } from "@/components/chat/chat-interface";
import { PageHeader } from "@/components/page-header";

export default async function ChatPage() {
  const { prompts } = await getInitialPrompts();

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <PageHeader
        title="AI Assistant"
        description="Interact with AI agents to get support and automate tasks."
      />
      <div className="flex-1 overflow-hidden">
        <ChatInterface initialPrompts={prompts} />
      </div>
    </div>
  );
}
