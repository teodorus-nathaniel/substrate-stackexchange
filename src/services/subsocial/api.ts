import { useSubsocialApiContext } from '#/contexts/SubsocialApiContext'
import { useWalletContext } from '#/contexts/WalletContext'
import { Hash } from '@polkadot/types/interfaces'
import { SubsocialIpfsApi } from '@subsocial/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { WalletAccount } from '@talisman-connect/wallets'
import { useEffect, useRef } from 'react'
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
  UseQueryOptions,
} from 'react-query'

export type SubstrateApi = Awaited<
  FlatSubsocialApi['subsocial']['substrate']['api']
>
export type Transaction = ReturnType<SubstrateApi['tx']['']['']>

function queryWrapper<T, V>(
  func: (data: V, api: FlatSubsocialApi) => T,
  subsocialApi: FlatSubsocialApi
) {
  return ({ queryKey }: any) => {
    return func(queryKey[1], subsocialApi)
  }
}

export function useSubsocialQuery<T, V>(
  params: { key: string; data: V | null },
  func: (data: V, api: FlatSubsocialApi) => Promise<T>,
  config?: Omit<
    UseQueryOptions<T, unknown, T, (string | V | null)[]>,
    'queryFn' | 'queryKey'
  >
) {
  const subsocialApi = useSubsocialApiContext()
  return useQuery(
    [params.key, params.data],
    queryWrapper(func, subsocialApi!),
    {
      ...config,
      enabled: !!(subsocialApi && (subsocialApi as any)._subsocial),
    }
  )
}

function makeCombinedCallback(defaultConfig: any, config: any, attr: string) {
  return (...data: any[]) => {
    defaultConfig && defaultConfig[attr] && defaultConfig[attr](...data)
    config && config[attr] && config[attr](...data)
  }
}
export function useSubsocialMutation<Param>(
  transactionGenerator: (
    params: Param,
    apis: {
      subsocialApi: FlatSubsocialApi
      ipfsApi: SubsocialIpfsApi
      substrateApi: SubstrateApi
    }
  ) => Promise<Transaction>,
  config?: UseMutationOptions<Hash, unknown, Param, unknown>,
  defaultConfig?: UseMutationOptions<Hash, unknown, Param, unknown>
): UseMutationResult<Hash, unknown, Param, unknown> {
  const [wallet] = useWalletContext()
  const subsocialApiContext = useSubsocialApiContext()
  const promiseRef = useRef<((value?: unknown) => void) | null>(null)

  useEffect(() => {
    if (promiseRef.current && subsocialApiContext) {
      promiseRef.current()
    }
  }, [subsocialApiContext])

  const createTxAndSend = async (
    subsocialApi: FlatSubsocialApi,
    param: Param,
    usedWallet: WalletAccount
  ) => {
    const substrateApi = await subsocialApi.subsocial.substrate.api
    const ipfsApi = subsocialApi.subsocial.ipfs

    const tx = await transactionGenerator(param, {
      subsocialApi,
      ipfsApi,
      substrateApi,
    })
    return tx.signAndSend(usedWallet.address, {
      signer: usedWallet.signer as any,
    })
  }

  const workerFunc = async (param: Param) => {
    if (!wallet) throw new Error('You need to connect your wallet first!')
    if (subsocialApiContext) {
      return createTxAndSend(subsocialApiContext, param, wallet)
    }
    await new Promise((resolve) => {
      promiseRef.current = resolve
    })
    const api = subsocialApiContext as unknown as FlatSubsocialApi
    return createTxAndSend(api, param, wallet)
  }

  return useMutation(workerFunc, {
    ...(defaultConfig || {}),
    ...config,
    onSuccess: makeCombinedCallback(defaultConfig, config, 'onSuccess'),
    onError: makeCombinedCallback(defaultConfig, config, 'onError'),
  })
}
