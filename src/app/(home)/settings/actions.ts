'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/services/supabase/server'
import { DropboxAuth } from 'dropbox'
import { cookies } from 'next/headers'

export async function login() {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
            redirectTo: process.env.SUPABASE_REDIRECT_URI
        }
    })

    if (error) {
        redirect('/error')
    }

    if (data.url) {
        redirect(data.url) // use the redirect API for your server framework
    }
}

export async function logout() {
    const supabase = await createClient()

    const { error } = await supabase.auth.signOut()

    if (error) {
        redirect('/error')
    }

    const cookieStore = await cookies()
    cookieStore.delete('dropbox_token')

    revalidatePath('/settings', 'layout')
    redirect('/settings')
}

export async function generateDropboxUrl() {
    const dbx = new DropboxAuth({ clientId: process.env.DROPBOX_CLIENT_ID! })
    const authUrl = await dbx.getAuthenticationUrl(process.env.DROPBOX_REDIRECT_URI!, undefined, 'code', 'offline')
    redirect(authUrl.toString())
}