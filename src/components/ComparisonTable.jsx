import { VARIABLE_LABELS } from "../config/variableLabels";
import { formatNumber } from "../utils/formatNumber";

export default function ComparisonTable({ universidades }) {
  if (universidades.length === 0) {
    return (
      <p style={{ color: "#6b7280" }}>
        Selecciona universidades para comparar.
      </p>
    );
  }

  const attributes = Object.keys(VARIABLE_LABELS).filter(
    (key) => key in universidades[0]
  );

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Indicador</th>
          {universidades.map((u) => (
            <th key={u.ID}>{u.Institucion}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {attributes.map((attr) => (
          <tr key={attr}>
            <td className="attr">{VARIABLE_LABELS[attr]}</td>
            {universidades.map((u) => (
              <td key={u.ID + attr}>
                {formatNumber(u[attr])}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
