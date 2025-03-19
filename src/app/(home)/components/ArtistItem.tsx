import { ArtistElement } from "@/types/chart";
import { IconPlayerPlayFilled } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export default function ArtistItem({ artist, number }: { artist: ArtistElement, number: number }) {
    return (
        <Link href={`/artist/${artist.id}`} className="relative mb-2 group" data-number={number}>
            <div className="relative">
                <Image
                    src={artist.picture_xl}
                    width={300}
                    height={300}
                    alt={artist.name}
                    className="rounded-full w-full h-full block"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all">
                    <div className="flex items-center h-full w-full justify-center">
                        <button className="outline-0 bg-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-emerald-200 cursor-pointer">
                            <IconPlayerPlayFilled className="w-6 h-6 text-black" />
                        </button>
                    </div>
                </div>
            </div>

            <div className=" mt-1">
                <span className="line-clamp-1 text-sm md:text-base text-center ">
                    {artist.name}
                </span>                
            </div>

        </Link>
    )
}