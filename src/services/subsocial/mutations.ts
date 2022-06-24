import { Hash } from '@polkadot/types/interfaces'
import { IpfsContent } from '@subsocial/types/substrate/classes'
import { UseMutationOptions } from 'react-query'
import { useSubsocialMutation } from './api'

type SubsocialMutationConfig<T> = UseMutationOptions<Hash, unknown, T, unknown>

export type CreateSpacePayload = {
  name: string
  desc?: string
  avatar?: File
}
export function useCreateSpace(
  config?: SubsocialMutationConfig<CreateSpacePayload>
) {
  return useSubsocialMutation(async (data, { ipfsApi, substrateApi }) => {
    const { avatar, name, desc } = data
    let avatarCid: string | undefined
    if (avatar) {
      avatarCid = await ipfsApi.saveFile(avatar)
    }
    const spaceCid = await ipfsApi.saveSpace({
      name,
      about: desc,
      image: avatarCid,
    } as any)
    return substrateApi.tx.spaces.createSpace(
      null,
      name,
      IpfsContent(spaceCid),
      null
    )
  }, config)
}
