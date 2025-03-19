import { verifyDropbox } from "@/app/dropbox/actions";
import { getSingleSong } from "@/services/search";
import { createClient } from "@/services/supabase/server";

import { redirect } from "next/navigation";
import GenerateVideo from "./components/GenerateVideo";
import { cookies } from "next/headers";
import VerifySongInAccount from "./components/VerifySongInAccount";
import VideoPlayer from "./components/VideoPlayer";

export default async function Song({ params }: { params: Promise<{ id: string }> }) {

  const supabase = await createClient()
  const cookiesStore = await cookies()

  const { data, error } = await supabase.auth.getUser()  
  const dropbox = await verifyDropbox()

  if (error && !data?.user || !dropbox) {
    redirect('/settings')
  }

  const { id } = await params  

  const song = await getSingleSong(Number(id))  
  const existingVideo = await cookiesStore.get('track_'+id)?.value

  return (
    <div>      
      {!existingVideo && <VerifySongInAccount song={song} />}
      {existingVideo === 'no' && <GenerateVideo song={song} />}  

      {existingVideo === 'yes' && (
        <VideoPlayer videoId={Number(id)} />
      )}

    </div>
  );
}
