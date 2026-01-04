import { useState, useMemo, useRef } from "react";
import "../styles/UniversityDropdownSelector.css";

export default function UniversityDropdownSelector({
  universidades = [],
  selected = [],
  onSelect,
  onRemove,
}) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const containerRef = useRef(null);

  /**
   * 🔹 Helpers compatibles Scimago / QS Latam
   */
  const getId = (u) =>
    u?.ID ??
    u?.ranking ??
    null;

  const getLabel = (u) =>
    String(
      u?.Institucion ??
      u?.title ??
      ""
    ).trim();

  /**
   * 🔹 Filtro
   */
  const filtered = useMemo(() => {
    const q = query.toLowerCase();

    return universidades
      .filter((u) => {
        const id = getId(u);
        const label = getLabel(u);

        if (id === null || label === "") return false;
        if (selected.includes(id)) return false;

        // Input vacío → mostrar todas
        if (!q) return true;

        return label.toLowerCase().includes(q);
      })
      .sort((a, b) =>
        getLabel(a).localeCompare(getLabel(b))
      );
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
          {filtered.map((u) => {
            const id = getId(u);
            const label = getLabel(u);

            return (
              <div
                key={id}
                className="dropdown-item"
                onClick={() => {
                  onSelect(id);
                  setQuery("");
                  setOpen(false);
                }}
              >
                {label}
              </div>
            );
          })}
        </div>
      )}

      {/* 🏷️ Seleccionadas */}
      {selected.length > 0 && (
        <div className="selected-list">
          {selected.map((id) => {
            const uni = universidades.find(
              (u) => getId(u) === id
            );

            return (
              <span
                key={id}
                className="selected-chip"
                onClick={() => onRemove(id)}
                title="Quitar"
              >
                {getLabel(uni)}
                <span className="chip-remove">×</span>
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}
