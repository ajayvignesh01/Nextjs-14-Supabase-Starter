'use client'

import Link from 'next/link'
import {mutate} from "swr";
import {useEffect} from "react";
import {useRouter} from "next/navigation";
import useSWRImmutable from "swr/immutable";
import { createClient } from '@/utils/supabase/client'

export default function AuthButton() {
  const user = getUser()
  const supabase = createClient()
  const router = useRouter()

  // remove code from url after auth
  useEffect(() => {
    router.replace('/')
  }, [])


  return user ? (
      <div className="flex items-center gap-4">
        Hey, {user.email}!
        <button
            className="py-2 px-4 rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
            onClick={async() => {
              await supabase.auth.signOut()
              await mutate('getUser')
            }}
        >
          Logout
        </button>
      </div>
  ) : (
      <Link
          href={"/login"}
          className="py-2 px-3 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
      >
        Login
      </Link>
  )
}

export function getUser() {
  const supabase = createClient()

  const getUserSWR = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    return user
  }

  const { data: user } = useSWRImmutable('getUser', getUserSWR, {});

  if (user) { return user }
  return null
}
