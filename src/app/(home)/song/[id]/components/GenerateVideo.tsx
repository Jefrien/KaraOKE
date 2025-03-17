'use client'
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { TracksDatum } from "@/types/chart";
import { downloadVideo } from "@/services/youtube";
import { useEffect } from "react";
import { uploadVideo } from "@/app/dropbox/actions";
import { toast } from "react-toastify";

export default function GenerateVideo({ song, option }: { song: TracksDatum, option: any }) {
    
    const handleGenerate = async () => {        
        const videoBuffer: any = await downloadVideo(option.id.videoId)        
        if(!videoBuffer) {
            toast.error('Error al descargar el video')
            return
        }
        await uploadVideo(song, videoBuffer as Buffer)        
    }

    useEffect(() => {
        handleGenerate()
    }, [])

    return (    
        <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
        <Image src={song.album.cover_medium} alt={option.snippet.title} fill className="object-cover" />
        <div className="flex items-center justify-center bg-black/50 backdrop-blur-xl absolute top-0 left-0 w-full h-full">
          <span className="absolute top-4 left-4">Reproduciendo {song.title} de {song.artist.name}  </span>
          <h4 className="flex items-center gap-4 flex-col text-xl">
            <Loader2 className="animate-spin h-10 w-10 text-emerald-400" />
            Generando karaoke
            <Image src={option.snippet.thumbnails.high.url} alt={option.snippet.title} width={250} height={250} className="animate-pulse"  />
            <p className="text-gray-300">
              Espera mientras se genera el karaoke en tu cuenta de Dropbox
            </p>
          </h4>
        </div>
      </div>
    )
}