import { CSSProperties } from 'react'
import { GetPostUserMore } from '../api/posts/types'


export type SortType = "asc" | "desc"

// ========================== ICONS ==============================

export interface IconOnlyWithWidthAndHeight {
   width?: number
   height?: number
}

export interface IconOnlyWithWidthAndHeightAndStyle {
   width?: number
   height?: number
   style?: CSSProperties
}

export interface IconWithWidthAndHeight {
   width?: number
   height?: number
   color?: string
}

export interface IconWithSize {
   size?: number
   color?: string
}

export interface IconOnlyWithSize {
   size?: number
}

export interface IconOnlyWithColor {
   color?: string
}

export interface NavBtnType {
   text: string
   to: string
   allowUrls: string[]
   icon: React.ReactNode
   soon?: boolean
}

export interface Item {
   label: string
   key: string
}

// ========================== COMMENTS ==============================

export interface YourPreviewCommentType {
   id: number
   authorId: string
   content: string
   parentId: null | number
   postId: number
   likesCount: number
   dislikesCount: number
   repliesCount: number
   userLiked: boolean
   userDisliked: boolean
   createdAt: string
   childComments: YourPreviewChildCommentType[]
   author: {
      name: string
      more: GetPostUserMore
      tag: string
   }
}

export interface YourPreviewChildCommentType {
   id: number
   authorId: string
   content: string
   parentId: null | number
   postId: number
   likesCount: number
   dislikesCount: number
   repliesCount: number
   userLiked: boolean
   userDisliked: boolean
   createdAt: string
   to: {
      id: string
      tag: string
      more: {
         logo: string
      }
      name: string
   }
   userId: string
   author: {
      name: string
      more: GetPostUserMore
      tag: string
   }
   addressedToName: string
   addressedToTag: string
}

export type GenderType = 'Не указывать' | 'Мужчина' | 'Женщина'

// =========================== USER TYPES ==============================

export type UserStatus = 'user' | 'admin' | 'moder' | 'hire'

export type UserLineStatus = 'offline' | 'online' | 'inchat' | 'typing'