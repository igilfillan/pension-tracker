import { useForm } from "react-hook-form";
import { MINIMUM_RETIREMENT_AGE } from "../constants/constants.ts";

export default function PensionForm({ onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<PensionFormData>({
    defaultValues: formDefaults,
  });

  const onFormSubmit = (data: PensionFormData) => {
    onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onFormSubmit, () => {
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          setFocus(firstErrorField as keyof PensionFormData);
        }
      })}
      className="bg-white p-6 rounded-2xl shadow-md max-w-md mx-auto space-y-4"
    >
      <h2 className="text-xl font-semibold">Enter Pension Details</h2>

      <div>
        <label className="block font-medium" htmlFor="desiredIncome">
          Desired income per year (£)
        </label>
        <input
          type="number"
          id={SKIP_LINK_TARGET}
          {...register("desiredIncome", {
            required: "Desired income is required",
            min: { value: 1, message: "Must be greater than 0" },
          })}
          aria-describedby="desiredIncomeError"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.desiredIncome && (
          <p id="desiredIncomeError" className="text-red-500 text-sm mt-1">
            {errors.desiredIncome.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium" htmlFor="employerContribution">
          Employer monthly contribution (£)
        </label>
        <input
          type="number"
          id="employerContribution"
          {...register("employerContribution", {
            required: "Employer contribution is required",
            min: { value: 0, message: "Must be 0 or greater" },
          })}
          aria-describedby="employerContributionError"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.employerContribution && (
          <p
            id="employerContributionError"
            className="text-red-500 text-sm mt-1"
          >
            {errors.employerContribution.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium" htmlFor="personalContribution">
          Personal monthly contribution (£)
        </label>
        <input
          type="number"
          id="personalContribution"
          {...register("personalContribution", {
            required: "Personal contribution is required",
            min: { value: 0, message: "Must be 0 or greater" },
          })}
          aria-describedby="personalContributionError"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.personalContribution && (
          <p
            id="personalContributionError"
            className="text-red-500 text-sm mt-1"
          >
            {errors.personalContribution.message}
          </p>
        )}
      </div>

      <div>
        <label className="block font-medium" htmlFor="retirementAge">
          Retirement age
        </label>
        <input
          type="number"
          id="retirementAge"
          {...register("retirementAge", {
            required: "Retirement age is required",
            min: {
              value: MINIMUM_RETIREMENT_AGE,
              message: `Must be at least ${MINIMUM_RETIREMENT_AGE}`,
            },
          })}
          aria-describedby="retirementAgeError"
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
        {errors.retirementAge && (
          <p id="retirementAgeError" className="text-red-500 text-sm mt-1">
            {errors.retirementAge.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
        aria-label="Calculate pension details"
      >
        Calculate
      </button>
    </form>
  );
}

export type PensionFormData = Record<
  | "desiredIncome"
  | "employerContribution"
  | "personalContribution"
  | "retirementAge",
  string
>;

export type PensionFormDataNormalized = {
  [K in keyof PensionFormData]: number;
};

type Props = {
  onSubmit: (data: PensionFormData) => void;
};

export const SKIP_LINK_TARGET = "desiredIncome" as const;

const formDefaults = {
  desiredIncome: "50000",
  employerContribution: "200",
  personalContribution: "100",
  retirementAge: "65",
};
