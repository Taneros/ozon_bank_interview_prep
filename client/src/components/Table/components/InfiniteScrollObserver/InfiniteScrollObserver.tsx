import { Loader2 } from "lucide-react";
import { useEffect, useRef, type FC } from "react";

export interface IInfiniteScrollObserverProps {
  onIntersect: () => void;
  isFetching: boolean;
  hasNextPage?: boolean;
}

export const InfiniteScrollObserver: FC<IInfiniteScrollObserverProps> = ({
  isFetching,
  onIntersect,
  hasNextPage,
}) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetching) {
          onIntersect();
        }
      },
      {
        threshold: 0.1,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [onIntersect, hasNextPage, isFetching]);

  return (
    <div ref={observerRef} className="py-4 flex justify-center">
      {isFetching ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading more users...</span>
        </div>
      ) : hasNextPage ? (
        <div className="text-muted-foreground text-sm">
          Scroll down to load more
        </div>
      ) : (
        <div className="text-muted-foreground text-sm">All users loaded</div>
      )}
    </div>
  );
};
