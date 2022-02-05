import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import '../styles/globals.sass'
import 'react-toastify/dist/ReactToastify.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        draggable={true}
        closeOnClick
      />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
