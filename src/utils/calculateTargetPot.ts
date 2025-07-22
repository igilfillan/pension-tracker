export const calculateTargetPot = (
  desiredIncome: number,
  annualGrowthRateDecimal: number,
  ageOfDeath: number,
  retirementAge: number,
): number => {
  // Present Value of annuity formula (simplified) - desiredIncome * ((1 - Math.pow(1 + r, -n)) / r)
  const r = annualGrowthRateDecimal;
  const n = ageOfDeath - retirementAge;
  return desiredIncome * ((1 - Math.pow(1 + r, -n)) / r);
};
