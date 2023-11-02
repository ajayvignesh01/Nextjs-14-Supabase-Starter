"use client"

import {createClient} from "@/utils/supabase/client";
import {getURL} from "@/utils/getURL";
import Link from "next/link";
import {SyntheticEvent, useState} from "react";

export default function More() {
    const supabase = createClient()

    const [email, setEmail] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    async function signInWithEmail(event: SyntheticEvent) {
        event.preventDefault()

        const { data, error } = await supabase.auth.signInWithOtp({
            email: email,
            options: {
                emailRedirectTo: `${getURL()}auth/callback`,  // redirect doesn't seem to matter
            },
        })
        if (error) setMessage('An unknown error occurred');
        if (data) setMessage('Check email for login link')
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${getURL()}auth/callback`,
            },
        })
        if (error) setMessage('An unknown error occurred');
        if (data) setMessage('Redirecting...')
    }

    async function signInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${getURL()}auth/callback`,
            },
        })
        if (error) setMessage('An unknown error occurred');
        if (data) setMessage('Redirecting...')
    }

    async function signInWithDiscord() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${getURL()}auth/callback`,
            },
        })
        if (error) setMessage('An unknown error occurred');
        if (data) setMessage('Redirecting...')
    }  // BROKEN

    return (
        <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
            <Link
                href={"/login"}
                className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
                >
                    <polyline points="15 18 9 12 15 6" />
                </svg>{' '}
                Sign in with Password
            </Link>

            {/* Magic Link */}
            <form onSubmit={signInWithEmail}>
                <div className={'flex items-center w-full space-x-2 text-foreground'}>
                    <input
                        className="flex-grow w-7/10 rounded-md px-4 py-2 bg-inherit border mb-2"
                        name="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <button className="w-3/10 bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                        Sign In
                    </button>
                    </div>
            </form>

            {/* Google */}
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2" onClick={signInWithGoogle}>
                Sign in with Google
            </button>

            {/* Github */}
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2" onClick={signInWithGithub}>
                Sign in with Github
            </button>

            {/* Discord - BROKEN */}
            <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2" onClick={signInWithDiscord}>
                Sign in with Discord
            </button>

            {/* Message */}
            {message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                    {message}
                </p>
            )}
        </div>
    )
}