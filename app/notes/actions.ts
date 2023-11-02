'use server'

import {cookies} from "next/headers";
import {createClient} from "@/utils/supabase/server";
import {revalidatePath} from "next/cache";

export const AddNote = async (formData: FormData) => {
    const title = formData.get('note') as string
    if (title.trim() === "") return

    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    await supabase
        .from('notes')
        .insert([{ title }])

    revalidatePath('/notes')
}

export const ClearAllNotes = async () => {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)

    const { data: { session } } = await supabase.auth.getSession();
    await supabase
        .from('notes')
        .delete()
        .eq('user_id', session?.user?.id)

    revalidatePath('/notes')
}