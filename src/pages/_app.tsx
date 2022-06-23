import Container from '#/components/Container'
import Navbar from '#/containers/Navbar'
import Sidebar from '#/containers/Sidebar'
import '@talisman-connect/components/talisman-connect-components.esm.css'
import '@talisman-connect/ui/talisman-connect-ui.esm.css'
import clsx from 'clsx'
import type { AppProps } from 'next/app'
import '../styles/globals.css'

const NAVBAR_HEIGHT = 75

function App({ Component, pageProps }: AppProps) {
  return (
    <div>
      <Container>
        <Navbar height={NAVBAR_HEIGHT} />
        <div className={clsx('flex items-stretch', 'w-full pt-4')}>
          <Sidebar
            className={clsx('sticky')}
            style={{
              top: NAVBAR_HEIGHT,
              height: `calc(100vh - ${NAVBAR_HEIGHT + 48}px)`
            }}
          />
          <main className='flex-1 pb-12 ml-12'>
            <Component {...pageProps} />
          </main>
        </div>
      </Container>
    </div>
  )
}

export default App
