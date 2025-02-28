// Import type
import type { Responsible } from "@/types/Responsible";

export default function ResponsibleCards({
  responsibles,
  currentPage,
}: {
  responsibles: Responsible[];
  currentPage: number;
}) {
  return (
    <div className="grid grid-cols-1 w-full sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {responsibles
        .slice((currentPage - 1) * 15, currentPage * 15)
        .map((responsible, index) => (
          <div
            key={`responsible-${index}`}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
          >
            <div className="p-4">
              <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                {responsible.Responsable}
              </h3>
              <div className="space-y-2">
                <p className="text-gray-700">
                  <span className="font-medium">Correo:</span>{" "}
                  {responsible.Correo}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">ID Categoría:</span>{" "}
                  {responsible.IDCategoria}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">ID Responsable:</span>{" "}
                  {responsible.IDResponsable}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">ID Tipo:</span>{" "}
                  {responsible.IDTipo}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Puesto:</span>{" "}
                  {responsible.Puesto}
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">Teléfono:</span>{" "}
                  {responsible.Telefono}
                </p>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}
