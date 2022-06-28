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

// Mutation Params
export type UpsertReactionPayload = {
  postId: string
  kind: ReactionType | ''
  reactionId?: string
}
export type CreateQuestionPayload = {
  title: string
  body: string
}
export type CreateSpacePayload = {
  name: string
  desc?: string
  avatar?: File
}
