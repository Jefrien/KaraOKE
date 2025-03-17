'use client'

import { generateDropboxUrl } from "../actions"

export default function DropboxConnect() {
    return (
        <div className="mt-6 p-6 bg-blue-700 rounded-xl max-w-xl">
            <h2 className="text-xl font-bold text-white ">Dropbox</h2>
            <p className="text-gray-200">Conecta tu cuenta de Dropbox para guardar tus karaoke</p>
            <button onClick={generateDropboxUrl} className="mt-4 cursor-pointer w-full flex items-center gap-2 justify-center bg-white text-black py-2 rounded-xl active:scale-95 hover:bg-gray-100 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m21.3 12.5l-3.6-3.3l3.6-2.9c.1 0 .1-.1.1-.1c.1-.2 0-.5-.2-.7l-5-2.7c-.2-.1-.4-.1-.5 0L12 5.6L8.3 2.8c-.2-.1-.4-.1-.5 0l-5 2.7c-.1 0-.1.1-.1.1c-.3.1-.2.5 0 .6l3.6 2.9l-3.6 3.3l-.1.1c-.1.2 0 .5.2.7l3.7 2v2.5c0 .2.1.3.2.4l5 3c.1 0 .2.1.3.1s.2 0 .3-.1l5-3c.2-.1.2-.3.2-.4v-2.5l3.7-2l.1-.1c.3-.1.2-.4 0-.6M16 3.7l4.1 2.2L17 8.6l-4.1-2.4zm.1 5.5L12 11.9L7.9 9.2L12 6.8zM3.9 5.9L8 3.7l3.2 2.4L7 8.6zm0 6.8l3.2-3l4.1 2.7L8 15zm12.6 4.9L12 20.3l-4.5-2.7v-1.7l.3.1H8c.1 0 .2 0 .3-.1L12 13l3.7 2.9c.1.1.2.1.3.1s.2 0 .2-.1l.3-.1zM16 15l-3.2-2.5l4.1-2.7l3.2 3z"/></svg>
                Conectar con Dropbox
            </button>
        </div>
    )
}