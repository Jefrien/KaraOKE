import { Tracks } from "@/types/chart";
import {Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TopPlaylist({ tracks }: { tracks: Tracks }) {

    const trackInfo = tracks.data[0]

    return (
        <div className="w-full h-64 relative overflow-hidden rounded-xl group cursor-pointer border-2 border-transparent hover:border-emerald-600">
            <Image src={trackInfo.album.cover_medium} alt={trackInfo.title} width={160} height={160} className="w-full h-full object-cover object-center" />
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-xl p-6 flex flex-col justify-center">
                <span className="text-white text-sm font-bold mb-4">Top #1 Canción</span>
                <div className="flex items-center justify-start gap-4">
                    <Image src={trackInfo.album.cover_medium} alt={trackInfo.title} className="rounded-xl w-44 h-44 md:w-32 md:h-32 lg:w-44 lg:h-44" width={180} height={180} />
                    <div className="max-w-xl">
                        <h1 className="text-2xl font-bold text-white line-clamp-2">{trackInfo.title}</h1>
                        <div className="grid grid-cols-2 gap-6 mt-4">
                            <p className="text-gray-300 line-clamp-2">
                                <strong className="block text-xs text-white">Artista</strong>
                                {trackInfo.artist.name}
                            </p>
                            <p className="text-gray-300 line-clamp-2">
                                <strong className="block text-xs text-white">Album</strong>
                                {trackInfo.album.title}
                            </p>

                        </div>

                        <div className="flex mt-6">
                            <Link href={`/song/${trackInfo.id}`} className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100  w-12 h-12 bg-white/10 border-white border-2 rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                                <Play className="w-6 h-6 white" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}