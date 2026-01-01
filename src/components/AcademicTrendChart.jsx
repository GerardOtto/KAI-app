import React from "react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, 
  ResponsiveContainer, Legend 
} from 'recharts';

const AcademicTrendChart = ({ data, metricLabel }) => (
  <div className="trend-chart-container">
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
        <XAxis dataKey="year" tick={{fill: '#666'}} axisLine={{stroke: '#ccc'}} />
        <YAxis domain={['auto', 'auto']} tick={{fill: '#666'}} axisLine={{stroke: '#ccc'}} />
        <Tooltip 
          contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}
        />
        <Legend verticalAlign="top" height={36}/>
        <Line 
          type="monotone" 
          dataKey="value" 
          name={metricLabel} 
          stroke="#007bff" 
          strokeWidth={4}
          dot={{ r: 6, fill: '#007bff', strokeWidth: 2, stroke: '#fff' }}
          activeDot={{ r: 8 }} 
        />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default AcademicTrendChart;