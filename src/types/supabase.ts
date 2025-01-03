export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      interactions: {
        Row: {
          id: string
          user_id: string
          message: string
          response: string
          code: string | null
          timestamp: string
        }
        Insert: {
          id?: string
          user_id: string
          message: string
          response: string
          code?: string | null
          timestamp?: string
        }
        Update: {
          id?: string
          user_id?: string
          message?: string
          response?: string
          code?: string | null
          timestamp?: string
        }
      }
    }
  }
}