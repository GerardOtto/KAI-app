import { useState, useEffect, useMemo } from 'react';
import Papa from 'papaparse';

export function useAcademicsData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Asume que el archivo está en la carpeta /public
    fetch("/resultados_scraping_por_anio.csv")
      .then(response => response.text())
      .then(csvText => {
        Papa.parse(csvText, {
          header: true,
          dynamicTyping: true, // Convierte números automáticamente
          skipEmptyLines: true,
          complete: (results) => {
            setData(results.data);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setLoading(false);
          }
        });
      });
  }, []);

  // Obtenemos la lista de nombres únicos ordenados alfabéticamente
  const uniqueNames = useMemo(() => {
    const names = new Set(data.map(item => item.scientist_name).filter(Boolean));
    return Array.from(names).sort();
  }, [data]);

  return { data, uniqueNames, loading };
}