import { useMemo, useState } from "react";
import UniversityDropdownSelector from "../components/UniversityDropdownSelector";
import RowsSelector from "../components/RowsSelector";
import "../styles/simulator.css";

const QS_METRICS = [
  { key: "overall_score", label: "Puntaje Global" },
  { key: "academic_reputation_score", label: "Reputación Académica" },
  { key: "employer_reputation_score", label: "Reputación Empleadores" },
  { key: "faculty_student_ratio_score", label: "Ratio Académico/Estudiante" },
  { key: "staff_phd_score", label: "Académicos con PhD" },
  { key: "citations_per_paper_score", label: "Citas por Artículo" },
  { key: "papers_per_faculty_score", label: "Artículos por Académico" },
  { key: "international_research_network_score", label: "Red Internacional" },
  { key: "web_impact_score", label: "Impacto Web" },
  { key: "student_mix_domestic", label: "Estudiantes Nacionales" },
  { key: "student_mix_international", label: "Estudiantes Internacionales" },
];

export default function QsLatamView({ data = [], loading }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);

  const selectedUniversities = useMemo(
    () => data.filter((u) => selectedIds.includes(u.ID)),
    [data, selectedIds]
  );

  const ranked = useMemo(() => {
    const sorted = [...selectedUniversities].sort(
      (a, b) => (b.overall_score ?? 0) - (a.overall_score ?? 0)
    );

    return rowsToShow === Infinity
      ? sorted
      : sorted.slice(0, rowsToShow);
  }, [selectedUniversities, rowsToShow]);

  const handleSelectAll = () => {
    setSelectedIds(data.map((u) => u.ID));
  };
  
  const handleClearSelection = () => {
    setSelectedIds([]);
  };
  
  return (
    <div className="simulator-view">
      <div className="page-container">
        <h1 className="simulator-title">Comparador de QS Latam – Chile</h1>

        <div className="simulator-controls">
            <RowsSelector value={rowsToShow} onChange={setRowsToShow} />

            <button
                type="button"
                className="secondary-button"
                onClick={handleSelectAll}
            >
                Mostrar todas
            </button>

            <button
                type="button"
                className="secondary-button danger"
                onClick={handleClearSelection}
            >
                Limpiar selección
            </button>
            </div>


        <div className="university-selector-full">
          <UniversityDropdownSelector
            universidades={data}
            selected={selectedIds}
            onSelect={(id) =>
              setSelectedIds((prev) =>
                prev.includes(id) ? prev : [...prev, id]
              )
            }
            onRemove={(id) =>
              setSelectedIds((prev) =>
                prev.filter((x) => x !== id)
              )
            }
          />
        </div>

        <div className="simulator-table-wrapper">
          <table className="simulator-table">
            <thead>
              <tr>
                <th>#</th>
                <th className="sticky-name">Universidad</th>

                {QS_METRICS.map((m) => (
                  <th key={m.key}>{m.label}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {ranked.map((u, index) => {
                const prev = index > 0 ? ranked[index - 1] : null;

                return (
                  <tr key={u.ID}>
                    <td>{index + 1}</td>
                    <td className="sticky-name">{u.title}</td>

                    {QS_METRICS.map((m) => {
                      const current = u[m.key];
                      const previous = prev?.[m.key];

                      const isNumber =
                        typeof current === "number" &&
                        typeof previous === "number";

                      const diff = isNumber ? current - previous : null;

                      return (
                        <td key={m.key}>
                          <div className="cell-value">
                            {current === "" || current == null
                              ? "—"
                              : current}

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
                  </tr>
                );
              })}

              {ranked.length === 0 && (
                <tr>
                  <td colSpan={QS_METRICS.length + 2}>
                    Selecciona universidades para comparar
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
