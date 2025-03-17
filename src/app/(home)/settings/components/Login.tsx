'use client'
import { User2 } from "lucide-react";
import { login } from "../actions";

export default function Login() {
    return (
        <div className="mt-6 p-6 bg-emerald-700 rounded-xl max-w-xl">
            <h2 className="text-xl font-bold text-white ">Ingresar a tu cuenta</h2>
            <p className="text-gray-200">
                Ingresa o crea una cuenta para guardar tus ajustes en <strong>Kara<span className="text-emerald-300">oke</span></strong>
            </p>
            <button onClick={login} className="mt-4 cursor-pointer w-full flex items-center gap-2 justify-center bg-white text-black py-2 rounded-xl active:scale-95 hover:bg-gray-100 transition-all">
                <User2 size={20} />
                Ingresar
            </button>
        </div>
    )
}