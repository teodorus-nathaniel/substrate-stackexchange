import Button from '#/components/Button'
import ImageContainer from '#/components/ImageContainer'
import Select from '#/components/inputs/Select'
import { OptionType } from '#/components/inputs/Select/Select'
import TextField from '#/components/inputs/TextField'
import Modal, { ModalProps } from '#/components/Modal'
import { useWalletContext } from '#/contexts/WalletContext'
import { chains, TokenTickers } from '#/lib/constants/chains'
import { formatBalance } from '#/lib/helpers/chain'
import useFormikWrapper from '#/lib/hooks/useFormikWrapper'
import { useGetTokenBalance } from '#/services/all-chains/queries'
import { ProfileData } from '@subsocial/types/dto'
import { truncateMiddle } from '@talisman-connect/ui'
import clsx from 'clsx'
import { tippingForm } from './form/schema'

export interface TippingModalProps extends ModalProps {
  dest: string
  profile: ProfileData | undefined
}

const options = Object.entries(chains).map<OptionType>(([token, { icon }]) => ({
  value: token,
  label: (
    <div className='flex items-center'>
      <div className='w-5 mr-2'>
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
  const { getFieldData, values } = useFormikWrapper({
    ...tippingForm,
    onSubmit: () => {
      // TIP
    },
  })
  // const { mutate } = useTransfer()
  const { data: balance } = useGetTokenBalance({
    address: wallet?.address ?? '',
    network: values.network?.value as TokenTickers | undefined,
  })

  const profileName = profile?.content?.name
  return (
    <Modal autoFocus={false} withCloseButton={false} size='sm' {...props}>
      <div className={clsx('flex flex-col', 'p-4')}>
        <p className={clsx('text-center text-xl')}>
          How much do you want to tip <br />
          <strong>{profileName ?? truncateMiddle(dest)}</strong>
        </p>
        <p className={clsx('mt-2 text-center', 'text-text-secondary text-xs')}>
          {dest}
        </p>
        <div
          className={clsx('flex items-start', 'space-x-4', 'mt-8', 'text-sm')}
        >
          <Select
            labelClassName={clsx('text-xs')}
            helperTextClassName={clsx('text-xs')}
            containerClassName={clsx('w-56')}
            options={options}
            label='Token'
            tabIndex={0}
            {...getFieldData('network')}
          />
          <TextField
            labelClassName={clsx('text-xs')}
            helperTextOnRightOfLabelClassNames={clsx('text-xs')}
            helperTextClassName={clsx('text-xs')}
            type='number'
            {...getFieldData('amount')}
            label='Amount'
            helperTextOnRightOfLabel={`Balance: ${formatBalance(balance ?? 0)}`}
            rightElement={(classNames) => (
              <Button
                noClickEffect
                size='icon-small'
                variant='unstyled'
                className={clsx('text-text-secondary', classNames)}
              >
                Max
              </Button>
            )}
          />
        </div>
      </div>
    </Modal>
  )
}
