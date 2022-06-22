import type { NextPage } from 'next'
import Button from '../components/Button'
import ConnectWalletButton from '../components/ConnectWalletButton'

const Home: NextPage = () => {
  return (
    <div>
      <h1 className='text-center text-2xl font-bold'>
        Welcome to Substrate StackExchange!
      </h1>
      <h2 className='text-center text-lg'>Powered by Subsocial</h2>
      <ConnectWalletButton />
    </div>
  )
}

export default Home
