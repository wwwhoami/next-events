import useModal from '@/components/hooks/useModal'
import ImageUpload from '@/components/ImageUpload'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
import { getEventById } from '@/lib/events'
import styles from '@/styles/Form.module.sass'
import { ErrorResponse } from '@/types/errorResponse'
import { Event } from '@/types/event'
import { EventResponse } from '@/types/eventResponse'
import { EventImage } from '@/types/ImageUploadResponse'
import { faImage } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { GetServerSideProps, NextPage } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import qs from 'qs'
import { ParsedUrlQuery } from 'querystring'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

type Props = {
  event: Event
}

const EditEventPage: NextPage<Props> = ({ event }) => {
  const [values, setValues] = useState<Event>({
    ...event,
  })
  const [image, setImage] = useState<EventImage | undefined>(event?.image)

  const [isShown, toggle] = useModal()

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    console.log({ data: { ...values, image: image?.id } })

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/events/${values.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: { ...values, image: image?.id } }),
      }
    )
    const evt: EventResponse | ErrorResponse = await res.json()

    if ('error' in evt) {
      toast.error(evt.error.message)
      throw new Error(evt.error.message)
    } else {
      toast.success('Event created')
      router.push(`/events/${evt.data.attributes.slug}`)
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  const imageUploaded = async (uploadedImage: EventImage) => {
    try {
      setValues({ ...values, image: uploadedImage })
      setImage(uploadedImage)

      toggle()

      toast.success('Image uploaded')
    } catch (err) {
      console.log(err)
      toast.error('Something went wrong')
    }
  }

  return (
    <>
      <Layout>
        <Link href="/events">Go Back</Link>
        <h1>Edit Event</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.grid}>
            <div>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                value={values.name}
                required
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="venue">Venue</label>
              <input
                type="text"
                name="venue"
                id="venue"
                required
                value={values.venue}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="address">Address</label>
              <input
                type="text"
                name="address"
                id="address"
                required
                value={values.address}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="performers">Performers</label>
              <input
                type="text"
                name="performers"
                id="performers"
                required
                value={values.performers}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="datetime">Date and Time</label>
              <input
                type="datetime-local"
                name="datetime"
                id="datetime"
                required
                value={values.datetime.slice(0, 16)}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.imageContainer}>
              <div>
                <label htmlFor="image">Event Image</label>
                <Image
                  id="image"
                  src={image?.formats.small.url || '/images/event-default.png'}
                  height={150}
                  width={250}
                  alt="Event image"
                />
              </div>
              <button
                type="button"
                className="btn-secondary btn-icon"
                onClick={toggle}
              >
                <FontAwesomeIcon icon={faImage} />
                Upload image
              </button>
            </div>
          </div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            id="description"
            value={values.description}
            onChange={handleInputChange}
            cols={30}
            rows={10}
          ></textarea>
          <input type="submit" value="Update Event" className="btn" />
        </form>

        <Modal isShown={isShown} onClose={toggle} title="Upload Image">
          <ImageUpload imageUploaded={imageUploaded} />
        </Modal>
      </Layout>
    </>
  )
}

export default EditEventPage

interface Params extends ParsedUrlQuery {
  id: string
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params, req
}) => {
  const id = params?.id
  const url = `${process.env.NEXT_PUBLIC_API_URL}/events/${id}`
  const search = qs.stringify({
    populate: 'image',
  })

  const event = await getEventById(`${url}?${search}`)

  if (event === null) return { notFound: true }

  return {
    props: {
      event,
    },
  }
}
