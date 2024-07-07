interface TranslatedName {
  language_name: string;
  name: string;
}

interface Chapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_complex: string;
  name_arabic: string;
  verses_count: number;
  pages: number[];
  translated_name: TranslatedName;
}

interface ChaptersResponse {
  chapters: Chapter[];
}

interface ChaptersInitialState {
  chapters: Chapter[];
  status: 'idle' | 'loading' | 'success';
  error: string;
}

export type { Chapter, ChaptersResponse, ChaptersInitialState };
