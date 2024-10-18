import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import { RejectIcon } from '@/assets/icons/Ui/RejectIcon'
import { defaultLogo } from '@/shared/utils/globalData'
import { friendStore } from '@/stores/friend-store/friend-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { subscribersStore } from '@/stores/subscribers-store/subscribers-store'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { useEffect } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useLocation, useNavigate } from 'react-router-dom'
import { ListPending } from '../../FriendListModal/components/ListPending'
import s from '../../FriendListModal/FriendListModal.module.scss'

export const SubscribersList = observer(() => {
   const navigate = useNavigate()
   const url = useLocation().pathname

   // mobx
   const {
      requestLoading,
      requestList,
      hasMoreRequestList,
      clearAllRequest,
      staticRequestSearch,
      getRequestListAction,
      setOpen,

      acceptFriendRequestAction,
      rejectFriendRequestAction
   } = friendStore

   const { setSubOpen } = subscribersStore

   const { user, profile } = profileStore

   useEffect(() => {
      return () => clearAllRequest()
   }, [])

   return (
      <div id='friendlistscrolldiv' className={s.list}>
         {requestLoading && (
            <ListPending length={requestList?.friendRequests?.length} />
         )}
         {!requestLoading && (
            <InfiniteScroll
               dataLength={requestList?.friendRequests?.length || 0}
               next={() => { getRequestListAction('pagination', url == '/main/my-profile' ? profile.id : user.id) }}
               hasMore={hasMoreRequestList}
               loader={<></>}
               scrollableTarget="friendlistscrolldiv"
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
               }}
            >
               {requestList?.friendRequests?.map((request) => {
                  const logo = request.sender.more.logo
                  const name = request.sender.name
                  const tag = request.sender.tag

                  return (
                     <button
                        key={nanoid()}
                        className={s.row}
                        onClick={() => {
                           setSubOpen(false)
                           navigate(`/main/profile/${tag}`)
                        }}
                     >
                        <div className={s.left}>
                           <div className={s.imgdiv}>
                              <img src={logo ? logo : defaultLogo} alt="requestuserlogo" />
                           </div>
                           <div className={s.names}>
                              <div className={s.namesdiv}>
                                 <span className={s.name}>{name}</span>
                              </div>
                              <span className={s.tag}>@{tag}</span>
                           </div>
                        </div>
                        <div className={s.requestbtns}>
                           {/* reject friend request */}
                           <button
                              className={s.rejectbtn}
                              onClick={e => {
                                 e.preventDefault()
                                 e.stopPropagation()
                                 rejectFriendRequestAction(request.senderId)
                              }}
                           >
                              <RejectIcon size={17} />
                           </button>
                        </div>
                     </button>
                  )
               })}
            </InfiniteScroll>
         )}
         {requestList?.friendRequests?.length == 0 && (
            <div className={s.notfound}>
               <NotFoundIcon />
               {staticRequestSearch !== '' ? (
                  <span>Заявки в друзья по запросу "{staticRequestSearch}" не найдены</span>
               ) : (
                  <span>У {user.name} нет подписчиков</span>
               )}
            </div>
         )}
      </div>
   )
})