import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchVideos = createAsyncThunk('videos/fetchVideos', async () => {
  const response = await fetch('http://localhost:8383/api/v1/stream/videos');
  const data = await response.json();
  console.log('data----', data)
  console.log("here")
  return data;
});

const videosSlice = createSlice({
  name: 'videos',
  initialState: { videos: [], status: 'idle', error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVideos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchVideos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.videos = action.payload;
      })
      .addCase(fetchVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default videosSlice.reducer;
