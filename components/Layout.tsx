import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { ReactNode } from 'react'
import styles from '@/styles/Layout.module.sass'
import Footer from './Footer'
import Header from './Header'
import Showcase from './Showcase'

type Props = {
  title: string
  keywords: string
  description: string
  children: ReactNode
}

const Layout = (props: Props) => {
  const { title, keywords, description, children } = props
  const router = useRouter()

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
      </Head>

      <Header />

      {router.pathname === '/' && <Showcase />}

      <div className={styles.container}>{children}</div>

      <Footer />
    </>
  )
}

Layout.defaultProps = {
  title: 'Next Events',
  description: 'Find the next events',
  keywords: 'events, next',
}

export default Layout
