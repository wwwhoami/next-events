import { useRouter } from 'next/router'
import React, { FormEvent, useState } from 'react'
import styles from '/styles/Search.module.sass'

type Props = {}

const Search = (props: Props) => {
  const [term, setTerm] = useState('')
  const router = useRouter()

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`/events/search?term=${term}`)
  }

  return (
    <div className={styles.search}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={term}
          placeholder="Search Events"
          onChange={(e) => setTerm(e.target.value)}
        />
      </form>
    </div>
  )
}

export default Search
