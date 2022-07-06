import {
  decodeAddress,
  encodeAddress as encodePolkadotAddress,
} from '@polkadot/keyring'
import { getAddressPrefix } from './env'

export function encodeAddress(address: string | undefined) {
  if (!address) return ''
  return encodePolkadotAddress(decodeAddress(address), getAddressPrefix())
}

export function formatBalance(value: string) {
  return (+value / 1_000_000_000_000).toFixed(4)
}
