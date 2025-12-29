import { useMemo, useState } from "react";
import UniversitySelector from "../components/UniversitySelector";
import TrendsChart from "../components/TrendsChart";
import { metricDescriptions } from "../constants/metricDescriptions";
import "../styles/trends.css";

export default function TrendViews({ universidades }) {
  const [selectedUniversities, setSelectedUniversities] = useState([]);
  const [metric, setMetric] = useState("output");

  const clearSelection = () => {
    setSelectedUniversities([]);
  };

  /**
   * 🔹 Lista única de universidades (1 fila por ID)
   */
  const universidadesUnicas = useMemo(() => {
    const map = new Map();

    universidades.forEach((u) => {
      if (!map.has(u.ID)) {
        map.set(u.ID, u);
      }
    });

    return Array.from(map.values());
  }, [universidades]);

  /**
   * 🔹 Handler de selección (checkbox)
   */
  const handleUniversityChange = (e) => {
    const id = Number(e.target.value);

    setSelectedUniversities((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  };

  const METRICS = [
    { key: "normalized_impact", label: "Impacto Normalizado*" },
    { key: "excel_lider", label: "Excelencia con Liderazgo" },
    { key: "output", label: "Producción Científica" },
    { key: "lider", label: "Liderazgo Científico" },
    { key: "not_own_journals_output", label: "Revistas Externas" },
    { key: "own_journals", label: "Revistas Propias" },
    { key: "excel", label: "Excelencia" },
    { key: "q1", label: "Q1" },
    { key: "colab", label: "Colaboración Internacional" },
    { key: "open_access", label: "Acceso Abierto*" },
    { key: "stp", label: "Talento Científico" },
    { key: "ik", label: "Conocimiento Innovador" },
    { key: "patents", label: "Patentes" },
    { key: "tech_impact", label: "Impacto Tecnológico*" },
    { key: "AM", label: "Altmetrics" },
    { key: "sdg", label: "ODS" },
    { key: "female_stp", label: "Talento Científico Femenino" },
    { key: "overton", label: "Políticas Públicas" },
    { key: "total_score", label: "Puntaje Total" },
  ];

  const metricDescription =
    metricDescriptions?.[metric] ??
    "No hay una descripción disponible para esta métrica.";

  return (
    <div className="trends-view">
      <h1>Comparador de Tendencias</h1>

      <div className="trends-layout">
        {/* 🔹 Panel lateral */}
        <div className="panel">
          <p
            style={{
              textTransform: "uppercase",
              fontSize: "0.85rem",
              fontWeight: "600",
              marginBottom: "8px",
            }}
          >
            Instituciones disponibles
          </p>

          <UniversitySelector
            universidades={universidadesUnicas}
            selected={selectedUniversities}
            onChange={handleUniversityChange}
            onClear={clearSelection}
          />

          {/* 🔹 Selector de métrica */}
          <div className="metric-selector">
            <label>Métrica</label>
            <select
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            >
              {METRICS.map((m) => (
                <option key={m.key} value={m.key}>
                  {m.label}
                </option>
              ))}
            </select>

            {/* 🔹 Descripción de la métrica */}
            <div className="metric-description">
              {metricDescription}
            </div>
          </div>
        </div>

        {/* 🔹 Panel principal */}
        <section className="trends-main">
          <TrendsChart
            universidades={universidades}
            selectedUniversities={selectedUniversities}
            metric={metric}
          />
        </section>
      </div>
    </div>
  );
}
