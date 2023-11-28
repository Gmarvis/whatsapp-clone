// import { createClient } from "@/utils/supabase/server";
// import { NextResponse } from "next/server";
// import { cookies } from "next/headers";

// import { type CookieOptions, createServerClient } from "@supabase/ssr";

// export async function GET(request: Request) {
//   //* old code to uncomment is case oauth not working
//   const requestUrl = new URL(request.url);
//   const code = requestUrl.searchParams.get("code");

//   console.log(requestUrl);

//   if (code) {
//     const cookieStore = cookies();
//     const supabase = createClient(cookieStore);
//     await supabase.auth.exchangeCodeForSession(code);
//   }

//   // URL to redirect to after sign in process completes
//   return NextResponse.redirect(requestUrl.origin);

// }

//* google Oauth
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  // const next = searchParams.get("next") ?? "/";
  if (code) {
    const cookieStore = cookies();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value;
          },
          set(name: string, value: string, options: CookieOptions) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name: string, options: CookieOptions) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}`);
    }
  }

  // return the user to an error page with instruction
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}




