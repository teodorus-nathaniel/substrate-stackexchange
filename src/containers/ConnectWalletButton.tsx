import Button from '#/components/Button'
import ImageContainer from '#/components/ImageContainer'
import { useWalletContext } from '#/contexts/WalletContext'
import { WalletSelect } from '@talisman-connect/components'
import clsx from 'clsx'
import { HTMLProps } from 'react'

interface Props extends HTMLProps<HTMLDivElement> {}

export default function ConnectWalletButton(props: Props) {
  const [wallet, setWallet] = useWalletContext()

  return (
    <div {...props}>
      {wallet ? (
        <Button
          variant='unstyled'
          size='content'
          className={clsx(
            'flex items-center space-x-2',
            'rounded-full border border-bg-200'
          )}
        >
          <p className={clsx('pl-4')}>{wallet.name}</p>
          <div className={clsx('w-9')}>
            <ImageContainer
              src={(wallet as any).avatar}
              aspectRatio='1:1'
              alt='Avatar'
            />
          </div>
        </Button>
      ) : (
        <WalletSelect
          dappName='Substrate StackExchange'
          onUpdatedAccounts={(accounts) => {
            console.log(accounts)
          }}
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
