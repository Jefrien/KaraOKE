'use server'
import { getDropboxHeaders, refreshAccessToken } from "@/app/dropbox/actions"

export async function validateDropboxToken() {    
    const headers = await getDropboxHeaders({})
    const url = 'https://api.dropboxapi.com/2/users/get_space_usage'    

    const response = await fetch(url, {
        method: 'POST',
        redirect: "follow",
        headers: headers
    })

    if (response.ok) {
        await response.json();                
    } else {
        await refreshAccessToken()
    }

    return true
}