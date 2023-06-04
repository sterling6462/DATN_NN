import { RequestProps, invokeRequest, useNotificationStore } from 'components'
import { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

export const useWindowSize = () => {
  const [size, setSize] = useState([window.innerWidth, window.innerHeight])

  const updateSize = useDebouncedCallback(() => {
    setSize([window.innerWidth, window.innerHeight])
  }, 500)

  useEffect(() => {
    window.addEventListener('resize', updateSize)
    return () => window.removeEventListener('resize', updateSize)
  }, [])

  return size
}

export const useAPI = (
  options: RequestProps & { onShowLoading?: () => void } & {
    timeReload?: number
  }
) => {
  const { onShowLoading, timeReload, ...rest } = options
  const dispatchNotification = useNotificationStore(
    (store) => store.dispatchNotification
  )

  useEffect(() => {
    let intervalId: NodeJS.Timer

    if (rest.baseURL) {
      onShowLoading && onShowLoading()
      invokeRequest({ ...rest, onError: dispatchNotification })
      if (timeReload) {
        intervalId = setInterval(() => {
          invokeRequest({ ...rest, onError: dispatchNotification })
        }, timeReload)
      }
    }
    return () => clearInterval(intervalId)
  }, [rest.baseURL, timeReload])
}
