export type UserRole = 'admin' | 'seller' | 'maintainer';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
}

export type ProfileUpdate = Pick<User, 'name' | 'email'>;

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  /** Resolves with the signed-in user. */
  login: (credentials: LoginCredentials) => Promise<User>;
  /** Resolves with the newly created, signed-in user. */
  signup: (payload: SignupPayload) => Promise<User>;
  updateProfile: (update: ProfileUpdate) => Promise<void>;
  logout: () => void;
}
