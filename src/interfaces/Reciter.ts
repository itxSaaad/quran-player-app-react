interface Reciter {}

interface RecitersInitialState {
  reciters: Reciter[];
  status: 'idle' | 'loading' | 'success';
  error: string;
}

export type { Reciter, RecitersInitialState };
