import Layout from '@/components/Layout'
import { getAllEventsSlugs, getEventBySlug } from '@/lib/events'
import styles from '@/styles/Event.module.sass'
import { ErrorResponse } from '@/types/errorResponse'
import { Event } from '@/types/event'
import { EventResponse } from '@/types/eventResponse'
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import qs from 'qs'
import { ParsedUrlQuery } from 'querystring'
import React, { FormEvent } from 'react'
import { toast } from 'react-toastify'

type Props = {
  event: Event
}

const EventPage: NextPage<Props> = ({ event }) => {
  const { id, name, image, performers, description, venue, address } = event
  const datetime = new Date(event.datetime)

  const router = useRouter()

  const deleteEvent = async (e: FormEvent<HTMLAnchorElement>) => {
    if (confirm('Ary you sure?')) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`

      const res = await fetch(url, {
        method: 'DELETE',
      })

      const data: EventResponse | ErrorResponse = await res.json()

      if (!res.ok && 'error' in data) {
        toast.error(data.error.message)
      } else {
        toast.success('Deleted successfully')
        router.push('/events')
      }
    }
  }

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${id}`}>
            <a>
              <FontAwesomeIcon icon={faPencilAlt} /> Edit
            </a>
          </Link>
          <a className={styles.delete} onClick={deleteEvent}>
            <FontAwesomeIcon icon={faTimes} /> Delete
          </a>
        </div>
        <span>
          {datetime.toLocaleDateString()} at{' '}
          {datetime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <h1>{name}</h1>
        <div className={styles.image}>
          <Image
            src={image?.formats.large.url || '/images/event-default.png'}
            width={960}
            height={600}
            alt="Event image"
          />
        </div>
        <h3>Perormers</h3>
        <p>{performers}</p>
        <h3>Description</h3>
        <p>{description}</p>
        <h3>Venue: {venue}</h3>
        <p>{address}</p>

        <Link href="/events">
          <a>Go Back</a>
        </Link>
      </div>
    </Layout>
  )
}

export default EventPage

interface Params extends ParsedUrlQuery {
  slug: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {
  const paths = await getAllEventsSlugs()

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps: GetStaticProps<Props, Params> = async ({
  params,
}) => {
  const slug = params?.slug
  const url = process.env.NEXT_PUBLIC_API_URL + `/events`
  const search = qs.stringify(
    {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: 'image',
    },
    { encodeValuesOnly: true }
  )

  const event = await getEventBySlug(`${url}?${search}`)

  if (event === null) return { notFound: true }

  return {
    props: {
      event,
    },
  }
}
