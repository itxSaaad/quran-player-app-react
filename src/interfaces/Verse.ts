interface Verse {
  id: number;
  text: string;
}

interface Surah {
  id: number;
  name: string;
  transliteration: string;
  type: string;
  total_verses: number;
  verses: Verse[];
}

interface SurahsResponse {
  surahs: Surah[];
}

interface SurahsInitialState {
  surahs: Surah[];
  status: 'idle' | 'loading' | 'success';
  error: string;
}

export type { Surah, SurahsResponse, SurahsInitialState };
