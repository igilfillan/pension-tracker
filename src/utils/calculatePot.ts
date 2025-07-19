import type { PensionYearData } from "../types/shared.ts";

export const calculatePot = ({
  monthlyAdjustment,
  monthsLeft = 0,
  monthlyRate,
  startAge,
  startingPot,
}: CalculatePotArgs): CalculatePotResult => {
  let pot = startingPot;
  const pensionData: PensionYearData[] = [];

  for (let month = 0; month < monthsLeft; month++) {
    pot = pot * (1 + monthlyRate) + monthlyAdjustment;

    if ((month + 1) % 12 === 0) {
      const age = startAge + (month + 1) / 12;
      pensionData.push({
        age,
        potValue: Math.max(0, Math.round(pot)),
      });
    }
  }

  return { data: pensionData, finalPotValue: pot };
};

type CalculatePotArgs = {
  monthlyAdjustment: number;
  monthsLeft: number;
  monthlyRate: number;
  startAge: number;
  startingPot: number;
};

type CalculatePotResult = {
  data: PensionYearData[];
  finalPotValue: number;
};
