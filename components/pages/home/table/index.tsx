// Import type
import type { Responsible } from "@/types/Responsible";

export default function Table({
  responsibles,
  currentPage,
}: {
  responsibles: Responsible[];
  currentPage: number;
}) {
  return (
    <table className="w-full rounded-md border">
      <thead>
        <tr className="bg-indigo-600 text-white">
          <th className="border p-2">Correo</th>
          <th className="border p-2">ID Categoria</th>
          <th className="border p-2">ID Responsable</th>
          <th className="border p-2">ID Tipo</th>
          <th className="border p-2">Puesto</th>
          <th className="border p-2">Responsable</th>
          <th className="border p-2">Telefono</th>
        </tr>
      </thead>
      <tbody>
        {responsibles
          .slice((currentPage - 1) * 15, currentPage * 15)
          .map((responsible, index) => (
            <tr key={`responsible-${index}`} className="hover:bg-gray-100">
              <td className="border p-2 text-center">{responsible.Correo}</td>
              <td className="border p-2">{responsible.IDCategoria}</td>
              <td className="border p-2">{responsible.IDResponsable}</td>
              <td className="border p-2">{responsible.IDTipo}</td>
              <td className="border p-2">{responsible.Puesto}</td>
              <td className="border p-2">{responsible.Responsable}</td>
              <td className="border p-2">{responsible.Telefono}</td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
