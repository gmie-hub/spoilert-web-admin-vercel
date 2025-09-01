import { string } from "yup";

export const validations = {
  reason: string().required("Reason for rejection is required"),
};


export const nameValidations = {
  name: string().required("Name is required"),
};