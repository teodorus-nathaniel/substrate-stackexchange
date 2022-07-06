import { useSubsocialApiContext } from '#/contexts/SubsocialApiContext'
import { useWalletContext } from '#/contexts/WalletContext'
import { activateWalletFromSavedAccount } from '#/lib/helpers/wallet'
import { Hash } from '@polkadot/types/interfaces'
import { SubsocialIpfsApi } from '@subsocial/api'
import { FlatSubsocialApi } from '@subsocial/api/flat-subsocial'
import { isEmptyObj } from '@subsocial/utils'
import { WalletAccount } from '@talisman-connect/wallets'
import { useEffect, useRef } from 'react'
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
  useQuery,
} from 'react-query'
import { toast } from 'react-toastify'
import queryClient from '../client'
import { QueryConfig } from './types'

export type SubstrateApi = Awaited<
  FlatSubsocialApi['subsocial']['substrate']['api']
>
export type Transaction = ReturnType<SubstrateApi['tx']['']['']>

function queryWrapper<T, V>(
  func: (api: FlatSubsocialApi, data: V) => T,
  subsocialApi: FlatSubsocialApi
) {
  return ({ queryKey }: any) => {
    return func(subsocialApi, queryKey[1])
  }
}

export function mergeQueryConfig<T, V>(
  config?: QueryConfig<any, any>,
  defaultConfig?: QueryConfig<T, V>
): QueryConfig<T, V> {
  return {
    ...defaultConfig,
    ...config,
    enabled: (defaultConfig?.enabled ?? true) && (config?.enabled ?? true),
  }
}
export function useSubsocialQuery<T, V>(
  params: { key: string; data: V | null },
  func: (api: FlatSubsocialApi, data: V) => Promise<T>,
  config?: QueryConfig<any, any>,
  defaultConfig?: QueryConfig<T, V>
) {
  const subsocialApi = useSubsocialApiContext()
  const mergedConfig = mergeQueryConfig(
    mergeQueryConfig(config, defaultConfig),
    { enabled: !!(subsocialApi && (subsocialApi as any)._subsocial) }
  )
  return useQuery(
    [params.key, params.data],
    queryWrapper(func, subsocialApi!),
    mergedConfig as any
  )
}

export function createQueryInvalidation<Param>(key: string) {
  return (data?: Param) => {
    queryClient.invalidateQueries([key, data])
  }
}

function makeCombinedCallback(defaultConfig: any, config: any, attr: string) {
  return (...data: any[]) => {
    defaultConfig && defaultConfig[attr] && defaultConfig[attr](...data)
    config && config[attr] && config[attr](...data)
  }
}
export type SubsocialMutationConfig<Param> = UseMutationOptions<
  Hash,
  Error,
  Param,
  unknown
> & { onTxSuccess?: (data: Param, address: string) => void }
export function useSubsocialMutation<Param>(
  transactionGenerator: (
    params: Param,
    apis: {
      subsocialApi: FlatSubsocialApi
      ipfsApi: SubsocialIpfsApi
      substrateApi: SubstrateApi
    }
  ) => Promise<{ tx: Transaction; summary: string }>,
  config?: SubsocialMutationConfig<Param>,
  defaultConfig?: SubsocialMutationConfig<Param>
): UseMutationResult<Hash, Error, Param, unknown> {
  const [wallet, setWallet] = useWalletContext()
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
    currentWallet: WalletAccount
  ) => {
    const substrateApi = await subsocialApi.subsocial.substrate.api
    const ipfsApi = subsocialApi.subsocial.ipfs

    let usedWallet = currentWallet
    if (isEmptyObj(currentWallet.signer)) {
      const newWallet = await activateWalletFromSavedAccount(currentWallet)
      setWallet(newWallet)
      if (!newWallet) {
        throw new Error("Can't connect to your wallet")
      }
      usedWallet = newWallet
    }

    const { tx, summary } = await transactionGenerator(param, {
      subsocialApi,
      ipfsApi,
      substrateApi,
    })
    return new Promise<Hash>(async (resolve, reject) => {
      try {
        const unsub = await tx.signAndSend(
          currentWallet.address,
          {
            signer: usedWallet.signer as any,
          },
          (result) => {
            resolve(result.txHash)
            console.log(`Current status is ${result.status}`)
            if (result.status.isBroadcast) {
              toast.info(`${summary}...`)
            } else if (result.status.isInBlock) {
              if (
                result.isError ||
                result.dispatchError ||
                result.internalError
              ) {
                toast.error(
                  <div>
                    <p>Error {summary}</p>
                    <p className='text-text-secondary text-sm'>
                      Error Code: {result.dispatchError?.toString()}
                    </p>
                  </div>
                )
              } else {
                const onTxSuccess = makeCombinedCallback(
                  defaultConfig,
                  config,
                  'onTxSuccess'
                )
                onTxSuccess(param, usedWallet.address)
                toast.success(`Success ${summary}!`)
              }
              unsub()
            }
          }
        )
      } catch (e) {
        toast.error((e as any).message)
        reject(e)
      }
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
