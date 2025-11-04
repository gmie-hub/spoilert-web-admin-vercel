import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { routes } from "@spt/routes";
import { useSpoilIDStore } from "@spt/store";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  spoil_id: number;
  quantity: number;
  sponsor_email: string;
  unit_amount: number;
  sponsor_name: string;
}

interface SponsorshipCreationResponse {
  message: string;
  status: boolean;
  data: SponsorshipCreationData;
}

interface SponsorshipCreationData {
  sponsorship: Sponsorship;
  codes: Code2[];
}

interface Code2 {
  sponsorship_id: number;
  code: string;
  status: string;
  updated_at: string;
  created_at: string;
  id: number;
}

interface Sponsorship {
  id: number;
  spoil_id: number;
  sponsor_id: number;
  is_admin: number;
  payment_id: null;
  unit_amount: string;
  quantity: number;
  total_amount: string;
  status: string;
  paid_at: string;
  deleted_at: null;
  created_at: string;
  updated_at: string;
  total_codes: number;
  total_redeemed: number;
  spoil: Spoil;
  sponsor: Sponsor;
  codes: Code[];
}

interface Code {
  id: number;
  sponsorship_id: number;
  learner_id: null;
  code: string;
  redeemed_at: null;
  status: string;
  created_at: string;
  updated_at: string;
  deleted_at: null;
}

interface Sponsor {
  id: number;
  first_name: string;
  last_name: string;
  profile: null;
  total_spoils_created: null;
  followers_count: null;
}

interface Spoil {
  id: number;
  title: string;
  amount: null;
  modules_no: number;
  lessons_no: number;
  display_amount: number;
  average_rating: number;
  ratings_count: number;
  enrolled_users: number;
  is_enrolled: boolean;
  likes_count: number;
  shares_count: number;
  is_liked_by_current_user: boolean;
  category: null;
  tutor: null;
}

export const useCreateAdminSponsorMutation = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const setSpoilID = useSpoilIDStore((state) => state.setSpoilID);

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
        onSuccess: (data: SponsorshipCreationResponse) => {
          toaster.create({
            type: "success",
            description: data?.message || "Admin Sponsorship created",
          });

          setSpoilID(data?.data?.sponsorship?.id);

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
