import { baseInstance } from '@/shared/api/base'
import { themeStore } from '@/stores/theme/theme-store'
import GooglePayButton from '@google-pay/button-react'
import { premiumStore } from '@stores/premium-store/premium-store'
import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'
import { useState } from 'react'
import s from './PremiumModal.module.scss'

export const PremiumModal = observer(() => {
   const { currentTheme } = themeStore
   const { isPremiumShow, setIsPremiumShow } = premiumStore
   const [paymentRequest, setPaymentRequest] = useState(null)
   const [clientSecret, setClientSecret] = useState(null)

   const handleGooglePaySuccess = async (paymentData: any) => {
      try {
         await baseInstance.post('/subscription/webhook', paymentData)
         setIsPremiumShow(false)
      } catch (error) {
         console.error('Error handling Google Pay success:', error)
      }
   }

   const handleGooglePayError = (error: any) => {
      console.error('Google Pay payment error', error)
   }

   return (
      <Modal
         open={isPremiumShow}
         onCancel={() => setIsPremiumShow(false)}
         footer={null}
         centered
         width={300}
         className={'mydeletemodal'}
      >
         <div className={s.main}>
            <div className={s.top}>
               <span>Купить премиум</span>
            </div>

            <div className={s.bot}>
               <GooglePayButton
                  environment="TEST"
                  buttonColor="black"
                  buttonType="plain"
                  paymentRequest={{
                     apiVersion: 2,
                     apiVersionMinor: 0,
                     allowedPaymentMethods: [{
                        type: 'CARD',
                        parameters: {
                           allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                           allowedCardNetworks: ['MASTERCARD', 'VISA'],
                        },
                        tokenizationSpecification: {
                           type: 'PAYMENT_GATEWAY',
                           parameters: {
                              gateway: 'example',
                              gatewayMerchantId: 'exampleGatewayMerchantId',
                           },
                        },
                     }],
                     merchantInfo: {
                        merchantId: '12345678901234567890',
                        merchantName: 'Example Merchant',
                     },
                     transactionInfo: {
                        totalPriceStatus: 'FINAL',
                        totalPriceLabel: 'Total',
                        totalPrice: '990',
                        currencyCode: 'KZT',
                        countryCode: 'KZ',
                     },
                  }}
                  onLoadPaymentData={handleGooglePaySuccess}
                  onError={handleGooglePayError}
               />
            </div>
         </div>
      </Modal>
   )
})
