import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";

const safeCookies = () => {
  try {
    return cookies();
  } catch {
    return { getAll: () => [], set: () => {} };
  }
};

export const createClient = (
  cookieStore?: ReturnType<typeof cookies> | any,
) => {
  const store: any = cookieStore ?? safeCookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return store.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              store.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
