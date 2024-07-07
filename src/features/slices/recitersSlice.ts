import { RecitersInitialState } from '../../interfaces/Reciter';

import { createSlice } from '@reduxjs/toolkit';

import { fetchReciters } from '../thunks/reciterThunks';

const initialState: RecitersInitialState = {
  reciters: [],
  status: 'idle',
  error: '',
};

const recitersSlice = createSlice({
  name: 'reciters',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReciters.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchReciters.fulfilled, (state, action) => {
        state.status = 'success';
        state.reciters = action.payload.reciters;
      })
      .addCase(fetchReciters.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.payload as string;
      });
  },
});

export default recitersSlice.reducer;
