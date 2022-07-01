import { ReactionType } from '@subsocial/types/dto'

// Important Types
export interface Reaction {
  created: {
    account: string
    block: number
    time: number
  }
  id: number
  kind: ReactionType
  updated: number
}

// Query Params
export type GetProfileParam = { address: string }
export type GetReactionByPostIdAndAccountParam = {
  address: string
  postId: string
}
export type GetBatchReactionsByPostIdsAndAccountParam = {
  address: string
  postIds: string[]
}
export type GetReplyIdsByPostIdParam = {
  postId: string
}
export type GetBatchReplyIdsByPostIdsParam = {
  postIds: string[]
}
export type GetQuestionParam = {
  postId: string
}

// Mutation Params
export type UpsertReactionPayload = {
  postId: string
  kind: ReactionType | ''
  reactionId?: number
}
export type CreateQuestionPayload = {
  title: string
  body: string
  tags: string[]
}
export type CreateSpacePayload = {
  name: string
  desc?: string
  avatar?: File
}
