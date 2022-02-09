import styles from '@/styles/DashboardEvent.module.sass'
import { ErrorResponse } from '@/types/errorResponse'
import { Event } from '@/types/event'
import { EventResponse } from '@/types/eventResponse'
import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Link from 'next/link'
import React from 'react'
import { toast } from 'react-toastify'

type Props = {
  event: Event
  jwt: string
}

const DashboardEvent = ({ event, jwt }: Props) => {
  const deleteEvent = async () => {
    if (confirm('Ary you sure?')) {
      const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${event.id}`

      const res = await fetch(url, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      })

      const data: EventResponse | ErrorResponse = await res.json()

      if (!res.ok && 'error' in data) {
        toast.error(data.error.message)
      } else {
        toast.success('Deleted successfully')
      }
    }
  }

  return (
    <div className={styles.event}>
      <h4>
        <Link href={`/events/${event.slug}`}>
          <a>{event.name}</a>
        </Link>
      </h4>
      <Link href={`/events/edit/${event.id}`} passHref>
        <a className={styles.edit}>
          <FontAwesomeIcon icon={faPencilAlt} /> <span>Edit event</span>
        </a>
      </Link>
      <a href="#" className={styles.delete} onClick={deleteEvent}>
        <FontAwesomeIcon icon={faTrashAlt} /> <span>Delete event</span>
      </a>
    </div>
  )
}

export default DashboardEvent
