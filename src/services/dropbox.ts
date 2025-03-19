import { getDropboxHeaders } from "@/app/dropbox/actions";

export async function existVideo(path: string) {
    const api_url = 'https://api.dropboxapi.com/2/files/get_metadata'

    const headers = await getDropboxHeaders({
        'Content-Type': 'application/json'
    });

    const response = await fetch(api_url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            path: path
        })
    })

    if (response.ok) {
        const data = await response.json();
        return data
    } else {
        return false
    }
}

export async function download(path: string) {
    const api_url = 'https://content.dropboxapi.com/2/files/download'

    console.log('Descargando video: ' + path)

    const headers = await getDropboxHeaders({
        'Dropbox-API-Arg': JSON.stringify({
            path: path
        })
    });

    const response = await fetch(api_url, {
        method: 'POST',
        headers: headers
    })

    if (response.ok) {
        const data = await response.blob();
        console.log('Video descargado')
        return data
    } else {
        console.log('Error al descargar el video:', response.statusText);
        return false
    }
}