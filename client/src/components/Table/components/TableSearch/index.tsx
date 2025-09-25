import { GlobalSearch } from "@/components//Table/components/GlobalSearch";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import type { FC } from "react";

interface ITableSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export const TableSearch: FC<ITableSearchProps> = ({
  searchValue,
  onSearchChange,
  hasActiveFilters,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between my-4">
      <GlobalSearch
        onChange={onSearchChange}
        value={searchValue}
      />

      {hasActiveFilters && (
        <div>
          <Button
            className="flex items-center gap-2"
            variant="outline"
            size="sm"
            onClick={onClearFilters}
          >
            <X className="h-4 w-4" />
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
};