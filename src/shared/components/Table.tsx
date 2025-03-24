import { ReactNode } from "react";
import clsx from "clsx";
import Pagination from "./Pagination";
import type { PaginationMeta } from "../types/pagination.types";

interface Column<T> {
  key: keyof T | string;
  header: string;
  cell: (item: T) => ReactNode;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  className?: string;
  emptyMessage?: string;
  pagination?: {
    meta: PaginationMeta;
    onPageChange: (page: number) => void;
  };
}

export default function Table<T>({
  columns,
  data,
  className,
  emptyMessage = "No hay datos disponibles",
  pagination,
}: TableProps<T>) {
  return (
    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
        <div className="overflow-hidden shadow sm:rounded-lg">
          <table className={clsx("min-w-full divide-y divide-[var(--color-gray-300)]", className)}>
            <thead className="bg-[var(--color-gray-50)]">
              <tr>
                {columns.map((column) => (
                  <th
                    key={column.key.toString()}
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-[var(--color-gray-900)] sm:pl-6"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-gray-200)] bg-white">
              {data.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="px-3 py-4 text-sm text-center text-[var(--color-gray-500)]"
                  >
                    {emptyMessage}
                  </td>
                </tr>
              ) : (
                data.map((item, index) => (
                  <tr key={index}>
                    {columns.map((column) => (
                      <td
                        key={column.key.toString()}
                        className="whitespace-nowrap px-3 py-4 text-sm text-[var(--color-gray-500)]"
                      >
                        {column.cell(item)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {pagination && (
            <Pagination
              meta={pagination.meta}
              onPageChange={pagination.onPageChange}
            />
          )}
        </div>
      </div>
    </div>
  );
} 