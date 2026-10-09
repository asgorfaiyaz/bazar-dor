const bn = new Intl.NumberFormat("bn-BD");
const bnPct = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export const formatCount = (n: number) => bn.format(n);
export const formatPercent = (n: number) => bnPct.format(n);

export function formatPrice(value: string | number) {
  const n = typeof value === "number" ? value : Number(value.replace(/,/g, ""));
  return Number.isFinite(n) ? bn.format(n) : String(value);
}

const UNIT_BN: Record<string, string> = {
  kg: "কেজি",
  gram: "গ্রাম",
  g: "গ্রাম",
  litre: "লিটার",
  liter: "লিটার",
  l: "লিটার",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
  dozen: "ডজন",
  hali: "হালি",
};

export function formatUnit(unit: string) {
  const key = unit
    .trim()
    .toLowerCase()
    .replace(/^per\s+/, "");
  const bnUnit = UNIT_BN[key] ?? unit; // unknown units pass through as-is
  return bnUnit.startsWith("প্রতি") ? bnUnit : `প্রতি ${bnUnit}`;
}
