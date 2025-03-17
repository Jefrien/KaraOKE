'use client'
import { AudioLines, Library, Search, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { twMerge } from "tailwind-merge"
export default function Sidebar() {

    const path = usePathname()

    const menuItems = [
        { id: 'home', label: 'Inicio', icon: <AudioLines size={20} />, href: '/', isActive: path === '/' },
        { id: 'search', label: 'Buscar', icon: <Search size={20} />, href: '/search', isActive: path === '/search' },
        { id: 'library', label: 'Tu biblioteca', icon: <Library size={20} />, href: '/library', isActive: path === '/library' },
        { id: 'settings', label: 'Ajustes', icon: <Settings size={20} />, href: '/settings', isActive: path === '/settings' },
    ]    

    return (

        <div className="w-64 bg-black py-6 flex flex-col gap-6 flex-none">
            <h1 className="text-3xl font-bold text-white px-6 text-center">
                Kara
                <span className="text-emerald-500">oke</span>
            </h1>
            <div>
                {menuItems.map(item => (
                    <Link href={item.href} key={item.id} className={twMerge(
                        "flex relative transition-all group items-center gap-4 px-6 pl-8 py-3 text-gray-300 hover:text-emerald-500 border-l-2 border-transparent hover:border-emerald-500 cursor-pointer",
                        item.isActive && 'border-emerald-500 text-emerald-500'
                    )}>
                        <div className={twMerge(
                            "absolute transition-opacity group-hover:opacity-100 left-0 t-0 w-1/2 h-full bg-gradient-to-r from-emerald-500/20 via-transparent to-transparent",
                            item.isActive ? 'opacity-100' : 'opacity-0'
                        )} />
                        {item.icon}
                        <span className="font-semibold">{item.label}</span>
                    </Link>
                ))}

            </div>
        </div>
    )
}