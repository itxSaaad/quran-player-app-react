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
  nextSurahID: 0,
  prevSurahID: 0,
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
      state.nextSurahID = action.payload.id + 1;
      state.prevSurahID = action.payload.id - 1;
    },
    setNextSurah: (state, action) => {
      state.currentPlayingSurahID = action.payload.id;
      state.currentPlayingSurahName = action.payload.name;
      state.currentPlayingSurahNameArabic = action.payload.nameArabic;
      state.currentPlayingSurahNameEnglish = action.payload.nameEnglish;
      state.currentAudioURL = `${state.currentReciterServerURL}/${(
        '00' + action.payload.id
      ).slice(-3)}.mp3`;
      state.isPlaying = true;
      state.nextSurahID = action.payload.id + 1;
      state.prevSurahID = action.payload.id - 1;
    },
    setPrevSurah: (state, action) => {
      state.currentPlayingSurahID = action.payload.id;
      state.currentPlayingSurahName = action.payload.name;
      state.currentPlayingSurahNameArabic = action.payload.nameArabic;
      state.currentPlayingSurahNameEnglish = action.payload.nameEnglish;
      state.currentAudioURL = `${state.currentReciterServerURL}/${(
        '00' + action.payload.id
      ).slice(-3)}.mp3`;
      state.isPlaying = true;
      state.nextSurahID = action.payload.id + 1;
      state.prevSurahID = action.payload.id - 1;
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
