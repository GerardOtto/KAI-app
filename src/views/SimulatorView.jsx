import { useState, useMemo, useEffect } from "react";
import { calculateTotalScore } from "../utils/calculateScore";
import { formatNumber } from "../utils/formatNumber";
import "../styles/simulator.css";

const METRICS = [
  { key: "normalized_impact", label: "Impacto Normalizado" },
  { key: "excel_lider", label: "Excelencia con Liderazgo" },
  { key: "output", label: "Producción Científica" },
  { key: "lider", label: "Liderazgo Científico" },
  { key: "not_own_journals_output", label: "Revistas Externas" },
  { key: "own_journals", label: "Revistas Propias" },
  { key: "excel", label: "Excelencia" },
  { key: "q1", label: "Q1" },
  { key: "colab", label: "Colaboración Internacional" },
  { key: "open_access", label: "Acceso Abierto" },
  { key: "stp", label: "Talento Científico" },
  { key: "ik", label: "Conocimiento Innovador" },
  { key: "patents", label: "Patentes" },
  { key: "tech_impact", label: "Impacto Tecnológico" },
  { key: "AM", label: "Altmetrics" },
  { key: "sdg", label: "ODS" },
  { key: "female_stp", label: "Talento Científico Femenino" },
  { key: "overton", label: "Políticas Públicas" },
];

export default function SimulatorView({ data }) {
  const [editableData, setEditableData] = useState([]);

  // Inicializa copia editable (una sola vez o cuando cambia data)
  useEffect(() => {
    setEditableData(
      data.map((u) => ({
        ...u,
        _edited: {}, // valores modificados
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

  const rankedUniversities = useMemo(() => {
    return editableData
      .map((u) => {
        const merged = {
          ...u,
          ...u._edited,
        };

        return {
          ...u,
          totalScore: calculateTotalScore(merged),
        };
      })
      .sort((a, b) => b.totalScore - a.totalScore);
  }, [editableData]);

  return (
    <div className="simulator-view">
      <h2>Simulador de Puntaje Institucional Scimago</h2>

      <div className="simulator-table-wrapper">
        <table className="simulator-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Universidad</th>

              {METRICS.map((m) => (
                <th key={m.key}>{m.label}</th>
              ))}

              <th>Puntaje Total</th>
            </tr>
          </thead>

          <tbody>
            {rankedUniversities.map((u, index) => (
              <tr key={u.ID}>
                <td>{index + 1}</td>
                <td className="sticky-name">{u.Institucion}</td>

                {METRICS.map((m) => {
                  const value =
                    u._edited[m.key] ?? u[m.key] ?? "";

                  return (
                    <td key={m.key}>
                      <input
                        type="number"
                        step="any"
                        className="metric-input"
                        value={value}
                        onChange={(e) =>
                          handleMetricChange(
                            u.ID,
                            m.key,
                            e.target.value
                          )
                        }
                      />
                    </td>
                  );
                })}

                <td className="score-cell">
                  {formatNumber(u.totalScore)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
