import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import { STORAGE_KEYS } from '@/config/constants';
import { authService } from '@/services/authService';
import type {
  AuthContextValue,
  LoginCredentials,
  ProfileUpdate,
  SignupPayload,
  User,
} from '@/types';
import { AuthContext } from './AuthContext';

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(() => authService.getStoredUser());

  const startSession = useCallback((nextUser: User): User => {
    authService.persistUser(nextUser);
    setUser(nextUser);
    return nextUser;
  }, []);

  const login = useCallback(
    async (credentials: LoginCredentials) => startSession(await authService.login(credentials)),
    [startSession],
  );

  const signup = useCallback(
    async (payload: SignupPayload) => startSession(await authService.signup(payload)),
    [startSession],
  );

  const updateProfile = useCallback(
    async (update: ProfileUpdate) => {
      if (!user) throw new Error('You must be signed in to update your profile.');
      startSession(await authService.updateProfile(user, update));
    },
    [user, startSession],
  );

  const logout = useCallback(() => {
    authService.clearSession();
    setUser(null);
  }, []);

  // Keep the session in sync when the user logs in/out from another tab.
  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEYS.AUTH_USER) setUser(authService.getStoredUser());
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({ user, isAuthenticated: user !== null, login, signup, updateProfile, logout }),
    [user, login, signup, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
