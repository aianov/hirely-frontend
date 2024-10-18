import { Modal } from 'antd';
import s from './ShareThemeModal.module.scss';
import { observer } from 'mobx-react-lite';
import { themeStore } from '@/stores/theme/theme-store';
import { createThemeStore } from '@/stores/theme/create-theme-store';
import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export const ShareThemeModal = observer(() => {
   const { currentTheme } = themeStore;
   const { isSharingTheme, setIsSharingTheme, selectedThemeId } = createThemeStore;
   const [isCopied, setIsCopied] = useState(false);

   const url = window.location.href.split('/main')[0] + '/main';
   const linkRef = useRef<HTMLSpanElement | null>(null);

   const handleCopy = () => {
      if (!linkRef.current) return;
      const link = linkRef.current.innerText;
      navigator.clipboard.writeText(link).then(() => {
         setIsCopied(true);
         setTimeout(() => setIsCopied(false), 2 * 1000);
      }).catch(err => console.log('Ошибка копирования:', err));
   };

   return (
      <Modal
         open={isSharingTheme}
         onCancel={() => setIsSharingTheme(false)}
         footer={null}
         centered
         width={400}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span className={s.title}>Поделиться темой</span>
            </div>

            <div className={s.mid}>
               <button className={s.btnforshare} onClick={handleCopy}>
                  <div className={s.linkContainer}>
                     <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: isCopied ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                        className={s.link}
                        ref={linkRef}
                     >
                        {url}/settings/customization/{selectedThemeId}
                     </motion.span>
                     <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isCopied ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                        className={s.copiedMessage}
                        style={currentTheme.textColor}
                     >
                        Скопировано!
                     </motion.span>
                  </div>
               </button>
            </div>

            <div className={s.bot}>
               <button className={s.submit} onClick={() => { /* Handle submit action */ }}>
                  Отправить
               </button>
               <button className={s.cancel} style={currentTheme.btnsTheme} onClick={() => setIsSharingTheme(false)}>
                  <span style={currentTheme.textColor}>Отмена</span>
               </button>
            </div>
         </div>
      </Modal>
   );
});
