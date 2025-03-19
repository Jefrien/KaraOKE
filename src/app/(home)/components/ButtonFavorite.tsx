'use client'

import { IconHeart, IconHeartFilled } from "@tabler/icons-react"
import { Tooltip } from 'react-tooltip'
import { addToFavorites, removeFromFavorites } from "../song/actions"
import { toast, ToastContainer } from "react-toastify"

export default function ButtonFavorite({ track, isFavorite = false }: { track: any, isFavorite?: boolean }) {    

    const addToFavoritesHandle = async (e: React.MouseEvent) => {
        e.preventDefault()
        try {
            await addToFavorites({ track })
        } catch (error) {
            console.log(error)
            toast.error('Ya agregada a tus favoritos')
        }
    }

    const removeFromFavoritesHandler = async (e: React.MouseEvent) => {
        e.preventDefault()
        await removeFromFavorites({ track })
        toast.success('Canción eliminada de tu biblioteca')
    }


    return (
        <>
            { isFavorite ? (
                <button
                    data-tooltip-id="track-favorite"
                    data-tooltip-content="Eliminar de favoritos"
                    data-tooltip-place="top"
                    className="inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer"
                    onClick={removeFromFavoritesHandler}
                    >
                    <IconHeartFilled className="h-5 w-5 text-yellow-500" />
                </button>
            ) : (
                <button
                    data-tooltip-id="track-favorite"
                    data-tooltip-content="Agregar a favoritos"
                    data-tooltip-place="top"
                    className="hidden group-hover:md:inline-flex w-8 h-8 items-center justify-center rounded-full cursor-pointer"
                    onClick={addToFavoritesHandle}
                    >
                    <IconHeart className="h-5 w-5 text-white" />
                </button>
            )}
            <Tooltip id="track-favorite" />
            <ToastContainer position='top-center' theme='colored' />
        </>
    )
}