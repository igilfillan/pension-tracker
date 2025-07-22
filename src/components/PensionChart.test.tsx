import { render, screen, within } from "@testing-library/react";
import { PensionChart, type Props } from "./PensionChart";
import * as Recharts from "recharts";
import { vi } from "vitest";

vi.mock("recharts", async () => {
  const OriginalModule = await vi.importActual<typeof Recharts>("recharts");
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactElement }) => (
      <OriginalModule.ResponsiveContainer width={568} height={400}>
        {children}
      </OriginalModule.ResponsiveContainer>
    ),
  };
});

describe("PensionChart", () => {
  const mockData: Props = {
    growth: [
      { age: 30, potValue: 50000 },
      { age: 40, potValue: 100000 },
    ],
    drawdown: [
      { age: 65, potValue: 80000 },
      { age: 70, potValue: 60000 },
    ],
    targetPot: 150000,
  };

  beforeAll(() => {
    globalThis.ResizeObserver = class {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it("renders the chart title", () => {
    render(<PensionChart {...mockData} />);

    expect(
      screen.getByRole("heading", { name: /Pension Pot Projection/i }),
    ).toBeVisible();
  });

  it("renders the chart container", () => {
    render(<PensionChart {...mockData} />);

    expect(
      screen.getByRole("group", { name: /Pension Pot Projection/i }),
    ).toBeVisible();
  });

  it("renders the chart legend", () => {
    render(<PensionChart {...mockData} />);

    const chart = screen.getByTestId("pension-chart");
    const growthLegend = within(chart).getByText(/growth/i);
    const drawdownLegend = within(chart).getByText(/drawdown/i);

    expect(growthLegend).toBeVisible();
    expect(drawdownLegend).toBeVisible();
  });

  it("renders the target pot reference line", () => {
    render(<PensionChart {...mockData} />);

    expect(screen.getByText(/Target Pot/i)).toBeVisible();
  });

  it("renders the accessible data table", () => {
    render(<PensionChart {...mockData} />);

    expect(screen.queryByTestId("sr-data-tables")).toBeInTheDocument();
  });
});
