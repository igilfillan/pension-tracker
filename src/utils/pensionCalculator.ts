export function calculatePensionProjection({
  desiredIncome,
  employerContribution,
  personalContribution,
  retirementAge,
  currentAge = 25,
  annualGrowthRate = 5,
  ageOfDeath = 81,
}: PensionInputs): {
  growth: PensionYearData[];
  drawdown: PensionYearData[];
  targetPot: number;
} {
  const annualGrowthRateDecimal = annualGrowthRate / 100;
  const monthsToRetirement = (retirementAge - currentAge) * 12;
  const monthlyContribution = employerContribution + personalContribution;

  // compounded monthly
  const monthlyRate = annualGrowthRateDecimal / 12;

  let pot = 0;
  // let growth: PensionYearData[] = [];

  // callcuntion to calc values for growth
  // calculate growthPot()

  const growthPotData = calculateGrowthPot({
    currentAge,
    monthsToRetirement,
    monthlyContribution,
    monthlyRate,
  });

  pot = growthPotData.finalPotValue;
  // const growth = growthPotData.growthData;

  console.log({ growthPotData });

  // Build up pension pot until retirement
  // for (let month = 0; month < monthsToRetirement; month++) {
  //   pot = pot * (1 + monthlyRate) + monthlyContribution;
  //
  //   if ((month + 1) % 12 === 0) {
  //     const age = currentAge + Math.floor((month + 1) / 12);
  //     growth.push({ age, potValue: Math.round(pot) });
  //   }
  // }

  // generate data for drawdown graph
  const monthsToDeath = (ageOfDeath - retirementAge) * 12;

  const drawdownData = calculateDrawdownPot({
    desiredIncome,
    monthsToDeath,
    monthlyRate,
    retirementAge,
    startingPot: growthPotData.finalPotValue,
  });

  console.log({ drawdownData });

  // Drawdown pot also compunded monthly
  // const drawdown = drawdownData.drawdownData;

  console.log("drawdownPotFinalValue", pot);
  // console.log({ drawdown });

  // TODO should I add inflation adjustment here?
  // What pot would be needed at retirement to sustain desired income until ageOfDeath?
  // This is a Present Value of annuity formula (simplified)
  const r = annualGrowthRateDecimal;
  const n = ageOfDeath - retirementAge;
  const targetPot = desiredIncome * ((1 - Math.pow(1 + r, -n)) / r);

  return {
    growth: growthPotData.growthData,
    drawdown: drawdownData.drawdownData,
    targetPot: Math.round(targetPot),
  };
}

type PensionInputs = {
  desiredIncome: number;
  employerContribution: number;
  personalContribution: number;
  retirementAge: number;
  currentAge: number;
  annualGrowthRate: number;
  ageOfDeath: number;
};

type PensionYearData = {
  age: number;
  potValue: number;
};

const calculateGrowthPot = ({
  currentAge,
  monthsToRetirement,
  monthlyContribution,
  monthlyRate,
}) => {
  let pot = 0;
  const growth: PensionYearData[] = [];
  // Build up pension pot until retirement
  for (let month = 0; month < monthsToRetirement; month++) {
    pot = pot * (1 + monthlyRate) + monthlyContribution;

    if ((month + 1) % 12 === 0) {
      const age = currentAge + Math.floor((month + 1) / 12);
      growth.push({ age, potValue: Math.round(pot) });
    }
  }

  return { growthData: growth, finalPotValue: pot };
};

const calculateDrawdownPot = ({
  desiredIncome,
  monthsToDeath,
  monthlyRate,
  retirementAge,
  startingPot,
}) => {
  let pot = startingPot;
  const drawdown: PensionYearData[] = [];
  // const monthsToDeath = (ageOfDeath - retirementAge) * 12;

  // TODO Abstract this to adjustMonthlyPotValue(currentPot, interestRate, adjustment)
  for (let month = 0; month < monthsToDeath; month++) {
    pot = pot * (1 + monthlyRate) - desiredIncome / 12;

    if ((month + 1) % 12 === 0) {
      const age = retirementAge + Math.floor((month + 1) / 12);
      drawdown.push({
        age,
        potValue: Math.max(0, Math.round(pot)),
      });
    }
  }

  return { drawdownData: drawdown, finalPotValue: pot };
};
