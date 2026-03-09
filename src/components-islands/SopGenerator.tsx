import { useState } from 'react';
import { buildSopDraft } from '@/lib/sop';

export default function SopGenerator() {
  const [form, setForm] = useState({ processName: 'Weekly inventory sync', goal: 'Keep stock data accurate', ownerRole: 'Ops manager', triggers: 'Every Monday 9:00', toolsUsed: 'Shopify, Sheets', steps: 'Open Shopify export\nUpdate warehouse sheet\nReview mismatches', qaChecks: 'Validate top 20 SKUs', escalationPath: 'Escalate to Head of Ops in Slack' });
  const output = buildSopDraft(form);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        {Object.entries(form).map(([key, value]) => (
          <label key={key} className="block text-sm">
            <span className="mb-1 block font-medium">{key}</span>
            {key === 'steps' ? (
              <textarea className="h-28 w-full rounded border border-slate-300 px-3 py-2" value={value} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} />
            ) : (
              <input className="w-full rounded border border-slate-300 px-3 py-2" value={value} onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.value }))} />
            )}
          </label>
        ))}
      </div>
      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <pre className="whitespace-pre-wrap text-sm">{output}</pre>
        <div className="mt-3 flex gap-2">
          <button className="rounded bg-brand-600 px-3 py-2 text-sm font-semibold text-white" onClick={() => navigator.clipboard.writeText(output)}>Copy</button>
          <button className="rounded border border-slate-300 px-3 py-2 text-sm">Download markdown (soon)</button>
        </div>

        <div className="mt-4 rounded-xl border-2 border-brand-300 bg-brand-100 p-4 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700">Basic mode</p>
          <p className="mt-1 text-sm text-slate-800">
            This is a baseline SOP generator. For advanced templates, richer exports, and progressive workflows, create an account.
          </p>
          <a href="/signup" className="mt-3 inline-block rounded-lg bg-brand-700 px-4 py-2 text-sm font-semibold text-white no-underline">
            Unlock advanced generator
          </a>
        </div>
      </div>
    </div>
  );
}
