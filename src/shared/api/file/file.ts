import { baseInstance } from '../base'

export const uploadFiles = async (files: File[]) => {
   const formData = new FormData()
   files.forEach(file => {
      formData.append('files', file)
   })
   return await baseInstance.post('/file/upload', formData, {
      headers: {
         'Content-Type': 'multipart/form-data',
      },
   })
}
