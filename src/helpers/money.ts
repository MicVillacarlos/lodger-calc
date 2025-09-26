export function moneyFormat(amount: number, currency = "PHP") {
  if (!Number.isFinite(amount)) return "₱0.00";
  try {
    return new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `₱${amount.toFixed(2)}`;
  }
}
