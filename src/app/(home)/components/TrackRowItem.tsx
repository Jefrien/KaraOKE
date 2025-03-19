import { TracksDatum } from "@/types/chart";
import { MicVocal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import ButtonFavorite from "./ButtonFavorite";

export default function TrackRowItem({ track, number, isFavorite = false }: { track: TracksDatum, number: number, isFavorite?: boolean }) {

    const durationFormat = (duration: number) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <Link href={`/song/${track.id}`} className="group cursor-pointer grid  grid-cols-5 md:grid-cols-3 items-center justify-between gap-4 py-3 px-4 hover:bg-neutral-800/80">
                <div className="flex items-center gap-4 col-span-4 md:col-span-1">
                    <span className="group-hover:hidden w-5 text-center">
                        {number}
                    </span>
                    <span className="hidden group-hover:block">
                        <MicVocal className="h-5 w-5 text-white" />
                    </span>

                    <Image
                        src={track.album.cover_small}
                        width={30}
                        height={30}
                        alt={track.album.title}
                        className="rounded-md"
                    />

                    <div className="flex flex-col">
                        <span className="line-clamp-1 text-sm md:text-base ">
                            {track.title}
                        </span>
                        <Link href={`/artist/${track.artist.id}`} className="text-gray-400 text-sm hover:text-white hover:underline">
                            {track.artist.name}
                        </Link>
                    </div>
                </div>
                <Link href={`/album/${track.album.id}`} className="text-gray-400 text-sm line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis hidden md:block hover:text-white hover:underline">
                    {track.album.title}
                </Link>
                <div className="text-right flex justify-end gap-6 items-center">
                    <ButtonFavorite track={track} isFavorite={isFavorite} />
                    <span className="text-gray-400 text-sm">
                        {durationFormat(track.duration)}
                    </span>
                </div>
            </Link>
        </div>
    )
}