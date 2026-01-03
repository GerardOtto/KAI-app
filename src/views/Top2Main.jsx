import { useMemo, useState } from "react";
import AcademicDetailModal from "../components/AcademicDetailModal";
import "../styles/top2main.css";

const PAGE_SIZES = [10, 25, 50, 100, "ALL"];

export default function Top2Main({ data = [] }) {
  const [selectedInstitution, setSelectedInstitution] = useState("ALL");
  const [pageSize, setPageSize] = useState(25);

  const [instQuery, setInstQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const [selectedAcademic, setSelectedAcademic] = useState(null);

  /* Instituciones únicas */
  const institutions = useMemo(() => {
    const set = new Set(
      data.map((d) => String(d.inst_name ?? "").trim()).filter(Boolean)
    );
    return Array.from(set).sort();
  }, [data]);

  /* Autocompletado */
  const institutionSuggestions = useMemo(() => {
    if (instQuery.length < 4) return [];
    const q = instQuery.toLowerCase();

    return institutions
      .filter((i) => i.toLowerCase().includes(q))
      .slice(0, 10);
  }, [instQuery, institutions]);

  /* Filtrado */
  const filteredData = useMemo(() => {
    if (selectedInstitution === "ALL") return data;
    return data.filter(
      (d) => String(d.inst_name ?? "").trim() === selectedInstitution
    );
  }, [data, selectedInstitution]);

  /* Orden */
  const sortedData = useMemo(() => {
    return [...filteredData].sort(
      (a, b) => Number(b["c (ns)"] ?? 0) - Number(a["c (ns)"] ?? 0)
    );
  }, [filteredData]);

  /* Límite */
  const visibleData = useMemo(() => {
    if (pageSize === "ALL") return sortedData;
    return sortedData.slice(0, pageSize);
  }, [sortedData, pageSize]);

  const handleInstitutionSelect = (inst) => {
    setSelectedInstitution(inst);
    setInstQuery(inst);
    setShowSuggestions(false);
  };

  return (
    <div className="dataset-explorer">
      <header className="dataset-header">
        <h1>Ranking de Académicos</h1>
        <p>
          Académicos ordenados de manera descendente por impacto (
          <strong>Composite-index sin autocitas</strong>)
        </p>
      </header>

      {/* Filtros */}
      <div className="dataset-filters">
        <div className="filter-group autocomplete">
          <label>Institución</label>
          <input
            type="text"
            placeholder="Escriba al menos 4 letras…"
            value={instQuery}
            onChange={(e) => {
              setInstQuery(e.target.value);
              setSelectedInstitution("ALL");
              setShowSuggestions(true);
            }}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 150)}
            onFocus={() => instQuery.length >= 4 && setShowSuggestions(true)}
          />

          {showSuggestions && institutionSuggestions.length > 0 && (
            <ul className="suggestions">
              {institutionSuggestions.map((inst) => (
                <li
                  key={inst}
                  onClick={() => handleInstitutionSelect(inst)}
                >
                  {inst}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="filter-group">
          <label>Filas a mostrar</label>
          <select
            value={pageSize}
            onChange={(e) =>
              setPageSize(
                e.target.value === "ALL"
                  ? "ALL"
                  : Number(e.target.value)
              )
            }
          >
            {PAGE_SIZES.map((s) => (
              <option key={s} value={s}>
                {s === "ALL" ? "Todas" : s}
              </option>
            ))}
          </select>
        </div>

        <div className="dataset-count">
          Mostrando {visibleData.length.toLocaleString()} de{" "}
          {sortedData.length.toLocaleString()}
        </div>
      </div>

      {/* Tabla */}
      <div className="dataset-table-wrapper">
        <table className="dataset-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Académico</th>
              <th>Institución</th>
              <th>País</th>
              <th className="numeric">c (ns)</th>
            </tr>
          </thead>
          <tbody>
            {visibleData.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <button
                    className="academic-link"
                    onClick={() => setSelectedAcademic(row)}
                  >
                    {row.authfull ?? "—"}
                  </button>
                </td>
                <td>{row.inst_name ?? "—"}</td>
                <td>{row.cntry ?? "—"}</td>
                <td className="numeric">
                  {row["c (ns)"] !== undefined && row["c (ns)"] !== null && row["c (ns)"] !== ""
                    ? String(row["c (ns)"])
                    : "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {visibleData.length === 0 && (
          <div className="empty-state">
            No hay registros para la institución seleccionada
          </div>
        )}
      </div>

      {/* Modal */}
      {selectedAcademic && (
        <AcademicDetailModal
          row={selectedAcademic}
          onClose={() => setSelectedAcademic(null)}
        />
      )}
    </div>
  );
}
