import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Legend,
} from "recharts";

import type { PensionYearData } from "../types/shared.ts";
import { mergeData, renderLegend } from "./PensionChart.utils.tsx";

export function PensionChart({ growth, drawdown, targetPot }: Props) {
  const data = mergeData({ growth, drawdown });

  return (
    <>
      <div
        className="bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto"
        role="group"
        aria-labelledby="pension-chart-title"
        data-testid="pension-chart"
      >
        <h2 className="text-xl font-semibold mb-4" id="pension-chart-title">
          Pension Pot Projection
        </h2>
        {/* Visual chart hidden from screen readers */}
        <ResponsiveContainer
          width="100%"
          height={400}
          aria-hidden="true"
          data-test-id="pension-chart-container"
        >
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="age" />
            <YAxis
              tickFormatter={(v) => `£${(v / 1000).toFixed(0)}k`}
              domain={[
                0,
                (dataMax: number) => Math.max(dataMax, targetPot) * 1.1,
              ]}
            />
            <Tooltip
              formatter={(value: number) => `£${value.toLocaleString()}`}
              labelFormatter={(label) => `Age ${label}`}
            />
            <Legend content={renderLegend} />

            <Line
              type="monotone"
              dataKey="growthPot"
              stroke="#16a34a"
              dot={false}
              name="growth"
            />
            <Line
              type="monotone"
              dataKey="drawdownPot"
              stroke="#dc2626"
              dot={false}
              name="drawdown"
            />
            <ReferenceLine
              y={targetPot}
              stroke="#3b82f6"
              strokeDasharray="4 4"
              label={{
                value: `Target Pot: £${targetPot.toLocaleString()}`,
                position: "top",
                fill: "#3b82f6",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Accessible data tables for screen readers only */}
      <section
        className="sr-only"
        aria-live="polite"
        data-testid="sr-data-tables"
      >
        <p id="growthTableDescription">
          This table shows pension pot growth before retirement.
        </p>
        <table aria-describedby="growthTableDescription">
          <caption>Growth Pot Projections</caption>
          <thead>
            <tr>
              <th scope="col">Age</th>
              <th scope="col">Pot value in £</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((row) => "growthPot" in row)
              .map((row) => (
                <tr key={row.age}>
                  <td>{row.age}</td>
                  <td>{row.growthPot}</td>
                </tr>
              ))}
          </tbody>
        </table>

        <p id="drawdowmTableDescription">
          This table shows pension pot changes during the drawdown period after
          retirement.
        </p>
        <table aria-describedby="drawdowmTableDescription">
          <caption>Drawdown Pot Projections</caption>
          <thead>
            <tr>
              <th scope="col">Age</th>
              <th scope="col">Pot value in £</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((row) => "drawdownPot" in row)
              .map((row) => (
                <tr key={row.age}>
                  <td>{row.age}</td>
                  <td>{row.drawdownPot}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </section>
    </>
  );
}

export type Props = {
  growth: PensionYearData[];
  drawdown: PensionYearData[];
  targetPot: number;
};
