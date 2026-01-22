import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isSeniorMode: boolean;
  login: (user: User) => void;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  toggleSeniorMode: () => void;
  setSeniorMode: (enabled: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isSeniorMode: false,

      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          isSeniorMode: user.role === 'senior',
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
          isSeniorMode: false,
        }),

      updateUser: (updates) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updates } : null,
        })),

      toggleSeniorMode: () =>
        set((state) => ({
          isSeniorMode: !state.isSeniorMode,
        })),

      setSeniorMode: (enabled) =>
        set({
          isSeniorMode: enabled,
        }),
    }),
    {
      name: 'timebank-auth',
    }
  )
);
