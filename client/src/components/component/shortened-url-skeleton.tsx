import { Skeleton } from "../ui/skeleton";

interface Props {
  count?: number;
}
export function ShortenedUrlSkeleton({ count = 3 }: Props) {
  function SkeletonCard() {
    return (
      <div className="p-4 rounded-lg border border-dashed border-gray-400 bg-white flex items-center gap-4 mr-2 w-full">
        <div className="flex-1 grid gap-1.5">
          <div className="flex flex-col  justify-between gap-2">
            <Skeleton className="w-40 h-4 rounded-md" />
            <Skeleton className="w-72 h-4 rounded-md" />
            <Skeleton className="w-32 h-4 rounded-md" />
          </div>
        </div>
      </div>
    );
  }
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </>
  );
}
