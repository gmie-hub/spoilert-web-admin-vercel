import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { routes } from "@spt/routes";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  spoil_id: number;
  quantity: number;
  sponsor_email: string;
  unit_amount: number;
  sponsor_name: string;
}

export const useCreateAdminSponsorMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const createAdminSponsor = async (payload: Payload) => {
    return (await apiCall().post("/sponsorships", payload))?.data;
  };

  const mutation = useMutation({
    mutationKey: ["create-admin-sponsor"],
    mutationFn: createAdminSponsor,
  });

  const createAdminSponsorHandler = async (values: FormikValues) => {
    const payload: Payload = {
      spoil_id: values.spoilTitle,
      quantity: values.sponsoredLearners,
      sponsor_email: values.sponsorEmail,
      unit_amount: values.amount,
      sponsor_name: values.nameOfSponsor,
    };

    try {
      await mutation.mutateAsync(payload, {
        onSuccess: (data) => {
          toaster.create({
            type: "success",
            description: data?.message || "Admin Sponsorship created",
          });

          queryClient.invalidateQueries({
            queryKey: ["all-sponsorships"],
          });

          navigate(routes.main.sponsorships.sponsorshipCodes);
        },
      });
    } catch (error: any) {
      toaster.create({
        type: "error",
        description: error?.message || "Something went wrong",
      });
    }
  };

  return {
    isCreateSponsorshipLoading: mutation.isPending,
    createAdminSponsorHandler,
  };
};
