// Base URL
export const BASE_URL = "http://localhost:3000";

// API Context
export const API_CONTEXT = "api/V1";

// News Endpoints
export const NEWS_URL = `${BASE_URL}/${API_CONTEXT}/news`;

// Auth Endpoints
export const AUTH_URL = `${BASE_URL}/${API_CONTEXT}/auth`;
export const LOGIN_URL = `${AUTH_URL}/login`;
export const USERS_URL = `${AUTH_URL}/users`;
export const USER_BY_ID_URL = (id: number) => `${USERS_URL}/${id}`;

// Farmer Endpoints
export const FARMERS_URL = `${BASE_URL}/${API_CONTEXT}/farmers`;
export const FARMERS_REGISTER_URL = `${FARMERS_URL}/register`;
export const FARMERS_SEND_OTP_URL = `${FARMERS_URL}/send-otp`;
export const FARMERS_LOGIN_URL = `${FARMERS_URL}/login`;