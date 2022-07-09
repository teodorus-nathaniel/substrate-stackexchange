import { generateQueryWrapper } from '../common/base'
import { QueryConfig } from '../common/types'
import { useIndexingQuery } from './base'
import {
  ReputationById,
  ReputationByIdQuery,
  ReputationByIdQueryVariables,
} from './graphql'

const queryWrapper = generateQueryWrapper(async () => null)

export const getReputationByAddressKey = 'getReputationByAddress'
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
