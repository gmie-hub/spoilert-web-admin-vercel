import { useQuery } from "@tanstack/react-query";

import type { ApiErrorResponse } from "@spt/types/error";
import apiCall from "@spt/utils/apiCall";

import type { AxiosError } from "axios";

export interface CertificateTemplate {
  id: number;
  code: string;
  type: string | null;
  template: {
    /** The raw certificate markup rendered in the preview. */
    template_content: string;
    certificate_template_name: string;
  };
  is_active: boolean;
}

interface CertificateTemplatesResponse {
  message: string;
  status: boolean;
  /** The list is paginated, so the templates sit one level deeper. */
  data: { data: CertificateTemplate[] };
}

/** Falls back to the file name when a template carries no readable name. */
export const getTemplateName = (
  template: CertificateTemplate,
  index: number,
) => {
  const rawName = template.template?.certificate_template_name;

  if (typeof rawName === "string" && rawName.trim()) {
    return rawName
      .replace(/\.html$/i, "")
      .replace(/[_-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  return `Certificate Template ${index + 1}`;
};

export const useGetCertificateTemplatesQuery = (options?: {
  enabled?: boolean;
}) => {
  const fetchCertificateTemplates =
    async (): Promise<CertificateTemplatesResponse> => {
      return (await apiCall().get("certificates/template"))?.data;
    };

  const { data, isLoading, isError, error } = useQuery<
    CertificateTemplatesResponse,
    AxiosError<ApiErrorResponse>
  >({
    queryKey: ["certificate-templates"],
    queryFn: fetchCertificateTemplates,
    enabled: options?.enabled ?? true,
  });

  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "Failed to fetch certificate templates";

  return {
    templates: data?.data?.data ?? [],
    isLoading,
    isError,
    errorMessage,
  };
};
