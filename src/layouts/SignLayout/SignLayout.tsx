import { BackIcon } from '@assets/icons/SignPageIcons/BackIcon'
import { Light } from '@assets/icons/SignPageIcons/Light'
// @ts-ignore
import signImg from '@images/bg.jpeg'
import { Link, Outlet } from 'react-router-dom'
import s from './SignLayout.module.scss'

export const SignLayout = () => {

   return (
      <div className={s.main}>
         {/* BACK TO POSTS */}
         <Link to={"/main/posts"} className={s.backbtn}>
            <BackIcon size={25} />
         </Link>

         {/* LEFT OF SIGN PAGE */}
         <div className={s.left}>
            <img src={signImg} alt="signImg" className={s.leftimg} />
            <div className={s.leftcontainer}>
               <p>Приветстуем в социальной сети для найма людей</p>
               <p>"Hirely!"</p>
            </div>
         </div>

         <div className={s.right}>
            <Outlet />
            <Light style={{ position: 'absolute', bottom: '0', width: '100%', zIndex: '-1' }} />
         </div>
      </div>
   )
}

// useEffect(() => {
//    const socket = io('http://localhost:5151', {
//       autoConnect: false,
//       transports: ['websocket', 'pooling']
//    })

//    socket.connect()

//    socket.on('message', (data: any) => {
//       console.log('Received message:', data)
//    })

//    socket.on('connect', () => {
//       socket.emit("comment-start", "clvo29njm0000nbpf8acpzm9i")
//    })

//    return () => {
//       console.log("discnne")
//       socket.disconnect()
//    }
// }, [])