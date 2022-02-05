import type { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import qs from 'qs'
import EventItem from '../../components/EventItem'
import Layout from '../../components/Layout'
import Pagination from '../../components/Pagination'
import { getEvents } from '../../lib/events'
import { Event } from '../../types/event'
import styles from '/styles/Home.module.sass'

const PAGE_SIZE = 5

type Props = {
  events: Event[]
  total: number
  page: number
}

const EventsPage: NextPage<Props> = ({ events, total, page }: Props) => {
  return (
    <div className={styles.container}>
      <Layout>
        <h1>Events</h1>
        {events.length === 0 && <h2>No events :(</h2>}
        {events.map((evt) => (
          <EventItem key={evt.id} event={evt} />
        ))}

        <Pagination
          pageSize={PAGE_SIZE}
          page={page}
          total={total}
          prevPageHref={`/events?page=${page - 1}`}
          nextPageHref={`/events?page=${page + 1}`}
        />
      </Layout>
    </div>
  )
}

export default EventsPage

export const getServerSideProps: GetServerSideProps<Props> = async ({
  query: { page = 1 },
}) => {
  const url = process.env.NEXT_PUBLIC_API_URL + '/events'
  const search = qs.stringify({
    populate: 'image',
    sort: ['datetime:ASC'],
    pagination: {
      page,
      pageSize: PAGE_SIZE,
    },
  })

  const eventsData = await getEvents(`${url}?${search}`)

  const events = eventsData.events ?? []
  const total = eventsData.meta.pagination.total

  return {
    props: {
      events,
      total,
      page: parseInt(page as string),
    },
  }
}
