import MainScroll from "./components/MainScroll"
import Search from "./components/Search"
import Sidebar from "./components/Sidebar"


export default function BlogLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
            {/* Main Container */}
            <div className="flex flex-1 overflow-hidden">
                <Sidebar />
                {/* Main Content */}
                <div className="flex-1">
                    <Search />                    
                    <MainScroll>
                    {children}
                    </MainScroll>
                </div>
            </div>
        </div>
    )
}