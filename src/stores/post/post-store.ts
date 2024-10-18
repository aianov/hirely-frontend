import { GetPostsPostResponse } from '@/shared/api/posts/types'
import { makeAutoObservable } from "mobx"
import { ChangeEvent } from 'react'
import { SelectedPostImageT } from './types'

class PostStore {
   constructor() { makeAutoObservable(this) }

   title = ''
   titleErr = ''
   selectedTags: string[] = localStorage.getItem('selectedTags') ? JSON.parse(localStorage.getItem('selectedTags')!) : []

   inputObj = JSON.parse(localStorage.getItem('selectedHashtags')!) || { hashtags: '' }
   inputObjErr = { hashtagsErr: '' }
   postFile: File[] = []
   originalPostFile: File[] = []

   isHaveBadContent = false

   isPostImageEditing = false
   setIsPostImageEditing = (is: boolean) => this.isPostImageEditing = is

   selectedPostImage: null | SelectedPostImageT = null
   setSelectedPostImage = (image: null | SelectedPostImageT) => this.selectedPostImage = image

   updateInputData = (key: string, value: string) => {
      this.inputObjErr = {
         ...this.inputObjErr,
         [key + 'Err']: ''
      }
      const arr = value.split(' ')
      const realArr = this.inputObj.hashtags.split(' ')
      if (realArr.some((str: string) => str == '#' && (!/^#([^#]+|$)/.test(str) || str == '#'))) {
         this.inputObj.hashtags = arr.filter(t => t[0] == '#').join(' ')
         return
      }

      if (arr.some(str => str[0] !== '#' && arr.length > 1 && arr[arr.length - 1] !== '')) {
         this.inputObj.hashtags = arr.filter(t => t[0] == '#').join(' ')
         return
      }
      if (arr.some(str => !/^[а-яА-Яa-zA-Z0-9#]+$/.test(str) && str !== '')) return
      if (
         arr.some(str => !/^#?(?!.*#)[а-яА-Яa-zA-Z0-9#]+$/.test(str) && str !== '' && str !== '#') &&
         this.inputObj.hashtags.length !== 0
      ) return
      if (arr.some(str => str[0] !== '#' && str.length > 1)) {
         console.log(arr.filter(t => t[0] == '#'))
         this.inputObj.hashtags = arr.filter(t => t[0] == '#').join(' ')
         return
      }
      if (arr[arr.length - 1] == '#') {
         arr.pop()
         this.inputObj.hashtags = arr.join(' ')
         return
      }
      if (/ $/.test(value)) {
         this.inputObj.hashtags = this.inputObj.hashtags + ' #'
         return
      }
      this.inputObj = {
         ...this.inputObj,
         [key]: value
      }
      if (this.inputObj.hashtags.length == 1 && this.inputObj.hashtags !== '#') this.inputObj.hashtags = '#' + this.inputObj.hashtags
   }

   handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event?.target?.files
      if (file) {
         const fileArr = Array.from(file)
         if (fileArr.length === 0) return
         fileArr.forEach((curFile) => {
            if (!curFile) return
            const validTypes = ['image/png', 'image/jpg', 'image/jpeg']
            if (!validTypes.includes(curFile.type)) {
               alert('Можно загрузить только файлы формата PNG, JPG, JPEG')
               return
            }
            this.postFile.push(curFile)
            this.originalPostFile.push(curFile)
         })
      }
   }

   setTitle = (str: string) => { this.setTitleErr(''); this.title = str }
   setTitleErr = (err: string) => this.titleErr = err
   setSelectedTags = (tag: string) => {
      if (this.selectedTags.includes(tag)) {
         this.selectedTags = this.selectedTags.filter(t => t !== tag)
         return
      }
      this.selectedTags = [...this.selectedTags, ...[tag]]
   }
   setHardSelectedTags = (tag: string[]) => this.selectedTags = tag
   setPostFile = (file: File[]) => this.postFile = file
   setIsHaveBadContent = (is: boolean) => this.isHaveBadContent = is

   // =========================== EDIT POSTS ==============================

   selectedPost: GetPostsPostResponse | null = localStorage.getItem('selected-post') ? JSON.parse(localStorage.getItem('selected-post')!) : null

   setSelectedPost = (selectedPost: GetPostsPostResponse) => this.selectedPost = selectedPost

   // =========================== DELETE POST ==============================

   selectedPostForDelete: GetPostsPostResponse | null = null
   isDeletingPost: boolean = false

   setSelectedPostForDelete = (selectedPost: GetPostsPostResponse) => this.selectedPostForDelete = selectedPost
   setIsDeletingPost = (is: boolean) => this.isDeletingPost = is

   // =========================== CLEAR ALL AFTER CREATING POST ==============================

   clearAllAfterPost = () => {
      this.selectedTags = []
      this.setPostFile([])
      this.updateInputData('hashtags', '')
   }

}

export const postStore = new PostStore()