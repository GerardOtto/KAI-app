import "../styles/RowsSelector.css";

export default function RowsSelector({ value, onChange }) {
  return (
    <div className="rows-selector">
        <label className="rows-label">Filas</label>
            <select
                className="rows-select"
                value={value === Infinity ? "all" : value}
                onChange={(e) =>
                onChange(
                    e.target.value === "all"
                    ? Infinity
                    : Number(e.target.value)
                )
                }
            >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value="all">Todas</option>
            </select>
        </div>
  );
}
