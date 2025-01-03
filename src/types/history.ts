export interface Interaction {
  id: string;
  userId: string;
  message: string;
  response: string;
  code: string | null;
  timestamp: string;
}

export interface InteractionHistory {
  interactions: Interaction[];
  isLoading: boolean;
  error: string | null;
}