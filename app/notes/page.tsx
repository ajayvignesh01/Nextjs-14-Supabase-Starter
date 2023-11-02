import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import {AddNote, ClearAllNotes} from "./actions";

export default async function Page() {
    const cookieStore = cookies()
    const supabase = createClient(cookieStore)
    const { data: notes } = await supabase.from('notes').select()

    return (
        <div>
            <pre>{JSON.stringify(notes, null, 2)}</pre>

            <div className="pt-4">
                {/* Handle Add Note */}
                <form action={AddNote} className={'animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'}>
                    <input
                        className="rounded-md px-4 py-2 bg-inherit border"
                        name="note"
                        type="text"
                        placeholder="Write your note here..."
                    />
                    <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                        Add Note
                    </button>
                </form>

                {/* Handle Clear All Notes */}
                <form>
                    <button
                        formAction={ClearAllNotes}
                        className="animate-in w-full bg-red-700 rounded-md px-4 py-2 text-foreground mb-2"
                    >
                        Clear All Notes
                    </button>
                </form>
            </div>
        </div>
    )
}