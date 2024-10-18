import { Modal } from 'antd'
import s from './FriendListModal.module.scss'
import { observer } from 'mobx-react-lite'
import { friendStore } from '@/stores/friend-store/friend-store'
import { InputUi } from '@/shared/ui/InputUi'
import { SearchIcon } from '@/assets/icons/MainPage/Posts/SearchIcon'
import { FriendList } from './components/FriendList'
import { RequestList } from './components/RequestList'
import useDebounce from '@/shared/hooks/useDebounce'
import { useEffect, useState } from 'react'
import { profileStore } from '@/stores/profile-store/profile-store'
import { useParams } from 'react-router-dom'

interface FriendListModalProps {
   type?: 'myprofile' | 'profile'
}

export const FriendListModal = observer(({
   type = 'myprofile'
}: FriendListModalProps) => {
   const { userId } = useParams()
   // mobx
   const {
      open,
      setOpen,
      whatOpen,
      setWhatOpen,

      friendSearch,
      requestSearch,
      setFriendSearch,
      setRequestSearch,
      getFriendListAction,
      setFriendLoading,
      setRequestLoading,
      getRequestListAction,
      setFriendPage,
      setRequestPage,
      clearAllRequest
   } = friendStore

   const { user, profile } = profileStore
   const [isDisabled, setIsDisabled] = useState(false)

   const debounceFriend = useDebounce(friendSearch, 500)
   const debounceRequest = useDebounce(requestSearch, 500)

   useEffect(() => {
      const status = user?.friendStatus
      const is = user?.isFriendView
      if (is == 'none') {
         setIsDisabled(true)
         return
      }
      if (is == 'friends' && (status == 'notfriend' || status == 'pending')) {
         setIsDisabled(true)
         return
      }
   }, [])

   useEffect(() => {
      if (userId) {
         setFriendPage(1)
         setRequestPage(1)
      }
      setFriendLoading(false)
      if (type == 'myprofile') getFriendListAction('search', profile?.id)
      if (type == 'profile' && user?.isFriendView == 'none') return
      if (type == 'profile' && (user?.isFriendView == 'all' || user?.friendStatus == 'friend')) {
         getFriendListAction('search', userId ? userId : user?.id)
      }
   }, [debounceFriend, userId])

   useEffect(() => {
      setRequestLoading(false)
      getRequestListAction('search', type == 'myprofile' ? profile?.id : (userId ? userId : user?.id))
   }, [debounceRequest, userId])

   useEffect(() => {
      return () => {
         if (!open) clearAllRequest()
      }
   }, []);

   return (
      <Modal
         open={open}
         onCancel={() => setOpen(false)}
         footer={<></>}
         centered
         width={400}
      >
         <div>
            <div className={s.top}>
               <span className={s.title}>{`Список ${whatOpen == 'friends' ? 'друзей' : 'заявок'}`}</span>
               <div className={s.moves}>
                  {type == 'myprofile' && (
                     <div className={s.btns}>
                        {/* FRIENDS BTN */}
                        <button
                           className={whatOpen == 'friends' ? s.activebtn : s.btn}
                           onClick={() => setWhatOpen('friends')}
                        >
                           Список друзей
                        </button>

                        {/* REQUESTS BTN */}
                        <button
                           className={whatOpen == 'requests' ? s.activebtn : s.btn}
                           onClick={() => setWhatOpen('requests')}
                        >
                           Список заявок
                        </button>
                     </div>
                  )}
                  <InputUi
                     placeholder={`Поиск ${whatOpen == 'friends' ? 'друзей' : 'заявок'}`}
                     icon={<SearchIcon />}
                     mainStyle={{ height: '45px', background: '#1C1B1B' }}
                     value={whatOpen == 'friends' ? friendSearch : requestSearch}
                     setValue={whatOpen == 'friends' ? setFriendSearch : setRequestSearch}
                     callback={whatOpen == 'friends' ? setFriendLoading : setRequestLoading}
                     disabled={type == 'myprofile' ? false : isDisabled}
                  />
               </div>
            </div>

            <div className={s.bottom}>
               {whatOpen == 'friends' && <FriendList type={type} />}
               {whatOpen == 'requests' && type == 'myprofile' && <RequestList />}
            </div>
         </div>
      </Modal>
   )
})