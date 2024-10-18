import { observer } from 'mobx-react-lite'
import { CSSProperties } from 'react'

export const GetWho = observer(({
   who,
   mainStyle = {},
   textStyle = {}
}: GetWhoProps) => {
   return (
      <div style={mainStyle} className="who-container">
         <span style={textStyle}>{who ? who : 'Самурай'}</span>
      </div>
   )
})

interface GetWhoProps {
   who: string
   mainStyle?: CSSProperties
   textStyle?: CSSProperties
}