import { ConfigProvider } from 'antd'
import ruRU from 'antd/lib/locale/ru_RU'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { SkeletonTheme } from 'react-loading-skeleton'
import { useLocation, useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { MainRoutes } from './layouts/MainRoutes'
import { themeStore } from './stores/theme/theme-store'

export const App = observer(() => {
  const path = useLocation().pathname
  const navigate = useNavigate()
  const { currentTheme } = themeStore
  // const { setUserLineStatus, selectedChat } = chatStore

  // const connectChatSocket = () => {
  //   console.log("asd")
  //   socket.on('user-online-status', (message) => {
  //     console.log(`User ${message.userId} is ${message.isOnline ? 'online' : 'offline'}`)
  //     console.log(id)
  //     if (message.userId !== id) {
  //       setUserLineStatus(message.isOnline ? 'online' : 'offline')
  //     }
  //   })
  // }

  // const setIsUserOnline = (isOnline: boolean) => {
  //   console.log(`User is ${isOnline ? 'online' : 'offline'}`)
  //   console.log({ userId: id, isOnline, chatId: selectedChat?.id })
  //   socket.emit('set-user-online', { userId: id, isOnline, chatId: selectedChat?.id })
  // }

  // if bro in '/' return him to reg page
  useEffect(() => {
    path === '/' && navigate('/sign-in')
    // if (path === '/sign-in' || path === '/sign-up' || path == '/') document.body.classList.add('no-background')
    // else document.body.classList.remove('no-background')
  }, [])

  // useEffect(() => {
  //   connectChatSocket()
  //   const handleVisibilityChange = () => {
  //     if (document.hidden) {
  //       // User is not looking at the tab
  //       setIsUserOnline(false)
  //       console.log('asd')
  //     } else {
  //       // User has returned to the tab
  //       setIsUserOnline(true)
  //       console.log('asd')
  //     }
  //   }

  //   const handleBeforeUnload = () => {
  //     // User is about to leave the page
  //     setIsUserOnline(false)
  //     console.log('asd')
  //   }

  //   const handleUnload = () => {
  //     // User has left the page
  //     setIsUserOnline(false)
  //     console.log('asd')
  //   }

  //   document.addEventListener('visibilitychange', handleVisibilityChange)
  //   window.addEventListener('beforeunload', handleBeforeUnload)
  //   window.addEventListener('unload', handleUnload)

  //   return () => {
  //     document.removeEventListener('visibilitychange', handleVisibilityChange)
  //     window.removeEventListener('beforeunload', handleBeforeUnload)
  //     window.removeEventListener('unload', handleUnload)
  //   }
  // }, [])

  return (
    <ConfigProvider
      locale={ruRU}
      theme={{
        components: {
          Select: {
            colorText: themeStore.currentTheme.textColor.color as string,
            colorBgContainer: path == '/main/settings/goals-plans' ? themeStore.currentTheme.bgTheme.background as string : '#181818',
            colorBorder: 'rgba(255, 255, 255, 0.14)',
            colorTextPlaceholder: themeStore.currentTheme.secondTextColor.color as string,
            colorBgElevated: '#181818',

            colorPrimaryBgHover: 'rgba(255, 255, 255, 0.14)',
            controlItemBgActive: '#292929',
            colorPrimaryHover: '#181818',
            colorPrimary: 'rgb(14, 2, 21)',
          },

          Modal: {
            colorBgBase: '#dd001d',
            colorBgContainer: '#dd001d',
            colorBgElevated: '#272727',
            colorTextHeading: themeStore.currentTheme.textColor.color as string,
            colorTextBase: themeStore.currentTheme.textColor.color as string,
            colorBgMask: '#11111176',
            borderRadiusLG: 20,
            colorText: themeStore.currentTheme.textColor.color as string,
            colorTextDescription: themeStore.currentTheme.textColor.color as string,
            contentBg: themeStore.currentTheme.bgTheme.background as string,
            headerBg: themeStore.currentTheme.bgTheme.background as string
          },

          DatePicker: {
            colorBgContainer: path == '/main/settings/goals-plans' ? themeStore.currentTheme.bgTheme.background as string : 'rgb(57, 57, 57)',
            borderRadius: 10,
            colorText: themeStore.currentTheme.textColor.color as string,
            fontSize: 15,

            colorTextPlaceholder: '#BABABA',
            colorBgElevated: '#1f1f1f',
            cellHoverBg: 'rgba(255, 255, 255, 0.06)',
            colorBorder: '#393939',
            hoverBorderColor: '#242424',
            activeBorderColor: '#393939',
            colorTextDisabled: themeStore.currentTheme.secondTextColor.color as string,
            colorTextHeading: themeStore.currentTheme.textColor.color as string,
          },

          Checkbox: {
            colorBgContainer: currentTheme.btnsTheme.background as string,
          }
        }
      }}
    >
      <SkeletonTheme
        baseColor={currentTheme.bgTheme.background as string}
        highlightColor="#444"
      >
        <ToastContainer />
        <MainRoutes />
      </SkeletonTheme>
    </ConfigProvider>
  )
})