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