import { ArrowUpDown } from "lucide-react";
import { type ColumnDef, type SortDirection } from "@tanstack/react-table";


export function HeaderButton({ 
  children, 
  onClick, 
  isSorted 
}: { 
  children: React.ReactNode;
  onClick: () => void;
  isSorted: boolean | SortDirection;
}) {
  return (
    <div
      className={`
        flex items-center space-x-1 cursor-pointer 
        px-3 py-2 rounded-sm transition-all duration-200
        hover:bg-accent/50 hover:text-foreground
        ${isSorted ? "text-blue-600 bg-accent/30" : "text-inherit"}
      `}
      onClick={onClick}
    >
      <span className="font-medium">{children}</span>
      <div className="relative">
        <ArrowUpDown className="h-3 w-3" />
        {isSorted === "asc" && (
          <span className="absolute -top-1 -right-1 w-1 h-1 bg-blue-600 rounded-full"></span>
        )}
        {isSorted === "desc" && (
          <span className="absolute -top-1 -right-1 w-1 h-1 bg-blue-600 rounded-full"></span>
        )}
      </div>
    </div>
  );
}