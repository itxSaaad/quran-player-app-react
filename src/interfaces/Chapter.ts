interface Chapter {}

interface ChaptersInitialState {
  chapters: Chapter[];
  status: 'idle' | 'loading' | 'success';
  error: string;
}

export type { Chapter, ChaptersInitialState };
