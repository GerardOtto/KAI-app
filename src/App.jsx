import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import { useUniversidades } from "./hooks/UseUniversidades";
import UniversitySelector from "./components/UniversitySelector";
import ComparisonTable from "./components/ComparisonTable";
import SimulatorView from "./views/SimulatorView";
import "./styles/tooltip.css";

function App() {
  const universidades = useUniversidades();
  const [selected, setSelected] = useState([]);
  const [activeView, setActiveView] = useState("compare");

  const selectedUniversidades = useMemo(
    () => universidades.filter((u) => selected.includes(u.ID)),
    [universidades, selected]
  );

  const handleSelect = (e) => {
    const id = Number(e.target.value);

    setSelected((prev) =>
      e.target.checked
        ? [...prev, id]
        : prev.filter((x) => x !== id)
    );
  };

  const clearSelection = () => {
    setSelected([]);
  };

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
                <h2>Universidades</h2>
                <UniversitySelector
                  universidades={universidades}
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
          <SimulatorView data={universidades} />
        )}

        {activeView !== "compare" && activeView !== "simulator" && (
          <section className="placeholder">
            <h2>{activeView}</h2>
            <p>Vista en construcción.</p>
          </section>
        )}
      </div>
    </>
  );
}

export default App;
