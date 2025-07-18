import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";

export function SkeletonChart() {
  return (
    <div className="w-full  bg-gray-100 rounded-2xl animate-pulse p-4">
      <ResponsiveContainer width="100%" height={400}>
        {/*<h2 className="text-xl font-semibold mb-4">Pension Pot Projection</h2>*/}

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

const skeletonData = Array.from({ length: 8 }, (_, i) => ({
  age: i + 20,
  value: null, // null means no line will be drawn
}));
