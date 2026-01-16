import { BotList } from "@/components/agents/bot-list";

export default function AgentsPage() {
  return (
    <div className="space-y-8 pb-10">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          KI-Mitarbeiter
        </h1>
        <p className="text-slate-400">
          Ihre digitale Expertenbelegschaft der AISUITE.
        </p>
      </header>
      <BotList />
    </div>
  );
}
