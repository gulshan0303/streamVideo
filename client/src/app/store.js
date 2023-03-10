import { configureStore } from '@reduxjs/toolkit';
 import authReducer from '../features/auth/authSlice';

const store = configureStore({
  reducer: {
    auth:authReducer,
    // Add additional reducers here if needed
  }
});

export default store;
