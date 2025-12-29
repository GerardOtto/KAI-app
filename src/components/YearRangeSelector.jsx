import "../styles/YearRangeSelector.css";

export default function YearRangeSelector({
    value,
    options,
    onChange,
  }) {
    return (
      <div className="year-range-selector">
        <label className="year-label">Rango de años</label>
  
        <select
          className="year-select"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          {options.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>
    );
  }
  