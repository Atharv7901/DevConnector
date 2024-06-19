import {configureStore} from "@reduxjs/toolkit";
import alertReducer from "../features/alerts/alert";
import authReducer from "../features/auth/auth";
import {authApi} from "../services/auth/authService";

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleWare) => {
    return getDefaultMiddleWare().concat(authApi.middleware);
  },
});
