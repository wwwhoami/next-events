import Layout from '@/components/Layout'
import { useAuth } from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.sass'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { NextPage } from 'next/types'
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {}

const LoginPage: NextPage<Props> = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)

  const { login, error } = useAuth()

  useEffect(() => {
    if (error?.error.status !== 401) toast.error(error?.error.message)
  }, [error])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await login({ email, password })
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <Layout title="User Login">
      <div className={styles.auth}>
        <h1>
          <FontAwesomeIcon icon={faUser} /> Sign In
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type={passwordShown ? 'text' : 'password'}
              id="password"
              name="password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={passwordShown ? faEyeSlash : faEye}
              onClick={togglePassword}
            />
          </div>
          <input type="submit" className="btn" value="Sign in" />
        </form>

        <p>
          Don&apos;t have an account?{' '}
          <Link href="/account/register">Sign up</Link>
        </p>
      </div>
    </Layout>
  )
}

export default LoginPage
