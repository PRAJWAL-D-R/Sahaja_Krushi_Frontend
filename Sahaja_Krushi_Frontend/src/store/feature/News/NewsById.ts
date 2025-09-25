// src/store/slices/newsByIdSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import type { SingleNewsResponse } from "../../../lib/interface/NewsInterface";
import { fetchNewsById } from "../../../lib/network/NewsApi";

export interface NewsByIdState {
  data: SingleNewsResponse | null;
  loading: boolean;
  error: string | null;
}

const initialState: NewsByIdState = {
  data: null,
  loading: false,
  error: null,
};

const newsByIdSlice = createSlice({
  name: "newsById",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsById.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchNewsById.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "An error occurred while fetching news.";
      });
  },
});

export default newsByIdSlice.reducer;
