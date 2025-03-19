'use server'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { TracksDatum } from '@/types/chart'
import { revalidatePath } from 'next/cache';
import { download, existVideo } from '@/services/dropbox';

export async function refreshAccessToken() {
    const tokenUrl = 'https://api.dropbox.com/oauth2/token';

    const cookieStore = await cookies()
    const dropbox_refresh_token = cookieStore.get('dropbox_refresh_token')

    if (!dropbox_refresh_token) {
        redirect('/error')
    }

    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', dropbox_refresh_token?.value || '');
    params.append('client_id', process.env.DROPBOX_CLIENT_ID || '');
    params.append('client_secret', process.env.DROPBOX_SECRET || '');

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    const data = await response.json();
    const newAccessToken = data.access_token;

    cookieStore.set('dropbox_token', newAccessToken)    

    return newAccessToken
}

export async function getDropboxHeaders(customHeaders: Record<string, string>): Promise<Record<string, string>> {
    const cookieStore = await cookies()
    const dropbox_token = cookieStore.get('dropbox_token')

    if (!dropbox_token) {
        return customHeaders
    }

    const headers = {
        'Authorization': `Bearer ${dropbox_token.value}`,
        ...customHeaders
    };

    return headers
}

export async function verifyDropbox() {
    try {
        const cookieStore = await cookies()
        const dropbox_token = cookieStore.get('dropbox_token')

        if (!dropbox_token) {
            return false
        }

        return true
    } catch (error) {
        console.log('Error al verificar el token:', error)
        return false
    }
}

export async function uploadVideo(track: TracksDatum, videoBuffer: Buffer) {
    const cookieStore = await cookies()
    const dropbox_token = cookieStore.get('dropbox_token')

    if (!dropbox_token) {
        redirect('/error')
    }

    if(!videoBuffer) {
        redirect('/error')
    }

    // verify token
    await verifyDropbox()

    const api_url = 'https://content.dropboxapi.com/2/files/upload'

    const headers = await getDropboxHeaders({
        'Content-Type': 'application/octet-stream',
        'Dropbox-API-Arg': JSON.stringify({
            path: `/karaoke/${track.id}.mp4`,
            mode: 'overwrite',
            autorename: false,
            mute: false
        })
    })

    const response = await fetch(api_url, {
        method: 'POST',
        headers: headers,
        body: videoBuffer
    })

    if (response.ok) {
        cookieStore.set('track_'+track.id.toString(), 'yes')    
        revalidatePath('/song/' + track.id)
    } else {
        console.log('Error al subir el archivo:', response.statusText);
        throw new Error('Failed to upload video')
    }
}

export async function listFolder(path: string) {
    const cookieStore = await cookies()
    const dropbox_token = cookieStore.get('dropbox_token')

    if (!dropbox_token) {
        redirect('/error')
    }

    // verify token
    await verifyDropbox()

    const api_url = 'https://content.dropboxapi.com/2/files/list_folder'

    const headers = {
        'Authorization': `Bearer ${dropbox_token.value}`,
        'Content-Type': 'application/json'
    };

    const response = await fetch(api_url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            path: path,
            recursive: true
        })
    })

    if (response.ok) {
        const data = await response.json();
        console.log('Carpeta listada exitosamente:', data);
        return data
    } else {
        console.log('Error al listar la carpeta:', response.statusText);
        return false
    }
}

export async function findVideo(track: TracksDatum) {
    const cookieStore = await cookies()
    const dropbox_token = cookieStore.get('dropbox_token')

    if (!dropbox_token) {
        redirect('/error')
    }

    const video = await existVideo(`/karaoke/${track.id}.mp4`)

    if (video) {
        console.log('existe: ' + track.id)
        cookieStore.set('track_'+track.id.toString(), 'yes')        
    } else {
        cookieStore.set('track_'+track.id.toString(), 'no')
    }

    revalidatePath('/song/' + track.id)
}

export async function downloadVideo(videoId: number) {    
    return await download(`/karaoke/${videoId}.mp4`)
}