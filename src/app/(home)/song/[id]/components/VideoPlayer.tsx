'use client'
import { ItemSmall } from "@/types/yt";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import VideoControls from "./VideoControls";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

export default function VideoPlayer({ videoId }: { videoId: number }) {

    const [ytItem, setYtItem] = useState({} as ItemSmall)
    const videoRef = useRef<HTMLVideoElement>(null)
    const [pitch, setPitch] = useState<number>(1.00)
    const [videoSrc, setVideoSrc] = useState('')

    async function handleDownload() {

        const key = 'ytinfo_' + videoId
        let _saved: any = window.localStorage.getItem(key)
        if (!_saved) {
            toast.error('No se encontro el video')
            return
        }
        _saved = JSON.parse(_saved)
        setYtItem(_saved)

        const savedPitch = window.localStorage.getItem('pitch_' + videoId)
        console.log('found local pitch', savedPitch, videoId)
        if (savedPitch) {
            setPitch(parseFloat(savedPitch))
        }


        const response = await fetch('/song/stream?id=' + videoId + '&pitch=' + savedPitch)
        const video = await response.blob()

        const url = URL.createObjectURL(video)

        setVideoSrc(url)
        videoRef.current?.play()
    }

    useEffect(() => {
        handleDownload()
    }, [''])

    return (
        <div className="w-full h-screen bg-black absolute top-0 left-0 z-30">
            <Link href="/" className="text-3xl font-bold text-white px-6 text-center absolute top-4 left-4 z-20 animate-pulse">
                Kara<span className="text-emerald-500">Oke</span>
            </Link>
            
            {(!videoSrc && ytItem) && (
                <div className="w-full h-full flex items-center justify-center">
                    <img src={ytItem.thumbnail} alt={ytItem.title} className="animate-pulse w-full h-full object-cover" />
                    <div className="flex items-center justify-center gap-4 flex-col absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-2xl z-10">
                        <span className="text-white/80 font-bold text-xs">Cargando video...</span>
                        <Loader2 className="animate-spin h-10 w-10 text-emerald-400" />
                    </div>
                </div>
            )}

            {videoSrc && (
                <div className="w-full h-full">
                    <video ref={videoRef} className="w-full h-full" autoPlay>
                        <source src={videoSrc} type="video/mp4" />
                    </video>
                    <VideoControls videoId={videoId} ytItem={ytItem} video={videoRef} pitch={pitch} setPitch={setPitch} />
                </div>
            )}
        </div>
    )
}