import React from 'react';

export interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
  className?: string;
}

interface DataGridProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
}

export function DataGrid<T>({ columns, data, onRowClick, isLoading }: DataGridProps<T>) {
  return (
    <div className="w-full h-full overflow-y-auto custom-scrollbar rounded-lg border border-outline-variant/10 bg-surface-container-low/50 backdrop-blur-md">
      <table className="w-full text-left border-collapse min-w-max">
        <thead>
          <tr className="border-b border-outline-variant/20 bg-surface-container-high/40">
            {columns.map((col, idx) => (
              <th 
                key={idx} 
                className={`py-4 px-6 font-label-md text-label-md text-on-surface-variant uppercase tracking-wider sticky top-0 bg-surface-container-high/90 backdrop-blur-md z-10 ${col.className || ''}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            [...Array(6)].map((_, i) => (
              <tr key={`skeleton-${i}`} className="border-b border-outline-variant/5">
                {columns.map((_, colIdx) => (
                  <td key={colIdx} className="py-4 px-6">
                    <div className="h-4 bg-surface-container-high animate-pulse rounded w-3/4"></div>
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-on-surface-variant font-body-sm">
                No records found.
              </td>
            </tr>
          ) : (
            data.map((row, rowIdx) => (
              <tr 
                key={rowIdx} 
                onClick={() => onRowClick && onRowClick(row)}
                className={`border-b border-outline-variant/5 transition-colors duration-150 ${onRowClick ? 'cursor-pointer hover:bg-surface-container-high/30' : 'hover:bg-surface-container-high/10'}`}
              >
                {columns.map((col, colIdx) => (
                  <td 
                    key={colIdx} 
                    className={`py-4 px-6 font-body-sm text-body-sm text-on-surface ${col.className || ''}`}
                  >
                    {typeof col.accessor === 'function' ? col.accessor(row) : (row[col.accessor as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
