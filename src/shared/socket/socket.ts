import { io } from 'socket.io-client'

// @ts-ignore
export const socket = io(import.meta.env.VITE_API_SOCKET_BASE_URL)