import Link from 'next/link'
import React from 'react'

type Props = {
  pageSize: number
  page: number
  total: number
  prevPageHref: string
  nextPageHref: string
}

const Pagination = ({
  pageSize,
  page,
  total,
  prevPageHref,
  nextPageHref,
}: Props) => {
  const lastPage = Math.ceil(total / pageSize)

  return (
    <>
      {page > 1 && (
        <Link href={prevPageHref}>
          <a className="btn-secondary">Prev</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={nextPageHref}>
          <a className="btn-secondary">Next</a>
        </Link>
      )}
    </>
  )
}

export default Pagination
