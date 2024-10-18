import { TagIcon } from '@/assets/icons/MainPage/MyProfile/CreatePost/Tag'
import { FileIcon } from '@/assets/icons/Ui/FileIcon'
import { PostHaveBadContentModal } from '@/features/Modals/Posts/PostHaveBadContentModal/PostHaveBadContentModal'
import { uploadFiles } from '@/shared/api/file/file'
import { createPost, editPost } from '@/shared/api/posts/api'
import { CreatePostBody } from '@/shared/api/posts/types'
import { InputUi } from '@/shared/ui/InputUi'
import { SpinLoader } from '@/shared/ui/SpinLoader'
import { allTags, settings } from '@/shared/utils/globalData'
import { postTagsTranslation } from '@/shared/utils/translations'
import { postStore } from '@/stores/post/post-store'
import { themeStore } from '@/stores/theme/theme-store'
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
// import { Editor } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import s from './CreatePost.module.scss'

import { EditMsgIcon } from '@/assets/icons/MainPage/Chats/EditMsgIcon'
import { NicsBarImageEditor } from '@/shared/ui/NicsBarImageEditor/NicsBarImageEditor'
import { nanoid } from 'nanoid'
import Slider from 'react-slick'
import "slick-carousel/slick/slick-theme.css"
import "slick-carousel/slick/slick.css"

export const CreatePost = observer(() => {
   const url = useLocation().pathname
   const { currentTheme } = themeStore

   const {
      title,
      setTitle,
      titleErr,
      setTitleErr,
      selectedTags,
      setSelectedTags,
      handleFileChange,
      postFile,
      setPostFile,
      clearAllAfterPost,

      // hashtags
      inputObj,
      inputObjErr,
      updateInputData,

      // edit post
      selectedPost,
      setHardSelectedTags,
      setIsHaveBadContent,
      isPostImageEditing,
      setIsPostImageEditing,

      originalPostFile,
      selectedPostImage,
      setSelectedPostImage
   } = postStore

   const navigate = useNavigate()
   const [editorState, setEditorState] = useState<EditorState>(() => EditorState.createEmpty())
   const fileInputRef = useRef<null | HTMLInputElement>(null)
   const [isCreating, setIsCreating] = useState(false)

   const onEditorStateChange = (newEditorState: EditorState) => setEditorState(newEditorState)

   const handleSubmit = async () => {
      if (title == '') {
         setTitleErr('Введите заголовок')
         return
      }
      setIsCreating(true)
      const contentState = editorState.getCurrentContent()
      const content = JSON.stringify(convertToRaw(contentState))
      const hashtags = inputObj.hashtags.split(' ').map((t: string) => t.slice(1)).filter((t: string) => t !== '' && /^[а-яА-Яa-zA-Z0-9]+$/.test(t))
      const tags = postTagsTranslation(selectedTags)

      try {
         const body: CreatePostBody = {
            title,
            content,
            hashtags: inputObj.hashtags == '' ? [] : hashtags,
            tags: selectedTags?.length == 0 ? ['all'] : tags,
            images: []
         }
         if (postFile) {
            const res = await uploadFiles(postFile)
            console.log(res)
            if (res?.data?.urls?.includes('Bad content')) {
               setIsHaveBadContent(true)
               setIsCreating(false)
               return
            }
            if (res?.data?.urls) {
               body.images = res?.data?.urls
            }
         }
         console.log(body)
         let res
         if (url == '/main/edit-post' && selectedPost) {
            body.authorId = selectedPost?.authorId
            res = await editPost(body, selectedPost.id)
         } else res = await createPost(body)
         console.log(res)
         if (res?.data) {
            setIsCreating(false)
            clearAllAfterPost()
            navigate('/main/my-profile')
            setTimeout(() => {
               localStorage.removeItem('saved-draft')
               localStorage.removeItem('saved-draft-title')
               localStorage.removeItem('selectedTags')
               localStorage.removeItem('selectedHashtags')
               setTitle('')
            }, 200)
         }
      } catch (err) { console.log(err) }
   }

   const handleFileClick = () => fileInputRef.current && fileInputRef.current.click()

   useEffect(() => {
      if (url == '/main/create-post') {
         localStorage.setItem('last-route', url)
         const localDraft = localStorage.getItem('saved-draft')
         const localTitle = localStorage.getItem('saved-draft-title')
         if (localTitle) setTitle(localTitle)
         if (localDraft) {
            try {
               const draft = JSON.parse(localDraft)
               if (draft && draft.blocks) {
                  const contentState = convertFromRaw(draft)
                  setEditorState(EditorState.createWithContent(contentState))
               }
            } catch (e) { console.log }
         }
      }
   }, [])

   useEffect(() => {
      if (url == '/main/edit-post' && selectedPost) {
         setTitle(selectedPost.title)
         const draft = selectedPost.content
         const tags = postTagsTranslation(selectedPost.tags)
         const hashtags = selectedPost.hashtags.map(h => '#' + h)
         console.log(tags, hashtags)
         setHardSelectedTags(tags)
         updateInputData('hashtags', hashtags.join(' '))
         if (draft && draft.blocks) {
            const contentState = convertFromRaw(draft)
            setEditorState(EditorState.createWithContent(contentState))
         }
      }
   }, [selectedPost])

   useEffect(() => {
      if (url == '/main/create-post') {
         const saveDraftToLocalStorage = () => {
            const contentState = editorState.getCurrentContent()
            const content = JSON.stringify(convertToRaw(contentState))
            localStorage.setItem('saved-draft', content)
            localStorage.setItem('saved-draft-title', title)
            localStorage.setItem('selectedTags', JSON.stringify(selectedTags))
            localStorage.setItem('selectedHashtags', JSON.stringify(inputObj))
         }

         window.addEventListener('beforeunload', saveDraftToLocalStorage)
         return () => {
            saveDraftToLocalStorage()
            window.removeEventListener('beforeunload', saveDraftToLocalStorage)
         }
      }
   }, [editorState, title])

   const [result, setResult] = useState('')
   const [value, onChange] = useState('<p>Your initial <b>html value</b> or an empty string to init editor without value</p>')

   return (
      <div className={s.main}>
         {/* MODALS */}
         <PostHaveBadContentModal />
         {selectedPostImage !== null && (
            <NicsBarImageEditor
               file={selectedPostImage?.file}
               onFinish={(url) => console.log('asd', url)}
               onClose={() => setSelectedPostImage(null)}
            />
         )}

         <Link className={s.back} to="/main/my-profile">
            <span>{'<-'}</span>
            <span>Назад</span>
         </Link>

         {postFile?.length != 0 && (
            <div className={s.mid}>
               <Slider
                  {...settings}
               >
                  {postFile?.map((imageSrc, index) => {
                     const key = nanoid()
                     return (
                        <div
                           key={key}
                           className={s.midslider}
                           style={themeStore.currentTheme.btnsTheme}
                        >
                           <button
                              onClick={() => {
                                 const file = originalPostFile[index]
                                 console.log(file)
                                 if (file) {
                                    setSelectedPostImage({ url: URL.createObjectURL(file), id: index, fileName: file.name, file: file })
                                 }
                              }}
                              className={s.editimgbtn}
                              style={currentTheme.btnsTheme}
                           >
                              <EditMsgIcon size={15} />
                           </button>
                           <img src={URL.createObjectURL(imageSrc)} alt={`slide-${index}`} />
                        </div>
                     )
                  })}
               </Slider>
            </div>
         )}

         <div className={s.titlediv}>
            <input
               type="text"
               placeholder="Заголовок"
               value={title}
               onChange={(e) => { e.preventDefault(); e.stopPropagation(); setTitle(e.target.value) }}
            />
            {titleErr && <span style={{ color: 'red', fontSize: '14px' }}>{titleErr}</span>}
         </div>

         {/* EDITOR */}
         <div className={s.editor}>
            <div className={s.editorcontainer}>
               {/* <Editor
                  editorState={editorState}
                  toolbar={toolOptions}
                  wrapperClassName="demo-wrapper"
                  editorClassName="demo-editor"
                  placeholder="Введите текст"
                  onEditorStateChange={onEditorStateChange}
                  editorStyle={{ color: 'white' }}
               /> */}
               {/* <RichTextEditor value={value} onChange={onChange} /> */}
            </div>

            {/* HASHTAGS */}
            <div className={s.hashtagsdiv}>
               <InputUi
                  className="hashtags-inp"
                  placeholder="Хэштеги (Необязательно)"
                  value={inputObj.hashtags}
                  error={inputObjErr.hashtagsErr}
                  setValue={updateInputData}
                  name='hashtags'
                  mainStyle={{}}
               />
            </div>
         </div>

         {/* TAGS */}
         <div className={s.selecttag}>
            <div style={{ padding: '3px 3px 0 0' }}><TagIcon /></div>
            {allTags.map((t, i) => (
               <button
                  key={i}
                  onClick={() => setSelectedTags(t)}
                  className={selectedTags.includes(t) ? s.selected : s.tag}
               >
                  {t}
               </button>
            ))}
         </div>

         {/* CREATE BTN */}
         <div className={s.bottom}>
            <button onClick={handleFileClick}>
               <FileIcon />
            </button>
            <input
               type="file"
               ref={fileInputRef}
               style={{ display: 'none' }}
               accept=".png, .jpg, .jpeg"
               onChange={handleFileChange}
               multiple
            />
            <button
               onClick={handleSubmit}
               className={s.createpostbtn}
            >
               {url == '/main/edit-post' ? 'Изменить' : 'Опубликовать'}
               {isCreating && <SpinLoader size={15} />}
            </button>
         </div>
      </div>
   )
})
