import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
  Brush,
} from "recharts";
import "../styles/trends.css";

const PERIODS = [
  "2014-2018",
  "2015-2019",
  "2016-2020",
  "2017-2021",
  "2018-2022",
  "2019-2023",
];

const COLORS = [
    "#2563eb", // azul
    "#dc2626", // rojo
    "#16a34a", // verde
    "#7c3aed", // violeta
    "#ea580c", // naranja
    "#0891b2", // hatsune miku
    "#9333ea", // púrpura
  ];
  
const METRICS = [
    { key: "normalized_impact", label: "Impacto Normalizado*" },
    { key: "excel_lider", label: "Excelencia con Liderazgo" },
    { key: "output", label: "Producción Científica" },
    { key: "lider", label: "Liderazgo Científico" },
    { key: "not_own_journals_output", label: "Revistas Externas" },
    { key: "own_journals", label: "Revistas Propias" },
    { key: "excel", label: "Excelencia" },
    { key: "q1", label: "Q1" },
    { key: "colab", label: "Colaboración Internacional" },
    { key: "open_access", label: "Acceso Abierto*" },
    { key: "stp", label: "Talento Científico" },
    { key: "ik", label: "Conocimiento Innovador" },
    { key: "patents", label: "Patentes" },
    { key: "tech_impact", label: "Impacto Tecnológico*" },
    { key: "AM", label: "Altmetrics" },
    { key: "sdg", label: "ODS" },
    { key: "female_stp", label: "Talento Científico Femenino" },
    { key: "overton", label: "Políticas Públicas" },
  ];

  export default function TrendsChart({
    universidades = [],
    selectedUniversities = [],
    metric,
    height = 600,
  }) {
  
  

  if (!Array.isArray(universidades) || universidades.length === 0) {
    return <p>Cargando datos…</p>;
  }

  const universityOptions = useMemo(() => {
    const map = new Map();
    universidades.forEach((u) => {
      if (!map.has(u.ID)) {
        map.set(u.ID, u.Institucion);
      }
    });
    return Array.from(map.entries()).map(([id, name]) => ({
      id,
      name,
    }));
  }, [universidades]);

  // 🔹 Datos listos para Recharts
  const chartData = useMemo(() => {
    return PERIODS.map((period) => {
      const row = { period };
  
      selectedUniversities.forEach((id) => {
        const match = universidades.find(
          (u) => u.ID === id && u.years === period
        );
  
        row[id] = match ? match[metric] : null;
      });
  
      return row;
    });
  }, [universidades, selectedUniversities, metric]);
  

  return (
    <div className="trends-chart" style={{padding:"50px"}}>
      <div className="chart-container">
        {selectedUniversities.length === 0 ? (
          <p className="muted">
            Seleccione universidades para visualizar la tendencia
          </p>
        ) : (
          <ResponsiveContainer width="100%" height={height}>
            <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="period" />
            <YAxis />
            <Tooltip />
            <Legend />

            {selectedUniversities.map((id, index) => {
                const uni = universityOptions.find((u) => u.id === id);
                return (
                <Line
                    key={id}
                    type="monotone"
                    dataKey={id}
                    name={uni?.name}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 6 }}
                />
                );
            })}

            {/* 🔍 Zoom horizontal */}
            <Brush
                dataKey="period"
                height={30}
                stroke="#6b7280"
                travellerWidth={10}
            />
            </LineChart>

          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
