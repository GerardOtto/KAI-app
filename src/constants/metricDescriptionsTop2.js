export const metricDescriptions = {
    authfull: {
      label: "Nombre del Autor",
      description: "Nombre completo del académico registrado en la base de datos."
    },
    inst_name: {
      label: "Institución",
      description: "Nombre de la institución afiliada (principalmente grandes instituciones)."
    },
    cntry: {
      label: "País",
      description: "País asociado a la institución más reciente del autor."
    },
    np6024: {
      label: "Total de Artículos",
      description: "Número total de artículos publicados entre 1960 y 2024."
    },
    firstyr: {
      label: "Año de Inicio",
      description: "Año de la primera publicación registrada del autor."
    },
    lastyr: {
      label: "Año Reciente",
      description: "Año de la publicación más reciente del autor."
    },
    "rank (ns)": {
      label: "Ranking (Sin Autocitas)",
      description: "Posición mundial basada en el score compuesto 'c' excluyendo las autocitas."
    },
    "nc2424 (ns)": {
      label: "Citas 2024 (Sin Autocitas)",
      description: "Total de citas recibidas durante el año 2024, excluyendo las autocitas."
    },
    "h24 (ns)": {
      label: "Índice h (Sin Autocitas)",
      description: "Índice h alcanzado hasta finales de 2024 sin contar las citas del propio autor."
    },
    "hm24 (ns)": {
      label: "Índice hm (Sin Autocitas)",
      description: "Índice h ajustado por coautoría (hm) al finalizar 2024, excluyendo autocitas."
    },
    "nps (ns)": {
      label: "Artículos como Único Autor (Sin Autocitas)",
      description: "Número de artículos donde el académico es el único autor, considerando citas sin autocitación."
    },
    "npsf (ns)": {
      label: "Artículos como Primer Autor (Sin Autocitas)",
      description: "Número de artículos como autor único o primer autor, excluyendo autocitas."
    },
    "npsfl (ns)": {
      label: "Artículos Único, Primero o Último (Sin Autocitas)",
      description: "Número de artículos como autor único, primero o último autor, excluyendo autocitas."
    },
    "c24 (ns)": {
      label: "Composite Score c (Sin Autocitas)",
      description: "Puntuación compuesta de impacto científico al cierre de 2024 (excluye autocitas)."
    },
    rank: {
      label: "Ranking Mundial (All)",
      description: "Posición basada en el score compuesto incluyendo todas las citas."
    },
    nc2424: {
      label: "Citas Totales 2024",
      description: "Número total de citas recibidas en 2024, incluyendo autocitas."
    },
    h24: {
      label: "Índice h",
      description: "Índice h acumulado hasta finales de 2024 considerando todas las citas."
    },
    hm24: {
      label: "Índice hm",
      description: "Índice h ajustado por coautoría considerando el impacto total."
    },
    nps: {
      label: "Artículos Único Autor",
      description: "Total de artículos publicados en solitario."
    },
    npsf: {
      label: "Artículos Único o Primero",
      description: "Total de artículos como autor único o primer firmante."
    },
    npsfl: {
      label: "Artículos Único, Primero o Último",
      description: "Total de artículos en posiciones de liderazgo (único, primero o último)."
    },
    c24: {
      label: "Composite Score c",
      description: "Métrica principal que combina múltiples indicadores de citación para medir el impacto."
    },
    self_perc: {
      label: "Porcentaje de Autocitación",
      description: "Relación porcentual entre las citas propias y el total de citas recibidas."
    },
    "sm-subfield-1": {
      label: "Subcampo Principal",
      description: "Categoría científica principal (Science-Metrix) en la que destaca el autor."
    },
    "sm-field": {
      label: "Campo General",
      description: "Área científica de alto nivel donde se clasifica el trabajo del autor."
    }
  };