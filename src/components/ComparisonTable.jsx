import { useMemo } from "react";
import { VARIABLE_LABELS } from "../config/variableLabels";
import { calculateTotalScore } from "../utils/calculateScore";
import { formatNumber } from "../utils/formatNumber";

export default function ComparisonTable({ universidades = [] }) {
  if (universidades.length === 0) {
    return (
      <p style={{ color: "#6b7280" }}>
        Selecciona universidades para comparar.
      </p>
    );
  }

  // 1. Calcular puntaje total y ordenar de mayor a menor
  const rankedUniversidades = useMemo(() => {
    return [...universidades]
      .map((u) => ({
        ...u,
        totalScore: calculateTotalScore(u),
      }))
      .sort((a, b) => b.totalScore - a.totalScore);
  }, [universidades]);

  // 2. Determinar atributos válidos
  const attributes = Object.keys(VARIABLE_LABELS).filter(
    (key) => key in rankedUniversidades[0]
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Indicador</th>
          {rankedUniversidades.map((u) => (
            <th key={u.ID}>{u.Institucion}</th>
          ))}
        </tr>
      </thead>

      <tbody>
  {attributes.map((attr) => (
    <tr key={attr}>
      <td className="attr">{VARIABLE_LABELS[attr]}</td>

      {rankedUniversidades.map((u, index) => {
        const currentValue = u[attr];
        const prevValue =
          index > 0 ? rankedUniversidades[index - 1][attr] : null;

        const diff =
          prevValue !== null &&
          typeof currentValue === "number" &&
          typeof prevValue === "number"
            ? currentValue - prevValue
            : null;

        return (
          <td key={`${u.ID}-${attr}`}>
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
    </tr>
  ))}

  {/* Puntaje total */}
  <tr className="total-row">
    <td className="attr">Puntaje Total</td>

    {rankedUniversidades.map((u, index) => {
      const prev =
        index > 0 ? rankedUniversidades[index - 1].totalScore : null;
      const diff =
        prev !== null ? u.totalScore - prev : null;

      return (
        <td key={`total-${u.ID}`} className="score-cell">
          <div className="cell-value">
            {formatNumber(u.totalScore)}

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
  </tr>
</tbody>

    </table>
  );
}
