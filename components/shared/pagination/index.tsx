// Import icons
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  onPageChange: (page: number) => void;
}) {
  // Calcule start index and end index
  const startIndex: number = currentPage * 15 - 14;
  const endIndex: number =
    totalPages == currentPage ? totalItems : currentPage * 15;
  // Styles will be applied to the current page
  const styleCurrent: string =
    "z-10 bg-indigo-600 text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
  // Styles will be applied to the other pages
  const styleDefault: string =
    "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0";

  const getVisiblePages: () => (number | string)[] = () => {
    const delta = 3; // Number of pages to show before and after the current page
    const range = [];

    if (totalPages <= 10) {
      // If there are fewer than 10 pages, show all pages
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      // If there are more than 10 pages, show some pages
      range.push(1); // Always include the first page

      if (currentPage - delta > 2) {
        range.push("..."); // Add a "..." if there are pages before the current page
      }

      // Add pages around the current page
      for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
      ) {
        range.push(i);
      }

      if (currentPage + delta < totalPages - 1) {
        range.push("..."); // Add a "..." if there are pages after the current page
      }

      range.push(totalPages); // Always include the last page
    }

    return range;
  };

  // Get the pages to show
  const visiblePages: (number | string)[] = getVisiblePages();

  return (
    <div className="w-full flex items-center justify-between bg-white py-3">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          onClick={(e) => {
            e.preventDefault();
            if (currentPage == 1) return;
            onPageChange(currentPage - 1);
          }}
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          onClick={(e) => {
            e.preventDefault();
            if (currentPage == totalPages) return;
            onPageChange(currentPage + 1);
          }}
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex}</span> to{" "}
            <span className="font-medium">{endIndex}</span> of{" "}
            <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            aria-label="Pagination"
            className="isolate inline-flex -space-x-px rounded-md shadow-xs"
          >
            <a
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage - 1);
              }}
              className="relative cursor-pointer inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon aria-hidden="true" className="size-5" />
            </a>

            {visiblePages.map((page, index) =>
              page === "..." ? (
                <span
                  key={`ellipsis-${index}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-gray-300 ring-inset bg-white"
                >
                  ...
                </span>
              ) : (
                <a
                  key={`page-${page}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(page as number);
                  }}
                  className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold cursor-pointer ${
                    currentPage === page ? styleCurrent : styleDefault
                  }`}
                >
                  {page}
                </a>
              )
            )}

            <a
              onClick={(e) => {
                e.preventDefault();
                onPageChange(currentPage + 1);
              }}
              className="relative cursor-pointer inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-gray-300 ring-inset hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon aria-hidden="true" className="size-5" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
