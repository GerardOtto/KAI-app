import { useState, useMemo } from "react";
import Navbar from "./components/Navbar";
import { useUniversidades } from "./hooks/UseUniversidades";
import UniversitySelector from "./components/UniversitySelector";
import ComparisonTable from "./components/ComparisonTable";
import SimulatorView from "./views/SimulatorView";
import YearRangeSelector from "./components/YearRangeSelector";
import TrendsView from "./views/TrendViews";
import AcademicsView from "./views/AcademicsView";
import Top2Main from "./views/Top2Main";
import { useAcademicsData } from "./hooks/useTop2Data";
import ComparisonSimulatorLike from "./views/ComparisonSimulatorLike";
import QsLatamView from "./views/QSLatamView";
import { useQsLatamData } from "./hooks/useQsLatamData";


import "./styles/tooltip.css";

function App() {
  const universidades = useUniversidades();
  const [selected, setSelected] = useState([]);
  const [activeView, setActiveView] = useState("compare");
  const [yearRange, setYearRange] = useState("2019-2023");
  const { data: academicsData, loading } = useAcademicsData();
  const { data: qsData, loading: qsLoading } = useQsLatamData();


  const YEAR_RANGES = [
    "2014-2018",
    "2015-2019",
    "2016-2020",
    "2017-2021",
    "2018-2022",
    "2019-2023",
  ];
  

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
  <ComparisonSimulatorLike
    universidades={universidades}
    yearRange={yearRange}
    onYearChange={setYearRange}
    yearRanges={YEAR_RANGES}
  />
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

        {activeView === "qs-latam" && (
          <QsLatamView data={qsData} loading={qsLoading} />
        )}

        {activeView === "top-opcion1" && (
          <AcademicsView data={universidades} />
        )}

        {activeView === "top-opcion2" && (
          <Top2Main
            data={academicsData}
            loading={loading}
          />
        )}

      </div>
    </>
  );
}

export default App;