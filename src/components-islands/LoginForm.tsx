import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const payload = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(payload.error ?? 'Login failed.');
      return;
    }

    window.location.href = '/dashboard';
  }

  return (
    <form className="space-y-3" onSubmit={onSubmit}>
      <label className="block text-sm"><span>Email</span><input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label className="block text-sm"><span>Password</span><input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} /></label>
      <button className="w-full rounded bg-brand-600 px-4 py-2 font-semibold text-white disabled:opacity-60" type="submit" disabled={loading}>{loading ? 'Logging in...' : 'Log in'}</button>
      {error ? <p className="text-sm text-red-700">{error}</p> : null}
    </form>
  );
}
