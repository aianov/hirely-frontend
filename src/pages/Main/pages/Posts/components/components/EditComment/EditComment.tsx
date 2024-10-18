import { editComment } from '@/shared/api/posts/comments/api'
import { EditCommentBody } from '@/shared/api/posts/comments/types'
import { GetPostsCommentResponse } from '@/shared/api/posts/types'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react'
import s from './EditComment.module.scss'

export const EditComment = observer(({
   setIsCommentEditing,
   com,
   setCom,
   editCom
}: EditCommentProps) => {
   const { currentTheme } = themeStore
   const editCommentRef = useRef<HTMLDivElement | null>(null)
   const inputRef = useRef<HTMLInputElement | null>(null)
   const [inputText, setInputText] = useState('')
   const [isEditing, setisEditing] = useState(false)

   const editCommentAction = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      if (!inputText || isEditing) return

      setisEditing(true)
      editCom(inputText)
      setIsCommentEditing(true)

      const ifError = () => {
         editCom(com?.content)
         setIsCommentEditing(false)
      }

      try {
         const body: EditCommentBody = { content: inputText }
         const res = await editComment(com.id, body)
         if (!res?.data) {
            ifError()
            return
         }
         // @ts-ignore
         setCom(prev => prev?.map((t) => t?.id === com?.id ? { ...t, content: inputText } : t))
      } catch (err) {
         console.log(err)
         ifError()
      }
      finally {
         setisEditing(false)
         setIsCommentEditing(false)
      }
   }, [inputText, com.id, setIsCommentEditing, editCom, isEditing])

   // Logic for clicking outside the input
   useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
         if (
            editCommentRef.current &&
            !editCommentRef.current.contains(event.target as Node)
         ) setIsCommentEditing(false)
      }
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
   }, [setIsCommentEditing])

   useEffect(() => {
      if (!inputRef.current) return
      inputRef.current.value = com.content
      inputRef.current?.focus()
   }, [])

   return (
      <div className={s.main} ref={editCommentRef}>
         <form className={s.editingform} onSubmit={editCommentAction}>
            <input
               type="text"
               ref={inputRef}
               value={inputText}
               onChange={e => setInputText(e.target.value)}
            />
            <div className={s.btns}>
               <button
                  type="button"
                  style={currentTheme.btnsTheme}
                  onClick={e => {
                     e.preventDefault()
                     setIsCommentEditing(false)
                  }}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
               <button
                  type="submit"
                  style={currentTheme.btnsTheme}
               >
                  <span style={currentTheme.textColor}>Сохранить</span>
               </button>
            </div>
         </form>
      </div>
   )
})

interface EditCommentProps {
   setIsCommentEditing: Dispatch<SetStateAction<boolean>>
   com: GetPostsCommentResponse
   setCom: Dispatch<SetStateAction<never[]>>
   editCom: (inputText: string) => void
}
