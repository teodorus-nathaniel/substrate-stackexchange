import Button, { ButtonProps } from '#/components/Button'
import { useWalletContext } from '#/contexts/WalletContext'
import { encodeAddress } from '#/lib/helpers/wallet'
import clsx from 'clsx'
import { useState } from 'react'
import { BsCash } from 'react-icons/bs'
import TippingModal from './TippingModal'

export interface TippingButtonProps extends ButtonProps {
  beneficiary: string
}

export default function TippingButton({
  className,
  beneficiary,
  ...props
}: TippingButtonProps) {
  const [openModal, setOpenModal] = useState(false)
  const [wallet] = useWalletContext()
  if (encodeAddress(beneficiary) === encodeAddress(wallet?.address)) {
    return null
  }

  return (
    <>
      <Button
        variant='unstyled'
        size='icon-small'
        rounded
        className={clsx('text-brand', className)}
        onClick={() => setOpenModal((prev) => !prev)}
        {...props}
      >
        <BsCash />
      </Button>
      <TippingModal
        beneficiary={beneficiary}
        isOpen={openModal}
        handleClose={() => setOpenModal(false)}
      />
    </>
  )
}
