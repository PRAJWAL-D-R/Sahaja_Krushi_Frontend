// src/store/slices/newsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { NewsResponse, NewsItem } from "../../../lib/interface/NewsInterface";
import { fetchNews, createNews, updateNews, deleteNews } from "../../../lib/network/NewsApi";

export interface NewsState {
  newsList: NewsResponse | null;
  loading: boolean;
  error: string | null;
  operationLoading: boolean;
  currentPage: number;
  totalPages: number;
  filters: {
    searchQuery: string;
    dateFrom: string;
    dateTo: string;
    sortBy: 'newest' | 'oldest' | 'title';
  };
  successMessage: string | null;
  showSuccessModal: boolean;
  showErrorModal: boolean;
}

const initialState: NewsState = {
  newsList: null,
  loading: false,
  error: null,
  operationLoading: false,
  currentPage: 1,
  totalPages: 1,
  filters: {
    searchQuery: '',
    dateFrom: '',
    dateTo: '',
    sortBy: 'newest',
  },
  successMessage: null,
  showSuccessModal: false,
  showErrorModal: false,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearOperationLoading: (state) => {
      state.operationLoading = false;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        searchQuery: '',
        dateFrom: '',
        dateTo: '',
        sortBy: 'newest',
      };
      state.currentPage = 1;
    },
    showSuccessModal: (state, action) => {
      state.showSuccessModal = true;
      state.successMessage = action.payload;
    },
    hideSuccessModal: (state) => {
      state.showSuccessModal = false;
      state.successMessage = null;
    },
    showErrorModal: (state, action) => {
      state.showErrorModal = true;
      state.error = action.payload;
    },
    hideErrorModal: (state) => {
      state.showErrorModal = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch News List
      .addCase(fetchNews.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.loading = false;
        state.newsList = action.payload;
        state.totalPages = Math.ceil((action.payload.data?.length || 0) / 10); // Assuming 10 items per page
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch news";
      })
      // Create News
      .addCase(createNews.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(createNews.fulfilled, (state, action) => {
        state.operationLoading = false;
        if (state.newsList && state.newsList.data) {
          state.newsList.data.unshift(action.payload.data);
        }
        state.showSuccessModal = true;
        state.successMessage = 'News created successfully!';
      })
      .addCase(createNews.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = (action.payload as string) || "Failed to create news";
        state.showErrorModal = true;
      })
      // Update News
      .addCase(updateNews.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(updateNews.fulfilled, (state, action) => {
        state.operationLoading = false;
        if (state.newsList && state.newsList.data) {
          const index = state.newsList.data.findIndex(item => item.id === action.payload.data.id);
          if (index !== -1) {
            state.newsList.data[index] = action.payload.data;
          }
        }
        state.showSuccessModal = true;
        state.successMessage = 'News updated successfully!';
      })
      .addCase(updateNews.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = (action.payload as string) || "Failed to update news";
        state.showErrorModal = true;
      })
      // Delete News
      .addCase(deleteNews.pending, (state) => {
        state.operationLoading = true;
        state.error = null;
      })
      .addCase(deleteNews.fulfilled, (state, action) => {
        state.operationLoading = false;
        if (state.newsList && state.newsList.data) {
          state.newsList.data = state.newsList.data.filter(item => item.id !== action.meta.arg);
        }
        state.showSuccessModal = true;
        state.successMessage = 'News deleted successfully!';
      })
      .addCase(deleteNews.rejected, (state, action) => {
        state.operationLoading = false;
        state.error = (action.payload as string) || "Failed to delete news";
        state.showErrorModal = true;
      });
  },
});

export const { 
  clearError, 
  clearOperationLoading, 
  setCurrentPage, 
  setFilters, 
  clearFilters, 
  showSuccessModal, 
  hideSuccessModal, 
  showErrorModal, 
  hideErrorModal 
} = newsSlice.actions;
export default newsSlice.reducer;
