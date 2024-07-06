import { ChaptersInitialState } from '../../interfaces/Chapter';

import { createSlice } from '@reduxjs/toolkit';

const initialState: ChaptersInitialState = {
  chapters: [],
  status: 'idle',
  error: '',
};

const chaptersSlice = createSlice({
  name: 'chapters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export const {} = chaptersSlice.actions;

export default chaptersSlice.reducer;