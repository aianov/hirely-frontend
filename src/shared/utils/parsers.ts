export const socialNumberFormat = (n: number): string => {
   if (isNaN(n) || !isFinite(n) || n === 0) return '0'
   const suffixes = ['', 'к', 'млн', 'млрд', 'трлд', 'квдрлн']
   const sign = n < 0 ? '-' : ''
   const absNumber = Math.abs(n)

   const suffixIndex = Math.floor(Math.log10(absNumber) / 3)
   let formattedNumber = (absNumber / Math.pow(10, suffixIndex * 3)).toFixed(1)

   if (n < 1050) formattedNumber = Number(formattedNumber).toFixed(0)
   else if (formattedNumber.endsWith('.0')) formattedNumber = formattedNumber.slice(0, -2)

   return `${sign}${formattedNumber}${suffixes[suffixIndex]}`
}

export const phoneFormat = (phoneNumber: string, delimiter: string = '-'): string => {
   const cleanedNumber = phoneNumber.replace(/\D/g, '')

   if (cleanedNumber.length === 11 && (cleanedNumber.startsWith('7') || cleanedNumber.startsWith('8'))) {
      // Формат для 11-значного номера, начинающегося с 7 или 8
      return `+${cleanedNumber[0]}${delimiter}${cleanedNumber.slice(1, 4)}${delimiter}${cleanedNumber.slice(4, 7)}${delimiter}${cleanedNumber.slice(7)}`
   } else if (cleanedNumber.length === 10) {
      // Формат для 10-значного номера
      return `+${cleanedNumber.slice(0, 3)}${delimiter}${cleanedNumber.slice(3, 6)}${delimiter}${cleanedNumber.slice(6)}`
   } else {
      // Возвращаем очищенный номер, если не попадает в указанные форматы
      return '+' + cleanedNumber
   }
}