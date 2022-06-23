import Button from '#/components/Button'
import { useWalletContext } from '#/contexts/WalletContext'
import { WalletSelect } from '@talisman-connect/components'
import { HTMLProps } from 'react'
import WalletProfile from './WalletProfile'

export interface ConnectWalletButtonProps extends HTMLProps<HTMLDivElement> {}

export default function ConnectWalletButton(props: ConnectWalletButtonProps) {
  const [wallet, setWallet] = useWalletContext()

  if (wallet === undefined) {
    return null
  }

  return (
    <div {...props}>
      {wallet ? (
        <WalletProfile wallet={wallet} />
      ) : (
        <WalletSelect
          dappName='Substrate StackExchange'
          onWalletSelected={(selectedWallet) => {
            selectedWallet.subscribeAccounts((accounts) => {
              if (!accounts) return
              setWallet(accounts[0])
            })
          }}
          triggerComponent={<Button>Connect to wallet</Button>}
        />
      )}
    </div>
  )
}
