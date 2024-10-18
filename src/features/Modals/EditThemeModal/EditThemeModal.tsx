import { BlockColor } from '@/assets/icons/MainPage/MyProfile/Settings/BlockColor'
import { BtnsColor } from '@/assets/icons/MainPage/MyProfile/Settings/BtnsColor'
import { CircleIcon } from '@/assets/icons/MainPage/MyProfile/Settings/CirlceIcon'
import { MainTextColor } from '@/assets/icons/MainPage/MyProfile/Settings/MainTextColor'
import { SecondaryTextColor } from '@/assets/icons/MainPage/MyProfile/Settings/SecondaryTextColor'
import { BRadiusPicker } from '@/pages/Main/pages/Settings/components/CustomizationSettings/components/BRadiusPicker/BRadiusPicker'
import { ColorPickerUi } from '@/pages/Main/pages/Settings/components/CustomizationSettings/components/Picker/ColorPickerUi'
import { InputUi } from '@/shared/ui/InputUi'
import { MainText } from '@/shared/ui/Theme/MainText'
import { SecondaryText } from '@/shared/ui/Theme/SecondaryText'
import { getThemePreview } from '@/shared/utils/globalJsxData'
import { createThemeStore } from '@/stores/theme/create-theme-store'
import { themeStore } from '@/stores/theme/theme-store'
import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { RgbaColor } from 'react-colorful'
import s from './EditThemeModal.module.scss'

export const EditThemeModal = observer(() => {
   const {
      currentTheme,
      setBgPreview,
      setBtnsBgPreview,
      setMainColorPreview,
      setSecondaryColorPreview,
      setMyCommentBgPreview,
      setBRadiusPreview,
      currentBg,
      currentThemeObj
   } = themeStore
   const {
      isEditingTheme,
      setIsEditingTheme,
      editThemeAction,
      editThemeObj,
      editThemeObjErr,
      updateEditThemeObj,
      currentThemeName
   } = createThemeStore

   return (
      <Modal
         open={isEditingTheme}
         onCancel={() => setIsEditingTheme(false)}
         footer={<></>}
         centered
         width={425}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span className={s.title}>Редактировать тему с названием "{currentThemeName}"</span>
            </div>

            <div className={s.mid}>
               <InputUi
                  name='name'
                  title='Введите название'
                  placeholder='Великий самурай'
                  inpStyle={{ padding: '10px 0' }}

                  value={editThemeObj.name}
                  setValue={updateEditThemeObj}
                  error={editThemeObjErr.nameErr}
               />

               {/* ВЫБОР ЦВЕТОВ */}
               <div className={s.colors}>
                  <SecondaryText>Настройка цветов</SecondaryText>

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
                           onChange={(newColor: RgbaColor) => setBgPreview(newColor)}
                           isShort={true}
                        />
                     </div>
                  </div>

                  {/* Цвет кнопок */}
                  <div className={s.variant}>
                     <div className={s.left}>
                        <BtnsColor color={currentTheme.textColor.color} />
                        <MainText>Цвет кнопок</MainText>
                     </div>
                     <div className={s.right}>
                        <ColorPickerUi
                           currentColor={themeStore.currentTheme.btnsTheme.background as string}
                           defaultColor={themeStore.defaultTheme.btnsTheme.background as string}
                           onChange={(newColor: RgbaColor) => setBtnsBgPreview(newColor)}
                           isShort={true}
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
                           onChange={(newColor: RgbaColor) => setMyCommentBgPreview(newColor)}
                           isShort={true}
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
                           onChange={(newColor: RgbaColor) => setMainColorPreview(newColor)}
                           isShort={true}
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
                           onChange={(newColor: RgbaColor) => setSecondaryColorPreview(newColor)}
                           isShort={true}
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
                           onChange={(newRadius: string) => setBRadiusPreview(newRadius)}
                           isShort={true}
                        />
                     </div>
                  </div>
               </div>

               {/* PREVIEW MODE */}
               <div className={s.previewcontainer}>
                  <div
                     className={s.previewtheme}
                     style={{ backgroundImage: `url(${currentBg})` }}
                  >
                     {currentThemeObj && getThemePreview(currentThemeObj)}
                  </div>
               </div>
            </div>

            <div className={s.bot}>
               <button
                  className={s.submit}
                  onClick={editThemeAction}
               >
                  Сохранить
               </button>
               <button
                  className={s.cancel}
                  style={currentTheme.btnsTheme}
                  onClick={() => setIsEditingTheme(false)}
               >
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
            </div>
         </div>
      </Modal>
   )
})