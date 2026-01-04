import { useEffect, useState } from "react";

export function useQsLatamData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const loadCsv = async () => {
      try {
        setLoading(true);

        const response = await fetch("/datos_qs_latam_chile_limpio.csv");
        if (!response.ok) {
          throw new Error("No se pudo cargar el dataset QS Latam");
        }

        const text = await response.text();

        const rows = text
          .split("\n")
          .map((r) => r.trim())
          .filter(Boolean);

        if (rows.length < 2) {
          throw new Error("El CSV QS Latam está vacío o mal formado");
        }

        const headers = rows[0].split(",").map((h) => h.trim());

        const parsed = rows.slice(1).map((row, index) => {
          const values = row.split(",").map((v) => v.trim());

          const obj = {
            ID: Number(values[headers.indexOf("ranking")]),
          };
          

          headers.forEach((h, i) => {
            const raw = values[i];
            const num = Number(raw);
            obj[h] = raw === "" || Number.isNaN(num) ? raw : num;
          });
          

          return obj;
        });

        if (isMounted) {
          setData(parsed);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          setLoading(false);
        }
      }
    };

    loadCsv();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
