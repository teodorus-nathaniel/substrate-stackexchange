import Modal, { ModalProps } from '#/components/Modal'
import { useWalletContext } from '#/contexts/WalletContext'

export interface TippingModalProps extends ModalProps {
  beneficiary: string
}

export default function TippingModal({
  beneficiary,
  ...props
}: TippingModalProps) {
  const [wallet] = useWalletContext()
  return (
    <Modal withCloseButton={false} size='xs' {...props}>
      Tip
    </Modal>
  )
}
