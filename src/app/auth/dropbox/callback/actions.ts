'use server'
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

async function exchangeCodeForTokens(code: string) {
    const clientId = process.env.DROPBOX_CLIENT_ID!;
    const clientSecret = process.env.DROPBOX_SECRET!;
    const redirectUri = process.env.DROPBOX_REDIRECT_URI!;

    const tokenUrl = 'https://api.dropboxapi.com/oauth2/token';
    const params = new URLSearchParams();
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', redirectUri);
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);

    const response = await fetch(tokenUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: params,
    });

    const data = await response.json();
    console.log('Tokens obtenidos:', data);
    return data;
}

export default async function storeDropboxToken(code: string) {
    const cookieStore = await cookies()
    //cookieStore.set('dropbox_token', accessToken)

    const tokens = await exchangeCodeForTokens(code)
    
    cookieStore.set('dropbox_token', tokens.access_token)
    cookieStore.set('dropbox_refresh_token', tokens.refresh_token)

    redirect('/settings')
}