export function money(n: number, currency = "INR"): string {
  const isInr = currency.toUpperCase() === "INR";
  try {
    return new Intl.NumberFormat(isInr ? "en-IN" : "en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: isInr ? 0 : 2,
      minimumFractionDigits: isInr ? 0 : 2,
    }).format(n);
  } catch {
    return isInr
      ? `₹${Math.round(n).toLocaleString("en-IN")}`
      : `$${n.toFixed(2)}`;
  }
}

export function starRow(r: number): string {
  const full = Math.round(r);
  return "★".repeat(full) + "☆".repeat(Math.max(0, 5 - full));
}

export function debounce<Args extends unknown[]>(
  fn: (...args: Args) => void,
  ms: number
) {
  let t: ReturnType<typeof setTimeout> | undefined;
  return (...args: Args) => {
    if (t) clearTimeout(t);
    t = setTimeout(() => fn(...args), ms);
  };
}
