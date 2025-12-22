import { useEffect, useState } from "react";
import Papa from "papaparse";

export function useUniversidades() {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/instituciones_chilenas_limpias.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        // 1. Filtrar filas válidas
        const rows = result.data.filter(
          (r) => r.ID && r.Institucion && r.years
        );

        // 2. Agrupar por institución y quedarnos con el último período
        const byInstitution = new Map();

        rows.forEach((r) => {
          const existing = byInstitution.get(r.ID);

          if (
            !existing ||
            r.years > existing.years // comparación lexicográfica funciona aquí
          ) {
            byInstitution.set(r.ID, r);
          }
        });

        setData(Array.from(byInstitution.values()));
      },
    });
  }, []);

  return data;
}
