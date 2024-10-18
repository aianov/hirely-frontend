import { NotFoundIcon } from '@/assets/icons/Ui/NotFoundIcon'
import { RemoveFriendIcon } from '@/assets/icons/Ui/RemoveFriend'
import { defaultLogo } from '@/shared/utils/globalData'
import { friendStore } from '@/stores/friend-store/friend-store'
import { profileStore } from '@/stores/profile-store/profile-store'
import { observer } from 'mobx-react-lite'
import { nanoid } from 'nanoid'
import { useEffect, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate } from 'react-router-dom'
import s from '../FriendListModal.module.scss'
import { ListPending } from './ListPending'

interface FriendListProps {
   type: 'myprofile' | 'profile'
}

export const FriendList = observer(({
   type = 'myprofile'
}: FriendListProps) => {
   const navigate = useNavigate()
   const [dataLength, setDataLength] = useState(0)

   // mobx
   const {
      friendList,
      getFriendListAction,
      hasMoreFriendList,
      friendLoading,
      staticFriendSearch,
      removeFriendAction,
      setOpen
   } = friendStore

   const { user, profile } = profileStore

   useEffect(() => {
      setDataLength(friendList?.friends?.length!)
   }, [friendList?.friends?.length])

   if (user.isFriendView == 'none' && type == 'profile') return (
      <div className={s.viewblocked}>
         <NotFoundIcon />
         <p>{user.name} скрыл список друзей</p>
      </div>
   )

   if (user.isFriendView == 'friends' && type == 'profile' && (user.friendStatus != 'friend')) return (
      <div className={s.viewblocked}>
         <NotFoundIcon />
         <p className='tac'>{user.name} показывает список друзей только друзьям</p>
      </div>
   )

   return (
      <div className={`${s.list} friendlist-scrolldiv`}>
         {friendLoading && (
            <ListPending length={friendList?.friends?.length} />
         )}
         {!friendLoading && (
            <InfiniteScroll
               dataLength={dataLength}
               next={() => {
                  getFriendListAction('pagination', type == 'myprofile' ? profile.id : user.id)
               }}
               hasMore={false}
               loader={<ListPending length={friendList?.friends?.length} />}
               scrollableTarget="friendlist-scrolldiv"
               style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
               }}
            >
               {friendList?.friends?.map((friend) => {
                  const friendId = friend.friendId
                  const logo = friend.friend.more.logo
                  const name = friend.friend.name
                  const tag = friend.friend.tag

                  return (
                     <button
                        key={nanoid()}
                        className={s.row}
                        onClick={() => {
                           navigate(`/main/profile/${tag}`)
                           setOpen(false)
                        }}
                     >
                        <div className={s.left}>
                           <div className={s.imgdiv}>
                              <img src={logo ? logo : defaultLogo} alt="friendlogo" />
                           </div>
                           <div className={s.names}>
                              <span className={s.name}>{name}</span>
                              <span className={s.tag}>@{tag}</span>
                           </div>
                        </div>
                        {type == 'myprofile' && (
                           <button
                              className={s.rightbtn}
                              onClick={e => {
                                 e.preventDefault()
                                 e.stopPropagation()
                                 removeFriendAction(friendId)
                              }}
                           >
                              <RemoveFriendIcon />
                           </button>
                        )}
                     </button>
                  )
               })}
            </InfiniteScroll>
         )}
         {friendList?.friends?.length == 0 && (
            <div className={s.notfound}>
               <NotFoundIcon />
               {staticFriendSearch !== '' ? (
                  <span>Друзья по запросу "{staticFriendSearch}" не найдены</span>
               ) : (
                  <>
                     {type == 'myprofile' && <span>У вас нет друзей</span>}
                     {type == 'profile' && <span>У {user.name} нет друзей</span>}
                  </>
               )}
            </div>
         )}
      </div>
   )
})