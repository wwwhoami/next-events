import DashboardEvent from '@/components/DashboardEvent'
import Layout from '@/components/Layout'
import Pagination from '@/components/Pagination'
import { getUserEvents } from '@/lib/events'
import styles from '@/styles/Dashboard.module.sass'
import { Event } from '@/types/event'
import { GetServerSideProps, NextPage } from 'next/types'
import qs from 'qs'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'

const PAGE_SIZE = 5

type Props = {
  events: Event[] | []
  total: number
  page: number
  jwt: string
}

const DashBoardPage: NextPage<Props> = ({ events, page, total, jwt }) => {
  return (
    <Layout title="User Dashboard">
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h2>My Events</h2>
        {events.length === 0 && <h2>No events :(</h2>}

        {events.map((evt) => (
          <DashboardEvent key={evt.id} event={evt} jwt={jwt} />
        ))}
      </div>

      <Pagination
        pageSize={PAGE_SIZE}
        page={page}
        total={total}
        prevPageHref={`/account/dashboard?page=${page - 1}`}
        nextPageHref={`/account/dashboard?page=${page + 1}`}
      />
    </Layout>
  )
}

export default DashBoardPage

type Params = {} & ParsedUrlQuery

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  req,
  query: { page = 1 },
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/events/me`
  const query = qs.stringify({
    populate: 'image',
    sort: ['datetime:ASC'],
    pagination: {
      page,
      pageSize: PAGE_SIZE,
    },
  })

  const jwt = req.cookies['jwt']

  const eventsData = await getUserEvents(`${url}?${query}`, jwt)

  const total = eventsData.meta.pagination.total
  const events = eventsData.events ?? []

  return {
    props: {
      events,
      total,
      page: parseInt(page as string),
      jwt,
    },
  }
}
