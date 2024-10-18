import { BlockColor } from '@/assets/icons/MainPage/MyProfile/Settings/BlockColor'
import { BtnsColor } from '@/assets/icons/MainPage/MyProfile/Settings/BtnsColor'
import { CircleIcon } from '@/assets/icons/MainPage/MyProfile/Settings/CirlceIcon'
import { MainTextColor } from '@/assets/icons/MainPage/MyProfile/Settings/MainTextColor'
import { SaveThemeIcon } from '@/assets/icons/MainPage/MyProfile/Settings/SaveThemeIcon'
import { SecondaryTextColor } from '@/assets/icons/MainPage/MyProfile/Settings/SecondaryTextColor'
import { BackArrowLeftIcon } from '@/assets/icons/Ui/BackArrowLeftIcon'
import { PremiumIcon } from '@/assets/icons/Ui/PremiumIcon'
import { CreateTheme } from '@/features/Modals/CreateTheme/CreateTheme'
import { ViewThemeModal } from '@/features/Modals/ViewThemeModal/ViewThemeModal'
import { MainText } from '@/shared/ui/Theme/MainText'
import { getThemePreview } from '@/shared/utils/globalJsxData'
import { isMobile } from '@/shared/utils/someFunctions'
import { settingsStore } from '@/stores/settings-store/settings-store'
import { createThemeStore } from '@/stores/theme/create-theme-store'
import { themeStore } from '@/stores/theme/theme-store'
import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { RgbaColor } from 'react-colorful'
import { useParams } from 'react-router-dom'
import { BRadiusPicker } from './components/BRadiusPicker/BRadiusPicker'
import { ColorPickerUi } from './components/Picker/ColorPickerUi'
import { ThemeSelect } from './components/ThemeSelect/ThemeSelect'
import s from './CustomizationSettings.module.scss'

export const CustomizationSettings = observer(() => {
   const {
      currentTheme,
      setBg,
      setBtnsBg,
      setMainColor,
      setSecondaryColor,
      setBRadius,
      wallpapersList,
      changeWallpaper,
      themesList,
      currentBg,
      changeTheme,
      setMyCommentBg
   } = themeStore

   const {
      setIsCreatingTheme,
      getThemeAction,
      getThemesList,
      setCurrentThemeName,
      setIsThemeViewing
   } = createThemeStore

   const { setIsMobileAside } = settingsStore

   const themeId = useParams()

   useEffect(() => { getThemeAction() }, [getThemeAction])
   useEffect(() => {
      if (!themeId.themeId) return
      setIsThemeViewing(true)
   }, [themeId])

   return (
      <div className={s.main}>
         <CreateTheme />
         {themeId.themeId && <ViewThemeModal themeId={themeId.themeId as string} />}
         <div
            className='privacy-settings-top'
            style={isMobile() ? { display: 'flex', gap: '20px', flexDirection: 'column' } : {}}
         >
            {isMobile() && (
               <button
                  onClick={() => setIsMobileAside(false)}
                  className={'backbtn'}
               >
                  <BackArrowLeftIcon width={20} color={currentTheme.textColor.color} />
                  <MainText>Назад</MainText>
               </button>
            )}
            <span>Кастомизация</span>
         </div>
         <div className={s.colors}>
            <span style={currentTheme.secondTextColor}>Настройка цветов</span>

            {/* Цвет блоков */}
            <div className={s.variant}>
               <div className={s.left}>
                  <BlockColor color={currentTheme.textColor.color} />
                  <span style={currentTheme.textColor}>Цвет блоков</span>
               </div>
               <div className={s.right}>
                  <ColorPickerUi
                     currentColor={themeStore.currentTheme.bgTheme.background as string}
                     defaultColor={themeStore.defaultTheme.bgTheme.background as string}
                     onChange={(newColor: RgbaColor) => setBg(newColor)}
                  />
               </div>
            </div>

            {/* Цвет кнопок */}
            <div className={s.variant}>
               <div className={s.left}>
                  <BtnsColor color={currentTheme.textColor.color} />
                  <span style={currentTheme.textColor}>Цвет кнопок</span>
               </div>
               <div className={s.right}>
                  <ColorPickerUi
                     currentColor={themeStore.currentTheme.btnsTheme.background as string}
                     defaultColor={themeStore.defaultTheme.btnsTheme.background as string}
                     onChange={(newColor: RgbaColor) => setBtnsBg(newColor)}
                  />
               </div>
            </div>

            {/* Цвет своих комментариев */}
            <div className={s.variant}>
               <div className={s.left}>
                  <BtnsColor color={currentTheme.textColor.color} />
                  <span style={currentTheme.textColor}>Цвет своих комментариев</span>
               </div>
               <div className={s.right}>
                  <ColorPickerUi
                     currentColor={themeStore.currentTheme.textColor.color as string}
                     defaultColor={themeStore.defaultTheme.textColor.color as string}
                     onChange={(newColor: RgbaColor) => setMyCommentBg(newColor)}
                  />
               </div>
            </div>

            {/* Цвет основных интерфейсов */}
            <div className={s.variant}>
               <div className={s.left}>
                  <MainTextColor color={currentTheme.textColor.color} />
                  <span style={currentTheme.textColor}>Цвет основных интерфейсов</span>
               </div>
               <div className={s.right}>
                  <ColorPickerUi
                     currentColor={themeStore.currentTheme.textColor.color as string}
                     defaultColor={themeStore.defaultTheme.textColor.color as string}
                     onChange={(newColor: RgbaColor) => setMainColor(newColor)}
                  />
               </div>
            </div>

            {/* Цвет второстепенных интерфейсов */}
            <div className={s.variant}>
               <div className={s.left}>
                  <SecondaryTextColor color={currentTheme.textColor.color} />
                  <span style={currentTheme.textColor}>Цвет второстепенных интерфейсов</span>
               </div>
               <div className={s.right}>
                  <ColorPickerUi
                     currentColor={themeStore.currentTheme.secondTextColor.color as string}
                     defaultColor={themeStore.defaultTheme.secondTextColor.color as string}
                     onChange={(newColor: RgbaColor) => setSecondaryColor(newColor)}
                  />
               </div>
            </div>
         </div>

         {/* РАДИУС ЗАКРУГЛЕНИЯ */}
         <div className={s.radiusdiv}>
            <span style={currentTheme.secondTextColor}>Настройка интерфейса</span>

            <div className={s.radius}>
               <div className={s.left}>
                  <CircleIcon color={currentTheme.textColor.color} />
                  <span style={currentTheme.textColor}>Радиус закругления контейнеров</span>
               </div>

               <div className={s.right}>
                  <BRadiusPicker
                     currentRadius={(themeStore.currentTheme.bgTheme.borderRadius as string).replace('px', '')}
                     defaultRadius={(themeStore.defaultTheme.bgTheme.borderRadius as string).replace('px', '')}
                     onChange={(newRadius: string) => setBRadius(newRadius)}
                  />
               </div>
            </div>
         </div>

         {/* ОБОИ */}
         <div className={s.wallpapers}>
            <span style={currentTheme.secondTextColor}>Обои</span>

            <div className={s.scroll}>
               {wallpapersList.map((w, i) => {
                  return (
                     <div
                        key={i}
                        className={s.wallpaperdiv}
                     >
                        <div
                           className={s.wallpaper}
                           onClick={() => changeWallpaper(w.image)}
                           style={{ backgroundImage: `url(${w.image})` }}
                        ></div>

                        <div className={s.bottom}>
                           <div className={s.title}>
                              <span>{w.title}</span>
                           </div>
                           {w.isPremium && <PremiumIcon />}
                        </div>
                     </div>
                  )
               })}
            </div>
         </div>

         {/* ТЕМЫ */}
         <div className={s.themes}>
            <span style={currentTheme.secondTextColor}>Темы</span>

            <div className={s.scroll}>
               <div className={s.mythemes}>
                  <div
                     className={s.createtheme}
                  >
                     <button
                        className={s.createthemebtn}
                        onClick={() => setIsCreatingTheme(true)}
                     >
                        <SaveThemeIcon />
                     </button>
                  </div>
               </div>

               {/* ТЕМЫ ПОЛЬЗОВАТЕЛЯ */}
               {getThemesList.map(t => {
                  return (
                     <div
                        className={s.mythemeslist}
                        key={t.id}
                     >
                        <button
                           className={s.theme}
                           style={{ backgroundImage: `url(${currentBg})` }}
                           onClick={() => {
                              setCurrentThemeName(t)
                              changeTheme(t.theme)
                           }}
                        >
                           {getThemePreview(t.theme)}
                        </button>

                        <div className={s.bottom}>
                           <div className={s.title}>
                              <span>{t.name}</span>
                           </div>
                           <ThemeSelect theme={t} />
                        </div>
                     </div>
                  )
               })}
               <div className={s.stick}></div>
               {themesList.map((t, i) => (
                  <div
                     key={i}
                     className={s.themediv}
                  >
                     <div
                        className={s.theme}
                        style={{ backgroundImage: `url(${currentBg})` }}
                        onClick={() => changeTheme(t.colors)}
                     >
                        {getThemePreview(t.colors)}
                     </div>

                     <div className={s.bottom}>
                        <div className={s.title}>
                           <span>{t.title}</span>
                        </div>
                        {t.isPremium && <PremiumIcon />}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </div>
   )
})
