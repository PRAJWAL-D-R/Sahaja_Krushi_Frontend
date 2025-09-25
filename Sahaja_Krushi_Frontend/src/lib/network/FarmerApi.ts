import { apiRequest } from "./apiRequest";
import { FARMERS_REGISTER_URL, FARMERS_SEND_OTP_URL, FARMERS_LOGIN_URL, FARMERS_URL } from "../Endpoints";

export interface FarmerRegisterPayload {
  fullName: string;
  dateOfBirth: string;
  gender: string;
  aadharNumber: string;
  contactNumber: string;
  alternateContactNumber?: string;
  email?: string;
  address: string;
  state: string;
  district: string;
  village: string;
  pinCode: string;
  landSize: string;
  cropsGrown: string[];
  farmingType: string;
  waterSource: string;
  equipmentOwned: string[];
  experienceYears: string;
  bankName: string;
  accountNumber: string;
  ifscCode: string;
  accountHolderName: string;
  isKycDone?: boolean;
  insuranceScheme?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export const farmerApi = {
  register: async (payload: FarmerRegisterPayload) => {
    return apiRequest<ApiResponse<any>>({
      method: "POST",
      url: FARMERS_REGISTER_URL,
      data: payload,
    });
  },

  list: async (params?: { page?: number; limit?: number; state?: string; district?: string; search?: string }) => {
    return apiRequest<ApiResponse<{ farmers: any[]; totalCount: number; totalPages: number; currentPage: number }>>({
      method: "GET",
      url: FARMERS_URL,
      params,
    });
  },

  getById: async (id: number | string) => {
    return apiRequest<ApiResponse<any>>({
      method: "GET",
      url: `${FARMERS_URL}/${id}`,
    });
  },

  update: async (id: number | string, data: Partial<FarmerRegisterPayload>) => {
    return apiRequest<ApiResponse<any>>({
      method: "PUT",
      url: `${FARMERS_URL}/${id}`,
      data,
    });
  },

  sendOtp: async (contactNumber: string) => {
    return apiRequest<ApiResponse<{ contactNumber: string; message: string }>>({
      method: "POST",
      url: FARMERS_SEND_OTP_URL,
      data: { contactNumber },
    });
  },

  login: async (contactNumber: string, otp: string) => {
    // Deprecated OTP-based login. Kept for backward compatibility but not used.
    return apiRequest<ApiResponse<any>>({
      method: "POST",
      url: FARMERS_LOGIN_URL,
      data: { contactNumber, otp },
    });
  },

  loginWithDob: async (contactNumber: string, dateOfBirth: string) => {
    // New login as per updated auth flow: mobile + DOB (YYYY-MM-DD)
    return apiRequest<ApiResponse<any>>({
      method: "POST",
      url: FARMERS_LOGIN_URL,
      data: { contactNumber, dateOfBirth },
    });
  },

  delete: async (id: number | string) => {
    return apiRequest<ApiResponse<{ deleted: boolean }>>({
      method: "DELETE",
      url: `${FARMERS_URL}/${id}`,
    });
  },
};


