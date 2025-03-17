'use server'
import { PlaylistResponse } from "@/types/playlist"

export async function getPlaylist(id: number) {
    const url = 'https://api.deezer.com/playlist/' + id
    const response = await fetch(url)
    const data = await response.json() as PlaylistResponse
    return data
}