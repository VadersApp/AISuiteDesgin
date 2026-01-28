'use client';

import { useParams } from 'next/navigation';

export default function BusinessBuilderRunPage() {
    const params = useParams();
    const { runId } = params;

    return (
        <div>
            <h1>Run-Ergebnisse für ID: {runId}</h1>
            <p>Hier werden die detaillierten Ergebnisse des Business Builder Laufs angezeigt.</p>
        </div>
    )
}
