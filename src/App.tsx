import { useEffect, useState } from "react";
import { getEnergyMix, getOptimalWindow } from "./api";
import type { DailyEnergyMix, OptimalChargingWindow } from "./types";
import EnergyPieChart from "./EnergyPieChart";
import "./App.css";

function App() {
  const [energyMix, setEnergyMix] = useState<DailyEnergyMix[]>([]);
  const [loadingMix, setLoadingMix] = useState(true);
  const [errorMix, setErrorMix] = useState<string | null>(null);

  const [duration, setDuration] = useState(3);
  const [optimalWindow, setOptimalWindow] = useState<OptimalChargingWindow | null>(null);
  const [loadingWindow, setLoadingWindow] = useState(false);
  const [errorWindow, setErrorWindow] = useState<string | null>(null);

  useEffect(() => {
    getEnergyMix()
      .then(setEnergyMix)
      .catch(() => setErrorMix("Failed to load energy mix data."))
      .finally(() => setLoadingMix(false));
  }, []);

  async function handleCalculate() {
    setLoadingWindow(true);
    setErrorWindow(null);
    setOptimalWindow(null);
    try {
      const result = await getOptimalWindow(duration);
      setOptimalWindow(result);
    } catch {
      setErrorWindow("Failed to calculate optimal window.");
    } finally {
      setLoadingWindow(false);
    }
  }

  const dayLabels = ["Today", "Tomorrow", "Day after tomorrow"];

  return (
    <div className="app-container">
      <h1>UK Energy Mix & EV Charging Optimizer</h1>

      <section>
        <h2>Energy Mix Forecast</h2>
        {loadingMix && <p>Loading energy data...</p>}
        {errorMix && <p style={{ color: "red" }}>{errorMix}</p>}
        {!loadingMix && !errorMix && (
          <div className="charts-row">
            {energyMix.slice(0, 3).map((day, index) => (
              <EnergyPieChart key={day.date} dayData={day} label={dayLabels[index] ?? day.date} />
            ))}
          </div>
        )}
      </section>

      <section>
        <h2>Optimal EV Charging Window</h2>
        <div className="duration-input">
          <label htmlFor="duration">Charging duration (hours): </label>
          <input
            id="duration"
            type="number"
            min={1}
            max={6}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />
          <button onClick={handleCalculate} disabled={loadingWindow}>
            {loadingWindow ? "Calculating..." : "Calculate"}
          </button>
        </div>

        {errorWindow && <p style={{ color: "red" }}>{errorWindow}</p>}

        {optimalWindow && (
          <div className="result-box">
            <p>
              <strong>Start:</strong> {new Date(optimalWindow.startDateTime).toLocaleString()}
            </p>
            <p>
              <strong>End:</strong> {new Date(optimalWindow.endDateTime).toLocaleString()}
            </p>
            <p>
              <strong>Average clean energy:</strong> {optimalWindow.averageCleanEnergyPercentage}%
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;