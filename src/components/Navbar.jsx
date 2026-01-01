import "../styles/navbar.css";
import logo from "../assets/Courier PS Greek.png";

export default function Navbar({ activeView, onChange }) {
  // Función auxiliar para saber si el botón padre "Scimago" debe estar activo
  const isScimagoActive = ["compare", "simulator", "trends", "vista4", "vista5"].includes(activeView);

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </div>

      <ul className="navbar-menu">
        
        {/* --- Dropdown 1: Scimago (Contiene tus botones antiguos) --- */}
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
          <button className="nav-btn dropbtn">
            QS <span className="arrow">▼</span>
          </button>
          <div className="dropdown-content">
            {/* Agrega aquí las opciones de QS cuando las tengas */}
            <button onClick={() => onChange("qs-opcion1")}>Opción QS 1</button>
            <button onClick={() => onChange("qs-opcion2")}>Opción QS 2</button>
          </div>
        </li>

        {/* --- Dropdown 3: Top 2% --- */}
        <li className="dropdown">
          <button className="nav-btn dropbtn">
            Top 2% <span className="arrow">▼</span>
          </button>
          <div className="dropdown-content">
            {/* Agrega aquí las opciones de Top 2% cuando las tengas */}
            <button onClick={() => onChange("top-opcion1")}>Opción Top 1</button>
          </div>
        </li>

      </ul>
    </nav>
  );
}