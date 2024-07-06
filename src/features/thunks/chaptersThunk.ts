import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchChapters = createAsyncThunk('chapters/fetch', async () => {
  const response = await axios.get('https://api.quran.com/api/v4/chapters');
  return response.data.chapters;
});

export { fetchChapters };
