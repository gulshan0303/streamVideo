import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
  upload: null,
};

// export const uploadVideo = createAsyncThunk(
//     'video/upload',
//     async (videoData, { getState }) => {
//         const user = useSelector((state) => state.auth)
//       const token = getState().auth.token;
//       console.log('token', token)
//       const headers = { Authorization: `Bearer ${token}` };
//       const response = await axios.post('http://localhost:8383/api/v1/stream/videos', videoData, { headers });
//       return response.data;
//     }
//   );

export const uploadVideo = createAsyncThunk(
  "video/upload",
  async (videoData) => {
    const user = useSelector((state) => state.auth);
    console.log("user", user);
    console.log("herrrrr");
    const response = await axios.post(
      "http://localhost:8383/api/v1/stream/videos",
      videoData
    );
    console.log("herttt")
    return response.data;
  }
);

const videoUploadSlice = createSlice({
  name: "videoUpload",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadVideo.pending, (state) => {
        state.status = "loading";
      })
      .addCase(uploadVideo.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upload = action.payload;
      })
      .addCase(uploadVideo.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default videoUploadSlice.reducer;
