import { Item } from "@/types/yt";

export default function VideoPlayer({ videoId, song }: { videoId: number, song: Item }) {


    
    return (
        <div>
            {JSON.stringify(song)}
        </div>
    )
}