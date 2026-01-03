import "../styles/academic-modal.css";
import { metricDescriptions } from "../constants/metricDescriptionsTop2";

export default function AcademicDetailModal({ row, onClose }) {
  if (!row) return null;

  return (
    <div className="academic-modal-overlay" onClick={onClose}>
      <div
        className="academic-modal"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="academic-modal-header">
          <h2>{row.authfull ?? "Académico"}</h2>
          <button onClick={onClose} aria-label="Cerrar">
            ✕
          </button>
        </header>

        <div className="academic-modal-body">
          {Object.entries(metricDescriptions).map(([key, meta]) => {
            const value = row[key];

            if (value === undefined || value === null || value === "")
              return null;

            return (
              <div key={key} className="academic-metric">
                <div className="metric-label">
                  {meta.label}
                </div>

                <div className="metric-value">
                  {String(value)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
