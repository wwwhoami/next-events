import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Event } from '@/types/event'
import styles from '@/styles/EventItem.module.sass'

type Props = {
  event: Event
}

const EventItem = ({ event }: Props) => {
  const { image, name, slug } = event
  const datetime = new Date(event.datetime)

  return (
    <div className={styles.event}>
      <div className={styles.image}>
        <Image
          src={image?.formats.thumbnail.url || '/images/event-default.png'}
          alt="Event image"
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {datetime.toLocaleDateString()} at{' '}
          {datetime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </span>
        <h2>{name}</h2>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  )
}

export default EventItem
