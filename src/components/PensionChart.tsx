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
    <div
      className="bg-white p-6 rounded-2xl shadow-md max-w-4xl mx-auto"
      role="group"
      aria-labelledby="pension-chart-title"
    >
      <h2 className="text-xl font-semibold mb-4" id="pension-chart-title">
        Pension Pot Projection
      </h2>

      {/* Visual chart hidden from screen readers */}
      <ResponsiveContainer width="100%" height={400} aria-hidden="true">
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

      {/* Description for screen readers introducing the data table */}
      {/* Accessible data table for screen readers */}
      <section className="sr-only-NOT" aria-live="polite">
        <p>
          The following table provides pension pot projections by age. It
          includes both growth before retirement and drawdown after retirement.
        </p>
        <div>
          <table>
            <thead>
              <tr>
                <th scope="col">Age</th>
                <th scope="col">Growth pot value in £</th>
                <th scope="col">Drawdown pot value in £</th>
              </tr>
            </thead>
            <tbody>
              {data.map((row) => (
                <tr key={row.age}>
                  <td>{row.age}</td>
                  <td>{"growthPot" in row ? row.growthPot : "-"}</td>
                  <td>{"drawdownPot" in row ? row.drawdownPot : "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export type Props = {
  growth: PensionYearData[];
  drawdown: PensionYearData[];
  targetPot: number;
};
