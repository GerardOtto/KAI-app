import { useState, useMemo, useEffect } from "react";
import RowsSelector from "../components/RowsSelector";
import UniversityDropdownSelector from "../components/UniversityDropdownSelector";
import MetricInfoPanel from "../components/MetricInfoPanel";
import { metricDescriptions } from "../constants/metricDescriptionsQS";
import "../styles/simulator.css";

const QS_METRICS = [
  { key: "overall_score", label: "Puntaje Global" },
  { key: "academic_reputation_score", label: "Reputación Académica" },
  { key: "employer_reputation_score", label: "Reputación del Empleador" },
  { key: "faculty_student_ratio_score", label: "Ratio Académico / Estudiante" },
  { key: "staff_phd_score", label: "Académicos con PhD" },
  { key: "citations_per_paper_score", label: "Citas por Artículo" },
  { key: "papers_per_faculty_score", label: "Artículos por Académico" },
  { key: "international_research_network_score", label: "Red Internacional" },
  { key: "web_impact_score", label: "Impacto Web" },
  { key: "student_mix_domestic", label: "Estudiantes Nacionales" },
  { key: "student_mix_international", label: "Estudiantes Internacionales" },
];

const QS_WEIGHTS = {
    academic_reputation_score: 0.3,
    employer_reputation_score: 0.2,
    faculty_student_ratio_score: 0.1,
    staff_phd_score: 0.1,
    citations_per_paper_score: 0.1,
    papers_per_faculty_score: 0.1,
    international_research_network_score: 0.05,
    web_impact_score: 0.05,
    student_mix_domestic: 0.05,
    student_mix_international: 0.05,
  };
  
  function calculateQSScore(values) {
    return Object.entries(QS_WEIGHTS).reduce(
      (sum, [key, weight]) =>
        sum + (Number(values[key]) || 0) * weight,
      0
    );
  }
  

export default function QSSimulatorView({ data = [] }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [editableData, setEditableData] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);
  const [selectedRowId, setSelectedRowId] = useState(null);

  /* 🔹 Universidades únicas */
  const universidadesUnicas = useMemo(() => {
    const map = new Map();
    data.forEach((u) => {
      if (!map.has(u.ID)) map.set(u.ID, u);
    });
    return Array.from(map.values());
  }, [data]);

  /* 🔹 Filtrado por selección */
  const filteredData = useMemo(() => {
    if (selectedIds.length === 0) return [];
    return data.filter((u) => selectedIds.includes(u.ID));
  }, [data, selectedIds]);

  /* 🔹 Inicialización editable */
  useEffect(() => {
    setEditableData(
      filteredData.map((u) => ({
        ...u,
        _edited: {},
        _original: Object.fromEntries(
          QS_METRICS.map((m) => [m.key, Number(u[m.key]) || 0])
        ),
        // normalizamos los valores base
        ...Object.fromEntries(
          QS_METRICS.map((m) => [m.key, Number(u[m.key]) || 0])
        ),
      }))
    );
  }, [filteredData]);
  

  /* 🔹 Cambio de métrica */
  const handleMetricChange = (id, metric, value) => {
    setEditableData((prev) =>
      prev.map((u) =>
        u.ID === id
          ? {
              ...u,
              _edited: {
                ...u._edited,
                [metric]: value === "" ? "" : Number(value),
              },
            }
          : u
      )
    );
  };

  /* 🔹 Reset solo de métricas */
  const handleResetTable = () => {
    setEditableData((prev) =>
      prev.map((u) => ({
        ...u,
        _edited: {},
      }))
    );
  };

  /* 🔹 Ranking QS (por overall_score editado o original) */
  const rankedUniversities = useMemo(() => {
    const ranked = editableData
      .map((u) => {
        const merged = { ...u, ...u._edited };
        return {
          ...u,
          _current: merged,
          totalScore: calculateQSScore(merged),
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);

    return rowsToShow === Infinity
      ? ranked
      : ranked.slice(0, rowsToShow);
  }, [editableData, rowsToShow]);

  return (
    <div className="simulator-view">
      <div className="page-container">
        <div className="simulator-header-grid">
            <div className="header-left">
                <h1 className="simulator-title">
                Simulador de Variables QS Latam
                </h1>

                <div className="simulator-controls">
                <RowsSelector value={rowsToShow} onChange={setRowsToShow} />

                <button
                    className="secondary-button"
                    onClick={() =>
                    setSelectedIds(universidadesUnicas.map((u) => u.ID))
                    }
                >
                    Mostrar todas
                </button>

                <button
                    className="secondary-button danger"
                    onClick={() => setSelectedIds([])}
                >
                    Limpiar selección
                </button>

                <button
                    className="reset-button"
                    type="button"
                    onClick={handleResetTable}
                >
                    Reestablecer métricas
                </button>
                </div>
            </div>

            <div className="header-right">
                <MetricInfoPanel
                metrics={QS_METRICS}
                descriptions={metricDescriptions}
                title="Descripción de métricas QS"
                />
            </div>
            </div>

        {/* 🔹 Selector de universidades */}
        <div className="university-selector-full">
          <UniversityDropdownSelector
            universidades={universidadesUnicas}
            selected={selectedIds}
            onSelect={(id) =>
              setSelectedIds((prev) =>
                prev.includes(id) ? prev : [...prev, id]
              )
            }
            onRemove={(id) =>
              setSelectedIds((prev) => prev.filter((x) => x !== id))
            }
          />
        </div>

        {/* 🔹 Tabla */}
        <div className="simulator-table-wrapper">
          <table className="simulator-table">
            <thead>
              <tr>
                <th>#</th>
                <th className="sticky-name">Universidad</th>

                {QS_METRICS.map((m) => (
                  <th key={m.key} title={metricDescriptions[m.key]}>
                    {m.label}
                  </th>
                ))}

                <th className="sticky-score">QS Score</th>
              </tr>
            </thead>

            <tbody>
              {rankedUniversities.map((u, index) => (
                <tr
                  key={u.ID}
                  className={u.ID === selectedRowId ? "row-selected" : ""}
                  onClick={() =>
                    setSelectedRowId((prev) =>
                      prev === u.ID ? null : u.ID
                    )
                  }
                >
                  <td>{index + 1}</td>
                  <td className="sticky-name">{u.title}</td>

                  {QS_METRICS.map((m) => {
                    const current =
                      u._edited[m.key] ?? u[m.key];
                    const original = u._original[m.key];

                    const prevRow =
                      index > 0 ? rankedUniversities[index - 1] : null;
                    const prevValue = prevRow
                      ? prevRow._edited[m.key] ??
                        prevRow[m.key]
                      : null;

                    const diff =
                      typeof current === "number" &&
                      typeof prevValue === "number"
                        ? current - prevValue
                        : null;

                    const wasEdited =
                      u._edited[m.key] !== undefined;

                    return (
                      <td key={m.key}>
                        <div className="cell-value">
                          <input
                            type="number"
                            step="any"
                            className="metric-input"
                            value={current ?? ""}
                            onClick={(e) => e.stopPropagation()}
                            onChange={(e) =>
                              handleMetricChange(
                                u.ID,
                                m.key,
                                e.target.value
                              )
                            }
                          />

                          {wasEdited && (
                            <div className="original-value">
                              {original}
                            </div>
                          )}

                          {diff !== null && diff !== 0 && (
                            <div
                              className={`diff ${
                                diff > 0
                                  ? "diff-positive"
                                  : "diff-negative"
                              }`}
                            >
                              {diff > 0 ? "+" : ""}
                              {diff.toFixed(2)}
                            </div>
                          )}
                        </div>
                      </td>
                    );
                  })}

                  <td className="score-cell sticky-score">
                    {u.totalScore.toFixed(2)}
                  </td>
                </tr>
              ))}

              {rankedUniversities.length === 0 && (
                <tr>
                  <td colSpan={QS_METRICS.length + 3}>
                    Selecciona universidades para simular
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="disclaimer-container">
                <p className="disclaimer-text">
                    El puntaje total y la posición mostrados en esta tabla corresponden a una simulación basada en los indicadores publicados por QS Latin America, pero no replican exactamente los resultados oficiales. Las principales fuentes de divergencia se originan en indicadores compuestos y altamente normalizados, en particular Student Mix (estudiantes nacionales e internacionales), Academic Reputation y Employer Reputation, cuyos valores finales en QS dependen de escalamiento global, ponderaciones internas no públicas y ajustes por distribución. Los resultados deben interpretarse como una aproximación analítica orientada a simulación y comparación relativa, y no como una reproducción exacta del ranking oficial.
                </p>
                </div>
    </div>
  );
}
