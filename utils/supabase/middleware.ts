import {createMiddlewareClient} from "@supabase/auth-helpers-nextjs";
import {NextRequest, NextResponse} from "next/server";

export const createClient = (req: NextRequest) => {
  const response = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res: response })

  return { supabase, response }
}
