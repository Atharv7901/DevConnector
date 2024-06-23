import {combineReducers} from "redux";
import alertReducer from "../features/alerts/alert";
import authReducer from "../features/auth/auth";
import {authApi} from "../services/auth/authService";
import profileReducer from "../features/profile/profile";
import {profileApi} from "../services/profile/profileService";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
});

export default rootReducer;
