import { useAdminChargesStore } from "@spt/store/transaction";

/**
 * Helper function to get the current admin charges data formatted for API submission
 * This ensures that all current data (including updates and deletions) is sent to the endpoint
 */
export const useAdminChargesForSubmission = () => {
  const { adminChargesData, settingsId } = useAdminChargesStore();

  const getFormattedData = () => {
    return {
      id: settingsId,
      metadata: adminChargesData.map((charge) => ({
        max: charge.max,
        min: charge.min,
        charge: charge.charge,
      })),
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
