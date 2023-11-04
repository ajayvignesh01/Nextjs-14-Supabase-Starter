import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
    const { supabase, response } = createClient(request)

    // Handle code exchange if needed (replace auth/callback/route.ts)
    const reqUrl = new URL(request.url)
    const code = reqUrl.searchParams.get('code')
    if (code) { await supabase.auth.exchangeCodeForSession(code) }

    await supabase.auth.getSession()

    return response
}
