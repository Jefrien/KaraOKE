'use client'

import { useEffect } from "react";
import storeDropboxToken from "./actions";
import { Loader2 } from "lucide-react";

export default function DropboxCallback() {

    async function extractAccessToken(url: any) {
        const params = new URL(url)
        const code = params.searchParams.get('code')                
        await storeDropboxToken(code?.toString() || '')
        //redirect('/settings')
    }

    useEffect(() => {
        extractAccessToken(window.location.href);
    }, ['']);

    return (
        <div className="h-screen w-full flex items-center justify-center bg-black flex-col gap-4">
            <h2 className="text-xl font-bold text-white">Conectando con Dropbox</h2>
            <Loader2 className="animate-spin h-10 w-10 text-emerald-400" />
        </div>
    )
}