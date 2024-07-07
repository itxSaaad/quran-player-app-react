interface Reciter {
  id: string;
  name: string;
  Server: string;
  rewaya: string;
  count: string;
  letter: string;
  suras: string;
}

interface RecitersResponse {
  reciters: Reciter[];
}

interface RecitersInitialState {
  reciters: Reciter[];
  status: 'idle' | 'loading' | 'success';
  error: string;
}

export type { Reciter, RecitersResponse, RecitersInitialState };
