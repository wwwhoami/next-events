import styles from '../styles/Footer.module.sass'
import React from 'react'
import Link from 'next/link'

type Props = {}

const Footer = (props: Props) => {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; Next Events</p>
      <p>
        <Link href="/about">About</Link>
      </p>
    </footer>
  )
}

export default Footer
