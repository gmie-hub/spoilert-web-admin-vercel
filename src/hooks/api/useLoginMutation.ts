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
  const navigate = useNavigate()

  const Login = async (payload: Payload) => {
    return (await apiCall().post("/auth/login", payload))?.data;
  };

  const mutation = useMutation({
    mutationKey: ["login"],
    mutationFn: Login,
  });

  const loginHandler = async (values: FormikValues) => {
    const payload: Payload = {
      email: values.email,
      password: values?.password,
    };

    try {
      await mutation.mutateAsync(payload, {
        onSuccess: (data) => {

          setAuth({
            user: data?.data,
            token: data.token,
          });
          toaster.create({
            type: "success",
            description: data?.message || "Password updated!",
          });
          navigate('/')

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
    isLoading: mutation.isPending,
    loginHandler,
  };
};
