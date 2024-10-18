import dayjs from 'dayjs'

export const dateFormatter = (date: string, format: string) => {
   return dayjs(date).format(format)
}
