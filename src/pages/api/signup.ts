import type { APIRoute } from 'astro';
import { supabaseServer } from '@/lib/supabaseServer';

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies, url }) => {
  const { email, password } = await request.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ error: 'Email and password are required.' }), { status: 400 });
  }

  const { data, error } = await supabaseServer.auth.signUp({ email, password });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  if (!data.session) {
    return new Response(JSON.stringify({ ok: true, needsEmailConfirm: true }), { status: 200 });
  }

  const secure = url.protocol === 'https:';
  cookies.set('sb-access-token', data.session.access_token, { path: '/', httpOnly: true, sameSite: 'lax', secure, maxAge: data.session.expires_in });
  cookies.set('sb-refresh-token', data.session.refresh_token, { path: '/', httpOnly: true, sameSite: 'lax', secure, maxAge: 60 * 60 * 24 * 30 });

  return new Response(JSON.stringify({ ok: true, needsEmailConfirm: false }), { status: 200 });
};
