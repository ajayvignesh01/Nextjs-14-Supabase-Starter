import Link from 'next/link'
import Step from './Step'
import Code from '@/components/Code'

const create = `
create table
  public.notes (
    id serial,
    title text null,
    user_id uuid not null default auth.uid (),
    constraint notes_pkey primary key (id),
    constraint notes_user_id_fkey foreign key (user_id) references auth.users (id) on update cascade on delete cascade
  ) tablespace pg_default;
`.trim()

const server = `
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Page() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)
  const { data: notes } = await supabase.from('notes').select()

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim()

const client = `
'use client'

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from 'react'

export default function Page() {
  const [notes, setNotes] = useState<any[] | null>(null)
  const supabase = createClient()

  useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('notes').select()
      setNotes(data)
    }
    getData()
  }, [])

  return <pre>{JSON.stringify(notes, null, 2)}</pre>
}
`.trim()

export default function SignUpUserSteps() {
  return (
    <ol className="flex flex-col gap-6">
      <Step title="Sign up your first user">
        <p>
          Head over to the{' '}
          <Link
            href="/login"
            className="font-bold hover:underline text-foreground/80"
          >
            Login
          </Link>{' '}
          page and sign up your first user. It's okay if this is just you for
          now. Your awesome idea will have plenty of users later!
        </p>
      </Step>

      <Step title="Create some tables and insert some data">
        <p>
          Head over to the{' '}
          <a
            href="https://supabase.com/dashboard/project/_/editor"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            Table Editor
          </a>{' '}
          for your Supabase project to create a table using the
          following into the{' '}
          <a
            href="https://supabase.com/dashboard/project/_/sql/new"
            className="font-bold hover:underline text-foreground/80"
            target="_blank"
            rel="noreferrer"
          >
            SQL Editor
          </a>{' '}
          and click RUN!
        </p>
        <Code code={create} />
        <p>
          Now you add add/remove data using a{' '}
          <a
              href='/notes'
              className="font-bold hover:underline text-foreground/80"
              target="_blank"
              rel="noreferrer"
          >
            Server Component
          </a>{', '}
          <a
              href='/notes/client'
              className="font-bold hover:underline text-foreground/80"
              target="_blank"
              rel="noreferrer"
          >
            Client Component
          </a>{', or '}
          <a
              href='/notes/swr'
              className="font-bold hover:underline text-foreground/80"
              target="_blank"
              rel="noreferrer"
          >
            Client Component with SWR
          </a>{' '}
        </p>
      </Step>

      <Step title="Query Supabase data from Next.js">
        <p>
          To create a Supabase client and query data from an Async Server
          Component, create a new page.tsx file at{' '}
          <span className="px-2 py-1 rounded-md bg-foreground/20 text-foreground/80">
            /app/notes/page.tsx
          </span>{' '}
          and add the following.
        </p>
        <Code code={server} />
        <p>Alternatively, you can use a Client Component.</p>
        <Code code={client} />
      </Step>

      <Step title="Build in a weekend and scale to millions!">
        <p>You're ready to launch your product to the world! 🚀</p>
      </Step>
    </ol>
  )
}
