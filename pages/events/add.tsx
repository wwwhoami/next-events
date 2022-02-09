import useModal from '@/components/hooks/useModal'
import ImageUpload from '@/components/ImageUpload'
import Layout from '@/components/Layout'
import Modal from '@/components/Modal'
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
import React, { ChangeEvent, FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import styles from '/styles/Form.module.sass'

type Props = {
  jwt: string | null
}

const AddEventPage: NextPage<Props> = ({ jwt }) => {
  const [values, setValues] = useState<Omit<Event, 'id' | 'slug'>>({
    name: '',
    venue: '',
    address: '',
    performers: '',
    datetime: '',
    description: '',
    image: null,
  })

  const [image, setImage] = useState<EventImage | null>(null)

  const [isShown, toggle] = useModal()

  const router = useRouter()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
      body: JSON.stringify({ data: values }),
    })
    const evt: EventResponse | ErrorResponse = await res.json()

    if ('error' in evt) {
      toast.error(evt.error.message)
      throw new Error(evt.error.message)
    } else {
      toast.success('Event created')
      router.push(`/events/${evt.data.attributes.slug}`)
    }
  }

  const imageUploaded = async (uploadedImage: EventImage) => {
    try {
      setValues({ ...values, image: uploadedImage })
      setImage(uploadedImage)

      toggle()

      toast.success('Image uploaded')
    } catch (err) {
      toast.error('Something went wrong')
    }
  }

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target

    setValues({ ...values, [name]: value })
  }

  return (
    <>
      <Layout>
        <Link href="/events">Go Back</Link>
        <h1>Add Event</h1>
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
                value={values.datetime}
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
          <input type="submit" value="Add Event" className="btn" />
        </form>

        <Modal isShown={isShown} onClose={toggle} title="Upload Image">
          <ImageUpload imageUploaded={imageUploaded} jwt={jwt} />
        </Modal>
      </Layout>
    </>
  )
}

export default AddEventPage

export const getServerSideProps: GetServerSideProps<Props> = async ({
  req,
}) => {
  const jwt = req.cookies['jwt'] ?? null

  return {
    props: {
      jwt,
    },
  }
}
