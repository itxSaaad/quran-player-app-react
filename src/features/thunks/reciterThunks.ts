import { RecitersResponse } from '../../interfaces/Reciter';
import { RootState } from '../store';

import { createAsyncThunk } from '@reduxjs/toolkit';

import axios from 'axios';

const fetchReciters = createAsyncThunk<
  RecitersResponse,
  void,
  {
    rejectValue: string;
    state: RootState;
  }
>('reciters/fetchReciters', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<RecitersResponse>(
      'https://mp3quran.net/api/_english.php'
    );

    // Filter reciters based on suras count
    data.reciters = data.reciters.filter(
      (reciter) => reciter.suras.split(',').length === 114
    );

    return data;
  } catch (error) {
    return rejectWithValue('Failed to fetch reciters.');
  }
});

export { fetchReciters };
