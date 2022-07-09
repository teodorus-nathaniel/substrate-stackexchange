import queryClient from '../client'
import { generateQueryWrapper } from '../common/base'
import { QueryConfig } from '../common/types'
import {
  callIndexer,
  createIndexingQueryInvalidation,
  useIndexingQuery,
} from './base'
import {
  PostById,
  PostByIdQuery,
  PostByIdQueryVariables,
  ReputationById,
  ReputationByIdQuery,
  ReputationByIdQueryVariables,
} from './graphql'

const queryWrapper = generateQueryWrapper(async () => null)

export const getReputationByAddressKey = 'getReputationByAddress'
export const invalidateGetReputationByAddress =
  createIndexingQueryInvalidation<ReputationByIdQueryVariables>(
    getReputationByAddressKey,
    ReputationById
  )
export const invalidateGetReputationByPostId = async (postId: string) => {
  const post = await callIndexer<PostByIdQuery, PostByIdQueryVariables>(
    PostById,
    {
      id: postId,
    }
  )
  if (!post.post?.owner) return
  const params: ReputationByIdQueryVariables = { id: post.post.owner }
  queryClient.invalidateQueries([
    getReputationByAddressKey,
    { document, ...params },
  ])
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
