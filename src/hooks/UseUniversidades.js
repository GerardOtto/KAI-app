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
        const rows = result.data.filter(
          (r) => r.ID && r.Institucion && r.years
        );

        setData(rows);
      },
    });
  }, []);

  return data;
}
