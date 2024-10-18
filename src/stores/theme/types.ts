import { CSSProperties } from 'react'

export interface ThemeT {
   bgTheme: CSSProperties
   btnsTheme: CSSProperties
   borderRadius?: CSSProperties
   textColor: CSSProperties
   secondTextColor: CSSProperties
   myCommentBgTheme: CSSProperties
   bodyBg: CSSProperties
}

export interface ThemeListT {
   colors: ThemeT
   title: string
   isPremium: boolean
}

export interface EditThemeObjT {
   name: string
}