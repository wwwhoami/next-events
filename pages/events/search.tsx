import { GetServerSideProps, NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import qs from 'qs'
import React from 'react'
import EventItem from '@/components/EventItem'
import Layout from '@/components/Layout'
import { getEvents } from '@/lib/events'
import { Event } from '@/types/event'

type Props = {
  events?: Event[]
}

const SearchPage: NextPage<Props> = ({ events }) => {
  const router = useRouter()

  return (
    <Layout>
      <Link href="/events">Go Back</Link>

      <h1>Search Results for {router.query.term}</h1>

      {events?.length === 0 && <h2>No events to show :(</h2>}

      {events?.map((evt) => (
        <EventItem key={evt.id} event={evt} />
      ))}
    </Layout>
  )
}

export default SearchPage

export const getServerSideProps: GetServerSideProps = async ({
  query: { term },
}) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/events`
  const search = qs.stringify(
    {
      filters: {
        $or: [
          {
            name: {
              $containsi: term,
            },
          },
          {
            performers: {
              $containsi: term,
            },
          },
          {
            description: {
              $containsi: term,
            },
          },
          {
            venue: {
              $containsi: term,
            },
          },
        ],
      },
      populate: 'image',
      pagination: {
        start: 0,
        limit: 10,
      },
    },
    {
      encodeValuesOnly: true,
    }
  )

  const events = await getEvents(`${url}?${search}`)

  return {
    props: { events },
  }
}
