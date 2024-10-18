import { baseInstance } from '../base'
import { SendCodeBody, SignInBody, SignUpBody } from './types'

export const signUp = async (body: SignUpBody) => await baseInstance.post('/auth/register', body)

export const sendCode = async (body: SendCodeBody) => await baseInstance.post('/auth/send-code', body)

export const signIn = (body: SignInBody) => baseInstance.post('/auth/login', body)

export const authLogout = () => baseInstance.post('/auth/logout')