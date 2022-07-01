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
  UseQueryOptions,
} from 'react-query'
import { toast } from 'react-toastify'

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

export function useSubsocialQuery<T, V>(
  params: { key: string; data: V | null },
  func: (api: FlatSubsocialApi, data: V) => Promise<T>,
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
      enabled:
        !!(subsocialApi && (subsocialApi as any)._subsocial) &&
        (config?.enabled ?? true),
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
  ) => Promise<{ tx: Transaction; summary: string }>,
  config?: UseMutationOptions<Hash, Error, Param, unknown>,
  defaultConfig?: UseMutationOptions<Hash, Error, Param, unknown>
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
    return new Promise<Hash>(async (resolve) => {
      const unsub = await tx.signAndSend(
        currentWallet.address,
        {
          signer: usedWallet.signer as any,
        },
        (result) => {
          resolve(result.txHash)
          console.log(`Current status is ${result.status}`)
          if (result.status.isBroadcast) {
            toast(`${summary}...`)
          } else if (result.status.isInBlock) {
            if (
              !result.isError ||
              result.dispatchError ||
              result.internalError
            ) {
              toast(
                <div>
                  <p>Error {summary}</p>
                  <p className='text-text-secondary text-sm'>
                    Error Code: {result.dispatchError?.toString()}
                  </p>
                </div>
              )
            } else {
              toast(`Success ${summary}!`)
            }
            unsub()
          }
        }
      )
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
