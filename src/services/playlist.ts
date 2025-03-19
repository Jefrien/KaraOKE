'use server'
import { TracksDatum } from "@/types/chart"
import { PlaylistResponse } from "@/types/playlist"

export async function getPlaylist(id: number) {
    const url = 'https://api.deezer.com/playlist/' + id
    const response = await fetch(url)
    const data = await response.json() as PlaylistResponse
    return data
}

export async function getPlaylistTracks(id: number) {
    const url = 'https://api.deezer.com/playlist/' + id + '/tracks'
    const response = await fetch(url)
    const data = await response.json() as TracksDatum[]
    return data
}