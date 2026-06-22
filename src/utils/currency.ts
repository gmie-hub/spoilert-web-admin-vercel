/**
 * Formats a money value (as returned by the payments API, e.g. "16875.00")
 * into a localised currency string, e.g. "₦16,875.00".
 */
export const formatCurrency = (
  value?: string | number | null,
  currency = "NGN"
) => {
  if (value === null || value === undefined || value === "") return "N/A";

  const amount = typeof value === "string" ? Number(value) : value;
  if (Number.isNaN(amount)) return "N/A";

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};
