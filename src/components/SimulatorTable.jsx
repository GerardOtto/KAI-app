import SimulatorTableCell from "./SimulatorTableCell";

export default function SimulatorTable({ 
  rankedUniversities, 
  metrics, 
  selectedRowId, 
  onRowClick, 
  onMetricChange 
}) {
  return (
    <div className="simulator-table-wrapper">
      <table className="simulator-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Universidad</th>
            {metrics.map((m) => <th key={m.key}>{m.label}</th>)}
            <th className="sticky-score">Puntaje Total</th>
          </tr>
        </thead>
        <tbody>
          {rankedUniversities.map((u, index) => (
            <tr
              key={u.ID}
              onClick={() => onRowClick(u.ID)}
              className={u.ID === selectedRowId ? "row-selected" : ""}
            >
              <td>{index + 1}</td>
              <td className="sticky-name">{u.Institucion}</td>
              {metrics.map((m) => {
                const prevRow = index > 0 ? rankedUniversities[index - 1] : null;
                const prevVal = prevRow ? (prevRow._edited[m.key] ?? prevRow[m.key]) : null;
                
                return (
                  <SimulatorTableCell
                    key={m.key}
                    metric={m}
                    university={u}
                    prevValue={prevVal}
                    onChange={onMetricChange}
                  />
                );
              })}
              <td className="score-cell sticky-score">
                {Math.round(u.totalScore).toLocaleString("es-ES", {
                  maximumFractionDigits: 2,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}