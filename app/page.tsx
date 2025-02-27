"use client";

// Import functions
import { useState, useEffect } from "react";
// Import type
import type { Responsible } from "@/types/Responsible";
// Import components
import Table from "@/components/pages/home/table";
import Loading from "@/components/shared/loading";
import Pagination from "@/components/shared/pagination";
import SearchInput from "@/components/pages/home/searchInput";

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [dataTable, setDataTable] = useState<Responsible[]>([]);
  const [responsibles, setResponsibles] = useState<Responsible[]>([]);

  useEffect(() => {
    // Function to fetch responsibles data
    const fetchResponsables = async () => {
      try {
        // Fetch responsibles data
        const response = await fetch("/api/responsibles");

        // Check if the request was successful
        if (!response.ok) {
          throw new Error("Error al cargar los datos.");
        }

        // Parse the response as JSON
        const data: Responsible[] = await response.json();

        // Set the total number of pages
        setTotalPages(Math.ceil(data.length / 15));

        // Set the responsibles data
        setDataTable(data);
        setResponsibles(data);
      } catch (err) {
        // Set the error message
        setError(err instanceof Error ? err.message : "Error desconocido");
      }
    };

    // Call the fetchResponsables function
    fetchResponsables();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Check if the data is loading
  if (!error && dataTable.length === 0) {
    return <Loading />;
  }

  // Check if there is an error
  if (error) {
    return <div className="text-red-500 text-center p-4">Error: {error}</div>;
  }

  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-4 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <SearchInput setDataTable={setDataTable} responsibles={responsibles} />

      <Table responsibles={dataTable} currentPage={currentPage} />

      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        totalItems={dataTable.length}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
