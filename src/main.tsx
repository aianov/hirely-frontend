import '@styles/antd.scss'
import '@styles/normalize.scss'
import dayjs from 'dayjs'
import 'dayjs/locale/ru'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { App } from './App'
import './global.scss'

dayjs.locale('ru')

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)