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
  extraReducers: (builder) => {},
});

export const {} = recitersSlice.actions;

export default recitersSlice.reducer;
