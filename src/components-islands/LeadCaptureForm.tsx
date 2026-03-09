import { useState } from 'react';

type Props = {
  sourcePage: string;
  buttonLabel?: string;
};

export default function LeadCaptureForm({ sourcePage, buttonLabel = 'Get custom plan' }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    const res = await fetch('/api/lead-capture', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, sourcePage })
    });

    const payload = await res.json();
    setLoading(false);

    if (!res.ok) {
      setStatus(payload.error ?? 'Submission failed.');
      return;
    }

    setEmail('');
    setStatus('Thanks. We saved your request and will contact you.');
  }

  return (
    <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-end">
      <label className="flex-1 text-sm">
        <span className="mb-1 block">Work email</span>
        <input
          type="email"
          required
          className="w-full rounded border border-slate-300 px-3 py-2 text-slate-900"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button
        type="submit"
        disabled={loading}
        className="rounded bg-white px-4 py-2 font-semibold text-brand-700 disabled:opacity-70"
      >
        {loading ? 'Submitting...' : buttonLabel}
      </button>
      {status ? <p className="text-sm text-brand-50 sm:ml-2">{status}</p> : null}
    </form>
  );
}
