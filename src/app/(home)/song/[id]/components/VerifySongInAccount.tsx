'use client'
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { TracksDatum } from '@/types/chart'
import Image from 'next/image'
import { validateDropboxToken } from "../actions";
import { findVideo } from "@/app/dropbox/actions";
import { searchYtT } from "@/services/youtube";
import { Item } from "@/types/yt";

export default function VerifySongInAccount({ song }: { song: TracksDatum }) {

    const [option, setOption] = useState<Item | null>(null)

    const init = async () => {
        const items = await searchYtT('karaoke ' + song.title + ' ' + song.artist.name, song.id.toString(), true, 2)
        let item = items[0]
        setOption(item)
        window.localStorage.setItem('ytinfo_' + song.id.toString(), JSON.stringify({
            title: item.snippet.title,
            id: item.id.videoId,
            thumbnail: item.snippet.thumbnails.medium.url
        }))

        // opion 2
        item = items[1]
        window.localStorage.setItem('alt_ytinfo_' + song.id.toString(), JSON.stringify({
            title: item.snippet.title,
            id: item.id.videoId,
            thumbnail: item.snippet.thumbnails.medium.url
        }))

        await validateDropboxToken()
        await findVideo(song)
    }

    useEffect(() => {
        init()
    }, [''])

    return (
        <>
            {option && (
                <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
                    <Image src={song.album.cover_medium} alt={option?.snippet.title} fill className="object-cover" />
                    <div className="flex items-center justify-center bg-black/50 backdrop-blur-xl absolute top-0 left-0 w-full h-full">
                        <span className="absolute top-4 left-4">{song.title} de {song.artist.name}  </span>
                        <h4 className="flex items-center gap-4 flex-col text-xl">
                            <Loader2 className="animate-spin h-10 w-10 text-emerald-400" />
                            Verificando                            
                        </h4>
                    </div>
                </div>
            )}
        </>
    )
}