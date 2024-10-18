import { AxiosResponse } from 'axios'
import { baseInstance } from '../base'
import { CreateThemeBody, EditThemeBody, GetThemeListResponse } from './types'

export const createTheme = async (body: CreateThemeBody) => {
   return await baseInstance.post('/theme', body)
}

export const getTheme = async (): Promise<AxiosResponse<GetThemeListResponse[]>> => {
   return await baseInstance.get('/theme')
}

export const deleteTheme = async (themeId: string) => {
   return await baseInstance.delete(`/theme/${themeId}`)
}

export const editTheme = async (themeId: string, body: Partial<EditThemeBody>) => {
   return await baseInstance.patch(`/theme/${themeId}`, body)
}

export const getThemeById = async (themeId: string) => {
   return await baseInstance.get(`/theme/${themeId}`)
}