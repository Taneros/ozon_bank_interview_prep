import type { FC } from "react";

interface ITableLoadingProps {
  columns: number;
}

export const TableLoading: FC<ITableLoadingProps> = ({columns}) => {
  return (
    <tbody>
      {
        Array.from({length: columns}).map((_, rowIndex) => (
          <tr className="border-b border-gray-200 animate-pulse" key={rowIndex}>
            {Array.from({length: columns}).map((_, cellIndex) => (
              <td className="px-4 py-3" key={cellIndex}>
                <div className="h-4 bg-gray-200 rounded-sm"/>
              </td>
            ))}
          </tr>
        ))
      }
    </tbody>
  )
}
