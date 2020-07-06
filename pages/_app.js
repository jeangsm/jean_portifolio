import '../styles/global.css'
import "bootswatch/dist/lux/bootstrap.min.css"
import '@fortawesome/fontawesome-svg-core/styles.css'
import Router from 'next/router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


Router.events.on('routeChangeStart', (url) => {
  console.log(`Loading: ${url}`)
  NProgress.start()
})
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

export default function App({ Component, pageProps }) {
    return <Component {...pageProps} />
  }