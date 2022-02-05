import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import { NextPage } from 'next/types'
import React from 'react'
import Layout from '../components/Layout'
import styles from '../styles/404.module.sass'

type Props = {}

const NotFound: NextPage<Props> = (props) => {
  return (
    <Layout title="Page Not Found">
      <div className={styles.error}>
        <h1>
          <FontAwesomeIcon icon={faExclamationTriangle} />
          404
        </h1>
        <h2>Sorry, there is nothing here</h2>
        <Link href="/">Go Back Home</Link>
      </div>
    </Layout>
  )
}

export default NotFound
