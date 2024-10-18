export interface ProfileSettingsT {
   logo: null | File | string
   description: string
   name: string
   tag: string
   hb: string | Date | null
   p_lang: string[]
   who: string
}

export interface ProfileSettingsErrT {
   logoErr: string
   descriptionErr: string
   nameErr: string
   tagErr: string
   hbErr: string
   p_langErr: string
   whoErr: string
}

export interface GoalsT {
   id: string
   to: string | null
   do: string
}

export interface GoalsErrT {
   id: string
   toErr: string | null
   doErr: string
}