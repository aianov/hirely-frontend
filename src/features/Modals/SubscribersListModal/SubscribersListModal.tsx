import { Modal } from 'antd'
import s from '../FriendListModal/FriendListModal.module.scss'
import { observer } from 'mobx-react-lite'
import { subscribersStore } from '@/stores/subscribers-store/subscribers-store'
import { InputUi } from '@/shared/ui/InputUi'
import { SearchIcon } from '@/assets/icons/MainPage/Posts/SearchIcon'
import { RequestList } from '../FriendListModal/components/RequestList'
import { SubscribersList } from './components/SubscribersList'

interface SubscribersListModalProps {
   type?: 'myprofile' | 'profile'
}
export const SubscribersListModal = observer(({
   type = 'myprofile'
}: SubscribersListModalProps) => {
   const {
      open,
      setSubOpen,
      subscribeSearch,
      setSubscribeSearch,
      subscribeLoading,
      setSubscribeLoading
   } = subscribersStore

   return (
      <Modal
         open={open}
         onCancel={() => setSubOpen(false)}
         footer={<></>}
         centered
         width={400}
      >
         <div>
            <div className={s.top}>
               <span className={s.title}>{`Список подписчиков`}</span>
               <div className={s.moves}>
                  <InputUi
                     placeholder={`Поиск подписчиков`}
                     icon={<SearchIcon />}
                     mainStyle={{ height: '45px', background: '#1C1B1B' }}
                     value={subscribeSearch}
                     setValue={setSubscribeSearch}
                     callback={setSubscribeLoading}
                  />
               </div>
            </div>

            <div className={s.bottom}>
               <SubscribersList />
            </div>
         </div>
      </Modal>
   )
})