import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import AuthProvider from '@/context/AuthContextProvider'
import '@/styles/globals.sass'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={true}
          pauseOnHover={false}
          draggable={true}
          closeOnClick
        />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp
