import { string } from "yup";

export const validations = {
  reason: string().required("Reason for rejection is required"),
  name: string().required("Name is required"),
  certificateFee: string().required("Amount is required"),
  contactEmailID: string().required("Company's email ID is required"),
  contactPhoneNumber: string().required("Company's phone number is required"),
  contactLocation: string().required("Company's location is required"),
  facebook: string().required("Company's facebook link is required"),
  linkedin: string().required("Company's linkedIn link is required"),
  twitter: string().required("Company's twitter link is required"),
  instagram: string().required("Company's instagram link is required"),
};
