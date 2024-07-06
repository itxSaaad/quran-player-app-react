import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchReciters = createAsyncThunk('reciters/fetch', async () => {
  const response = await axios.get('https://mp3quran.net/api/_english.php');
  return response.data.reciters;
});

export { fetchReciters };
