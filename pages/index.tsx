import { Event } from '@/types/event'
import type { GetStaticProps, NextPage } from 'next'
import Link from 'next/link'
import qs from 'qs'
import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import styles from '@/styles/Home.module.sass'
import { getEvents } from '@/lib/events'

type Props = {
  events: Event[]
}

const Home: NextPage<Props> = ({ events }) => {
  return (
    <div className={styles.container}>
      <Layout>
        <h1>Upcoming Events</h1>
        {events.length === 0 && <h2>No events :(</h2>}

        {events.map((evt) => (
          <EventItem key={evt.id} event={evt} />
        ))}

        {events.length > 0 && (
          <Link href="/events">
            <a className="btn-secondary">View All Events</a>
          </Link>
        )}
      </Layout>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps = async () => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/events`
  const search = qs.stringify({
    populate: 'image',
    sort: 'datetime:ASC',
    pagination: {
      start: 0,
      limit: 3,
    },
  })

  const eventsData = await getEvents(`${url}?${search}`)

  return {
    props: {
      events: eventsData.events,
    },
    revalidate: 1,
  }
}
