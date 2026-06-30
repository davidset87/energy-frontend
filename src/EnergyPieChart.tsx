import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import type { DailyEnergyMix } from "./types";

const COLORS: Record<string, string> = {
  biomass: "#8BC34A",
  coal: "#424242",
  imports: "#9E9E9E",
  gas: "#FF7043",
  nuclear: "#FFC107",
  other: "#BDBDBD",
  hydro: "#29B6F6",
  solar: "#FFD54F",
  wind: "#4FC3F7",
};

interface Props {
  dayData: DailyEnergyMix;
  label: string;
}

export default function EnergyPieChart({ dayData, label }: Props) {
  const chartData = Object.entries(dayData.averageMix)
    .filter(([, value]) => value > 0)
    .map(([fuel, value]) => ({ name: fuel, value }));

  return (
    <div style={{ textAlign: "center", width: "100%", maxWidth: 300 }}>
      <h3>{label}</h3>
      <p>{dayData.date}</p>
      <p>
        <strong>Clean energy: {dayData.cleanEnergyPercentage}%</strong>
      </p>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={(entry) => `${entry.name}: ${entry.value}%`}
          >
            {chartData.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || "#ccc"} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}