'use client'
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { TracksDatum } from "@/types/chart";
import { downloadVideo } from "@/services/youtube";
import { useEffect, useState } from "react";
import { uploadVideo } from "@/app/dropbox/actions";
import { toast, ToastContainer } from "react-toastify";
import { ItemSmall } from "@/types/yt";

export default function GenerateVideo({ song }: { song: TracksDatum }) {

  const [ytItem, setYtItem] = useState({} as ItemSmall)

  const loadVideoInfo = async (numOption: number, onFinish: (ytItem: any) => void) => {
    const key = numOption === 0 ? 'ytinfo_' + song.id.toString() : 'alt_ytinfo_' + song.id.toString()    
    let _saved: any = window.localStorage.getItem(key)
    if (!_saved) {
      toast.error('No se encontro el video')
      return
    }    
    _saved = JSON.parse(_saved)    

    if (!_saved) {
      toast.error('No se encontro el video')
      return
    }
    setYtItem(_saved)
    onFinish(_saved)
  }

  const handleGenerate = async (ytItem: any) => {
    console.log('handleGenerate', ytItem)
    const videoBuffer: any = await downloadVideo(ytItem.id)
    console.log('videoBuffer', videoBuffer)
    if (!videoBuffer) {      
      toast.error('Opcion 1 fallida, intentando opcion 2, si el error persiste, este karaoke no es compatible, usa el link directo')      
      loadVideoInfo(1,(_ytItem) => {
        handleGenerate(_ytItem)
      })
      return
    }
    await uploadVideo(song, videoBuffer as Buffer)
  }

  useEffect(() => {
    loadVideoInfo(0, (_ytItem) => {
      handleGenerate(_ytItem)
    })
  }, [''])

  return (
    <>
      {ytItem && (
        <div className="relative w-full h-[70vh] rounded-lg overflow-hidden">
          <ToastContainer position='top-center' theme='colored' />
          <Image src={song.album.cover_medium} alt={'image for song'} fill className="object-cover" />
          <div className="flex items-center justify-center bg-black/50 backdrop-blur-xl absolute top-0 left-0 w-full h-full">
            <span className="absolute top-4 left-4">Reproduciendo {song.title} de {song.artist.name}  </span>
            <h4 className="flex items-center gap-4 flex-col text-xl">
              <Loader2 className="animate-spin h-10 w-10 text-emerald-400" />
              Generando karaoke
              <Image src={ytItem.thumbnail} alt={ytItem.title} width={250} height={250} className="animate-pulse" />
              <p className="text-gray-300">
                Espera mientras se genera el karaoke en tu cuenta de Dropbox
              </p>
            </h4>
          </div>
        </div>
      )}
    </>
  )
}