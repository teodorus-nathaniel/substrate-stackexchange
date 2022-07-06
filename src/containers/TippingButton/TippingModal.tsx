import Modal, { ModalProps } from '#/components/Modal'
import { useWalletContext } from '#/contexts/WalletContext'
import { useGetTokenBalance } from '#/services/all-chains/queries'
import { useTransfer } from '#/services/subsocial/mutations'

export interface TippingModalProps extends ModalProps {
  beneficiary: string
}

export default function TippingModal({
  beneficiary,
  ...props
}: TippingModalProps) {
  const [wallet] = useWalletContext()
  const { mutate } = useTransfer()
  const { data } = useGetTokenBalance({
    address: wallet?.address ?? '',
    network: 'KSM',
  })
  console.log(data)

  return (
    <Modal withCloseButton={false} size='xs' {...props}>
      <button onClick={() => mutate({ dest: beneficiary, value: 1 })}>
        transfer
      </button>
    </Modal>
  )
}
