import {combineReducers} from "redux";
import alertReducer from "../features/alerts/alert";
import authReducer from "../features/auth/auth";
import postReducer from "../features/post/post";
import {authApi} from "../services/auth/authService";
import profileReducer from "../features/profile/profile";
import {profileApi} from "../services/profile/profileService";
import {postApi} from "../services/post/postService";

const rootReducer = combineReducers({
  alerts: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  post: postReducer,
  [authApi.reducerPath]: authApi.reducer,
  [profileApi.reducerPath]: profileApi.reducer,
  [postApi.reducerPath]: postApi.reducer,
});

export default rootReducer;
