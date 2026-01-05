import { useState, useMemo, useEffect } from "react";
import { calculateTotalScore } from "../utils/calculateScore";
import { formatNumber } from "../utils/formatNumber";
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

export default function SimulatorView({
  data,
  yearRange,
  onYearChange,
  yearRanges,
}) {

  const [selectedRowId, setSelectedRowId] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);


  // Inicializa copia editable cuando cambia el dataset (año incluido)
  useEffect(() => {
    setEditableData(
      data.map((u) => ({
        ...u,
        _edited: {},
      }))
    );
  }, [data]);

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
  
  const handleResetTable = () => {
    setEditableData(
      data.map((u) => ({
        ...u,
        _edited: {},
      }))
    );
  };
  

  const rankedUniversities = useMemo(() => {
    const ranked = editableData
      .map((u) => {
        const merged = { ...u, ...u._edited };
        return {
          ...u,
          totalScore: calculateTotalScore(merged),
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
      <h1 className="simulator-title">
        Simulador de Puntaje Institucional Scimago
      </h1>

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
          className="reset-button"
          type="button"
          onClick={handleResetTable}
        >
          Reestablecer tabla
        </button>
      </div>

      <div className="simulator-table-wrapper">
        <table className="simulator-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Universidad</th>

              {METRICS.map((m) => (
                <th key={m.key}>{m.label}</th>
              ))}

              <th className="sticky-score">Puntaje Total</th>
            </tr>
          </thead>

          <tbody>
            {rankedUniversities.map((u, index) => (
              <tr
                key={u.ID}
                onClick={() => setSelectedRowId((prev) => (prev === u.ID ? null : u.ID))}                
                className={u.ID === selectedRowId ? "row-selected" : ""}
              >
                <td>{index + 1}</td>
                <td className="sticky-name">{u.Institucion}</td>

                {METRICS.map((m) => {
  const currentValue =
    u._edited[m.key] ?? u[m.key];

  const prevRow =
    index > 0 ? rankedUniversities[index - 1] : null;

  const prevValue =
    prevRow
      ? prevRow._edited[m.key] ?? prevRow[m.key]
      : null;

  const diff =
    typeof currentValue === "number" &&
    typeof prevValue === "number"
      ? currentValue - prevValue
      : null;

  return (
    <td key={m.key}>
      <div className="cell-value">
        <input
          type="number"
          step="any"
          className="metric-input"
          value={currentValue ?? ""}
          onChange={(e) =>
            handleMetricChange(u.ID, m.key, e.target.value)
          }
          onClick={(e) => e.stopPropagation()}
        />

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
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}
