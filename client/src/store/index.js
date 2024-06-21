import {combineReducers} from "redux";
import alertReducer from "../features/alerts/alert";
import authReducer from "../features/auth/auth";
import {authApi} from "../services/auth/authService";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  [authApi.reducerPath]: authApi.reducer,
});

export default rootReducer;
