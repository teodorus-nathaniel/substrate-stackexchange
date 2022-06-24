import { getWalletBySource, WalletAccount } from '@talisman-connect/wallets'
import { APP_NAME } from '../constants/app'

export async function activateWalletFromSavedAccount(
  walletAccount: WalletAccount
) {
  const wallet = getWalletBySource(walletAccount.source)
  await wallet?.enable(APP_NAME)
  return new Promise<WalletAccount | null>((resolve) => {
    wallet?.subscribeAccounts((accounts) => {
      if (!accounts) return
      resolve(accounts[0] ?? null)
    })
  })
}
