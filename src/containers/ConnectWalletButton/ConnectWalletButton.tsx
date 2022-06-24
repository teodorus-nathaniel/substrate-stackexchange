import Button from '#/components/Button'
import { useWalletContext } from '#/contexts/WalletContext'
import { APP_NAME } from '#/lib/constants/app'
import { activateWalletFromSavedAccount } from '#/lib/helpers/wallet'
import { WalletSelect } from '@talisman-connect/components'
import { HTMLProps, useEffect } from 'react'
import WalletProfile from './WalletProfile'

export interface ConnectWalletButtonProps extends HTMLProps<HTMLDivElement> {}

export default function ConnectWalletButton(props: ConnectWalletButtonProps) {
  const [wallet, setWallet] = useWalletContext()

  useEffect(() => {
    if (!wallet) return
    activateWalletFromSavedAccount(wallet)
  }, [wallet])

  if (wallet === undefined) {
    return null
  }

  console.log(wallet, wallet?.signer)

  return (
    <div {...props}>
      {wallet ? (
        <WalletProfile wallet={wallet} />
      ) : (
        <WalletSelect
          dappName={APP_NAME}
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
