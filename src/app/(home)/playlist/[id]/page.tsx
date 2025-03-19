import { getPlaylist } from "@/services/playlist"
import TrackRowItem from "../../components/TrackRowItem"
import Image from "next/image"
import { durationFormat, numberFormat } from "@/app/utils"

export default async function Playlist({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const playlist = await getPlaylist(Number(id))

    return (
        <div className="pb-4">
            <div className="flex flex-col md:flex-row items-center justify-start gap-4 md:gap-8 mb-6">
                <Image src={playlist.picture_xl} alt={playlist.title} className="rounded-xl w-44 h-44 md:w-32 md:h-32 lg:w-64 lg:h-64" width={180} height={180} />
                <div className="max-w-xl">
                    <h1 className="text-lg lg:text-4xl font-bold text-white line-clamp-1">{playlist.title}</h1>
                    <p className="text-gray-300 mt-5 line-clamp-2">
                        {numberFormat(playlist.nb_tracks)} canciones | {durationFormat(playlist.duration)} | {numberFormat(playlist.fans)} fans
                    </p>
                    <p className="text-gray-300 mt-5 line-clamp-2">
                        {playlist.description}
                    </p>
                </div>
            </div>
            <div className="flex flex-col">
                {playlist.tracks.data.map((track, index) => (
                    <TrackRowItem key={index} track={track} number={index + 1} />
                ))}
            </div>
        </div>
    )
}