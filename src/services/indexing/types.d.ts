import { DocumentNode } from 'graphql'

// Common
export type IndexingCommonParams = {
  document: DocumentNode
}
export type IndexingParam<T> = T & IndexingCommonParams
