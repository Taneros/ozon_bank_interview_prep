import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from "lucide-react";
import type { FC } from "react";

interface ITableSearchProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  hasActiveFilters?: boolean;
  onClearFilters: () => void;
}

export const TableSearch: FC<ITableSearchProps> = ({
  searchValue,
  onSearchChange,
  onClearFilters,
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between my-4">
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-10 pr-10"
          type="text"
          placeholder="Search..."
          value={searchValue}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        {searchValue && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground hover:text-foreground !outline-none !border-0 !shadow-none focus-visible:!ring-0 focus-visible:!ring-offset-0 focus:!ring-0 focus:!ring-offset-0 hover:!bg-transparent"
            onClick={(e) => {
              e.preventDefault();
              onClearFilters();
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};