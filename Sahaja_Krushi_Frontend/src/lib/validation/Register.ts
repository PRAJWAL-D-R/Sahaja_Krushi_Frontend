import { z } from "zod";

export const farmerRegisterSchema = z.object({
  // Personal Information
  fullName: z.string().min(1, "Full Name is required"),
  dateOfBirth: z.string().min(1, "Date of Birth is required"),
  gender: z.enum(["Male", "Female", "Other"], { required_error: "Gender is required" }),
  aadharNumber: z.string().length(12, "Aadhar Number must be 12 digits"),
  contactNumber: z.string().length(10, "Contact Number must be 10 digits"),
  alternateContactNumber: z.string().length(10, "Alternate Contact Number must be 10 digits").optional().or(z.literal("")),
  email: z.string().email("Invalid email address").optional().or(z.literal("")),
  address: z.string().min(1, "Address is required"),
  state: z.string().min(1, "State is required"),
  district: z.string().min(1, "District is required"),
  village: z.string().min(1, "Village/Town is required"),
  pinCode: z.string().length(6, "PIN Code must be 6 digits"),

  // Farming Details
  landSize: z.string().min(1, "Land Size is required"),
  cropsGrown: z.array(z.string()).min(1, "At least one crop must be selected"),
  farmingType: z.string().min(1, "Type of Farming is required"),
  waterSource: z.string().min(1, "Water Source is required"),
  fertilizerUsage: z.string().optional().or(z.literal("")),
  equipmentOwned: z.array(z.string()).optional(),
  experienceYears: z.string().min(1, "Farming Experience is required"),

  // Bank & Financial Details
  bankName: z.string().min(1, "Bank Name is required"),
  accountNumber: z.string().min(1, "Account Number is required"),
  ifscCode: z.string().min(1, "IFSC Code is required"),
  accountHolderName: z.string().min(1, "Account Holder Name is required"),
  isKycDone: z.boolean({ required_error: "KYC status is required" }),
  hasLoanHistory: z.boolean().optional(),
  insuranceScheme: z.enum(["PMFBY", "Private", "None", ""], { required_error: "Insurance Scheme is required" }).optional(),

  // Documents (file uploads, optional)
  aadharCard: z.any().optional(),
  landProof: z.any().optional(),
  bankPassbook: z.any().optional(),
  farmerIdCard: z.any().optional(),
});

export type FarmerRegisterFormData = z.infer<typeof farmerRegisterSchema>;
