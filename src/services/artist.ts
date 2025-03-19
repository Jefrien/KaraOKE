import { Artist } from "@/types/artist"
import { TracksDatum } from "@/types/chart"

export const getArtist = async (id: number) => {
    const response = await fetch(`https://api.deezer.com/artist/${id}`)
    const data = await response.json()
    return data as Artist
}

export const getArtistTracks = async (id: number) => {
    const response = await fetch(`https://api.deezer.com/artist/${id}/top&limit=50`)
    const { data } = await response.json()
    return data as TracksDatum[]
}