'use client'
import { ItemSmall } from "@/types/yt";
import { IconCaretDownFilled, IconCaretUpFilled, IconHeartFilled, IconPlayerPauseFilled, IconPlayerPlayFilled } from "@tabler/icons-react";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import Progress from "./Progress";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

export default function VideoControls({ videoId, ytItem, video, pitch, setPitch }: { videoId: number, ytItem: ItemSmall, video: any, pitch: number, setPitch: (pitch: number) => void }) {

    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [activeApply, setActiveApply] = useState(false)

    const [isVisible, setIsVisible] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    console.log(ytItem)

    useEffect(() => {
        let timer: any;
        if (isVisible && !isHovered) {
            timer = setTimeout(() => {
                setIsVisible(false);
            }, 1500);
        }

        return () => clearTimeout(timer);
    }, [isVisible, isHovered]);

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsVisible(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };


    const applyPitch = () => {
        window.localStorage.setItem('pitch_' + videoId, pitch.toString())
        setActiveApply(false)
        // reload page
        window.location.reload()
    }

    const handleChangeProgress = (progress: number) => {
        if (video.current) {
            video.current.currentTime = progress;
        }
    }

    const increasePitch = () => {
        let currentPitch = pitch;
        currentPitch = parseFloat((currentPitch + 0.1).toFixed(1))
        // prevent up more than 2
        if (currentPitch > 2) {
            return;
        }
        setPitch(currentPitch);
        setActiveApply(true)
    }

    const decreasePitch = () => {
        let currentPitch = pitch;
        currentPitch = parseFloat((currentPitch - 0.1).toFixed(1))
        // prevent down less than 0
        if (currentPitch < 0) {
            return;
        }
        setPitch(currentPitch);
        setActiveApply(true)
    }

    const handlePlay = () => {
        video.current?.play()
    }
    const handlePause = () => {
        video.current?.pause()
    }

    const handlePlayPause = () => {
        if (isPlaying) {
            handlePause()
        } else {
            handlePlay()
        }
    }

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    useEffect(() => {
        const handleTimeUpdate = () => {
            // calculate 100% of progress
            const duration = video.current?.duration || 0;
            const currentTime = video.current?.currentTime || 0;
            setProgress((currentTime / duration) * 100)
        }

        video.current?.addEventListener('timeupdate', handleTimeUpdate)

        return () => {
            video.current?.removeEventListener('timeupdate', handleTimeUpdate)
        }
    }, [video])

    useEffect(() => {
        const handlePlay = () => {
            setIsPlaying(true)
        }

        const handlePause = () => {
            setIsPlaying(false)
        }

        video.current?.addEventListener('play', handlePlay)
        video.current?.addEventListener('pause', handlePause)


        document.addEventListener("keydown", (e) => {
            if (e.code === "Space") handlePlayPause();
        });


        return () => {
            video.current?.removeEventListener('play', handlePlay)
            video.current?.removeEventListener('pause', handlePause)
            document.removeEventListener("keydown", (e) => {
                if (e.code === "Space") handlePlayPause();
            });
        }

    }, [video])


    return (
        <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className={twMerge(
                "w-[80%] left-0 right-0 user-select-none mx-auto bg-neutral-950/70 backdrop-blur-2xl absolute bottom-10 rounded-4xl px-4 py-4 flex items-center justify-between transition-all duration-600",
                !isVisible && "opacity-0"
            )}>
            <div className="items-center gap-4 hidden md:flex">
                <Link href="/" className="px-2 -ml-2 py-2 h-20 w-20 gap-2 text-sm outline-0 rounded-2xl flex-col flex items-center justify-center text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                    <ArrowLeft className="w-5 h-5" />
                    Salir
                </Link>
            </div>
            <div className="flex items-center gap-4 flex-col flex-1 px-2 sm:px-8 lg:px-20">
                <div className="flex items-center gap-4 w-full justify-between absolute -top-16 left-0 right-0 bg-emerald-950/70 backdrop-blur-2xl rounded-4xl p-4 md:relative md:top-0 md:left-0 md:right-0 md:bg-transparent md:backdrop-blur-none md:p-0 ">
                    <span className="text-white/80 font-bold text-xs">{formatTime(video.current?.currentTime || 0)}</span>
                    <Progress progress={progress} setProgress={handleChangeProgress} duration={video.current?.duration || 0} />
                    <span className="text-white/80 font-bold text-xs">{formatTime(video.current?.duration || 0)}</span>
                </div>
                <div className="flex items-center gap-4">
                    <div>
                        {isPlaying ? (
                            <button onClick={handlePlayPause} className="w-12 h-12 bg-white/20 outline-0 rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                                <IconPlayerPauseFilled className="w-6 h-6 white" />
                            </button>
                        ) : (
                            <button onClick={handlePlayPause} className="w-12 h-12 bg-white/20 outline-0 rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                                <IconPlayerPlayFilled className="w-6 h-6" />
                            </button>
                        )}

                    </div>
                    <button onClick={handlePlayPause} className="w-12 h-12 bg-white/20 outline-0 rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                        <IconHeartFilled className="w-6 h-6 white" />
                    </button>
                </div>
            </div>
            <div className="flex flex-col gap-3 relative">
                <span className="text-emerald-300 font-bold text-xs bg-neutral-950 py-1 px-2 rounded-4xl absolute text-center -top-8 right-0 left-0 mx-auto">Pitch Changer</span>
                <div className="flex justify-between items-center">
                    <span
                        className={twMerge("text-white/80 bg-emerald-700 py-1 px-2 rounded-4xl font-bold text-xs cursor-pointer hover:text-white hover:underline", !activeApply && "opacity-30 pointer-events-none")}
                        onClick={() => applyPitch()}>Aplicar</span>
                    <span className="text-white/80 py-1 px-2 rounded-4xl font-bold text-xs cursor-pointer hover:text-white hover:underline" onClick={() => {
                        setPitch(1.00)
                        setActiveApply(true)
                    }}>Reset</span>
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={increasePitch} className="w-10 h-10 bg-white/20 outline-0 rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                        <IconCaretUpFilled className="w-6 h-6 white" />
                    </button>
                    <span className="text-white/80 font-bold text-2xl flex w-10 justify-center">{pitch}</span>
                    <button onClick={decreasePitch} className="w-10 h-10 bg-white/20 outline-0 rounded-full flex items-center justify-center text-white/80 hover:bg-white hover:text-black font-bold cursor-pointer transition-all">
                        <IconCaretDownFilled className="w-6 h-6 white" />
                    </button>
                </div>
            </div>
        </div>
    )
}