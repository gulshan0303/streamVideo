import {createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//for register api
export const registerUser = createAsyncThunk('auth/registerUser', async (formData) => {
    const response = await axios.post('http://localhost:8383/api/v1/auth/register', formData);
    return response.data;
  });

  //for login api
  export const login = createAsyncThunk('auth/login', async (credentials) => {
    const response = await axios.post('http://localhost:8383/api/v1/auth/login', credentials);
    return response.data;
  });