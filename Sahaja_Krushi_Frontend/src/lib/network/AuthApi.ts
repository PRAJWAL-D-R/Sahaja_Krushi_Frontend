import { apiRequest } from "./apiRequest";
import { LOGIN_URL, USERS_URL, USER_BY_ID_URL } from "../Endpoints";

// Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN';
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  profileImage?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

export interface CreateUserData {
  username: string;
  email: string;
  password: string;
  role: 'ADMIN';
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  district: string;
  state: string;
  postalCode: string;
  country: string;
  dateOfBirth?: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  profileImage?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// Auth API functions
export const authApi = {
  // Login user
  login: async (credentials: LoginCredentials): Promise<LoginResponse> => {
    return apiRequest<LoginResponse>({
      method: "POST",
      url: LOGIN_URL,
      data: credentials,
    });
  },

  // Create user (Super Admin only)
  createUser: async (userData: CreateUserData): Promise<ApiResponse<User>> => {
    return apiRequest<ApiResponse<User>>({
      method: "POST",
      url: USERS_URL,
      data: userData,
    });
  },

  // Get all users (Super Admin only)
  getAllUsers: async (): Promise<ApiResponse<User[]>> => {
    return apiRequest<ApiResponse<User[]>>({
      method: "GET",
      url: USERS_URL,
    });
  },

  // Get user by ID (Super Admin only)
  getUserById: async (id: number): Promise<ApiResponse<User>> => {
    return apiRequest<ApiResponse<User>>({
      method: "GET",
      url: USER_BY_ID_URL(id),
    });
  },

  // Update user (Super Admin only)
  updateUser: async (id: number, userData: Partial<CreateUserData>): Promise<ApiResponse<User>> => {
    return apiRequest<ApiResponse<User>>({
      method: "PUT",
      url: USER_BY_ID_URL(id),
      data: userData,
    });
  },

  // Delete user (Super Admin only)
  deleteUser: async (id: number): Promise<ApiResponse<null>> => {
    return apiRequest<ApiResponse<null>>({
      method: "DELETE",
      url: USER_BY_ID_URL(id),
    });
  },
};
