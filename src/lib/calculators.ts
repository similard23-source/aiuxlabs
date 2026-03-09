export type RoiInputs = {
  teamSize: number;
  hourlyCost: number;
  hoursSavedWeekly: number;
  implementationCost: number;
  monthlyToolCost: number;
  errorReductionPct?: number;
  revenueUpliftPct?: number;
};

export function calculateRoi(input: RoiInputs) {
  const laborSavings = input.teamSize * input.hourlyCost * input.hoursSavedWeekly * 4;
  const qualitySavings = laborSavings * ((input.errorReductionPct ?? 0) / 100);
  const revenueUpliftValue = laborSavings * ((input.revenueUpliftPct ?? 0) / 100);
  const grossMonthlyGain = laborSavings + qualitySavings + revenueUpliftValue;
  const netMonthlyGain = grossMonthlyGain - input.monthlyToolCost;
  const paybackMonths = input.implementationCost > 0 ? input.implementationCost / Math.max(netMonthlyGain, 1) : 0;

  const roiForMonths = (months: number) => {
    const returns = netMonthlyGain * months - input.implementationCost;
    return ((returns / Math.max(input.implementationCost, 1)) * 100).toFixed(1);
  };

  return {
    monthlySavings: netMonthlyGain,
    paybackMonths,
    roi3: roiForMonths(3),
    roi6: roiForMonths(6),
    roi12: roiForMonths(12),
    scenarios: {
      conservative: netMonthlyGain * 0.75,
      base: netMonthlyGain,
      aggressive: netMonthlyGain * 1.25
    }
  };
}

export type RoasInputs = {
  aov: number;
  grossMarginPct: number;
  cogs: number;
  shipping: number;
  paymentFees: number;
  returnRatePct: number;
  adSpend: number;
  optionalDiscountRatePct?: number;
  optionalAgencyFeePct?: number;
  cacMode?: 'blended' | 'channel-specific';
};

export function calculateRoas(input: RoasInputs) {
  const netRevenue = input.aov * (1 - (input.optionalDiscountRatePct ?? 0) / 100);
  const marginValue = netRevenue * (input.grossMarginPct / 100);
  const feeTotal = input.paymentFees + netRevenue * ((input.optionalAgencyFeePct ?? 0) / 100);
  const returnLoss = netRevenue * (input.returnRatePct / 100);
  const profitPerOrder = marginValue - input.cogs - input.shipping - feeTotal - returnLoss;

  const effectiveAdSpend = (input.cacMode ?? 'channel-specific') === 'blended' ? input.adSpend * 0.9 : input.adSpend;
  const breakEvenRoas = effectiveAdSpend > 0 ? netRevenue / Math.max(profitPerOrder, 1) : 0;
  const breakEvenCpa = Math.max(profitPerOrder, 0);

  return {
    breakEvenRoas,
    breakEvenCpa,
    profitPerOrder,
    targetRoasLow: breakEvenRoas * 1.2,
    targetRoasHigh: breakEvenRoas * 1.6,
    modeNote:
      (input.cacMode ?? 'channel-specific') === 'blended'
        ? 'Blended mode applies a conservative efficiency credit for repeat/baseline demand.'
        : 'Channel-specific mode uses direct channel economics only.'
  };
}
