import { ChaptersResponse } from '../../interfaces/Chapter';
import { RootState } from '../store';

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchChapters = createAsyncThunk<
  ChaptersResponse,
  void,
  {
    rejectValue: string;
    state: RootState;
  }
>('chapters/fetch', async (_, { rejectWithValue }) => {
  try {
    const { data } = await axios.get<ChaptersResponse>(
      'https://api.quran.com/api/v4/chapters'
    );

    return data;
  } catch (error) {
    return rejectWithValue('Failed to fetch chapters.');
  }
});

export { fetchChapters };
