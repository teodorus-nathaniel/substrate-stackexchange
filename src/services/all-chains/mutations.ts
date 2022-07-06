import { MutationConfig } from '../common/base'
import { useAllChainsMutation } from './base'
import { TransferPayload } from './types'

export function useTransfer(config?: MutationConfig<TransferPayload>) {
  return useAllChainsMutation(async (data, api) => {
    const { dest, value } = data
    const tx = api.tx.balances.transfer(dest, value)
    return { tx, summary: `Transferring ${value} coins` }
  }, config)
}
