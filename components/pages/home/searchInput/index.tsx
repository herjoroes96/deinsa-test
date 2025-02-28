// Import type
import type { Responsible } from "@/types/Responsible";
// Import functions
import { useState } from "react";

export default function SearchInput({
  setDataTable,
  responsibles,
}: {
  setDataTable: React.Dispatch<React.SetStateAction<Responsible[]>>;
  responsibles: Responsible[];
}) {
  const [search, setSearch] = useState<string>("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set the search query
    setSearch(e.target.value);

    // Filter responsibles based on search query
    const filteredResponsibles = responsibles.filter(
      (responsible: Responsible) => {
        const searchQuery = e.target.value.toLowerCase();
        return (
          responsible.Correo.toLowerCase().includes(searchQuery) ||
          responsible.IDCategoria.toLowerCase().includes(searchQuery) ||
          responsible.IDResponsable.toLowerCase().includes(searchQuery) ||
          responsible.IDTipo.toLowerCase().includes(searchQuery) ||
          responsible.Puesto.toLowerCase().includes(searchQuery) ||
          responsible.Responsable.toLowerCase().includes(searchQuery) ||
          responsible.Telefono.toLowerCase().includes(searchQuery)
        );
      }
    );

    // Set the filtered responsibles
    setDataTable(filteredResponsibles);
  };

  return (
    <div className="flex py-2 relative">
      <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-500 dark:text-gray-400"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
            clipRule="evenodd"
          ></path>
        </svg>
      </div>
      <input
        type="text"
        value={search}
        id="table-search"
        onChange={handleSearch}
        placeholder="Search for items"
        className="block p-2 ps-10 text-sm text-gray-900 border border-indigo-300 rounded-lg w-80 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-600 focus-visible:border-indigo-600"
      />
    </div>
  );
}
