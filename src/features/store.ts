import { configureStore } from '@reduxjs/toolkit';

import chapterReducer from './slices/chaptersSlice';
import reciterReducer from './slices/recitersSlice';
import playerReducer from './slices/playerSlice';

const store = configureStore({
  reducer: {
    chapters: chapterReducer,
    reciters: reciterReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
