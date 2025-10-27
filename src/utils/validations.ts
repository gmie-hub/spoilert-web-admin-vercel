import { number, ref, string } from "yup";

export const validations = {
  newPassword: string()
    .required("New Password is required")
    .min(8, "The password field must be at least 8 characters."),
  password: string()
    .required("Password is required"),

  currentPassword: string()
    .required("Current Password is required")
    .min(8, "The password field must be at least 8 characters."),

  confirmPassword: string()
    .required("Confirm Password is required")
    .oneOf([ref("newPassword")], "Passwords must match")
    .min(8, "The password field must be at least 8 characters."),
  firstName: string().required("First Name is required"),
  lastName: string().required("Last Name is required"),
    email: string().required("email is required"),
  middleName: string().required("Middle Name is required"),
  reason: string().required("Reason for rejection is required"),
  name: string().required("Name is required"),
  certificateFee: number().required("Amount is required"),
  contactEmailID: string().required("Company's email ID is required"),
  contactPhoneNumber: string().required("Company's phone number is required"),
  contactLocation: string().required("Company's location is required"),
  facebook: string().required("Company's facebook link is required"),
  linkedin: string().required("Company's linkedIn link is required"),
  twitter: string().required("Company's twitter link is required"),
  instagram: string().required("Company's instagram link is required"),
  minSpoilPrice: number().required("Minimum spoil price is required"),
  maxSpoilPrice: number().required("Maximum spoil price is required"),
  adminCharge: number().required("Admin charge is required"),
};
