import { calculatePot } from "./calculatePot";
import type { PensionFormDataNormalized } from "../components/PensionForm";
import {
  DEFAULT_AGE_OF_DEATH,
  DEFAULT_ANNUAL_GROWTH_RATE,
  DEFAULT_CURRENT_AGE,
} from "../constants/constants.ts";
import { calculateTargetPot } from "./calculateTargetPot.ts";

export function calculatePensionProjection({
  desiredIncome,
  employerContribution,
  personalContribution,
  retirementAge,
  currentAge = DEFAULT_CURRENT_AGE,
  annualGrowthRate = DEFAULT_ANNUAL_GROWTH_RATE,
  ageOfDeath = DEFAULT_AGE_OF_DEATH,
}: PensionInputs): {
  growth: PensionYearData[];
  drawdown: PensionYearData[];
  targetPot: number;
} {
  const annualGrowthRateDecimal = annualGrowthRate / 100;
  const monthsToRetirement = (retirementAge - currentAge) * 12;
  const monthlyContribution = employerContribution + personalContribution;
  const monthlyRate = annualGrowthRateDecimal / 12;

  const growthPhaseData = calculatePot({
    monthlyAdjustment: monthlyContribution,
    monthsLeft: monthsToRetirement,
    monthlyRate,
    startAge: currentAge,
    startingPot: 0,
  });

  const drawdownPhaseData = calculatePot({
    monthlyAdjustment: -desiredIncome / 12,
    monthsLeft: (ageOfDeath - retirementAge) * 12,
    monthlyRate,
    startAge: retirementAge,
    startingPot: growthPhaseData.finalPotValue,
  });

  const targetPot = calculateTargetPot(
    desiredIncome,
    annualGrowthRateDecimal,
    ageOfDeath,
    retirementAge,
  );

  return {
    growth: growthPhaseData.data,
    drawdown: drawdownPhaseData.data,
    targetPot: Math.round(targetPot),
  };
}

type PensionInputs = PensionFormDataNormalized & {
  currentAge?: number;
  annualGrowthRate?: number;
  ageOfDeath?: number;
};

type PensionYearData = {
  age: number;
  potValue: number;
};
