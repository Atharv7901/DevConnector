import {configureStore} from "@reduxjs/toolkit";
import alertReducer from "../features/alerts/alert";

export const store = configureStore({
  reducer: {
    alerts: alertReducer,
  },
});
