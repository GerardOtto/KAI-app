import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import { useUniversidades } from "./hooks/UseUniversidades";
import UniversitySelector from "./components/UniversitySelector";
import ComparisonTable from "./components/ComparisonTable";
import SimulatorView from "./views/SimulatorView";
import YearRangeSelector from "./components/YearRangeSelector";
import TrendsView from "./views/TrendViews";
import AcademicsView from "./views/AcademicsView"; // <--- 1. Importar la nueva vista

import "./styles/tooltip.css";

function App() {
  const universidades = useUniversidades();
  const [selected, setSelected] = useState([]);
  const [activeView, setActiveView] = useState("compare");
  const [yearRange, setYearRange] = useState("2019-2023");
  const YEAR_RANGES = [
    "2014-2018",
    "2015-2019",
    "2016-2020",
    "2017-2021",
    "2018-2022",
    "2019-2023",
  ];
  
  // ... (tu lógica de useMemo y handlers existentes se mantienen igual)
  const filteredUniversidades = useMemo(() => {
    return universidades.filter((u) => u.years === yearRange);
  }, [universidades, yearRange]);
  
  const selectedUniversidades = useMemo(() => 
    filteredUniversidades.filter((u) => selected.includes(u.ID)),
    [filteredUniversidades, selected]
  );
  
  const handleSelect = (e) => {
    const id = Number(e.target.value);
    setSelected((prev) =>
      e.target.checked ? [...prev, id] : prev.filter((x) => x !== id)
    );
  };

  const clearSelection = () => setSelected([]);

  return (
    <>
      <Navbar activeView={activeView} onChange={setActiveView} />

      <div className="app with-navbar">
        {activeView === "compare" && (
          <>
            <header className="header">
              <h1>Comparador de Universidades Chilenas Scimago</h1>
              <p>Análisis comparativo de desempeño institucional</p>
            </header>

            <main className="layout">
              <aside className="panel">
                <h2>Filtros</h2>
                <YearRangeSelector
                  value={yearRange}
                  options={YEAR_RANGES}
                  onChange={setYearRange}
                />
                <UniversitySelector
                  universidades={filteredUniversidades}
                  selected={selected}
                  onChange={handleSelect}
                  onClear={clearSelection}
                />
              </aside>

              <section className="content">
                <ComparisonTable universidades={selectedUniversidades} />
              </section>
            </main>
          </>
        )}

        {activeView === "simulator" && (
          <SimulatorView
            data={filteredUniversidades}
            yearRange={yearRange}
            onYearChange={setYearRange}
            yearRanges={YEAR_RANGES}
          />
        )}
        
        {activeView === "trends" && (
          <TrendsView
            universidades={universidades}
            selected={selected}
            yearRange={yearRange}
            onYearChange={setYearRange}
            yearRanges={YEAR_RANGES}
          />
        )}

        {/* --- 2. Agregar la nueva condición para la vista --- */}
        {activeView === "top-opcion1" && ( 
           <AcademicsView />
        )}

      </div>
    </>
  );
}

export default App;