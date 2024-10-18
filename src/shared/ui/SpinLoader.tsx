import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

export const SpinLoader = ({ size = 20, color = 'white' }: { size?: number, color?: string }) => {
   return (
      <div className='df jcc aic'>
         <Spin indicator={<LoadingOutlined style={{ fontSize: size, color: color }} spin />} />
      </div>
   )
}