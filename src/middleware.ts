import type { MiddlewareHandler } from 'astro';
import { supabaseServer } from '@/lib/supabaseServer';

const AUTH_ONLY_ROUTES = ['/dashboard'];
const GUEST_ONLY_ROUTES = ['/login', '/signup'];

export const onRequest: MiddlewareHandler = async (context, next) => {
  const pathname = context.url.pathname;
  const accessToken = context.cookies.get('sb-access-token')?.value;

  let isAuthed = false;
  let userEmail: string | null = null;

  if (accessToken) {
    const { data, error } = await supabaseServer.auth.getUser(accessToken);
    if (!error && data.user) {
      isAuthed = true;
      userEmail = data.user.email ?? null;
    }
  }

  context.locals.userEmail = userEmail;

  if (AUTH_ONLY_ROUTES.includes(pathname) && !isAuthed) {
    return context.redirect('/login');
  }

  if (GUEST_ONLY_ROUTES.includes(pathname) && isAuthed) {
    return context.redirect('/dashboard');
  }

  return next();
};
