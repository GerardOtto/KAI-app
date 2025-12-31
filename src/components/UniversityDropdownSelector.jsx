import { useState, useMemo, useRef } from "react";
import "../styles/UniversityDropdownSelector.css";

export default function UniversityDropdownSelector({
  universidades,
  selected,
  onSelect,
  onRemove,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return universidades
      .filter(
        (u) =>
          !selected.includes(u.ID) &&
          u.Institucion.toLowerCase().includes(q)
      )
      .sort((a, b) => a.Institucion.localeCompare(b.Institucion));
  }, [universidades, selected, query]);

  return (
    <div className="university-dropdown" ref={containerRef}>
      <label className="dropdown-label">Universidades</label>

      {/* 🔍 Input */}
      <input
        type="text"
        className="dropdown-input"
        placeholder="Buscar universidad…"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />

      {/* ⬇️ Dropdown */}
      {open && filtered.length > 0 && (
        <div className="dropdown-menu">
          {filtered.map((u) => (
            <div
              key={u.ID}
              className="dropdown-item"
              onClick={() => {
                onSelect(u.ID);
                setQuery("");
                setOpen(false);
              }}
            >
              {u.Institucion}
            </div>
          ))}
        </div>
      )}

      {/* 🏷️ Seleccionadas */}
      {selected.length > 0 && (
        <div className="selected-list">
          {selected.map((id) => {
            const uni = universidades.find((u) => u.ID === id);
            return (
              <span
                key={id}
                className="selected-chip"
                onClick={() => onRemove(id)}
                title="Quitar"
              >
                {uni?.Institucion}
                <span className="chip-remove">×</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
