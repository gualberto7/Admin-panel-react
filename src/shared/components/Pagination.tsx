import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import type { PaginationMeta } from "../types/pagination.types";

interface PaginationProps {
  meta: PaginationMeta;
  onPageChange: (page: number) => void;
}

export default function Pagination({ meta, onPageChange }: PaginationProps) {
  const { current_page, last_page, links } = meta;

  if (last_page <= 1) return null;

  return (
    <div className="flex items-center justify-between border-t border-[var(--color-gray-200)] bg-white px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => onPageChange(current_page - 1)}
          disabled={current_page === 1}
          className="relative inline-flex items-center rounded-md border border-[var(--color-gray-300)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Anterior
        </button>
        <button
          onClick={() => onPageChange(current_page + 1)}
          disabled={current_page === last_page}
          className="relative ml-3 inline-flex items-center rounded-md border border-[var(--color-gray-300)] bg-white px-4 py-2 text-sm font-medium text-[var(--color-gray-700)] hover:bg-[var(--color-gray-50)] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Siguiente
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[var(--color-gray-700)]">
            Mostrando <span className="font-medium">{meta.from}</span> a{" "}
            <span className="font-medium">{meta.to}</span> de{" "}
            <span className="font-medium">{meta.total}</span> resultados
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onPageChange(current_page - 1)}
              disabled={current_page === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-[var(--color-gray-400)] ring-1 ring-inset ring-[var(--color-gray-300)] hover:bg-[var(--color-gray-50)] focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Anterior</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {links.map((link, index) => {
              if (link.url === null) {
                return (
                  <span
                    key={index}
                    className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-[var(--color-gray-700)] ring-1 ring-inset ring-[var(--color-gray-300)]"
                  >
                    {link.label}
                  </span>
                );
              }

              const page = parseInt(link.label);
              if (isNaN(page)) return null;

              return (
                <button
                  key={index}
                  onClick={() => onPageChange(page)}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                    link.active
                      ? "z-10 bg-[var(--color-primary-600)] text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-600)]"
                      : "text-[var(--color-gray-900)] ring-1 ring-inset ring-[var(--color-gray-300)] hover:bg-[var(--color-gray-50)] focus:z-20 focus:outline-offset-0"
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
            <button
              onClick={() => onPageChange(current_page + 1)}
              disabled={current_page === last_page}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-[var(--color-gray-400)] ring-1 ring-inset ring-[var(--color-gray-300)] hover:bg-[var(--color-gray-50)] focus:z-20 focus:outline-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="sr-only">Siguiente</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
} 