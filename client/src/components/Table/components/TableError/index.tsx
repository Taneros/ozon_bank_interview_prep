import { Button } from "@/components/ui/button";
import type { FC } from "react";
import type { ITableErrorProps } from "@/components/Table/components/interfaces";

export const TableError: FC<ITableErrorProps> = ({ error, onRetry }) => {
  return (
    <div className="rounded-md border border-red-200 bg-red-50 p-4">
      <div className="text-red-800 font-medium">Error loading users</div>
      <div className="text-red-600 text-sm mt-1">
        {error instanceof Error ? error.message : "Unknown error occurred"}
      </div>
      <Button
        onClick={onRetry}
        className="mt-2 bg-red-100 text-red-800 hover:bg-red-200"
        variant="outline"
      >
        Retry
      </Button>
    </div>
  );
};