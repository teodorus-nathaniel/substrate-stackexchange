import {
  decodeAddress,
  encodeAddress as encodePolkadotAddress,
} from '@polkadot/keyring'
import { getWalletBySource, WalletAccount } from '@talisman-connect/wallets'
import { APP_NAME } from '../constants/app'
import { getAddressPrefix } from './env'

export async function activateWalletFromSavedAccount(
  walletAccount: WalletAccount
) {
  const wallet = getWalletBySource(walletAccount.source)
  await wallet?.enable(APP_NAME)
  return new Promise<WalletAccount | null>((resolve) => {
    wallet?.subscribeAccounts((accounts) => {
      if (!accounts) return
      const currentAcc = accounts.find(
        (account) => account.address === walletAccount.address
      )
      resolve(currentAcc ?? null)
    })
  })
}

export function encodeAddress(address: string | undefined) {
  if (!address) return ''
  return encodePolkadotAddress(decodeAddress(address), getAddressPrefix())
}
