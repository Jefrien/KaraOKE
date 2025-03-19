'use client'
import { ChartResponse } from "@/types/chart";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import TrackRowItem from "./TrackRowItem";
import PlaylistItem from "./PlaylistItem";
import ArtistItem from "./ArtistItem";
import AlbumItem from "./AlbumItem";

export default function SectionsTabs({ chart }: { chart: ChartResponse }) {

    const { tracks, playlists, artists, albums } = chart
    const [activeTab, setActiveTab] = useState('songs');

    const tabs = [
        { id: 'songs', label: 'Canciones' },
        { id: 'playlists', label: 'Playlists' },
        { id: 'artists', label: 'Artists' },
        { id: 'albums', label: 'Albums' },
    ];

    return (
        <div className="mt-6">
            <div className="flex mb-6 gap-8">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={twMerge(
                            'py-2 border-t-2 border-transparent transition-all pt-4 relative outline-0 text-sm cursor-pointer',
                            activeTab === tab.id
                                ? 'border-emerald-500 text-emerald-500'
                                : 'text-white'
                        )}
                    >
                        {activeTab === tab.id && <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-emerald-500/30 via-transparent to-transparent"></div>}
                        {tab.label}
                    </button>
                ))}
            </div>

            <div className="">
                {activeTab === 'songs' && (
                    <div className="flex flex-col">
                        {tracks.data.map((track, index) => (
                            <TrackRowItem key={index} track={track} number={index + 1} />
                        ))}
                    </div>
                )}

                {activeTab === 'playlists' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-6">
                        {playlists.data.map((playlist, index) => (
                            <PlaylistItem key={index} playlist={playlist} number={index + 1} />
                        ))}
                    </div>
                )}

                {activeTab === 'artists' && (
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-6">
                        {artists.data.map((artist, index) => (
                            <ArtistItem key={index} artist={artist} number={index + 1} />
                        ))}
                    </div>
                )}

                {activeTab === 'albums' && (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7 gap-6">
                        {albums.data.map((album, index) => (
                            <AlbumItem key={index} album={album} number={index + 1} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}