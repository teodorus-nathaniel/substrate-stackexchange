import { encodeAddress } from '#/lib/helpers/chain'
import queryClient from '../client'
import { createQueryInvalidation } from '../common/base'
import { QueryConfig } from '../common/types'
import { callIndexer, useIndexingQuery } from './base'
import {
  PostById,
  PostByIdQuery,
  PostByIdQueryVariables,
  ReputationById,
  ReputationByIdQuery,
  ReputationByIdQueryVariables,
} from './graphql'

export const getReputationByAddressKey = 'getReputationByAddress'
export const invalidateGetReputationByAddress =
  createQueryInvalidation<ReputationByIdQueryVariables>(
    getReputationByAddressKey
  )
export const invalidateGetReputationByPostId = async (postId: string) => {
  const post = await callIndexer<PostByIdQuery, PostByIdQueryVariables>(
    PostById,
    {
      id: postId,
    }
  )
  if (!post.post?.owner) return
  const params: ReputationByIdQueryVariables = {
    id: encodeAddress(post.post.owner),
  }
  queryClient.invalidateQueries([getReputationByAddressKey, params])
}
export function useGetReputationByAddress(
  address: string | undefined,
  config?: QueryConfig
) {
  return useIndexingQuery<ReputationByIdQueryVariables, ReputationByIdQuery>(
    {
      key: getReputationByAddressKey,
      params: { document: ReputationById, id: address! },
    },
    config,
    { enabled: !!address }
  )
}
