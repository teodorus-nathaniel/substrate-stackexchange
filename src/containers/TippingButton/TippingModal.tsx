import ImageContainer from '#/components/ImageContainer'
import Select from '#/components/inputs/Select'
import { OptionType } from '#/components/inputs/Select/Select'
import TextField from '#/components/inputs/TextField'
import Modal, { ModalProps } from '#/components/Modal'
import { useWalletContext } from '#/contexts/WalletContext'
import { chains } from '#/lib/constants/chains'
import { useGetTokenBalance } from '#/services/all-chains/queries'
import { useTransfer } from '#/services/subsocial/mutations'
import { ProfileData } from '@subsocial/types/dto'
import { truncateMiddle } from '@talisman-connect/ui'
import clsx from 'clsx'
import { useState } from 'react'

export interface TippingModalProps extends ModalProps {
  dest: string
  profile: ProfileData | undefined
}

const options = Object.entries(chains).map<OptionType>(([token, { icon }]) => ({
  value: token,
  label: (
    <div className='flex items-center'>
      <div className='w-6 mr-2'>
        <ImageContainer className='rounded-full' aspectRatio='1:1' src={icon} />
      </div>
      <p>{token}</p>
    </div>
  ),
}))

export default function TippingModal({
  dest,
  profile,
  ...props
}: TippingModalProps) {
  const [wallet] = useWalletContext()
  const { mutate } = useTransfer()
  const [token, setToken] = useState<any | ''>('')
  const { data } = useGetTokenBalance({
    address: wallet?.address ?? '',
    network: 'KSM',
  })
  console.log(data)

  const profileName = profile?.content?.name
  return (
    <Modal withCloseButton={false} size='sm' {...props}>
      <div className={clsx('flex flex-col', 'p-4')}>
        <p className={clsx('text-center text-xl')}>
          How much do you want to tip <br />
          <strong>{profileName ?? truncateMiddle(dest)}</strong>
        </p>
        <p className={clsx('mt-2 text-center', 'text-text-secondary text-xs')}>
          {dest}
        </p>
        <div
          className={clsx('flex items-center', 'space-x-4', 'mt-6', 'text-sm')}
        >
          <Select
            containerClassName={clsx('w-48')}
            options={options}
            value={token}
          />
          <TextField type='number' />
        </div>
      </div>
    </Modal>
  )
}
