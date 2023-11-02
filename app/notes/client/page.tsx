'use client'

import { createClient } from '@/utils/supabase/client'
import {useEffect, useState} from 'react'
import { NotesFormClient } from "./NotesFormClient";

export default function Page() {
    const [notes, setNotes] = useState<any[] | null>(null)
    const [refresh, setRefresh] = useState(false)
    const supabase = createClient()

    useEffect(() => {
        const getData = async () => {
            const { data } = await supabase.from('notes').select()
            setNotes(data)
        }
        getData()
    }, [refresh])

    return (
        <div>
            <pre>{JSON.stringify(notes, null, 2)}</pre>

            <NotesFormClient refresh={refresh} setRefresh={setRefresh}/>
        </div>
    )
}