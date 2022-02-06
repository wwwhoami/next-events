import { User } from '@/types/authResponse'
import { ErrorResponse } from '@/types/errorResponse'
import { createContext, useContext } from 'react'

export interface AuthContextInterface {
  user: User | null
  error: ErrorResponse | null
  register: ({
    username,
    password,
    email,
  }: {
    username: string
    password: string
    email: string
  }) => Promise<void> | null
  login: ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => Promise<void> | null
  isAuthenticated: () => Promise<void> | null
  logout: () => Promise<void> | null
}

export const authContextDefaults: AuthContextInterface = {
  isAuthenticated: () => null,
  user: null,
  error: null,
  register: () => null,
  login: () => null,
  logout: () => null,
}

export const AuthContext =
  createContext<AuthContextInterface>(authContextDefaults)

AuthContext.displayName = 'AuthContext'

export function useAuth() {
  return useContext(AuthContext)
}
