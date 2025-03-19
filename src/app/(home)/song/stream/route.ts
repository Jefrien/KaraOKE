import { downloadVideo } from "@/app/dropbox/actions";
import { NextRequest } from 'next/server'
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs'
import { validateDropboxToken } from "../[id]/actions";

const saveTempFile = async (videoBlob: Blob, filename: string) => {
    fs.writeFileSync(filename, Buffer.from(await videoBlob.arrayBuffer()))
    return filename
}

const deleteTempFile = (filename: string) => {
    fs.unlinkSync(filename)
}

const applyFilters = (filename: string, save_filename: string, pitch: number) => {
    return new Promise((resolve, reject) => {
        // Apply the audio filter using fluent-ffmpeg
        ffmpeg(filename)
            .audioFilters({
                "filter": 'rubberband',
                "options": `pitch=${pitch}`
            } as any)
            .format('mp4')
            .on('end', () => {
                console.log('done processing video');
                resolve(filename)
            })
            .on('error', (err: any) => {
                console.log('an error happened: ' + err.message, err);
                reject(err);
            })
            .save(save_filename)
    });
};

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams
        const videoId = searchParams.get('id')
        let pitch: any = searchParams.get('pitch')

        await validateDropboxToken()

        let video: any = await downloadVideo(Number(videoId))
        if (!video) {
            return Response.json({
                message: 'Error al descargar el video'
            })
        }

        if (!pitch) {
            pitch = '1'
        }
        pitch = Number(pitch).toFixed(2)

        console.log('Pich result: ' + pitch, pitch > 1.00 || pitch < 1.00)
        
        if (pitch > 1.00 || pitch < 1.00) {
            const filename = 'tmp/poccess_' + videoId + new Date().getTime() + '.mp4'
            const save_filename = 'tmp/pocessed_' + videoId + new Date().getTime() + '.mp4'
            await saveTempFile(video, filename)

            await applyFilters(filename, save_filename, pitch)
            console.log('Video processed')

            video = fs.readFileSync(save_filename)
            console.log('Video read')

            // buffer to blob
            video = new Blob([video], { type: 'video/mp4' })
            console.log('Video blob')

            await deleteTempFile(filename)
            await deleteTempFile(save_filename)
        }

        const headers: Record<string, string> = {
            'Content-Length': video.size.toString(),
            'Content-Type': 'video/mp4',
            'Content-Disposition': 'attachment; filename="processed_video.mp4"'
        };
    
        return new Response(video, { status: 200, headers });
    } catch (error) {
        console.log('Error al descargar el video:', error)
        return Response.json({
            message: 'Error al descargar el video'
        })
    }

}