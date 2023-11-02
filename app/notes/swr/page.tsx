'use client'

import {getNotes} from "./getNotes";
import {mutate} from "swr";
import { NotesFormSWR } from "./NotesFormSWR";

export default function NotesClient() {
    const {data: notes, isLoading: isLoadingNotes, isValidating: isValidatingNotes} = getNotes()

    return (
        <div>
            {isLoadingNotes ? (
                    <pre>Loading...</pre>
                ) : isValidatingNotes ? (
                    <>
                    <pre>{JSON.stringify(notes, null, 2)}</pre>
                    <pre>Validating...</pre>
                    </>
                ) : (
                    <pre>{JSON.stringify(notes, null, 2)}</pre>
                )
            }
            <button className={'border rounded-md px-2 w-24 hover:bg-gray-900'} onClick={() => mutate('getNotes')}>Mutate</button>

            <NotesFormSWR/>
        </div>
    )
}