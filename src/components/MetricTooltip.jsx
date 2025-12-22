export default function MetricTooltip({ label, description }) {
    return (
      <div className="metric-tooltip-wrapper">
        <span className="metric-label">{label}</span>
  
        {description && (
          <div className="metric-tooltip">
            {description}
          </div>
        )}
      </div>
    );
  }
  
  