'use server'

import {createClient} from "@/utils/supabase/server";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";

export const signIn = async (formData: FormData) => {
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/')
}

export const signUp = async (formData: FormData) => {
    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email to continue sign in process')
}

export const signInWithEmail = async (formData: FormData) => {
    const origin = headers().get('origin')
    const email = formData.get('email') as string
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
            emailRedirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect('/login?message=Check email for login link')
}

export const signInWithGoogle = async () => {
    const origin = headers().get('origin')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { url }, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }
    return redirect(url!)
}

export const signInWithGithub = async () => {
    const origin = headers().get('origin')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { url }, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect(url!)
}

export const signInWithDiscord = async () => {
    const origin = headers().get('origin')
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { url }, error } = await supabase.auth.signInWithOAuth({
        provider: "discord",
        options: {
            redirectTo: `${origin}/auth/callback`,
        },
    })

    if (error) {
        return redirect('/login?message=Could not authenticate user')
    }

    return redirect(url!)
}