import { CircularProgress, Fade } from '@mui/material'
import { useEffect, useRef } from 'react'
import styles from './style.module.scss'

export const TableBillLoading = (props: { isFetching: boolean }) => {
  const { isFetching } = props

  const loaderRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (loaderRef.current) {
      if (isFetching) {
        loaderRef.current.classList.add(`${styles.Active}`)
      } else {
        loaderRef.current.classList.remove(`${styles.Active}`)
      }
    }
  }, [isFetching])

  return (
    <div className={styles.TableBillLoading} ref={loaderRef}>
      <Fade in={true} className={styles.Item}>
        <CircularProgress />
      </Fade>
    </div>
  )
}
