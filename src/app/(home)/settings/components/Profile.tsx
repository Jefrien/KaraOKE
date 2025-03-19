import { verifyDropbox } from "@/app/dropbox/actions";
import { User } from "@supabase/supabase-js";
import { LogOutIcon } from "lucide-react";
import Image from "next/image";
import { logout } from "../actions";

export function LogoutButton() {
    'use client'

    return (
        <button onClick={logout} className="mt-4 cursor-pointer w-full flex items-center gap-2 justify-center bg-white text-black py-2 rounded-xl active:scale-95 hover:bg-gray-100 transition-all">
            <LogOutIcon size={20} />
            Cerrar sesión
        </button>
    )
}

export default async function Profile({ user }: { user: User }) {

    const dropbox = await verifyDropbox()    

    return (
        <div className="mt-6 p-6 bg-emerald-700 rounded-xl max-w-xl">
            <h2 className="text-xl font-bold text-white ">Detalles de la cuenta</h2>
            <p className="text-gray-200">
                Estos son los detalles de tu cuenta de <strong>Kara<span className="text-emerald-300">oke</span></strong>
            </p>

            <div className="mt-4">
                <div className="flex items-center gap-2">
                    <Image src={user.user_metadata.avatar_url} alt={user.user_metadata.name} width={40} height={40} className="rounded-full" />
                    <div>
                        <h3 className="text-white">{user.user_metadata.name}</h3>
                        <p className="text-gray-200">{user.email}</p>
                    </div>
                </div>

                <div className="mt-4">
                    <div className="flex items-center gap-2">
                        <p className="text-gray-200 font-bold">Nombre</p>
                        <p className="text-white">{user.user_metadata.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-200 font-bold">Email</p>
                        <p className="text-white">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-gray-200 font-bold">Dropbox</p>
                        <p className="text-white">{dropbox ? 'Conectado' : 'No conectado'}</p>
                    </div>
                </div>

            </div>

            <LogoutButton />
        </div>
    )
}