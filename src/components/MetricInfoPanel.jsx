import { useState, useMemo } from "react";
import "../styles/metricInfoPanel.css";

export default function MetricInfoPanel({
  metrics,
  descriptions,
  title = "Métricas",
}) {
  const [metric, setMetric] = useState(metrics[0]?.key);

  const description = useMemo(
    () =>
      descriptions?.[metric] ??
      "No hay una descripción disponible para esta métrica.",
    [metric, descriptions]
  );

  return (
    <div className="metric-info-panel">
      <h3>{title}</h3>
      <select
        value={metric}
        onChange={(e) => setMetric(e.target.value)}
      >
        {metrics.map((m) => (
          <option key={m.key} value={m.key}>
            {m.label}
          </option>
        ))}
      </select>

      <div className="metric-description">
        {description}
      </div>
    </div>
  );
}
