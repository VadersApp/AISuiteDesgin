export default function WorkflowStudioPage() {
  const tabs = [
    "Alle Workflows",
    "Aktiv",
    "Inaktiv",
    "Entwürfe",
    "Archiviert",
  ];
  return (
    <div className="space-y-8 pb-20">
      <header>
        <h1 className="text-3xl font-bold text-white tracking-tight">
          Workflow Studio
        </h1>
        <p className="text-slate-400">Automatisierungscenter.</p>
      </header>
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {tabs.map((t, i) => (
          <button
            key={t}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all border ${
              i === 0
                ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-900/20"
                : "bg-[#1E293B]/50 border-slate-700/50 text-slate-500 hover:text-white hover:bg-slate-800"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
      <div className="h-64 bg-slate-950 border border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-600 gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-t-blue-500 border-slate-800 animate-spin"></div>
        <p className="italic text-sm">Workflow Studio Engine wird geladen...</p>
      </div>
    </div>
  );
}
