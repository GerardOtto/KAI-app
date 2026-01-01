import React from "react";
import StatCard from "./StatCard";

const AcademicMetricsTable = ({ selectedData }) => {
  if (!selectedData) return null;

  return (
    <div className="metrics-grid-layout fade-in">
      {/* Columna: ALL */}
      <div className="metrics-column">
        <h4 className="col-title all">Incluyendo Autocitas (All)</h4>
        <div className="stats-cards">
          <StatCard label="Rank Mundial" value={selectedData["Rank Based on Composite Score (All)"]} color="#3498db" />
          <StatCard label="Composite Score" value={selectedData["Composite Score (All)"]} color="#3498db" />
          <StatCard label="Citas Totales" value={selectedData["Total Cites (All)"]} color="#3498db" />
          <StatCard label="H-Index" value={selectedData["H-index (All)"]} color="#3498db" />
        </div>
        <div className="detailed-list">
          <h5>Publicaciones y Co-autoría (All)</h5>
          <ul>
            <li>
              <span>Papers como Único autor:</span> 
              <strong>{selectedData["Number of Single Authored Papers (All)"]} <small>(Citas: {selectedData["Total Cites to Single Authored Papers (All)"]})</small></strong>
            </li>
            <li>
              <span>Papers como Único o Primer autor:</span> 
              <strong>{selectedData["Number of Single+First Authored Papers (All)"]} <small>(Citas: {selectedData["Total Cites to Single+First Authored Papers (All)"]})</small></strong>
            </li>
            <li>
              <span>Papers como Único, Primer o Último autor:</span> 
              <strong>{selectedData["Number of Single+First+Last Authored Papers (All)"]} <small>(Citas: {selectedData["Total Cites to Single+First+Last Authored Papers (All)"]})</small></strong>
            </li>
            <li>
              <span>Papers que citan a este autor:</span> 
              <strong>{selectedData["Number of Distinct Citing Papers (All)"]}</strong>
            </li>
          </ul>
        </div>
      </div>

      {/* Columna: EXCLUDED */}
      <div className="metrics-column">
        <h4 className="col-title excluded">Sin Autocitas (Excluded)</h4>
        <div className="stats-cards">
          <StatCard label="Rank Mundial (Oficial)" value={selectedData["Rank Based on Composite Score (Self-Citations Excluded)"]} color="#e74c3c" />
          <StatCard label="Composite Score" value={selectedData["Composite Score (Self-Citations Excluded)"]} color="#e74c3c" />
          <StatCard label="Citas Totales" value={selectedData["Total Cites (Self-Citations Excluded)"]} color="#e74c3c" />
          <StatCard label="H-Index" value={selectedData["H-index (Self-Citations Excluded)"]} color="#e74c3c" />
        </div>
        <div className="detailed-list">
          <h5>Publicaciones y Co-autoría (Excluded)</h5>
          <ul>
            <li>
              <span>Papers como Único autor:</span> 
              <strong>{selectedData["Number of Single Authored Papers (Self-Citations Excluded)"]} <small>(Citas: {selectedData["Total Cites to Single Authored Papers (Self-Citations Excluded)"]})</small></strong>
            </li>
            <li>
              <span>Papers como Único o Primer autor:</span> 
              <strong>{selectedData["Number of Single+First Authored Papers (Self-Citations Excluded)"]} <small>(Citas: {selectedData["Total Cites to Single+First Authored Papers (Self-Citations Excluded)"]})</small></strong>
            </li>
            <li>
              <span>Papers como Único, Primer o Último autor:</span> 
              <strong>{selectedData["Number of Single+First+Last Authored Papers (Self-Citations Excluded)"]} <small>(Citas: {selectedData["Total Cites to Single+First+Last Authored Papers (Self-Citations Excluded)"]})</small></strong>
            </li>
            <li>
              <span>Papers que citan a este autor:</span> 
              <strong>{selectedData["Number of Distinct Citing Papers (Self-Citations Excluded)"]}</strong>
            </li>
          </ul>
        </div>
      </div>

      <footer className="data-footer">
        <div className="pill">Autocitación: {selectedData["Self-Citation Percentage"]}%</div>
        <a href={selectedData["url"]} target="_blank" rel="noopener noreferrer" className="external-link">Ver Perfil TopSciNet ↗</a>
      </footer>
    </div>
  );
};

export default AcademicMetricsTable;