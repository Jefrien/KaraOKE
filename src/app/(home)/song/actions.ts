'use server'

import { createClient } from "@/services/supabase/server";
import { TracksDatum } from "@/types/chart";
import { revalidatePath } from "next/cache";

export async function addToFavorites({ track }: { track: TracksDatum }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('User not found')
    }

    // is track already in favorites
    const { data: existing } = await supabase
        .from('songs')
        .select()
        .eq('user_id', user.id)
        .eq('video_id', track.id)

    if (existing && existing.length > 0) {
        revalidatePath('/')
        throw new Error('Track already in favorites')
    }

    const { data, error } = await supabase
        .from('songs')
        .insert([
            {
                video_id: track.id,                
                track: track,                
                user_id: user.id,
                playlist_id: null,
                pitch: 1.00
            },
        ])
        .select()

    if (error) {
        console.log('error', error.message, error.cause, data)
        throw new Error('Failed to add to favorites')
    }
    revalidatePath('/')
    return data
}



export async function removeFromFavorites({ track }: { track: TracksDatum }) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        throw new Error('User not found')
    }

    const { error } = await supabase
        .from('songs')
        .delete()
        .eq('user_id', user.id)
        .eq('video_id', track.id)

    if (error) {    
        throw new Error('Failed to remove from favorites')
    }
    revalidatePath('/')
    return 'success'
}