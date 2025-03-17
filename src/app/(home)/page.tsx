import { getCharts } from "@/services/charts";
import SectionsTabs from "./components/SectionsTabs";
import TopPlaylist from "./components/TopPlaylist";
import TopSong from "./components/TopSong";
import { Suspense } from "react";
import HomeSkeleton from "../skeletons/HomeSkeleton";

export default async function Home() {

  const chart = await getCharts()
  const { playlists, tracks } = chart

  return (
    <div>

      <Suspense fallback={<HomeSkeleton />}>

        <div className="grid grid-cols-2 mt-4 gap-6">
          <TopPlaylist playlists={playlists} />
          <TopSong tracks={tracks} />
        </div>

        <SectionsTabs chart={chart} />

      </Suspense>
    </div>
  );
}
