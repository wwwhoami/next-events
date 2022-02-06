import { faSignInAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { useAuth } from '@/context/AuthContext'
import styles from '@/styles/Header.module.sass'
import Search from './Search'

type Props = {}

const Header = (props: Props) => {
  const { user, logout } = useAuth()

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <a>Next Events</a>
        </Link>
      </div>

      <Search />

      <nav>
        <ul>
          <li>
            <Link href="/events">
              <a>Events</a>
            </Link>
          </li>

          {user && (
            <>
              <li>
                <Link href="/events/add">
                  <a>Add Event</a>
                </Link>
              </li>
              <li>
                <Link href="/account/dashboard">
                  <a>Dashboard</a>
                </Link>
              </li>
              <li>
                <button className="btn btn-secondary btn-icon" onClick={logout}>
                  <FontAwesomeIcon icon={faSignOutAlt} /> Sign out
                </button>
              </li>
            </>
          )}

          {!user && (
            <>
              <li>
                <Link href="/account/login">
                  <a className="btn btn-secondary btn-icon">
                    <FontAwesomeIcon icon={faSignInAlt} /> Sign in
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/account/register">
                  <a className="btn btn-icon">Sign up</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  )
}

export default Header
