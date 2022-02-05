import React from 'react'
import styles from '/styles/Showcase.module.sass'

type Props = {}

const Showcase = (props: Props) => {
  return (
    <div className={styles.showcase}>
      <h1>Welcome</h1>
      <h2>Find best events</h2>
    </div>
  )
}

export default Showcase
