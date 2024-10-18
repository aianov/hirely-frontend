import { Chat } from '@/pages/Main/pages/Chat/Chat'
import { Chats } from '@/pages/Main/pages/Chats/Chats'
import { NewsPage } from '@/pages/Main/pages/News/News'
import { NotificationsPage } from '@/pages/Main/pages/Notifications/Notifications'
import { Posts } from '@/pages/Main/pages/Posts/Posts'
import { UserGoals } from '@/pages/Main/pages/Profile/components/UserGoals/UserGoals'
import { UserPlans } from '@/pages/Main/pages/Profile/components/UserPlans/UserPlans'
import { UserPosts } from '@/pages/Main/pages/Profile/components/UserPosts/UserPosts'
import { Profile } from '@/pages/Main/pages/Profile/Profile'
import { CustomizationSettings } from '@/pages/Main/pages/Settings/components/CustomizationSettings/CustomizationSettings'
import { GoalsPlansSettings } from '@/pages/Main/pages/Settings/components/GoalsPlansSettings/GoalsPlansSettings'
import { Moderation } from '@/pages/Main/pages/Settings/components/Moderation/Moderation'
import { NotificationSettings } from '@/pages/Main/pages/Settings/components/NotificationSettings/NotificationSettings'
import { PrivacySettings } from '@/pages/Main/pages/Settings/components/PrivacySettings/PrivacySettings'
import { ProfileSettings } from '@/pages/Main/pages/Settings/components/ProfileSettings/ProfileSettings'
import { Sessions } from '@/pages/Main/pages/Settings/components/Sessions/Sessions'
import { SubscriptionSettings } from '@/pages/Main/pages/Settings/components/SubscriptionSettings/SubscriptionSettings'
import { Settings } from '@/pages/Main/pages/Settings/Settings'
import { profileStore } from '@/stores/profile-store/profile-store'
import { CreatePost } from '@pages/Main/pages/CreatePost/CreatePost'
import { MyProfile } from '@pages/Main/pages/MyProfile/MyProfile'
import { SignIn } from '@pages/Sign/SignIn/SignIn'
import { authApiStore } from '@stores/api/auth/auth-store'
import { Route, Routes } from "react-router-dom"
import { MainLayout } from './MainLayout/MainLayout'
import { SignLayout } from "./SignLayout/SignLayout"

export const MainRoutes = () => {
  const { isAuth } = authApiStore
  const { profile, user } = profileStore

  return (
    <Routes>

      {/* SIGN-UP/IN */}
      <Route path="/" element={<SignLayout />}>
        <Route path="/sign-in" element={<SignIn />} />
      </Route>

      <Route path="/main" element={<MainLayout />}>

        {/* POSTS */}
        <Route path="/main/posts" element={<Posts />} />
        <Route path="/main/create-post" element={<CreatePost />} />
        <Route path="/main/edit-post" element={<CreatePost />} />
        <Route path="/main/news" element={<NewsPage />} />
        <Route path='/main/vacancy' element={<></>} />
        <Route path='/main/leaderboard' element={<></>} />
        <Route path='/main/about-us' element={<></>} />
        <Route path='/main/cooperation' element={<></>} />
        <Route path='/main/notifications' element={<NotificationsPage />} />

        {/* SETTINGS */}
        <Route path="/main/settings" element={<Settings />}>
          <Route index element={<ProfileSettings />} />
          <Route path='privacy' element={<PrivacySettings />} />
          <Route path='notifications' element={<NotificationSettings />} />
          <Route path='subscription' element={<SubscriptionSettings />} />
          <Route path='customization' element={<CustomizationSettings />} />
          <Route path='customization/:themeId' element={<CustomizationSettings />} />
          <Route path='goals-plans' element={<GoalsPlansSettings />} />
          <Route path='sessions' element={<Sessions />} />
          <Route path='moderation' element={<Moderation />} />
        </Route>


        {/* MY PROFILE */}
        {isAuth && (
          <Route path="/main/my-profile" element={<MyProfile />}>
            <Route path="/main/my-profile" element={<UserPosts />} />
            <Route path="/main/my-profile/plans" element={<UserPlans user={profile} which='my' />} />
            <Route path="/main/my-profile/goals" element={<UserGoals user={profile} which='my' />} />
          </Route>
        )}

        {/* SELECTED USER PROFILE */}
        <Route path="/main/profile/:tag" element={<Profile />}>
          <Route index element={<UserPosts />} />
          <Route path="plans" element={<UserPlans user={user!} which='other' />} />
          <Route path="goals" element={<UserGoals user={user!} which='other' />} />
        </Route>

        {/* CHATS */}
        <Route path='/main/chats' element={<Chats />} />

        {/* CHAT */}
        <Route path='/main/chat/:chatId' element={<Chat />} />

      </Route>
    </Routes>
  )
}
