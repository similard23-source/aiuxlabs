import { useState } from 'react';

export default function SignupForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus('');

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const payload = await res.json();
    setLoading(false);

    if (!res.ok) {
      setStatus(payload.error ?? 'Signup failed.');
      return;
    }

    if (payload.needsEmailConfirm) {
      setStatus('Акаунт створено. Підтверди email і потім увійди в акаунт.');
      return;
    }

    window.location.href = '/dashboard';
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <label className="block text-sm"><span>Email</span><input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label className="block text-sm"><span>Password</span><input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button className="w-full rounded bg-brand-600 px-4 py-2 font-semibold text-white disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      {status ? <p className="text-sm text-slate-600">{status}</p> : null}
    </form>
  );
}
