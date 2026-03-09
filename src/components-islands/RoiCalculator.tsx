import { useMemo, useState } from 'react';
import { calculateRoi } from '@/lib/calculators';

type RoiForm = {
  teamSize: number;
  hourlyCost: number;
  hoursSavedWeekly: number;
  implementationCost: number;
  monthlyToolCost: number;
  errorReductionPct: number;
  revenueUpliftPct: number;
};

const roiFields: Array<{ key: keyof RoiForm; label: string; step?: string }> = [
  { key: 'teamSize', label: 'Team size' },
  { key: 'hourlyCost', label: 'Hourly cost (USD)', step: '0.1' },
  { key: 'hoursSavedWeekly', label: 'Hours saved per week', step: '0.1' },
  { key: 'implementationCost', label: 'Implementation cost (USD)', step: '0.1' },
  { key: 'monthlyToolCost', label: 'Monthly tool cost (USD)', step: '0.1' },
  { key: 'errorReductionPct', label: 'Error reduction (%)', step: '0.1' },
  { key: 'revenueUpliftPct', label: 'Revenue uplift (%)', step: '0.1' }
];

const money = (value: number) => `$${value.toLocaleString(undefined, { maximumFractionDigits: 0 })}`;

export default function RoiCalculator() {
  const [form, setForm] = useState<RoiForm>({
    teamSize: 5,
    hourlyCost: 40,
    hoursSavedWeekly: 8,
    implementationCost: 2500,
    monthlyToolCost: 399,
    errorReductionPct: 10,
    revenueUpliftPct: 0
  });

  const result = useMemo(() => calculateRoi(form), [form]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        {roiFields.map((field) => (
          <label key={field.key} className="block text-sm">
            <span className="mb-1 block font-medium">{field.label}</span>
            <input
              className="w-full rounded border border-slate-300 px-3 py-2"
              type="number"
              step={field.step}
              value={form[field.key]}
              onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: Number(e.target.value) }))}
            />
          </label>
        ))}
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">ROI results</h3>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-brand-50 p-3">
            <p className="text-xs uppercase tracking-wide text-brand-700">Monthly savings</p>
            <p className="mt-1 text-2xl font-bold text-brand-700">{money(result.monthlySavings)}</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-600">Payback period</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{result.paybackMonths.toFixed(1)} mo</p>
          </div>
        </div>

        <div className="mt-3 rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-600">ROI horizon</p>
          <div className="mt-2 grid grid-cols-3 gap-2 text-center">
            <div className="rounded bg-slate-50 p-2">
              <p className="text-xs text-slate-500">3m</p>
              <p className="font-semibold text-slate-900">{result.roi3}%</p>
            </div>
            <div className="rounded bg-slate-50 p-2">
              <p className="text-xs text-slate-500">6m</p>
              <p className="font-semibold text-slate-900">{result.roi6}%</p>
            </div>
            <div className="rounded bg-slate-50 p-2">
              <p className="text-xs text-slate-500">12m</p>
              <p className="font-semibold text-slate-900">{result.roi12}%</p>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-600">Scenario output (monthly)</p>
          <div className="mt-2 space-y-1 text-sm">
            <p>Conservative: <strong>{money(result.scenarios.conservative)}</strong></p>
            <p>Base: <strong>{money(result.scenarios.base)}</strong></p>
            <p>Aggressive: <strong>{money(result.scenarios.aggressive)}</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
