import { SearchIcon } from "lucide-react";
import ButtonMenu from "./ButtonMenu";

export default  async function Search() {
    

    return (
        <div className="w-full flex items-center py-6 px-6 gap-4">
            <ButtonMenu/>
            <form action="/search" className="relative w-full">
                <input type="text" name="q" placeholder="Buscar por artistas, canciones o albumes" 
                className="w-full py-4 pl-12 outline-none rounded-lg bg-neutral-800/80 text-sm text-gray-400" />
                <SearchIcon className="absolute w-6 h-6 top-1/2 -translate-y-1/2 left-3 text-gray-400" />   
            </form>        
        </div>
    )
}