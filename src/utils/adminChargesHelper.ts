import { useAdminChargesStore } from "@spt/store/transaction";
import type { Metadata3 } from "@spt/types/settings";

/**
 * A charge can either be percentage-based ({ type: "percentage", value })
 * or range-based ({ min, max, charge }).
 */
export const isPercentageCharge = (item?: Metadata3 | null) =>
  item?.type === "percentage";

/**
 * Normalises a charge to the exact shape the backend expects, preserving
 * percentage entries instead of flattening everything into min/max/charge.
 */
export const normalizeCharge = (charge: Metadata3) =>
  isPercentageCharge(charge)
    ? { type: "percentage" as const, value: Number(charge.value) }
    : {
        min: charge.min,
        max: charge.max ?? null,
        charge: charge.charge,
      };

/**
 * Helper function to get the current admin charges data formatted for API submission
 * This ensures that all current data (including updates and deletions) is sent to the endpoint
 */
export const useAdminChargesForSubmission = () => {
  const { adminChargesData, settingsId } = useAdminChargesStore();

  const getFormattedData = () => {
    return {
      id: settingsId,
      metadata: adminChargesData.map(normalizeCharge),
      value: "", // This might be for certificate fee or other value
    };
  };

  return {
    getFormattedData,
    adminChargesData,
    settingsId,
  };
};

/**
 * Example usage in a component that needs to submit admin charges data:
 *
 * const { getFormattedData } = useAdminChargesForSubmission();
 *
 * const handleSubmit = async () => {
 *   const payload = getFormattedData();
 *   // Send payload to your update endpoint
 *   await updateSettingsMutation.mutateAsync(payload);
 * };
 */
