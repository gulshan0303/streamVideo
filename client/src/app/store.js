import { configureStore } from '@reduxjs/toolkit';
 import authReducer from '../features/auth/authSlice';
import videosReducer from "../features/streamVideo/videoSlice"
import uploadVideoReducer from '../features/streamVideo/uploadVideoSlice';
const store = configureStore({
  reducer: {
    auth:authReducer,
    videos: videosReducer,
    videoUpload:uploadVideoReducer,
    // Add additional reducers here if needed
  }
});

export default store;
