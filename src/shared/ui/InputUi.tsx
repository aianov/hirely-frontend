
import { observer } from 'mobx-react-lite'
import { CSSProperties, useEffect, useState } from 'react'
import { PhoneInput } from 'react-international-phone'
import { PasswordCloseIcon } from '../../assets/icons/SignPageIcons/PasswordClose'
import { PasswordOpenIcon } from '../../assets/icons/SignPageIcons/PasswordOpen'
import useDebounce from '../hooks/useDebounce'
import { SpinLoader } from './SpinLoader'

export const InputUi = observer(({
   className = null,
   placeholder = '',
   errorFz = 14,
   maxLength = 100,
   type = 'text',
   containerStyle = {
      display: 'flex',
      flexDirection: 'column'
   },
   inpStyle = {},
   mainStyle = {},
   titleStyle = {
      paddingLeft: '3px',
      paddingBottom: '3px',
      color: '#BABABA',
      fontSize: '13px'
   },
   disabled = false,
   icon = null,
   callback,
   title = '',
   isLoading = false,
   debounce = false,
   debounceCallback,
   stopDebounce = false,
   stopCallback,
   required = false,

   // mobx
   value,
   name,
   error = '',
   setValue,
}: InputUiProps) => {
   const [isHide, setIsHide] = useState(true)

   const debounced = useDebounce(value, 700)

   useEffect(() => {
      if (stopDebounce && stopCallback) {
         stopCallback('')
         return
      }
      if (debounce) debounceCallback!()
   }, [debounced])

   return (
      <div style={containerStyle}>
         {required ? (
            <div style={{ display: 'flex', gap: '3px', alignItems: 'center' }}>
               <span style={titleStyle}>{title}</span>
               <span style={{ color: 'red', fontSize: titleStyle.fontSize }}>*</span>
            </div>
         ) : title !== '' && (
            <span style={titleStyle}>{title}</span>
         )}
         <div>
            <div style={mainStyle} className={className ? '' : 'global-inpdiv'}>

               {type == 'phone' && name && (
                  <PhoneInput
                     defaultCountry="kz"
                     value={value}
                     onChange={(phone) => setValue(name, phone)}
                  />
               )}
               {/* if you need to change 1 value. */}
               {!name && type != 'phone' && (
                  <input
                     type={type === 'text' ? 'text' : isHide ? 'password' : 'text'}
                     className={className ? className : 'global-inp'}
                     maxLength={maxLength}
                     disabled={disabled}
                     placeholder={placeholder}
                     style={inpStyle}
                     value={value}
                     onChange={e => {
                        if (callback) {
                           callback(true)
                           // @ts-ignore
                           setValue(e.target.value)
                           return
                        }
                        // @ts-ignore
                        setValue(e.target.value)
                     }}
                  />
               )}

               {/* if your states in object */}
               {name && type != 'phone' && (
                  <input
                     type={type === 'text' ? 'text' : isHide ? 'password' : 'text'}
                     className={className ? className : 'global-inp'}
                     maxLength={maxLength}
                     disabled={disabled}
                     placeholder={placeholder}
                     style={inpStyle}
                     value={value}
                     onChange={e => setValue(name, e.target.value)}
                  />
               )}
               {type === 'text' ? <>{icon}</> : type !== 'phone' && (
                  <div onClick={() => setIsHide(!isHide)}>
                     {isHide ? <PasswordCloseIcon /> : <PasswordOpenIcon />}
                  </div>
               )}

               {isLoading && <SpinLoader />}
            </div>
            {error !== '' && <span style={{ padding: '3px 0 0 5px', color: 'red', fontSize: `${errorFz}px` }}>{error}</span>}
         </div>
      </div>
   )
})

interface InputUiProps {
   className?: null | string
   placeholder?: string
   errorFz?: number
   disabled?: boolean
   maxLength?: number
   type?: string
   icon?: null | React.ReactNode
   containerStyle?: CSSProperties
   inpStyle?: CSSProperties
   mainStyle?: CSSProperties
   titleStyle?: CSSProperties
   title?: string
   isLoading?: boolean
   debounce?: boolean
   stopDebounce?: boolean
   callback?: (open: boolean) => void
   debounceCallback?: () => void
   stopCallback?: (err: string) => void
   required?: boolean

   // mobx
   value: string
   name?: string
   error?: string
   setValue: ((name: string, value: string) => void) | ((value: string) => void)
}