import React, { ChangeEvent, FormEvent, useState } from 'react'
import { uploadImage } from '@/lib/events'
import { EventImage } from '@/types/ImageUploadResponse'
import styles from '@/styles/Form.module.sass'
import { toast } from 'react-toastify'

type Props = {
  imageUploaded: (image: EventImage) => void
  jwt: string | null
}

const ImageUpload = ({ imageUploaded, jwt }: Props) => {
  const [image, setImage] = useState<File>()

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!jwt) {
      toast.error('Authorization required')
      throw new Error('Authorization required')
    }

    if (image) {
      const formData = new FormData()
      formData.append('files', image)
      formData.append('field', image)

      const uploaded = await uploadImage(formData, jwt)

      if (uploaded) imageUploaded(uploaded)
    }
  }

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setImage(e.target.files[0])
  }

  return (
    <div className={styles.form}>
      <form onSubmit={handleSubmit}>
        <div className={styles.file}>
          <label htmlFor="input-image">Choose file to upload</label>
          <input
            id="input-image"
            type="file"
            className="btn"
            onChange={handleFileChange}
          />
          {image && <p>Selected file: {image.name}</p>}
        </div>
        <input type="submit" value="Upload" className="btn" />
      </form>
    </div>
  )
}

export default ImageUpload
