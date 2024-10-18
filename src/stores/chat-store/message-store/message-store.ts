import { MessageProps } from '@/pages/Main/pages/Chat/components/ChatMessage/ChatMessage'
import { makeAutoObservable } from "mobx"
import { ChangeEvent } from 'react'
import { SelectedImageT } from './types'

class MessageStore {
   constructor() { makeAutoObservable(this) }

   message = ''
   messageToReply: Partial<MessageProps> = {}
   isReplying: boolean = false
   selectedMessage: MessageProps | null = null
   isMsgDeleting: boolean = false

   // MSG EDITING
   editMessage = ''
   isMsgEditing = false

   // FILE
   selectedImage: SelectedImageT | null = null
   originalMessageFile: File[] = []
   messageFile: File[] = []
   isFileUploaded = false

   // SKETCHES
   sketches: { [key: string]: { lines: any[] } } = {}
   currentSketchIndex: { [key: string]: number | null } = {}

   updateMessage = (e: string) => this.message = e
   setMessageToReply = (message: Partial<MessageProps>) => this.messageToReply = message
   setIsReplying = (is: boolean) => this.isReplying = is
   setSelectedMessage = (msg: MessageProps | null) => this.selectedMessage = msg
   setIsMsgDeleting = (is: boolean) => this.isMsgDeleting = is
   setEditMessage = (msg: string) => this.editMessage = msg
   setIsMsgEditing = (is: boolean) => this.isMsgEditing = is
   setIsFileUploaded = (is: boolean) => this.isFileUploaded = is
   setMessageFile = (files: File[]) => this.messageFile = files
   setSelectedImage = (img: SelectedImageT | null) => this.selectedImage = img
   setOriginalMessageFile = (files: File[]) => this.originalMessageFile = files

   // =========================== FUNCTIONS ==============================

   handleChatFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
      const fileList = event.target.files
      if (!fileList) return
      const files = Array.from(fileList)
      if (files.length === 0) return
      files.forEach((curFile) => {
         if (!curFile) return
         const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
         if (!validTypes.includes(curFile.type)) {
            alert('Можно загрузить только файлы формата PNG, JPG, JPEG')
            return
         }
         this.messageFile.push(curFile)
         this.originalMessageFile.push(curFile)
         this.setIsFileUploaded(true)
      })
   }

   // Save sketches for the selected image
   saveSketch = (fileName: string, lines: any[]) => {
      this.sketches[fileName] = { lines }
      this.currentSketchIndex[fileName] = lines.length - 1
   }

   // Load sketches for the selected image
   loadSketch = (fileName: string) => {
      return this.sketches[fileName] || { lines: [] }
   }

   undoSketch = (fileName: string) => {
      const currentIndex = this.currentSketchIndex[fileName] ?? null
      if (currentIndex !== null && currentIndex > 0) {
         this.currentSketchIndex[fileName] = currentIndex - 1
         return this.sketches[fileName]?.lines.slice(0, currentIndex) || []
      }
      return this.sketches[fileName]?.lines || []
   }

   redoSketch = (fileName: string) => {
      const currentIndex = this.currentSketchIndex[fileName] ?? null
      if (currentIndex !== null && currentIndex < (this.sketches[fileName]?.lines.length || 0) - 1) {
         this.currentSketchIndex[fileName] = currentIndex + 1
         return this.sketches[fileName]?.lines.slice(0, currentIndex + 1) || []
      }
      return this.sketches[fileName]?.lines || []
   }

   // ========= CLEARER ============
   clearAll = () => {
      this.clearReply()
      this.clearDelete()
      this.clearEdit()
   }

   clearReply = () => {
      this.setIsReplying(false)
      this.setMessageToReply({})
   }

   clearDelete = () => {
      this.setSelectedMessage(null)
   }

   clearEdit = () => {
      this.setIsMsgEditing(false)
      this.setEditMessage('')
   }

}

export const messageStore = new MessageStore()