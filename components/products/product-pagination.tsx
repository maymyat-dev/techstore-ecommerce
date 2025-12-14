"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type Props = {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function ProductPagination({
  totalPages,
  currentPage,
  onPageChange,
}: Props) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6">
      <Pagination>
        <PaginationContent>

          <PaginationItem>
            <PaginationPrevious
              href="#"
              aria-disabled={currentPage === 1}
              className={`${
                currentPage === 1
                  ? "pointer-events-none opacity-50"
                  : "text-primary hover:text-primary"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.max(currentPage - 1, 1));
              }}
            />
          </PaginationItem>


          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1;
            return (
              <PaginationItem key={page}>
                <PaginationLink
                  href="#"
                  isActive={page === currentPage}
                  className={`${
                    page === currentPage
                      ? "bg-primary text-primary-foreground"
                      : "text-primary hover:bg-primary/10"
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page);
                  }}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            );
          })}


          <PaginationItem>
            <PaginationNext
              href="#"
              aria-disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : "text-primary hover:text-primary"
              }`}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(Math.min(currentPage + 1, totalPages));
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
