import '../styles/globals.css'
import type { AppProps } from 'next/app'
import '@talisman-connect/components/talisman-connect-components.esm.css'
import '@talisman-connect/ui/talisman-connect-ui.esm.css'

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
