import { useState } from "react";
import PensionForm, {
  SKIP_LINK_TARGET as FORM_SKIP_LINK_TARGET,
} from "./components/PensionForm";
import type { PensionFormData } from "./components/PensionForm";
import { PensionChart, SkeletonChart } from "./components/PensionChart";
import { calculatePensionProjection } from "./utils/pensionCalculator";
import "./App.css";
import SkipLinks from "./components/SkipLinks.tsx";

function App() {
  const [chartData, setChartData] = useState<ReturnType<
    typeof calculatePensionProjection
  > | null>(null);

  const handleFormSubmit = (data: PensionFormData) => {
    const result = calculatePensionProjection(data);
    setChartData(result);
  };

  return (
    <>
      <SkipLinks links={skipLinks} />

      <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] md:grid-rows-[1fr_auto]">
        <div className="bg-black md:row-span-1 md:row-end-auto">
          <header className="w-full bg-black p-4 flex items-center">
            <img src="/mintago.png" alt="Mintago Logo" className="h-8" />
          </header>
        </div>

        {/* Main */}
        <main className="bg-green-100 md:row-span-1 md:row-end-auto" id="main">
          <h1>Retirement Planner</h1>
          <div className="flex flex-col lg:flex-row-reverse">
            <div className="w-full lg:w-1/2 p-4">
              <PensionForm onSubmit={handleFormSubmit} />
            </div>

            <div className="w-full lg:w-1/2 p-4">
              {chartData ? (
                <PensionChart
                  growth={chartData.growth}
                  drawdown={chartData.drawdown}
                  targetPot={chartData.targetPot}
                />
              ) : (
                <SkeletonChart />
              )}
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-gray-300 md:col-span-2">footer stuff</footer>
      </div>
    </>
  );
}

export default App;

const MAIN_SKIPLINK_ID = "main";

const skipLinks = [
  { text: "skip to main", href: MAIN_SKIPLINK_ID },
  { text: "skip to form", href: FORM_SKIP_LINK_TARGET },
];
