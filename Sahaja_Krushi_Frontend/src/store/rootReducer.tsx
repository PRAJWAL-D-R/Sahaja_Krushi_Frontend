import { combineReducers } from "@reduxjs/toolkit";
import loadingReducer from "./feature/globalConstant/loadingSlice";
import newsReducer from "./feature/News/NewsSlice";
import newsByIdReducer from "./feature/News/NewsById";
import authReducer from "./feature/Auth/AuthSlice";

const rootReducer = combineReducers({
  loading: loadingReducer,
  news: newsReducer,
  newsById: newsByIdReducer,
  auth: authReducer,
});

export default rootReducer;
