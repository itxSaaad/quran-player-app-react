import { ChaptersInitialState } from '../../interfaces/Chapter';

import { createSlice } from '@reduxjs/toolkit';

import { fetchChapters } from '../thunks/chaptersThunk';

const initialState: ChaptersInitialState = {
  chapters: [],
  status: 'idle',
  error: '',
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchChapters.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchChapters.fulfilled, (state, action) => {
      state.status = 'success';
      state.chapters = action.payload.chapters;
    });
    builder.addCase(fetchChapters.rejected, (state, action) => {
      state.status = 'idle';
      state.error = action.payload as string;
    });
  },
});

export default chaptersSlice.reducer;
