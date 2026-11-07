import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { FUEL_COLORS, toChartData } from "./chartData";
import type { DailyEnergyMix } from "./types";

const FALLBACK_COLOR = "#cccccc";

interface Props {
  dayData: DailyEnergyMix;
  label: string;
}

export default function EnergyPieChart({ dayData, label }: Props) {
  const chartData = toChartData(dayData.averageMix);

  return (
    <div className="pie-card">
      <h3>{label}</h3>
      <p>{dayData.date}</p>
      <p>
        <strong>Clean energy: {dayData.cleanEnergyPercentage}%</strong>
      </p>

      {chartData.length === 0 ? (
        <p>No generation data for this day.</p>
      ) : (
        <>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={chartData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {chartData.map((slice) => (
                  <Cell key={slice.name} fill={FUEL_COLORS[slice.name] ?? FALLBACK_COLOR} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${Number(value)}%`} />
            </PieChart>
          </ResponsiveContainer>

          <table className="mix-table">
            <caption className="visually-hidden">Energy mix for {label}</caption>
            <thead>
              <tr>
                <th scope="col">Fuel</th>
                <th scope="col">Share</th>
              </tr>
            </thead>
            <tbody>
              {chartData.map((slice) => (
                <tr key={slice.name}>
                  <td>
                    <span
                      className="swatch"
                      style={{ backgroundColor: FUEL_COLORS[slice.name] ?? FALLBACK_COLOR }}
                      aria-hidden="true"
                    />
                    {slice.name}
                  </td>
                  <td>{slice.value.toFixed(1)}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}