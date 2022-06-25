import { getSpaceId } from '#/lib/helpers/env'
import { Hash } from '@polkadot/types/interfaces'
import { IpfsContent } from '@subsocial/types/substrate/classes'
import { UseMutationOptions } from 'react-query'
import { useSubsocialMutation } from './api'

type SubsocialMutationConfig<T> = UseMutationOptions<Hash, Error, T, unknown>

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

export type CreateQuestionPayload = {
  title: string
  body: string
}
export function useCreatePost(
  config?: SubsocialMutationConfig<CreateQuestionPayload>
) {
  return useSubsocialMutation(async (data, { ipfsApi, substrateApi }) => {
    const { title, body } = data
    const postCid = await ipfsApi.savePost({
      title,
      body,
    } as any)
    return substrateApi.tx.posts.createPost(
      getSpaceId(),
      { RegularPost: null },
      IpfsContent(postCid)
    )
  }, config)
}
