'use client'
import { IconX } from "@tabler/icons-react"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function ButtonMenu({ isSidebar = false }: { isSidebar?: boolean }) {

    const path = usePathname()
    
    const toggleMenu = () => {

        if (isSidebar) {
            document.querySelector('.side')?.classList.add('hidden')            
        } else {            
            document.querySelector('.side')?.classList.remove('hidden')
        }        
    }

    useEffect(() => {
        if (isSidebar) {
            document.querySelector('.side')?.classList.add('hidden')
        } 
    }, [path, isSidebar])

    return (
        <>
            { isSidebar ? (
                <button onClick={toggleMenu} className="absolute top-2 right-2 flex items-center justify-center lg:hidden hover:bg-white/20 w-12 h-12 rounded-lg cursor-pointer flex-none">
                    <IconX className="w-8 h-8 text-white/80" />
                </button>    
            ) : (
                <button onClick={toggleMenu} className=" flex items-center justify-center lg:hidden hover:bg-white/20 w-12 h-12 rounded-lg cursor-pointer flex-none">
                    <Menu className="w-8 h-8 text-white/80" />
                </button>    
            )}        
        </>
    )
}