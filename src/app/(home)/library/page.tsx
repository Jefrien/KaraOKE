import { MySong } from "@/types/MySong";
import TrackRowItem from "../components/TrackRowItem";
import { getFavorites } from "./actions";
import { TracksDatum } from "@/types/chart";

export default async function Library() {

  const favorites = await getFavorites()

  return (
    <div>
      <div className="flex flex-col">
        {favorites.map((favorite: MySong, index: number) => (
          <TrackRowItem key={index} track={favorite.track as TracksDatum} number={index + 1} isFavorite={true} />
        ))}
      </div>
    </div>
  );
}
