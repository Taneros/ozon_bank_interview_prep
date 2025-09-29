import { flexRender, type HeaderGroup } from "@tanstack/react-table";

interface ITableHeaderProps<T> {
  headerGroups: HeaderGroup<T>[];
}

export const TableHeader = <T,>({ headerGroups }: ITableHeaderProps<T>) => {
  return (
    <thead className="bg-gray-50">
      {headerGroups.map((headerGroup) => (
        <tr className="border-b border-gray-200" key={headerGroup.id}>
          {headerGroup.headers.map((header) => (
            <th
              className="px-4 py-3 text-center text-xs font-medium text-gray-500 relative border-r border-gray-200"
              colSpan={header.colSpan}
              style={{ width: header.getSize() }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}

              <div
                onMouseDown={header.getResizeHandler()}
                onTouchStart={header.getResizeHandler()}
                className={`
                  absolute right-0 top-0 h-full w-1
                  bg-blue-400 cursor-col-resize
                  opacity-0 hover:opacity-100 transition-opacity
                  ${
                    header.column.getIsResizing()
                      ? "opacity-100 bg-blue-600"
                      : ""
                  }
                  `}
              ></div>
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};
