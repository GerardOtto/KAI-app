import { useState, useMemo, useEffect } from "react";
import { calculateTotalScore } from "../utils/calculateScore";
import YearRangeSelector from "../components/YearRangeSelector";
import RowsSelector from "../components/RowsSelector";
import UniversityDropdownSelector from "../components/UniversityDropdownSelector";
import SimulatorTable from "../components/SimulatorTable";
import { METRICS } from "../constants/ScimagoMetrics";
import "../styles/simulator.css";

export default function SimulatorView({ data, yearRange, onYearChange, yearRanges }) {
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedRowId, setSelectedRowId] = useState(null);
  const [editableData, setEditableData] = useState([]);
  const [rowsToShow, setRowsToShow] = useState(10);

  // --- Lógica de Datos ---
  const universidadesUnicas = useMemo(() => {
    const map = new Map();
    data.forEach((u) => { if (!map.has(u.ID)) map.set(u.ID, u); });
    return Array.from(map.values());
  }, [data]);

  const rankedUniversities = useMemo(() => {
    const ranked = editableData
      .map((u) => ({ ...u, totalScore: calculateTotalScore({ ...u, ...u._edited }) }))
      .sort((a, b) => b.totalScore - a.totalScore);
    return rowsToShow === Infinity ? ranked : ranked.slice(0, rowsToShow);
  }, [editableData, rowsToShow]);

  useEffect(() => {
    const filtered = data.filter((u) => selectedIds.includes(u.ID));
    setEditableData(filtered.map((u) => ({ ...u, _edited: {} })));
  }, [data, selectedIds]);

  // --- Handlers ---
  const handleMetricChange = (id, metric, value) => {
    setEditableData(prev => prev.map(u => u.ID === id 
      ? { ...u, _edited: { ...u._edited, [metric]: value === "" ? "" : Number(value) } } 
      : u
    ));
  };

  return (
    <div className="simulator-view">
      <div className="page-container">
        <h1 className="simulator-title">Simulador de Puntaje Institucional Scimago</h1>

        <div className="simulator-controls">
          <YearRangeSelector value={yearRange} options={yearRanges} onChange={onYearChange} />
          <RowsSelector value={rowsToShow} onChange={setRowsToShow} />
          
          <button className="secondary-button" onClick={() => setSelectedIds(universidadesUnicas.map(u => u.ID))}>
            Mostrar todas
          </button>
          <button className="secondary-button danger" onClick={() => setSelectedIds([])}>
            Limpiar selección
          </button>
          <button className="reset-button" onClick={() => setEditableData(prev => prev.map(u => ({...u, _edited: {}})))}>
            Reestablecer tabla
          </button>
        </div>

        <UniversityDropdownSelector
          universidades={universidadesUnicas}
          selected={selectedIds}
          onSelect={(id) => setSelectedIds(prev => prev.includes(id) ? prev : [...prev, id])}
          onRemove={(id) => setSelectedIds(prev => prev.filter(x => x !== id))}
        />

        <SimulatorTable 
          rankedUniversities={rankedUniversities}
          metrics={METRICS}
          selectedRowId={selectedRowId}
          onRowClick={(id) => setSelectedRowId(prev => prev === id ? null : id)}
          onMetricChange={handleMetricChange}
        />
      </div>
    </div>
  );
}