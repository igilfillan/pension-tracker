import { calculatePot } from "./calculatePot";

describe("calculatePot", () => {
  it("should calculate the pot correctly with valid inputs", () => {
    const result = calculatePot({
      monthlyAdjustment: 100,
      monthsLeft: 24,
      monthlyRate: 0.01,
      startAge: 30,
      startingPot: 10000,
    });

    expect(result.data).toHaveLength(2);
    expect(result.data[0]).toEqual({
      age: 31,
      potValue: 12537,
    });
    expect(result.data[1]).toEqual({
      age: 32,
      potValue: 15395,
    });
  });

  it("should handle zero months left", () => {
    const result = calculatePot({
      monthlyAdjustment: 100,
      monthsLeft: 0,
      monthlyRate: 0.01,
      startAge: 30,
      startingPot: 10000,
    });

    expect(result.finalPotValue).toBe(10000);
  });

  it("should calculate that pot will be 0 by age 75", () => {
    const result = calculatePot({
      monthlyAdjustment: -3000,
      monthsLeft: 192,
      monthlyRate: 0.005,
      startAge: 65,
      startingPot: 250000,
    });

    const zeroValueYear = result.data.find((year) => year.potValue === 0);
    expect(zeroValueYear?.age).toBe(75);
  });
});
