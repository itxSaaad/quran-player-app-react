interface PlayerInitialState {
  currentReciterServerURL: string;
  currentReciterName: string;
  currentReciterID: string;
  currentPlayingSurahID: string;
  currentPlayingSurahName: string;
  currentPlayingSurahNameArabic: string;
  currentPlayingSurahNameEnglish: string;
  currentAudioURL: string;
  nextSurahID: number;
  prevSurahID: number;
  isPlaying: boolean;
}
export type { PlayerInitialState };
