import { useState } from "react";
import { DEFAULT_DURATION_HOURS, MAX_DURATION_HOURS, MIN_DURATION_HOURS } from "../constants";
import { formatDateTime } from "../format";
import { useOptimalWindow } from "../hooks/useOptimalWindow";
import { parseDuration } from "../validation";

export default function OptimalWindowSection() {
  const [durationInput, setDurationInput] = useState(String(DEFAULT_DURATION_HOURS));
  const { result, loading, error, calculate } = useOptimalWindow();

  const duration = parseDuration(durationInput);
  const isValid = duration !== null;

  function handleCalculate() {
    if (duration !== null) {
      void calculate(duration);
    }
  }

  return (
    <section>
      <h2>Optimal EV Charging Window</h2>

      <div className="duration-input">
        <label htmlFor="duration">Charging duration (hours): </label>
        <input
          id="duration"
          type="number"
          inputMode="numeric"
          min={MIN_DURATION_HOURS}
          max={MAX_DURATION_HOURS}
          step={1}
          value={durationInput}
          aria-invalid={!isValid}
          aria-describedby={isValid ? undefined : "duration-error"}
          onChange={(e) => setDurationInput(e.target.value)}
        />
        <button onClick={handleCalculate} disabled={loading || !isValid}>
          {loading ? "Calculating..." : "Calculate"}
        </button>
      </div>

      {!isValid && (
        <p id="duration-error" className="error-message" role="alert">
          Enter a whole number of hours between {MIN_DURATION_HOURS} and {MAX_DURATION_HOURS}.
        </p>
      )}

      {error && (
        <p className="error-message" role="alert">
          {error}
        </p>
      )}

      {result && (
        <div className="result-box">
          <p>
            <strong>Start:</strong> {formatDateTime(result.startDateTime)}
          </p>
          <p>
            <strong>End:</strong> {formatDateTime(result.endDateTime)}
          </p>
          <p>
            <strong>Average clean energy:</strong> {result.averageCleanEnergyPercentage}%
          </p>
        </div>
      )}
    </section>
  );
}