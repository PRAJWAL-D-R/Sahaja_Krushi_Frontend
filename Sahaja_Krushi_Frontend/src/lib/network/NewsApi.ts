// src/api/services/newsApi.ts

import { createAsyncThunk } from "@reduxjs/toolkit";
import { startLoading, stopLoading } from "../../store/feature/globalConstant/loadingSlice";
import { apiRequest } from "./apiRequest";
import { NEWS_URL } from "../Endpoints";
import type { NewsItem, NewsResponse, SingleNewsResponse } from "../interface/NewsInterface";

// Fetch all news
export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (
    params: { limit?: number; page?: number; searchQuery?: string },
    { rejectWithValue, dispatch }
  ) => {
    try {
      dispatch(startLoading());

      const queryParams: Record<string, any> = {};
      if (params.limit) queryParams.limit = params.limit;
      if (params.page) queryParams.page = params.page;
      if (params.searchQuery?.trim()) queryParams.search = params.searchQuery.trim();

      const response = await apiRequest<NewsResponse>({
        method: "GET",
        url: NEWS_URL,
        params: queryParams,
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Internal Server Error");
    } finally {
      dispatch(stopLoading());
    }
  }
);

// Fetch single news by ID
export const fetchNewsById = createAsyncThunk<
  SingleNewsResponse,
  { newsId: number }
>("news/fetchNewsById", async ({ newsId }, { rejectWithValue, dispatch }) => {
  try {
    dispatch(startLoading());

    const response = await apiRequest<SingleNewsResponse>({
      method: "GET",
      url: `${NEWS_URL}/${newsId}`,
    });

    return response;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || "Internal Server Error");
  } finally {
    dispatch(stopLoading());
  }
});

// Create news
export const createNews = createAsyncThunk<
  SingleNewsResponse,
  { formData: Partial<NewsItem>; file?: File }
>(
  "news/createNews",
  async ({ formData, file }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title || '');
      formDataToSend.append('content', formData.content || '');
      
      if (file) {
        formDataToSend.append('document', file);
      }

      const response = await apiRequest<SingleNewsResponse>({
        method: "POST",
        url: NEWS_URL,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to create news");
    } finally {
      dispatch(stopLoading());
    }
  }
);

// Update news
export const updateNews = createAsyncThunk<
  SingleNewsResponse,
  { formData: Partial<NewsItem>; newsId: number; file?: File }
>(
  "news/updateNews",
  async ({ formData, newsId, file }, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());

      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title || '');
      formDataToSend.append('content', formData.content || '');
      
      if (file) {
        formDataToSend.append('document', file);
      }

      const response = await apiRequest<SingleNewsResponse>({
        method: "PUT",
        url: `${NEWS_URL}/${newsId}`,
        data: formDataToSend,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to update news");
    } finally {
      dispatch(stopLoading());
    }
  }
);

// Delete news
export const deleteNews = createAsyncThunk<
  SingleNewsResponse,
  number
>(
  "news/deleteNews",
  async (newsId, { rejectWithValue, dispatch }) => {
    try {
      dispatch(startLoading());

      const response = await apiRequest<SingleNewsResponse>({
        method: "DELETE",
        url: `${NEWS_URL}/${newsId}`,
      });

      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Failed to delete news");
    } finally {
      dispatch(stopLoading());
    }
  }
);
