import { useEffect, useState } from "react";
import Papa from "papaparse";

export function useAcademicsData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/Authors_career_2024_since_1788.csv")
      .then((res) => res.text())
      .then((text) => {
        const parsed = Papa.parse(text, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
        });

        setData(parsed.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error cargando Authors_career_2024_since_1788.csv", err);
        setLoading(false);
      });
  }, []);

  return { data, loading };
}
