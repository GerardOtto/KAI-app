import { useMemo, useState } from "react";

export default function UniversitySelector({
  universidades,
  selected,
  onChange,
  onClear,
}) {
  const [search, setSearch] = useState("");

  const filteredAndSorted = useMemo(() => {
    const normalizedSearch = search.toLowerCase();

    const filtered = universidades.filter((u) =>
      u.Institucion.toLowerCase().includes(normalizedSearch)
    );

    const selectedItems = filtered
      .filter((u) => selected.includes(u.ID))
      .sort((a, b) => a.Institucion.localeCompare(b.Institucion));

    const unselectedItems = filtered
      .filter((u) => !selected.includes(u.ID))
      .sort((a, b) => a.Institucion.localeCompare(b.Institucion));

    return [...selectedItems, ...unselectedItems];
  }, [universidades, selected, search]);

  return (
    <>
      {/* Acciones superiores */}
      <div className="checklist-header">
        <span className="checklist-count">
          Seleccionadas: {selected.length}
        </span>

        <button
          type="button"
          className="btn-clear"
          onClick={onClear}
          disabled={selected.length === 0}
        >
          Limpiar
        </button>
      </div>

      {/* Buscador */}
      <input
        type="text"
        className="checklist-search"
        placeholder="Buscar universidad…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Checklist */}
      <div className="checklist">
        {filteredAndSorted.map((u) => (
          <label key={u.ID} className="checklist-item">
            <input
              type="checkbox"
              value={u.ID}
              checked={selected.includes(u.ID)}
              onChange={onChange}
            />
            <span>{u.Institucion}</span>
          </label>
        ))}

        {filteredAndSorted.length === 0 && (
          <p className="checklist-empty">Sin resultados</p>
        )}
      </div>
    </>
  );
}
