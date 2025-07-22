import { useState } from "react";
import PensionForm, {
  type PensionFormData,
  type PensionFormDataNormalized,
  SKIP_LINK_TARGET as FORM_SKIP_LINK_TARGET,
} from "./components/PensionForm";

import { PensionChart } from "./components/PensionChart";
import { calculatePensionProjection } from "./utils/pensionCalculator";
import SkipLinks from "./components/SkipLinks.tsx";
import { SkeletonChart } from "./components/SkeletonChart.tsx";
import { Header } from "./components/Header.tsx";
import { Footer } from "./components/Footer.tsx";
import { MAIN_SKIPLINK_ID } from "./constants/constants.ts";

function App() {
  const [chartData, setChartData] = useState<ReturnType<
    typeof calculatePensionProjection
  > | null>(null);

  const handleFormSubmit = (data: PensionFormData) => {
    const normalizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, Number(value)]),
    ) as PensionFormDataNormalized;

    const result = calculatePensionProjection(normalizedData);
    setChartData(result);
  };

  return (
    <>
      <SkipLinks links={skiplinkData} />

      <div className="flex flex-col md:grid md:grid-cols-[150px_1fr] md:grid-rows-[1fr_auto]">
        <div className="bg-black md:row-span-1 md:row-end-auto">
          <Header />
        </div>

        <main className="bg-green-100 md:row-span-1 md:row-end-auto" id="main">
          <h1 className="text-4xl font-bold mb-8 px-4">Retirement Planner</h1>
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
        <Footer />
      </div>
    </>
  );
}

export default App;

const skiplinkData = [
  { text: "skip to main", href: MAIN_SKIPLINK_ID },
  { text: "skip to form", href: FORM_SKIP_LINK_TARGET },
];
