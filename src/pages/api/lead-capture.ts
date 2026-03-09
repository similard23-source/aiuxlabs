import type { APIRoute } from 'astro';
import { hasSupabaseServerEnv, supabaseServer } from '@/lib/supabaseServer';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  if (!hasSupabaseServerEnv || !supabaseServer) {
    return new Response(JSON.stringify({ error: 'Supabase env vars are missing on server.' }), { status: 500 });
  }

  const { email, sourcePage } = await request.json();

  if (!email || !sourcePage) {
    return new Response(JSON.stringify({ error: 'Email and source page are required.' }), { status: 400 });
  }

  const { error } = await supabaseServer.from('lead_captures').insert({
    email,
    source_page: sourcePage
  });

  if (error && !error.message.includes('duplicate key')) {
    return new Response(JSON.stringify({ error: error.message }), { status: 400 });
  }

  return new Response(JSON.stringify({ ok: true }), { status: 200 });
};
