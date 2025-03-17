'use client'
import { searchSongs } from "@/services/search";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Tracks } from "@/types/chart";
import TrackRowItem from "../components/TrackRowItem";
import CardSkeleton from "@/app/skeletons/Card";

export default function Search() {

  const searchParams = useSearchParams()
  const search = searchParams.get('q')

  const [loading, setLoading] = useState(false)

  const [results, setResults] = useState<Tracks>({
    data: [],
    total: 0,
    next: undefined
  } as Tracks)

  const handleSearch = async () => {
    setLoading(true)
    const response = await searchSongs(search || '')
    setResults(response)
    setLoading(false)
  }

  useEffect(() => {
    if (!search) return
    handleSearch()
  }, [search])


  return (
    <div>
      Resultados de: <strong>{search}</strong>

      {loading && (
        <div className="flex flex-col gap-3 mt-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <div className="h-16" key={index}>
              <CardSkeleton />
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="flex flex-col border-t-2 border-neutral-800 pt-2 mt-2">
          {results.data.length > 0 && (
            <div className="flex flex-col">
              {results.data.map((track, index) => (
                <TrackRowItem key={index} track={track} number={index + 1} />
              ))}
            </div>
          )}
          {(results.data.length === 0 && search !== '') && <div>No se encontraron resultados</div>}
        </div>
      )}
    </div>
  );
}
