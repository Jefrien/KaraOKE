'use server'

import { TracksDatum } from "@/types/chart"

export async function searchSongs(query: string) {
    const url = `https://api.deezer.com/search?order=RANKING&q=${query}`
    const response = await fetch(url)
    const data = await response.json()
    return data
}

export async function getSingleSong(id: number) {
    const url = `https://api.deezer.com/track/${id}`
    const response = await fetch(url)
    const data = await response.json() as TracksDatum
    return data
}