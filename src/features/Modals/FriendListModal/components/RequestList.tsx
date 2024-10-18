import { friendStore } from '@/stores/friend-store/friend-store'
import s from '../FriendListModal.module.scss'
import { observer } from 'mobx-react-lite'
import { ListPending } from './ListPending'
import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import { defaultLogo } from '@/shared/utils/globalData'
import { nanoid } from 'nanoid'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import { AcceptIcon } from '@/assets/icons/Ui/AcceptIcon'
import { RejectIcon } from '@/assets/icons/Ui/RejectIcon'
import { formatDate } from '@/shared/utils/someFunctions'
import { profileStore } from '@/stores/profile-store/profile-store'
import { subscribersStore } from '@/stores/subscribers-store/subscribers-store'
import { useEffect } from 'react'

export const RequestList = observer(({
   type = 'default'
}: RequestListProps) => {
   const navigate = useNavigate()

   // mobx
   const {
      requestLoading,
      requestList,
      hasMoreRequestList,
      staticRequestSearch,
      getRequestListAction,

      acceptFriendRequestAction,
      rejectFriendRequestAction
   } = friendStore

   const { setSubOpen } = subscribersStore

   const { user, profile } = profileStore

   useEffect(() => {
      console.log(requestLoading)
   }, [requestLoading])

   useEffect(() => {
      console.log(requestList)
   }, [requestList])

   return (
      <div id='friendlistscrolldiv' className={s.list}>
         {requestLoading && (
            <ListPending length={requestList?.friendRequests?.length} />
         )}
         {!requestLoading && (
            <InfiniteScroll
               dataLength={requestList?.friendRequests?.length || 0}
               next={() => {
                  getRequestListAction('pagination', type == 'subprofile' ? user.id : profile.id)
               }}
               hasMore={false}
               loader={<ListPending length={5} />}
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
                                 {type == 'default' && <span>{formatDate(request.createdAt)}</span>}
                              </div>
                              <span className={s.tag}>@{tag}</span>
                           </div>
                        </div>
                        <div className={s.requestbtns}>
                           {/* reject friend request */}
                           {type == 'default' && (
                              <button
                                 className={s.acceptbtn}
                                 onClick={e => {
                                    e.preventDefault()
                                    e.stopPropagation()
                                    acceptFriendRequestAction(request.id)
                                 }}
                              >
                                 <AcceptIcon size={17} />
                              </button>
                           )}

                           {type != 'subprofile' && (
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
                           )}
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
                  <>
                     {type == 'default' && <span>У вас нет заявок в друзья</span>}
                     {type == 'sub' && <span>У вас нет подписчиков</span>}
                     {type == 'subprofile' && <span>У {user.name} нет подписчиков</span>}
                  </>
               )}
            </div>
         )}
      </div>
   )
})

interface RequestListProps {
   type?: 'sub' | 'default' | 'subprofile'
}