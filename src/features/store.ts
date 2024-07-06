import { configureStore } from '@reduxjs/toolkit';

import chapterReducer from './slices/chaptersSlice';
import reciterReducer from './slices/recitersSlice';

const store = configureStore({
  reducer: {
    chapters: chapterReducer,
    reciters: reciterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
