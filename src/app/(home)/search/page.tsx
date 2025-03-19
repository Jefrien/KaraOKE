import { Suspense } from "react";
import SearchResults from "./form";


export default function Search() {

  return <Suspense fallback={<div>Loading...</div>}><SearchResults /></Suspense>
}
