import { WalletAccount } from '@talisman-connect/wallets'
import { createContext, useContext, useEffect, useState } from 'react'
import { defaultContextValue, StateContext } from './common'

type WalletState = WalletAccount | null
export const WalletContext = createContext<StateContext<WalletState>>(
  defaultContextValue(null)
)

const STORAGE_NAME = 'selected-wallet'

export const WalletContextProvider = ({ children }: { children: any }) => {
  const walletState = useState<WalletState>(null)
  const [wallet, setWallet] = walletState
  useEffect(() => {
    const selectedWallet = localStorage.getItem(STORAGE_NAME)
    if (selectedWallet) setWallet(JSON.parse(selectedWallet))
  }, [setWallet])

  useEffect(() => {
    if (wallet) localStorage.setItem(STORAGE_NAME, JSON.stringify(wallet))
  }, [wallet])

  return (
    <WalletContext.Provider value={walletState}>
      {children}
    </WalletContext.Provider>
  )
}

export function useWalletContext() {
  return useContext(WalletContext)
}
