import { Album } from "@/types/album"

export const getAlbum = async (id: number) => {
    const response = await fetch(`https://api.deezer.com/album/${id}`)
    const data = await response.json()
    return data as Album
}