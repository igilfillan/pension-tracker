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

// import type { LegendProps } from "recharts";
import type { Props as DefaultLegendContentProps } from "recharts/types/component/DefaultLegendContent";

export function PensionChart({ growth, drawdown, targetPot }: Props) {
  const mergedData: Record<
    number,
    {
      age: number;
      growthPot?: number;
      drawdownPot?: number;
    }
  > = {};

  growth.forEach(({ age, potValue }) => {
    mergedData[age] = {
      ...(mergedData[age] || { age }),
      growthPot: potValue,
    };
  });

  drawdown.forEach(({ age, potValue }) => {
    mergedData[age] = {
      ...(mergedData[age] || { age }),
      drawdownPot: potValue,
    };
  });

  const data = Object.values(mergedData).sort((a, b) => a.age - b.age);

  const renderLegend = (props: DefaultLegendContentProps) => {
    const { payload } = props;

    return (
      <div>
        {[...(payload ?? [])].reverse().map((entry, index) => (
          <span
            className="pr-2"
            style={{
              color: entry.color,
            }}
            key={`item-${index}`}
          >
            <span
              className="inline-block w-3 h-3"
              style={{
                backgroundColor: entry.color,
              }}
            ></span>
            &nbsp;
            {entry.value}
          </span>
        ))}
      </div>
    );
  };

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
      <p className="sr-only">
        The following table provides pension pot projections by age. It includes
        both growth before retirement and drawdown after retirement.
      </p>

      {/* Accessible data table for screen readers */}
      <div className="sr-only" aria-hidden="false" aria-live="polite">
        <table>
          <thead>
            <tr>
              <th scope="col">Age</th>
              <th scope="col">Growth pot value in £</th>
              <th scope="col">Drawdown pot value in £</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ age, growthPot, drawdownPot }) => (
              <tr key={age}>
                <td>{age}</td>
                <td>{growthPot?.toLocaleString() || "-"}</td>
                <td>{drawdownPot?.toLocaleString() || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const skeletonData = Array.from({ length: 8 }, (_, i) => ({
  age: i + 20,
  value: null, // null means no line will be drawn
}));

export function SkeletonChart() {
  return (
    <div className="relative w-full  bg-gray-100 rounded-2xl  p-4">
      <h2 className="text-xl font-semibold mb-4">Pension Pot Projection</h2>

      <p className="absolute inset-1/2 -translate-x-1/2 w-full text-center">
        Enter details to generate graph
      </p>
      <ResponsiveContainer className="w-full" height={400}>
        <LineChart data={skeletonData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="age" tick={{ fill: "#d1d5db" }} />
          <YAxis tick={{ fill: "#d1d5db" }} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#d1d5db"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

type PensionYearData = {
  age: number;
  potValue: number;
};

type Props = {
  growth: PensionYearData[];
  drawdown: PensionYearData[];
  targetPot: number;
};
