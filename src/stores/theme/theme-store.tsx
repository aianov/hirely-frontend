import { globalThemesList } from '@/shared/utils/globalData'
import TwoSamurais from '@images/BgTheme1.png'
import Afrosamurai from '@images/BgTheme2.png'
import LastSamurai from '@images/WallpaperLastSamurai.png'
import SakuraTree from '@images/WallpaperSakura.png'
import { makeAutoObservable, toJS } from 'mobx'
import { RgbaColor } from 'react-colorful'
import { ThemeListT, ThemeT } from './types'

class ThemeStore {
   constructor() {
      this.defaultTheme = {
         bgTheme: {
            background: "#171717",
            border: '1px solid rgb(83, 83, 83)',
            borderRadius: '20px'
         },
         bodyBg: {
            background: "#1d1d1d"
         },
         btnsTheme: {
            background: "#272727",
         },
         textColor: {
            color: 'rgba(255, 255, 255, 1)',
         },
         secondTextColor: {
            color: 'rgba(186, 186, 186, 1)',
         },
         myCommentBgTheme: {
            background: 'rgba(53, 53, 53, 1)'
         }
      }

      this.currentTheme = { ...this.defaultTheme }

      document.body.style.backgroundColor = this.currentTheme.bodyBg.background as string

      // @ts-ignore
      this.themesList.unshift({ colors: this.defaultTheme, title: 'Стандартная', isPremium: false })

      makeAutoObservable(this, {}, { deep: false })
   }

   defaultTheme: ThemeT
   currentTheme: ThemeT
   currentThemeObj: ThemeT | undefined

   wallpapersList = [
      { title: 'Афросамурай', isPremium: false, image: Afrosamurai },
      { title: 'Самурай воин', isPremium: false, image: TwoSamurais },
      { title: 'Последний самурай', isPremium: true, image: LastSamurai },
      { title: 'Цветение сакуры', isPremium: true, image: SakuraTree },
   ]

   themesList: ThemeListT[] = [...globalThemesList]
   // currentBg: string

   setBg = (e: RgbaColor) => {
      this.currentTheme = {
         ...this.currentTheme,
         bgTheme: {
            ...this.currentTheme.bgTheme,
            background: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }
   };

   setMyCommentBg = (e: RgbaColor) => {
      this.currentTheme = {
         ...this.currentTheme,
         myCommentBgTheme: {
            ...this.currentTheme.myCommentBgTheme,
            background: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         }
      }
   }

   setBtnsBg = (e: RgbaColor) => {
      this.currentTheme = {
         ...this.currentTheme,
         btnsTheme: {
            ...this.currentTheme.btnsTheme,
            background: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }
   }

   setMainColor = (e: RgbaColor) => {
      this.currentTheme = {
         ...this.currentTheme,
         textColor: {
            ...this.currentTheme.textColor,
            color: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }
   }

   setSecondaryColor = (e: RgbaColor) => {
      this.currentTheme = {
         ...this.currentTheme,
         secondTextColor: {
            ...this.currentTheme.secondTextColor,
            color: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }
   }

   setBRadius = (radius: string) => {
      if (radius.length > 3) return
      this.currentTheme = {
         ...this.currentTheme,
         bgTheme: {
            ...this.currentTheme.bgTheme,
            borderRadius: `${radius}px`
         }
      }
   }

   // changeWallpaper = (url: string) => {
   //    this.currentBg = url
   //    document.body.style.backgroundImage = `url(${url})`
   // }

   changeTheme = (colors: ThemeT) => {
      colors = toJS(colors)
      this.currentTheme = colors
   }

   // PREVIEW MODE EDITING THEME
   setBgPreview = (e: RgbaColor) => {
      if (!this.currentThemeObj) return
      this.currentThemeObj = {
         ...this.currentThemeObj,
         bgTheme: {
            ...this.currentThemeObj.bgTheme,
            background: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }
   };

   setMyCommentBgPreview = (e: RgbaColor) => {
      if (!this.currentThemeObj) return
      this.currentThemeObj = {
         ...this.currentThemeObj,
         myCommentBgTheme: {
            ...this.currentThemeObj.myCommentBgTheme,
            background: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         }
      }
   }

   setBtnsBgPreview = (e: RgbaColor) => {
      if (!this.currentThemeObj) return
      this.currentThemeObj = {
         ...this.currentThemeObj,
         btnsTheme: {
            ...this.currentThemeObj.btnsTheme,
            background: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }
   }

   setMainColorPreview = (e: RgbaColor) => {
      if (!this.currentThemeObj) return
      this.currentThemeObj = {
         ...this.currentThemeObj,
         textColor: {
            ...this.currentThemeObj.textColor,
            color: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }
   }

   setSecondaryColorPreview = (e: RgbaColor) => {
      if (!this.currentThemeObj) return
      this.currentThemeObj = {
         ...this.currentThemeObj,
         secondTextColor: {
            ...this.currentThemeObj.secondTextColor,
            color: `rgba(${e.r}, ${e.g}, ${e.b}, ${e.a})`,
         },
      }

      console.log(this.currentThemeObj)
   }

   setBRadiusPreview = (radius: string) => {
      if (!this.currentThemeObj) return
      if (radius.length > 3) return
      this.currentThemeObj = {
         ...this.currentThemeObj,
         bgTheme: {
            ...this.currentThemeObj.bgTheme,
            borderRadius: `${radius}px`
         }
      }
   }

   setCurrentThemeObj = (theme: ThemeT) => this.currentThemeObj = toJS(theme)

}

export const themeStore = new ThemeStore()
