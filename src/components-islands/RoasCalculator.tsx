import { useMemo, useState } from 'react';
import { calculateRoas, type RoasInputs } from '@/lib/calculators';

type RoasForm = {
  aov: number;
  grossMarginPct: number;
  cogs: number;
  shipping: number;
  paymentFees: number;
  returnRatePct: number;
  adSpend: number;
  optionalDiscountRatePct: number;
  optionalAgencyFeePct: number;
};

const roasFields: Array<{ key: keyof RoasForm; label: string; step?: string }> = [
  { key: 'aov', label: 'AOV (USD)', step: '0.1' },
  { key: 'grossMarginPct', label: 'Gross margin (%)', step: '0.1' },
  { key: 'cogs', label: 'COGS (USD)', step: '0.1' },
  { key: 'shipping', label: 'Shipping (USD)', step: '0.1' },
  { key: 'paymentFees', label: 'Payment fees (USD)', step: '0.1' },
  { key: 'returnRatePct', label: 'Return rate (%)', step: '0.1' },
  { key: 'adSpend', label: 'Ad spend per order (USD)', step: '0.1' },
  { key: 'optionalDiscountRatePct', label: 'Discount rate (%)', step: '0.1' },
  { key: 'optionalAgencyFeePct', label: 'Agency fee (%)', step: '0.1' }
];

const money = (value: number) => `$${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

export default function RoasCalculator() {
  const [form, setForm] = useState<RoasForm>({
    aov: 85,
    grossMarginPct: 65,
    cogs: 18,
    shipping: 7,
    paymentFees: 3,
    returnRatePct: 8,
    adSpend: 30,
    optionalDiscountRatePct: 0,
    optionalAgencyFeePct: 0
  });
  const [cacMode, setCacMode] = useState<RoasInputs['cacMode']>('channel-specific');

  const result = useMemo(() => calculateRoas({ ...form, cacMode }), [form, cacMode]);

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <div className="space-y-3 rounded-lg border border-slate-200 bg-white p-4">
        {roasFields.map((field) => (
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

        <label className="block text-sm">
          <span className="mb-1 block font-medium">CAC mode</span>
          <select
            className="w-full rounded border border-slate-300 px-3 py-2"
            value={cacMode}
            onChange={(e) => setCacMode(e.target.value as RoasInputs['cacMode'])}
          >
            <option value="channel-specific">Channel-specific CAC</option>
            <option value="blended">Blended CAC</option>
          </select>
        </label>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-4">
        <h3 className="text-base font-semibold text-slate-900">Profitability readout</h3>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="rounded-md bg-brand-50 p-3">
            <p className="text-xs uppercase tracking-wide text-brand-700">Break-even ROAS</p>
            <p className="mt-1 text-2xl font-bold text-brand-700">{result.breakEvenRoas.toFixed(2)}x</p>
          </div>
          <div className="rounded-md bg-slate-50 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-600">Break-even CPA</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">{money(result.breakEvenCpa)}</p>
          </div>
        </div>

        <div className="mt-3 rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-600">Per-order economics</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">Profit per order: {money(result.profitPerOrder)}</p>
        </div>

        <div className="mt-3 rounded-md border border-slate-200 p-3">
          <p className="text-xs uppercase tracking-wide text-slate-600">Target ROAS range</p>
          <p className="mt-1 text-xl font-semibold text-slate-900">{result.targetRoasLow.toFixed(2)}x - {result.targetRoasHigh.toFixed(2)}x</p>
        </div>

        <div className="mt-3 rounded-md border border-brand-200 bg-brand-50 p-3">
          <p className="text-xs uppercase tracking-wide text-brand-700">CAC mode note</p>
          <p className="mt-1 text-sm text-brand-700">{result.modeNote}</p>
        </div>
      </div>
    </div>
  );
}
