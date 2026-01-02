import "../styles/navbar.css";
import logo from "../assets/Courier PS Greek.png";

export default function Navbar({ activeView, onChange }) {
  // Función auxiliar para Scimago
  const isScimagoActive = ["compare", "simulator", "trends", "vista4", "vista5"].includes(activeView);

  // NUEVA: Función auxiliar para QS
  const isQSActive = ["qs-opcion1", "qs-opcion2"].includes(activeView);

  // NUEVA: Función auxiliar para Top 2%
  const isTopActive = ["top-opcion1"].includes(activeView);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>

      <ul className="navbar-menu">
        
        {/* --- Dropdown 1: Scimago --- */}
        <li className="dropdown">
          <button className={`nav-btn dropbtn ${isScimagoActive ? "active" : ""}`}>
            Scimago <span className="arrow">▼</span>
          </button>
          
          <div className="dropdown-content">
            <button 
              className={activeView === "compare" ? "active-item" : ""} 
              onClick={() => onChange("compare")}
            >
              Comparador
            </button>
            <button 
              className={activeView === "simulator" ? "active-item" : ""} 
              onClick={() => onChange("simulator")}
            >
              Simulador
            </button>
            <button 
              className={activeView === "trends" ? "active-item" : ""} 
              onClick={() => onChange("trends")}
            >
              Graficador
            </button>
            <button 
              className={activeView === "vista4" ? "active-item" : ""} 
              onClick={() => onChange("vista4")}
            >
              Planificador
            </button>
            <button 
              className={activeView === "vista5" ? "active-item" : ""} 
              onClick={() => onChange("vista5")}
            >
              Vista 5
            </button>
          </div>
        </li>

        {/* --- Dropdown 2: QS --- */}
        <li className="dropdown">
          {/* Se añade la clase dinámica "active" */}
          <button className={`nav-btn dropbtn ${isQSActive ? "active" : ""}`}>
            QS <span className="arrow">▼</span>
          </button>
          <div className="dropdown-content">
            <button 
              className={activeView === "qs-opcion1" ? "active-item" : ""} 
              onClick={() => onChange("qs-opcion1")}
            >
              Opción QS 1
            </button>
            <button 
              className={activeView === "qs-opcion2" ? "active-item" : ""} 
              onClick={() => onChange("qs-opcion2")}
            >
              Opción QS 2
            </button>
          </div>
        </li>

        {/* --- Dropdown 3: Top 2% --- */}
        <li className="dropdown">
          {/* Se añade la clase dinámica "active" */}
          <button className={`nav-btn dropbtn ${isTopActive ? "active" : ""}`}>
            Top 2% <span className="arrow">▼</span>
          </button>
          <div className="dropdown-content">
            <button 
              className={activeView === "top-opcion1" ? "active-item" : ""} 
              onClick={() => onChange("top-opcion1")}
            >
              Estadísticas (V1)
            </button>
            <button 
              className={activeView === "top-opcion2" ? "active-item" : ""} 
              onClick={() => onChange("top-opcion2")}
            >
              Estadísticas (V2)
            </button>
          </div>
        </li>

      </ul>
    </nav>
  );
}