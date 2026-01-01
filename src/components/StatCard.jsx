import React from "react";

const StatCard = ({ label, value, color }) => (
  <div className="stat-card" style={{ borderTop: `4px solid ${color}` }}>
    <span className="stat-value">{value !== undefined && value !== null ? value : "-"}</span>
    <span className="stat-label">{label}</span>
  </div>
);

export default StatCard;