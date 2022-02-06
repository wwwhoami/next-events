import { User } from '@/types/authResponse'
import { ErrorResponse } from '@/types/errorResponse'
import { useRouter } from 'next/router'
import { ReactNode, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext'

type Props = {
  children: ReactNode
}

const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<ErrorResponse | null>(null)

  const router = useRouter()

  useEffect(() => {
    isAuthenticated()
  }, [])

  const register = async ({
    username,
    email,
    password,
  }: {
    username: string
    email: string
    password: string
  }) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_FRONTEND_URL}/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      }
    )

    const data: User | ErrorResponse = await res.json()

    if (res.ok && 'username' in data) {
      setUser(data)
      setError(null)

      router.push('/account/dashboard')
    } else if (!res.ok && 'error' in data) setError(data)
  }

  const login = async ({
    email,
    password,
  }: {
    email: string
    password: string
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier: email, password }),
    })

    const data: User | ErrorResponse = await res.json()

    if (res.ok && 'username' in data) {
      setUser(data)
      setError(null)

      router.push('/account/dashboard')
    } else if (!res.ok && 'error' in data) setError(data)
  }

  const logout = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/logout`, {
      method: 'POST',
    })

    if (res.ok) {
      setUser(null)
      router.push('/')
    }
  }

  const isAuthenticated = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/user`)

    const data: User | ErrorResponse = await res.json()

    if (res.ok && 'username' in data) {
      setUser(data)
      setError(null)
    } else if (!res.ok && 'error' in data) {
      setUser(null)
      setError(data)
    }
  }

  return (
    <AuthContext.Provider
      value={{ user, error, register, login, isAuthenticated, logout }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
