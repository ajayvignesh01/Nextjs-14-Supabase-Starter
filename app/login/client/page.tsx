"use client"

import {createClient} from "@/utils/supabase/client";
import {getURL} from "@/utils/getURL";
import Link from "next/link";
import {FormEvent, useState} from "react";
import { useRouter } from 'next/navigation'

export default function Client() {
    const supabase = createClient()

    const router = useRouter()

    const [email, setEmail] = useState<string>('')
    const [magicEmail, setMagicEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    async function signIn(event: FormEvent) {
        event.preventDefault()

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) setMessage('Could not authenticate user');
        if (data) router.push('/')
    }

    async function signUp(event: FormEvent) {
        event.preventDefault()

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${getURL()}auth/callback`
            }
        })

        if (error) setMessage('Could not authenticate user');
        if (data) setMessage('Check email to continue sign in process')
    }

    async function signInWithEmail(event: FormEvent) {
        event.preventDefault()

        const { data, error } = await supabase.auth.signInWithOtp({
            email: magicEmail,
            options: {
                emailRedirectTo: `${getURL()}auth/callback`,
            },
        })
        if (error) setMessage('Could not authenticate user');
        if (data) setMessage('Check email for login link')
    }

    async function signInWithGoogle() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${getURL()}`,
            },
        })
        if (error) setMessage('Could not authenticate user');
        if (data) setMessage('Redirecting...')
    }

    async function signInWithGithub() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
            options: {
                redirectTo: `${getURL()}auth/callback`,
            },
        })
        if (error) setMessage('Could not authenticate user');
        if (data) setMessage('Redirecting...')
    }

    async function signInWithDiscord() {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "discord",
            options: {
                redirectTo: `${getURL()}auth/callback`,
            },
        })
        if (error) setMessage('Could not authenticate user');
        if (data) setMessage('Redirecting...')
    }

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
                Sign in using server
            </Link>
            <div>
                {/* Email & Password */}
                <form
                    className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground"
                    onSubmit={signIn}
                >
                    <label className="text-md" htmlFor="email">
                        Email
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="text-md" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border mb-6"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                        Sign In
                    </button>
                    <button
                        onClick={signUp}
                        className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
                    >
                        Sign Up
                    </button>
                </form>

                {/* OAuth */}
                <form className='animate-in pt-2'>
                    <div className={'flex items-center w-full space-x-2 text-foreground'}>
                        <button onClick={signInWithGoogle} className="flex-grow w-3/9 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2">
                            Google
                        </button>
                        <button onClick={signInWithGithub} className="flex-grow w-3/9 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2">
                            Github
                        </button>
                        <button onClick={signInWithDiscord} className="flex-grow w-3/9 border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2">
                            Discord
                        </button>
                    </div>
                </form>

                {/* Magic Link */}
                <form onSubmit={signInWithEmail}>
                    <div className={'flex items-center w-full animate-in space-x-2 text-foreground'}>
                        <input
                            className="flex-grow rounded-md px-4 py-2 bg-inherit border mb-2"
                            name="magicEmail"
                            placeholder="you@example.com"
                            required
                            value={magicEmail}
                            onChange={(e) => setMagicEmail(e.target.value)}
                        />
                        <button className=" w-[126.24px] border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2">
                            Magic Link
                        </button>
                    </div>
                </form>

                {/* Message */}
                {message && (
                    <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}