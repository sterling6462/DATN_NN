import { Card, Grid } from '@mui/material'
import clsx from 'clsx'
import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker
} from 'react-icons/hi'
import { PrimaryButton } from '../Button'
import styles from './style.module.scss'

type CardHomeProps = {
  id: number
  imgSrc: any
  descTitle: string
  location: string
  roomAvailable: number
  fees: string
  descriptions: string
}

export const CardHome = (props: CardHomeProps) => {
  const { id, imgSrc, descTitle, location, roomAvailable, fees, descriptions } =
    props

  return (
    <Card key={id} className={styles.singleDestination} data-aos="fade-up">
      <div className={styles.imageDiv}>
        <img src={imgSrc} alt={descTitle} />
      </div>
      <div className={styles.cardInfo}>
        <h4 className={styles.destTitle}>{descTitle}</h4>
        <span className={clsx(styles.continent, styles.flex)}>
          <HiOutlineLocationMarker className={styles.icon} />
          <span className={styles.name}>{location}</span>
        </span>

        <div className={clsx(styles.fees, styles.flex)}>
          <div className={styles.roomAvailable}>
            <span>
              Room available <small>{roomAvailable}</small>
            </span>
          </div>
          <div className={clsx(styles.price, styles.Headline5)}>
            <h5>{fees}</h5>
          </div>
        </div>

        <div className={styles.desc}>
          <p>{descriptions}</p>
        </div>
        <Grid display={'flex'} justifyContent={'flex-start'}>
          <PrimaryButton
            endIcon={<HiOutlineClipboardCheck />}
            className={styles.detailButton}
          >
            Detail
          </PrimaryButton>
        </Grid>
      </div>
    </Card>
  )
}
