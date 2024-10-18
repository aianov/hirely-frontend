// apple-pay.d.ts
interface ApplePayItem {
   label: string
   amount: string
}

interface ApplePayShippingMethod {
   id: string
   label: string
   detail: string
   amount: string
}

interface ApplePayShippingContact {
   name: {
      formatted: string
   }
   phone: string
   email: string
   addressLines: string[]
}

interface ApplePayPaymentRequest {
   countryCode: string
   currencyCode: string
   supportedNetworks: string[]
   merchantCapabilities: string[]
   total: ApplePayItem
   shippingMethods?: ApplePayShippingMethod[]
   shippingContact?: ApplePayShippingContact
}

interface ApplePaySession {
   new(version: number, request: ApplePayPaymentRequest): ApplePaySession
   onvalidatemerchant: (event: ApplePayValidateMerchantEvent) => void
   onpaymentauthorized: (event: ApplePayPaymentAuthorizedEvent) => void
   begin(): void
   completePayment(status: string): void
}

interface ApplePayValidateMerchantEvent {
   // Add properties as needed
}

interface ApplePayPaymentAuthorizedEvent {
   // Add properties as needed
   payment: any // Replace with specific type if known
}
