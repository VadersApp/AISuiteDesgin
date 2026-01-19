import Link from 'next/link';

export function ManagementActions() {
    return (
        <div className="bg-rose-500/[0.02] border border-rose-500/10 rounded-2xl p-6 backdrop-blur-lg">
            <h2 className="text-lg font-semibold text-white mb-6">Management</h2>
            <Link href="/dashboard/system-alerts/esc-2910" className="block p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 hover:ring-2 ring-rose-500/50 transition-all cursor-pointer">
                <p className="text-xs font-bold text-rose-400 uppercase mb-1">Eskalation</p>
                <p className="text-sm text-white font-medium mb-2">Vertragskündigung erkannt</p>
                <div className="w-full block text-center py-2 bg-rose-600 text-white rounded-lg text-xs font-bold hover:bg-rose-500 transition-colors">Prüfen</div>
            </Link>
            <Link href="/dashboard/system-alerts/warn-api-limit" className="block mt-4 p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 hover:ring-2 ring-amber-500/50 transition-all cursor-pointer">
                <p className="text-xs font-bold text-amber-400 uppercase mb-1">Systemwarnung</p>
                <p className="text-sm text-white font-medium mb-2">API Limit bei 90%</p>
                <div className="w-full py-2 bg-amber-600/20 text-amber-500 border border-amber-500/50 rounded-lg text-xs font-bold hover:bg-amber-600/30 transition-colors">Upgrade</div>
            </Link>
        </div>
    )
}
