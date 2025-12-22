import "../styles/navbar.css";
import logo from "../assets/Courier PS Greek.png";


export default function Navbar({ activeView, onChange }) {
  return (
    <nav className="navbar">
        <div className="navbar-brand">
            <img src={logo} alt="Logo" className="navbar-logo" />
        </div>
      <ul className="navbar-menu">
        <li>
          <button
            className={`nav-btn ${activeView === "compare" ? "active" : ""}`}
            onClick={() => onChange("compare")}
          >
            Comparador
          </button>
        </li>

        <li>
          <button
            className={`nav-btn ${activeView === "simulator" ? "active" : ""}`}
            onClick={() => onChange("simulator")}
          >
            Simulador
          </button>
        </li>

        <li>
          <button
            className="nav-btn"
            onClick={() => onChange("vista3")}
          >
            Planificador
          </button>
        </li>

        <li>
          <button
            className="nav-btn"
            onClick={() => onChange("vista4")}
          >
            Vista 4
          </button>
        </li>

        <li>
          <button
            className="nav-btn"
            onClick={() => onChange("vista5")}
          >
            Vista 5
          </button>
        </li>
      </ul>
    </nav>
  );
}
