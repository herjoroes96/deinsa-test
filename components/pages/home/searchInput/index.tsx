// Import type
import type { Responsible } from "@/types/Responsible";
// Import functions
import { useEffect, useState, useCallback } from "react";

export default function SearchInput({
  responsibles,
  setDataTable,
  setTotalPages,
}: {
  responsibles: Responsible[];
  setTotalPages: React.Dispatch<React.SetStateAction<number>>;
  setDataTable: React.Dispatch<React.SetStateAction<Responsible[]>>;
}) {
  const [search, setSearch] = useState<string>("");
  const [filterBy, setFilterBy] = useState<string>("ALL");

  const applyFilter = useCallback(() => {
    // Filter responsibles based on filter by option
    const filteredResponsibles = responsibles.filter(
      (responsible: Responsible) => {
        const searchQuery = search.toLowerCase();

        if (filterBy == "ALL") {
          return (
            responsible.Correo.toLowerCase().includes(searchQuery) ||
            responsible.IDCategoria.toLowerCase().includes(searchQuery) ||
            responsible.IDResponsable.toLowerCase().includes(searchQuery) ||
            responsible.IDTipo.toLowerCase().includes(searchQuery) ||
            responsible.Puesto.toLowerCase().includes(searchQuery) ||
            responsible.Responsable.toLowerCase().includes(searchQuery) ||
            responsible.Telefono.toLowerCase().includes(searchQuery)
          );
        } else {
          return responsible[filterBy as keyof Responsible]
            .toLowerCase()
            .includes(searchQuery);
        }
      }
    );

    // Set the total number of pages
    setTotalPages(Math.ceil(filteredResponsibles.length / 15));

    // Set the filtered responsibles
    setDataTable(filteredResponsibles);
  }, [search, filterBy, responsibles, setTotalPages, setDataTable]);

  // Apply filter when search or filter by option changes
  useEffect(() => {
    applyFilter();
  }, [applyFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Set the search query
    setSearch(e.target.value);
  };

  const handleFilterByChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    // Set the filter by option
    setFilterBy(e.target.value);
  };

  return (
    <div className="flex gap-4 py-2 relative">
      <div>
        <label className="block ps-1 mb-2 text-sm font-semibold text-indigo-600">
          Filtrar por
        </label>
        <select
          id="countries"
          value={filterBy}
          onChange={handleFilterByChange}
          className="bg-gray-50 border border-indigo-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5"
        >
          <option value="ALL">Todos</option>
          <option value="Responsable">Responsable</option>
          <option value="Correo">Correo</option>
          <option value="IDCategoria">ID Categoría</option>
          <option value="IDResponsable">ID Responsable</option>
          <option value="IDTipo">ID Tipo</option>
          <option value="Puesto">Puesto</option>
          <option value="Telefono">Teléfono</option>
        </select>
      </div>
      <div>
        <label className="block ps-1 mb-2 text-sm font-semibold text-indigo-600">
          Buscar
        </label>
        <input
          type="text"
          value={search}
          id="table-search"
          onChange={handleSearch}
          placeholder="Search for items"
          className="block p-2 ps-4 text-sm text-gray-900 rounded-lg border border-indigo-300 w-80 bg-gray-50 focus:ring-indigo-500 focus:border-indigo-600 focus-visible:border-indigo-600"
        />
      </div>
    </div>
  );
}
