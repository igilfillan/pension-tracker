import { useState } from "react";

export default function PensionForm({ onSubmit }: Props) {
  const [form, setForm] = useState<PensionFormData>({
    desiredIncome: 50000,
    employerContribution: 200,
    personalContribution: 100,
    retirementAge: 65,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form
      onSubmit={handleSubmit}
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
          name="desiredIncome"
          value={form.desiredIncome}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block font-medium" htmlFor="employerContribution">
          Employer monthly contribution (£)
        </label>
        <input
          type="number"
          id="employerContribution"
          name="employerContribution"
          value={form.employerContribution}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block font-medium" htmlFor="personalContribution">
          Your monthly contribution (£)
        </label>
        <input
          type="number"
          id="personalContribution"
          name="personalContribution"
          value={form.personalContribution}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <div>
        <label className="block font-medium" htmlFor="retirementAge">
          Retirement age
        </label>
        <input
          type="number"
          id="retirementAge"
          name="retirementAge"
          value={form.retirementAge}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mt-4"
      >
        Calculate
      </button>
    </form>
  );
}

export type PensionFormData = {
  desiredIncome: number;
  employerContribution: number;
  personalContribution: number;
  retirementAge: number;
};

type Props = {
  onSubmit: (data: PensionFormData) => void;
};

export const SKIP_LINK_TARGET = "desiredIncome" as const;
