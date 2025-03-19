'use server'
import { YTSearchResponse } from "@/types/yt"
import fs from 'fs'
import { create } from "youtube-dl-exec";

export async function searchYtT(query: string, id: string, setCookie: boolean = false, limit = 1) {
    try {
        console.log(setCookie, id)
        const params: Record<string, string> = {
            key: process.env.YOUTUBE_API_KEY || '',
            q: query,
            part: 'snippet',
            type: 'video',
            videoEmbeddable: 'true', // Solo videos que se pueden incrustar
            videoSyndicated: 'true', // Solo videos que se pueden sindicar
            maxResults: limit.toString()
        }

        const url = `https://www.googleapis.com/youtube/v3/search?${new URLSearchParams(params)}`
        const response = await fetch(url)
        const data = await response.json() as YTSearchResponse

        /*if (data.items.length > 0 && setCookie) {
            cookiesStore.set('ytinfo_' + id, JSON.stringify(data.items[0]))
        }*/
        return data.items
    } catch (error) {
        console.log('Error al buscar el video:', error)
        return []
    }
}

const downloadVideoYTDL = (url: string, path: string) => {
    return new Promise((resolve, reject) => {
        try {
            const youtubeDl = create(process.env.YOUTUBE_DL_PATH || 'node_modules/youtube-dl-exec/bin/yt-dlp.exe')

            youtubeDl(url, {
                noCheckCertificates: true,
                noWarnings: true,
                preferFreeFormats: true,
                addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
                format: 'worst[ext=mp4]',
                output: path
            }).then((data) => {
                resolve(data)
            }).catch((error) => {
                console.log('Error al buscar el video:', error)
                reject(error)
            })
        } catch (error) {
            console.log('Error al buscar el video:', error)
            reject(error)
        }
    })
}

export async function downloadVideo(videoId: number, videoAlt: string = '') {
    try {
        const filename = 'tmp/' + videoId + new Date().getTime() + '.mp4'
        const url = `http://www.youtube.com/watch?v=${videoId}`

        console.log('trying to download video ' + videoId, videoAlt)

        await downloadVideoYTDL(url, filename)

        // read file as buffer
        const buffer = fs.readFileSync(filename)

        // delete file
        fs.unlinkSync(filename)

        return buffer
    } catch (error) {
        console.log('Error al descargar el video:', error)
        return null
    }
}