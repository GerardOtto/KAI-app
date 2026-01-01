import React, { useState, useMemo } from "react";
import { useAcademicsData } from "../hooks/useAcademicsData";
import AcademicTrendChart from "../components/AcademicTrendChart";
import AcademicMetricsTable from "../components/AcademicMetricsTable";
import "../styles/academics.css";

export default function AcademicsView() {
  const { data, uniqueNames, loading } = useAcademicsData();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedScientist, setSelectedScientist] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [showTrend, setShowTrend] = useState(false);
  const [trendMetric, setTrendMetric] = useState("Composite Score (All)");

  const TREND_METRICS = [
    { key: "Composite Score (All)", label: "Score Compuesto (All)" },
    { key: "Composite Score (Self-Citations Excluded)", label: "Score Compuesto (Sin Autocitas)" },
    { key: "Total Cites (All)", label: "Citas Totales" },
    { key: "H-index (All)", label: "Índice H" },
    { key: "Rank Based on Composite Score (All)", label: "Ranking Mundial" },
  ];

  const filteredNames = uniqueNames.filter(name => 
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const availableYears = useMemo(() => {
    if (!selectedScientist) return [];
    return data
      .filter(d => d.scientist_name === selectedScientist)
      .map(d => d.year)
      .sort((a, b) => a - b);
  }, [data, selectedScientist]);

  const selectedData = useMemo(() => {
    if (!selectedScientist || !selectedYear) return null;
    return data.find(d => d.scientist_name === selectedScientist && d.year === selectedYear);
  }, [data, selectedScientist, selectedYear]);

  const chartData = useMemo(() => {
    if (!selectedScientist) return [];
    return data
      .filter(d => d.scientist_name === selectedScientist)
      .sort((a, b) => a.year - b.year)
      .map(d => ({
        year: d.year,
        value: d[trendMetric]
      }));
  }, [data, selectedScientist, trendMetric]);

  const handleNameSelect = (name) => {
    setSelectedScientist(name);
    setSelectedYear(null);
    setShowTrend(false);
  };

  if (loading) return <div className="loading-screen">Cargando base de datos de académicos...</div>;

  return (
    <div className="academics-container">
      {/* SIDEBAR */}
      <aside className="academics-sidebar">
        <h3>Académicos</h3>
        <input 
          type="text" 
          placeholder="Buscar por nombre..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="name-list">
          {filteredNames.map(name => (
            <li 
              key={name} 
              className={selectedScientist === name ? "active" : ""}
              onClick={() => handleNameSelect(name)}
            >
              {name}
            </li>
          ))}
        </ul>
      </aside>

      {/* CONTENIDO PRINCIPAL */}
      <main className="academics-content">
        {!selectedScientist ? (
          <div className="empty-state">
            <div className="icon">👤</div>
            <p>Selecciona un académico de la lista para explorar sus métricas e impacto.</p>
          </div>
        ) : (
          <div className="academic-profile fade-in">
            <header className="academic-header">
              <div className="header-info">
                <h2>{selectedScientist}</h2>
                <p className="inst-name">{selectedData?.inst_name || "Institución asignada"}</p>
              </div>
              <button 
                className={`trend-toggle-btn ${showTrend ? 'active' : ''}`}
                onClick={() => setShowTrend(!showTrend)}
              >
                {showTrend ? "← Volver a Datos" : "Ver Tendencia"}
              </button>
            </header>

            {!showTrend && (
              <div className="year-navigation">
                <span>Año de reporte:</span>
                <div className="year-tabs">
                  {availableYears.map(year => (
                    <button 
                      key={year} 
                      className={`year-btn ${selectedYear === year ? "active" : ""}`}
                      onClick={() => setSelectedYear(year)}
                    >
                      {year}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {showTrend ? (
              <div className="trend-view-container fade-in">
                <div className="trend-header">
                  <h3>Evolución Histórica</h3>
                  <select 
                    value={trendMetric} 
                    onChange={(e) => setTrendMetric(e.target.value)}
                    className="metric-select"
                  >
                    {TREND_METRICS.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                  </select>
                </div>
                <AcademicTrendChart 
                  data={chartData} 
                  metricLabel={TREND_METRICS.find(m => m.key === trendMetric).label} 
                />
              </div>
            ) : selectedData ? (
              <AcademicMetricsTable selectedData={selectedData} />
            ) : (
              <div className="select-year-prompt">Por favor, selecciona un año arriba para ver los detalles.</div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}