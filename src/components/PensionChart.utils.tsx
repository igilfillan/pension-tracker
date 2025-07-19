import type { Props as DefaultLegendContentProps } from "recharts/types/component/DefaultLegendContent";
import type { Props as PensionChartProps } from "./PensionChart";

export const mergeData = ({ growth, drawdown }: MergeDataProps) => {
  return [
    ...growth.map(({ age, potValue }) => ({
      age,
      growthPot: potValue,
    })),
    ...drawdown.map(({ age, potValue }) => ({
      age,
      drawdownPot: potValue,
    })),
  ];
};

export const renderLegend = (props: DefaultLegendContentProps) => {
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

type MergeDataProps = Pick<PensionChartProps, "growth" | "drawdown">;
