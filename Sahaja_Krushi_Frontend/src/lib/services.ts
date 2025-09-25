import api from './api';

// Response shapes follow backend utils/common { success, message, data, err }
export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
  err: unknown;
};

export const infoService = {
  getInfo: () => api.get<ApiResponse<{ status: string; uptime: number; version: string }>>('/v1/info'),
};

export type Airplane = { id: number; modelNumber: string; capacity: number };
export const airplaneService = {
  list: (params?: { limit?: number; offset?: number }) => {
    const query = params?.limit || params?.offset ? `?limit=${params?.limit ?? ''}&offset=${params?.offset ?? ''}` : '';
    return api.get<ApiResponse<{ rows: Airplane[]; count: number }>>(`/v1/airplanes${query}`);
  },
  get: (id: number) => api.get<ApiResponse<Airplane>>(`/v1/airplanes/${id}`),
  create: (payload: { modelNumber: string; capacity: number }) => api.post<ApiResponse<Airplane>>('/v1/airplanes', payload),
  update: (id: number, payload: Partial<{ modelNumber: string; capacity: number }>) => api.patch<ApiResponse<Airplane>>(`/v1/airplanes/${id}`, payload),
  remove: (id: number) => api.delete<ApiResponse<{ id: number }>>(`/v1/airplanes/${id}`),
};

export type City = { id: number; name: string; code: string };
export const cityService = {
  list: (params?: { limit?: number; offset?: number }) => {
    const query = params?.limit || params?.offset ? `?limit=${params?.limit ?? ''}&offset=${params?.offset ?? ''}` : '';
    return api.get<ApiResponse<{ rows: City[]; count: number }>>(`/v1/cities${query}`);
  },
  get: (id: number) => api.get<ApiResponse<City>>(`/v1/cities/${id}`),
  create: (payload: { name: string; code: string }) => api.post<ApiResponse<City>>('/v1/cities', payload),
  update: (id: number, payload: Partial<{ name: string; code: string }>) => api.patch<ApiResponse<City>>(`/v1/cities/${id}`, payload),
  remove: (id: number) => api.delete<ApiResponse<{ id: number }>>(`/v1/cities/${id}`),
};
