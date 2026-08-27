import { useMutation, useQueryClient } from "@tanstack/react-query";

import { toaster } from "@spt/components/ui/toaster";
import {
  type CertificateTemplateSelection,
  useCreateSpolyzStore,
} from "@spt/store/createSpolyzStore";
import apiCall from "@spt/utils/apiCall";

/** The editable slots every certificate template exposes. */
const CERTIFICATE_TEMPLATE_FIELDS = [
  { name: "Title", type: "string" },
  { name: "Recipient Name", type: "string" },
  { name: "Body", type: "string" },
];

export interface CreateSpoilTemplatePayload {
  spoil_id: number | string;
  template: {
    name: string;
    /** The API stores the markup under `description`. */
    description: string;
    fields: { name: string; type: string }[];
  };
}

/** Turns a picked template into the payload certificates/template/spoil wants. */
export const buildSpoilTemplatePayload = (
  template: CertificateTemplateSelection,
  spoilId: number | string,
): CreateSpoilTemplatePayload => ({
  spoil_id: spoilId,
  template: {
    name: template.templateFileName || template.name || "certificate-template",
    description: template.templateContent,
    fields: CERTIFICATE_TEMPLATE_FIELDS,
  },
});

/**
 * Attaches a certificate template to a spoil. It can only run once the spoil
 * exists, so publishing calls it with the id returned by admin/spoils.
 */
export const useCreateSpoilTemplateMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (payload: CreateSpoilTemplatePayload) => {
      const res = await apiCall().post("certificates/template/spoil", payload);
      return res?.data;
    },
    onSuccess: (_, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["spoil-template", payload.spoil_id],
      });
    },
    onError: (error: any) => {
      toaster.create({
        type: "error",
        description:
          error?.response?.data?.message ||
          "Failed to save the certificate. Try again.",
      });
    },
  });

  return {
    createSpoilTemplate: mutation.mutateAsync,
    isSavingTemplate: mutation.isPending,
  };
};

/**
 * Posts the certificate picked in the review step once the spoil it belongs to
 * exists. A failure here is reported by the mutation and left at that — the
 * spoil is already saved and the admin can add the certificate again later.
 */
export const attachCertificateToSpoil = async (
  createSpoilTemplate: (payload: CreateSpoilTemplatePayload) => Promise<any>,
  spoilId: number | string,
  hasCertificate: boolean,
) => {
  const { certificateTemplate } = useCreateSpolyzStore.getState();

  if (!hasCertificate || !certificateTemplate?.templateContent) return;

  try {
    await createSpoilTemplate(
      buildSpoilTemplatePayload(certificateTemplate, spoilId),
    );
  } catch {
    // reported by the mutation above
  }
};
