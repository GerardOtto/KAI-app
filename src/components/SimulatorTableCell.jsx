import { formatNumber } from "../utils/formatNumber";

export default function SimulatorTableCell({ 
  metric, 
  university, 
  prevValue, 
  onChange 
}) {
  const originalValue = university[metric.key];
  const editedValue = university._edited[metric.key];
  const currentValue = editedValue ?? originalValue;
  const wasEdited = editedValue !== undefined;

  const diff = (typeof currentValue === "number" && typeof prevValue === "number")
    ? currentValue - prevValue
    : null;

  return (
    <td>
      <div className="cell-value">
        <input
          type="number"
          step="any"
          className="metric-input"
          value={currentValue ?? ""}
          onChange={(e) => onChange(university.ID, metric.key, e.target.value)}
          onClick={(e) => e.stopPropagation()}
        />

        {wasEdited && typeof originalValue === "number" && (
          <div className="original-value">
            Original: {formatNumber(originalValue)}
          </div>
        )}

        {diff !== null && diff !== 0 && (
          <div className={`diff ${diff > 0 ? "diff-positive" : "diff-negative"}`}>
            {diff > 0 ? "+" : ""}{formatNumber(diff)}
          </div>
        )}
      </div>
    </td>
  );
}