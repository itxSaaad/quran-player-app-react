import { PlayerInitialState } from '../../interfaces/Player';

import { createSlice } from '@reduxjs/toolkit';

const initialState: PlayerInitialState = {
  currentReciterServerURL: '',
  currentReciterName: '',
  currentReciterID: '',
  currentPlayingSurahID: '',
  currentPlayingSurahName: '',
  currentPlayingSurahNameArabic: '',
  currentPlayingSurahNameEnglish: '',
  currentAudioURL: '',
  nextSurahID: '',
  prevSurahID: '',
  isPlaying: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentReciter: (state, action) => {
      state.currentReciterServerURL = action.payload.serverURL;
      state.currentReciterName = action.payload.name;
      state.currentReciterID = action.payload.id;
    },
    setCurrentPlayingSurah: (state, action) => {
      state.currentPlayingSurahID = action.payload.id;
      state.currentPlayingSurahName = action.payload.name;
      state.currentPlayingSurahNameArabic = action.payload.nameArabic;
      state.currentPlayingSurahNameEnglish = action.payload.nameEnglish;
      state.currentAudioURL = `${state.currentReciterServerURL}/${(
        '00' + action.payload.id
      ).slice(-3)}.mp3`;
      state.isPlaying = true;
      // ids are strings, so we need to convert them to numbers before doing math
      state.nextSurahID = (parseInt(action.payload.id, 10) + 1).toString();
      state.prevSurahID = (parseInt(action.payload.id, 10) - 1).toString();
    },
    setNextSurah: (state, action) => {
      state.nextSurahID = action.payload;
    },
    setPrevSurah: (state, action) => {
      state.prevSurahID = action.payload;
    },
    setIsPlaying: (state, action) => {
      state.isPlaying = action.payload;
    },
  },
});

export const {
  setCurrentReciter,
  setCurrentPlayingSurah,
  setNextSurah,
  setPrevSurah,
  setIsPlaying,
} = playerSlice.actions;

export default playerSlice.reducer;
