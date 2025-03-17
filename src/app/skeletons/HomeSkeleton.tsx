import CardSkeleton from "./Card";

export default function HomeSkeleton() {
    return (
        <>
            <div className="grid grid-cols-2 mt-4 gap-6 h-64">
                <CardSkeleton />
                <CardSkeleton />
            </div>
            <div className="flex h-8 gap-2 max-w-sm mt-6">
                {Array.from({ length: 4 }).map((_, index) => (
                    <CardSkeleton key={index} />
                ))}
            </div>
            <div className="flex flex-col gap-3 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div className="h-9" key={index}>
                        <CardSkeleton />
                    </div>
                ))}
            </div>
        </>
    )
}