// Simple local storage for saving user preferences
export const localPreferences = {
  getTheme(): 'light' | 'dark' {
    return localStorage.getItem('theme') as 'light' | 'dark' || 'light';
  },

  setTheme(theme: 'light' | 'dark'): void {
    localStorage.setItem('theme', theme);
  },

  getRecentCode(): string | null {
    return localStorage.getItem('recentCode');
  },

  setRecentCode(code: string): void {
    localStorage.setItem('recentCode', code);
  }
};