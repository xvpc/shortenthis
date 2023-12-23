import 'bootstrap/dist/css/bootstrap.min.css';

import '@/styles/style.css'
import '../styles/scss/style.scss'

export default function App({ Component, pageProps }) {
  return(
    <>
      <Component {...pageProps} />
    </>
  )
}
