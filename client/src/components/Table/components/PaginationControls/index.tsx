import type { IPaginationControlsProps } from "@/components/Table/components/interfaces";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { FC } from "react";

export const PaginationControls: FC<IPaginationControlsProps> = ({
  currentPage,
  onPageChange,
  pageSize,
  totalCount,
  totalPages,
}) => {
  const startItem = (currentPage - 1) * pageSize + 1;
  const endItem = Math.min(currentPage * pageSize, totalCount);

  return (
    <div className="flex items-center justify-between px-2 py-4">
      <div className="text-sm text-muted-foreground">
        Showing {startItem} - {endItem} of {totalCount} results
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" aria-label="Previous page"/>
        </Button>
        <Button 
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" aria-label="Next page"/>
        </Button>
      </div>
    </div>
  );
};