import Button from '#/components/Button'
import { WalletSelect } from '@talisman-connect/components'

interface Props {}

export default function ConnectWalletButton({}: Props) {
  return (
    <WalletSelect
      dappName='Substrate StackExchange'
      onWalletSelected={(wallet) => {
        console.log(wallet)
      }}
      triggerComponent={<Button>Connect to wallet</Button>}
    />
  )
}
