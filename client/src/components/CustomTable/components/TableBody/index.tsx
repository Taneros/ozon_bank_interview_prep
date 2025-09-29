import { flexRender, type Row } from "@tanstack/react-table";

interface ITableBodyProps<T> {
  rows: Row<T>[];
}

export const TableBody = <T,>({ rows }: ITableBodyProps<T>) => {
  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {rows.map((row) => (
        <tr
          className="hover:bg-gray-50 transition-colors border-b border-gray-200 last:border-b-0"
          key={row.id}
        >
          {row.getVisibleCells().map((cell) => {
            const cellClassName = cell.column.columnDef.meta?.className || "";

            return (
              <td
                className={`
                px-4 py-3
                text-sm text-gray-900
                whitespace-nowrap overflow-hidden text-ellipsis
                border-r border-gray-200 last:border-r-0
                ${cellClassName}
                `}
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            );
          })}
        </tr>
      ))}
    </tbody>
  );
};
