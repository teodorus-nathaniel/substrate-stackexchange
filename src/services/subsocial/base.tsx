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
import {
  generateQueryWrapper,
  makeCombinedCallback,
  mergeQueryConfig,
} from '../common/base'
import { QueryConfig } from '../common/types'

export type SubstrateApi = Awaited<
  FlatSubsocialApi['subsocial']['substrate']['api']
>
export type Transaction = ReturnType<SubstrateApi['tx']['']['']>

export const subsocialQueryWrapper = generateQueryWrapper(async () => null)

export function useSubsocialQuery<ReturnValue, Params>(
  params: { key: string; data: Params | null },
  func: (data: {
    params: Params
    additionalData: FlatSubsocialApi
  }) => Promise<ReturnValue>,
  config?: QueryConfig<any, any>,
  defaultConfig?: QueryConfig<ReturnValue, Params>
) {
  const subsocialApi = useSubsocialApiContext()
  const mergedConfig = mergeQueryConfig(
    mergeQueryConfig(config, defaultConfig),
    { enabled: !!(subsocialApi && (subsocialApi as any)._subsocial) }
  )
  return useQuery(
    [params.key, params.data],
    subsocialQueryWrapper(func, subsocialApi!),
    mergedConfig as any
  )
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
