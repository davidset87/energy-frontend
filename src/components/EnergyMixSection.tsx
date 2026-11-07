import { DAYS_SHOWN, DAY_LABELS } from "../constants";
import EnergyPieChart from "../EnergyPieChart";
import { useEnergyMix } from "../hooks/useEnergyMix";

export default function EnergyMixSection() {
  const { data, loading, error } = useEnergyMix();

  return (
    <section>
      <h2>Energy Mix Forecast</h2>

      {loading && <p role="status">Loading energy data...</p>}
      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}
      {!loading && !error && data.length === 0 && <p>No energy mix data available.</p>}

      {!loading && !error && data.length > 0 && (
        <div className="charts-row">
          {data.slice(0, DAYS_SHOWN).map((day, index) => (
            <EnergyPieChart key={day.date} dayData={day} label={DAY_LABELS[index] ?? day.date} />
          ))}
        </div>
      )}
    </section>
  );
}