import { createClient } from "@/services/supabase/server"
import { MySong } from "@/types/MySong"

export async function getFavorites() {
    const supabase = await createClient()
    const { data, error } = await supabase
        .from('songs')
        .select()

    if (error) {
        throw new Error('Failed to get favorites')
    }

    return data as MySong[]
}