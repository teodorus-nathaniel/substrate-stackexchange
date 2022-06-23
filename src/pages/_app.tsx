import Container from '#/components/Container'
import Navbar from '#/containers/Navbar'
import Sidebar from '#/containers/Sidebar'
import { SubsocialApiContextProvider } from '#/contexts/SubsocialApiContext'
import { WalletContextProvider } from '#/contexts/WalletContext'
import queryClient from '#/services/client'
import '@talisman-connect/components/talisman-connect-components.esm.css'
import '@talisman-connect/ui/talisman-connect-ui.esm.css'
import clsx from 'clsx'
import type { AppProps } from 'next/app'
import NextNProgress from 'nextjs-progressbar'
import { QueryClientProvider } from 'react-query'
import '../styles/globals.css'

const NAVBAR_HEIGHT = 75

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CommonProvidersWrapper>
      <NextNProgress />
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
    </CommonProvidersWrapper>
  )
}

function CommonProvidersWrapper({ children }: { children: any }) {
  return (
    <QueryClientProvider client={queryClient}>
      <WalletContextProvider>
        <SubsocialApiContextProvider>{children}</SubsocialApiContextProvider>
      </WalletContextProvider>
    </QueryClientProvider>
  )
}
