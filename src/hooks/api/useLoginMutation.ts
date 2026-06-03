import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toaster } from "@spt/components/ui/toaster";
import { useAuthStore } from "@spt/store/useAuthStore";
import apiCall from "@spt/utils/apiCall";

import type { FormikValues } from "formik";

interface Payload {
  email: string;
  password: string;
}

export const useLoginMutation = () => {
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const Login = async (payload: Payload) => {
    return (await apiCall().post("/auth/login", payload))?.data;
  };

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
  });

  const loginHandler = async (values: FormikValues) => {
    setErrorMessage("");

    const payload: Payload = {
      email: values.email,
      password: values?.password,
    };

    try {
      await mutation.mutateAsync(payload, {
        onSuccess: (data) => {
          // setAuth({
          //   user: data?.data,
          //   token: data.token,
          // });

          setAuth({
            user: data?.data?.user, // ✅ only the actual user object
            token: data?.data?.token ?? data?.token, // ✅ the token (fallback to top-level token)
          });
          toaster.create({
            type: "success",
            description: data?.message ?? "Password updated!",
          });
          navigate("/");
        },
      });
    } catch (error: any) {
      // The backend returns the reason in the response body, e.g.
      // { error: "Invalid credentials.", status: false, data: null }
      const message =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      setErrorMessage(message);
      toaster.create({
        type: "error",
        description: message,
      });
    }
  };

  return {
    isLoading: mutation.isPending,
    loginHandler,
    errorMessage,
  };
};
