'use client'

import {createClient} from "@/utils/supabase/client";
import useSWRImmutable from "swr/immutable";

export function getNotes() {
    const supabase = createClient()

    const getNotesSWR = async () => {
        const { data } = await supabase
            .from('notes')
            .select()
        return data
    }

    const { data, isLoading, isValidating } = useSWRImmutable('getNotes', getNotesSWR, {});

    return { data, isLoading, isValidating }
}