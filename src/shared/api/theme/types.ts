import { ThemeT } from '@/stores/theme/types'

export interface CreateThemeBody {
   name: string
   theme: ThemeT
}

export interface GetThemeListResponse {
   id: string
   name: string
   theme: ThemeT
   userId: string
}

export interface EditThemeBody {
   name: string
   theme: ThemeT
}