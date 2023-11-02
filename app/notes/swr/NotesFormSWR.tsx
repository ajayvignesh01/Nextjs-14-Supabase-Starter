import {FormEvent, useState} from "react";
import {createClient} from "@/utils/supabase/client";
import {mutate} from "swr";

export function NotesFormSWR() {
    const [title, setTitle] = useState("");
    const supabase = createClient()

    const handleAddNote = async (e: FormEvent) => {
        e.preventDefault();
        if (title.trim() === "") return;

        const { error } = await supabase
            .from('notes')
            .insert([{ title }])

        if (!error) {
            setTitle("")
            mutate('getNotes')
        }
    }

    const handleClearAllNotes = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        const { error } = await supabase
            .from('notes')
            .delete()
            .eq('user_id', session?.user?.id)

        if (!error) {
            mutate('getNotes')
        }
    }

    return (
        <div className="pt-4">
            <form onSubmit={handleAddNote} className={'animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground'}>
                <input
                    className="rounded-md px-4 py-2 bg-inherit border"
                    name="note"
                    type="text"
                    placeholder="Write your note here..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2">
                    Add Note
                </button>
            </form>

            <button
                onClick={handleClearAllNotes}
                className="animate-in w-full bg-red-700 rounded-md px-4 py-2 text-foreground mb-2"
            >
                Clear All Notes
            </button>
        </div>
    )
}