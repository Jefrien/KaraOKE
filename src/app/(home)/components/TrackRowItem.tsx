import { TracksDatum } from "@/types/chart";
import { AudioWaveform, MicVocal, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function TrackRowItem({ track, number }: { track: TracksDatum, number: number }) {

    const durationFormat = (duration: number) => {
        const minutes = Math.floor(duration / 60);
        const seconds = duration % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div>
            <Link href={`/song/${track.id}`} className="group cursor-pointer grid grid-cols-3 items-center justify-between gap-4 py-3 px-4 hover:bg-neutral-800/80">
                <div className="flex items-center gap-4">
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
                        <span className="line-clamp-1 ">
                            {track.title}
                        </span>
                        <span className="text-gray-400 text-sm">
                            {track.artist.name}
                        </span>
                    </div>
                </div>
                <span className="text-gray-400 text-sm line-clamp-1 whitespace-nowrap overflow-hidden text-ellipsis block">
                    {track.album.title}
                </span>
                <div className="text-right flex justify-end gap-6 items-center">
                    <span className="hidden group-hover:inline-flex w-8 h-8 bg-emerald-600 items-center justify-center rounded-full">
                        <AudioWaveform className="h-5 w-5 text-white" />
                    </span>
                    <span className="text-gray-400 text-sm">
                        {durationFormat(track.duration)}
                    </span>
                </div>
            </Link>
        </div>
    )
}