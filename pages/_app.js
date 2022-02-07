import 'styles/globals.scss'
import 'styles/icon-font/style.css'
import { SessionProvider } from 'next-auth/react'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      {getLayout(<Component {...pageProps} />)}
    </SessionProvider>
  )
}

export default MyApp
