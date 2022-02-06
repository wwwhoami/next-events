import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, {
  MouseEvent,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import FocusLock from 'react-focus-lock'
import styles from '@/styles/Modal.module.sass'

type Props = {
  isShown: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

const Modal = ({ isShown: isShown, onClose, title, children }: Props) => {
  const [isBrowser, setIsBrowser] = useState(false)

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isShown) {
        onClose()
      }
    },
    [isShown, onClose]
  )

  useEffect(() => {
    setIsBrowser(true)
  }, [])

  useEffect(() => {
    isShown
      ? (document.body.style.overflow = 'hidden')
      : (document.body.style.overflow = 'unset')

    document.addEventListener('keydown', onKeyDown, false)

    return () => {
      document.removeEventListener('keydown', onKeyDown, false)
    }
  }, [isShown, onKeyDown])

  const handleClose = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    onClose()
  }

  const modalContent = isShown ? (
    <FocusLock>
      <div className={styles.overlay} onClick={onClose}>
        <div
          className={styles.modal}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div className={styles.header}>
            <a href="#" onClick={handleClose}>
              <FontAwesomeIcon icon={faTimes} color="black" />
            </a>
          </div>
          {title && <h1>{title}</h1>}
          <div className={styles.body}>{children}</div>
        </div>
      </div>
    </FocusLock>
  ) : null

  return isBrowser
    ? createPortal(modalContent, document.getElementById('modal-root')!)
    : null
}

export default Modal
