import { durationFormat } from "@/app/utils";
import { getPlaylist } from "@/services/playlist";
import { MicVocal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function TopPlaylist({ playlists }: { playlists: any }) {

    const topPlaylistInfo = await getPlaylist(playlists.data[0].id)

    

    const getLast10TrackNames = () => {
        return topPlaylistInfo.tracks.data.slice(0, 10).map(track => track.title).join(', ')
    }

    return (
        <div className="w-full h-64 relative overflow-hidden rounded-xl group cursor-pointer border-2 border-transparent hover:border-emerald-600">
            <Image src={topPlaylistInfo.picture_xl} alt={topPlaylistInfo.title} width={160} height={160}
                className="w-full h-full object-cover object-center group-hover:scale-120 transition-transform duration-1000" />

            <div className="absolute top-0 left-0 w-full h-full bg-black/60 backdrop-blur-xl px-6 pt-0 pb-2 flex flex-col justify-center">
                <span className="text-neutral-300 text-sm mb-4">
                    {topPlaylistInfo.nb_tracks} canciones {durationFormat(topPlaylistInfo.duration)}
                </span>
                <div className="flex items-center justify-start gap-4">
                    <Image src={topPlaylistInfo.picture_xl} alt={topPlaylistInfo.title} className="rounded-xl w-20 h-20 sm:w-44 sm:h-44 md:w-32 md:h-32 lg:w-44 lg:h-44" width={180} height={180} />
                    <div className="max-w-xl h-full">
                        <h1 className="text-lg lg:text-2xl font-bold text-white line-clamp-1">{topPlaylistInfo.title}</h1>
                        <p className="text-gray-300 text-xs mt-4 line-clamp-1">{getLast10TrackNames()}</p>
                        <p className="text-gray-300 text-xs mt-5 line-clamp-2">
                            {topPlaylistInfo.description}
                        </p>

                        <div className="flex mt-6">
                            <Link href={`/playlist/${topPlaylistInfo.id}`} className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 px-5 py-2 gap-4 bg-white/10 flex items-center justify-start text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                                <MicVocal className="w-6 h-6 white" />
                                Ver Playlist
                            </Link>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}