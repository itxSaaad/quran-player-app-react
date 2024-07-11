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

    // Reciters having surah count of 114 and unique entries as some reciters have 2 to 3 entries.
    data.reciters = data.reciters.filter(
      (reciter, index, self) =>
        reciter.count === '114' &&
        index === self.findIndex((t) => t.name === reciter.name)
    );

    return data;
  } catch (error) {
    return rejectWithValue('Failed to fetch reciters.');
  }
});

export { fetchReciters };
