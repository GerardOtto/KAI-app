import { useMemo, useState } from "react";
import { calculateTotalScore } from "../utils/calculateScore";
import { formatNumber } from "../utils/formatNumber";
import UniversityDropdownSelector from "../components/UniversityDropdownSelector";
import YearRangeSelector from "../components/YearRangeSelector";
import RowsSelector from "../components/RowsSelector";
import "../styles/simulator.css";

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
];

export default function ComparisonSimulatorLike({
  universidades,
  yearRange,
  onYearChange,
  yearRanges,
}) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);

  /** 🔹 Filtrado por rango */
  const filteredUniversidades = useMemo(
    () => universidades.filter((u) => u.years === yearRange),
    [universidades, yearRange]
  );

  /** 🔹 Universidades únicas para dropdown */
  const universidadesUnicas = useMemo(() => {
    const map = new Map();
    filteredUniversidades.forEach((u) => {
      if (!map.has(u.ID)) map.set(u.ID, u);
    });
    return Array.from(map.values());
  }, [filteredUniversidades]);

  /** 🔹 Universidades seleccionadas */
  const selectedUniversidades = useMemo(() => {
    return filteredUniversidades.filter((u) =>
      selectedIds.includes(u.ID)
    );
  }, [filteredUniversidades, selectedIds]);

  /** 🔹 Ranking */
  const rankedUniversidades = useMemo(() => {
    const ranked = selectedUniversidades
      .map((u) => ({
        ...u,
        totalScore: calculateTotalScore(u),
      }))
      .sort((a, b) => b.totalScore - a.totalScore);

    return rowsToShow === Infinity
      ? ranked
      : ranked.slice(0, rowsToShow);
  }, [selectedUniversidades, rowsToShow]);

  const handleSelectAll = () => {
    setSelectedIds(universidadesUnicas.map((u) => u.ID));
  };

  const handleClearSelection = () => {
    setSelectedIds([]);
  };

  return (
    <div className="simulator-view">
        <div className="page-container">
      <p className="simulator-title">
        Comparador Institucional Scimago
      </p>

      {/* 🔹 CONTROLES */}
      <div className="simulator-controls">
        <YearRangeSelector
            value={yearRange}
            options={yearRanges}
            onChange={onYearChange}
        />

        <RowsSelector
            value={rowsToShow}
            onChange={setRowsToShow}
        />

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


      {/* 🔹 SELECTOR DE UNIVERSIDADES */}
      <div className="comparison-table-container">
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
        setSelectedIds((prev) =>
          prev.filter((x) => x !== id)
        )
      }
    />
  </div>

      {/* 🔹 TABLA */}
      <div className="simulator-table-wrapper">
        <table className="simulator-table">
          <thead>
            <tr>
              <th>#</th>
              <th className="sticky-name">Universidad</th>

              {METRICS.map((m) => (
                <th key={m.key}>{m.label}</th>
              ))}

              <th className="sticky-score">Puntaje Total</th>
            </tr>
          </thead>

          <tbody>
            {rankedUniversidades.map((u, index) => (
              <tr key={u.ID}>
                <td>{index + 1}</td>
                <td className="sticky-name">{u.Institucion}</td>

                {METRICS.map((m) => {
  const currentValue = u[m.key];
  const prevValue =
    index > 0 ? rankedUniversidades[index - 1][m.key] : null;

  const diff =
    typeof currentValue === "number" &&
    typeof prevValue === "number"
      ? currentValue - prevValue
      : null;

  return (
    <td key={m.key}>
      <div className="cell-value">
        {formatNumber(currentValue)}

        {diff !== null && diff !== 0 && (
          <div
            className={`diff ${
              diff > 0 ? "diff-positive" : "diff-negative"
            }`}
          >
            {diff > 0 ? "+" : ""}
            {formatNumber(diff)}
          </div>
        )}
      </div>
    </td>
  );
})}

                <td className="score-cell sticky-score">
                  {formatNumber(u.totalScore)}
                </td>
              </tr>
            ))}

            {rankedUniversidades.length === 0 && (
              <tr>
                <td colSpan={METRICS.length + 3}>
                  Selecciona universidades para comparar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        </div>
      </div>
    </div>
 </div>
  );
}
