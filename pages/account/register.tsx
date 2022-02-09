import Layout from '@/components/Layout'
import { useAuth } from '@/context/AuthContext'
import styles from '@/styles/AuthForm.module.sass'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NextPage } from 'next'
import Link from 'next/link'
import React, { FormEvent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'

type Props = {}

const RegisterPage: NextPage<Props> = (props) => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordShown, setPasswordShown] = useState(false)

  const { register, error } = useAuth()

  useEffect(() => {
    if (error?.error.status !== 401) toast.error(error?.error.message)
  }, [error])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    await register({ username, password, email })
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown)
  }

  return (
    <Layout title="User Registration">
      <div className={styles.auth}>
        <h1>
          <FontAwesomeIcon icon={faUser} /> Sign up
        </h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
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
          Already have an account? <Link href="/account/login">Sign in</Link>
        </p>
      </div>
    </Layout>
  )
}

export default RegisterPage
