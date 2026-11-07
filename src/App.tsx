import EnergyMixSection from "./components/EnergyMixSection";
import OptimalWindowSection from "./components/OptimalWindowSection";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <h1>UK Energy Mix & EV Charging Optimizer</h1>
      <EnergyMixSection />
      <OptimalWindowSection />
    </div>
  );
}