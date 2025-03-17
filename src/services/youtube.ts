'use server'
import { YTSearchResponse } from "@/types/yt"
import ytdl from '@distube/ytdl-core';
import { PassThrough } from 'stream';
import { cookies } from 'next/headers';

export async function searchYtT(query: string, id: string, setCookie: boolean = false, limit = 1) {
    const cookiesStore = await cookies()
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&maxResults=${limit}&q=${query}&key=${process.env.YOUTUBE_API_KEY}`
    const response = await fetch(url)
    const data = await response.json() as YTSearchResponse
    console.log(data)

    if (data.items.length > 0 && setCookie) {        
        cookiesStore.set('ytinfo_' + id, JSON.stringify(data.items[0]))        
    }
    return data.items
}

export async function downloadVideo(videoId: string) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            console.log('timeout ' + videoId)
            resolve(null)
        }, 30000);

        const url = `http://www.youtube.com/watch?v=${videoId}`

        const options = {
            quality: 'lowest',
        };

        console.log('trying to download video ' + videoId)

        const videoStream = ytdl(url, options);
        const passThroughStream = new PassThrough();

        videoStream.pipe(passThroughStream);

        let videoBuffer: any = [];
        passThroughStream.on('data', (chunk) => {
            console.log('intenal download in process')
            videoBuffer.push(chunk);
        });

        passThroughStream.on('end', async () => {            
            videoBuffer = Buffer.concat(videoBuffer);
            console.log('intenal download finished')
            resolve(videoBuffer);
        });

        passThroughStream.on('error', (error) => {
            console.log('intenal download error', error)
            reject(error);
        })
        
    })
}