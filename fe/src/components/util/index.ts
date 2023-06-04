import dayjs from 'dayjs'

export function isNullOrUndefined(value?: unknown): boolean {
  return value === undefined || value === null
}

export function isObjectEmpty(obj: Record<string, unknown> = {}): boolean {
  return (
    typeof obj === 'object' &&
    (isNullOrUndefined(obj) || Object.keys(obj).length === 0)
  )
}

export const setCookie = (cname: string, cValue: string, expIns: string) => {
  const expires = 'expires=' + expIns
  document.cookie = cname + '=' + cValue + ';' + expires + ';path=/'
}

export const removeCookie = (cname: string) => {
  document.cookie = cname + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}

export const getCookie = (cname: string) => {
  const name = cname + '='
  const decodedCookie = decodeURIComponent(document.cookie)
  const ca = decodedCookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}

export const dateFormat = (date: string) => {
  return dayjs(date).format('DD/MM/YYYY')
}

export const dateTimeFormat = (date: string) => {
  return dayjs(date).format('HH:mm:ss DD/MM/YYYY')
}

export const currencyFormat = (number: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(number)
}

export const capitalizeFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const stringToColor = (string: string) => {
  let hash = 0
  let i
  let color = '#'

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  return color
}

export const dataDropdownRole = [
  { _id: 'admin', name: 'Admin' },
  { _id: 'manager', name: 'Manager' },
  { _id: 'user', name: 'User' }
]
