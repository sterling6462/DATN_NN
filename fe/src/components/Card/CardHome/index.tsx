import { Card, Grid, Typography } from '@mui/material'
import houseForRent from 'assets/img/houseForRent.jpg'
import clsx from 'clsx'
import { PrimaryButton } from 'components'
import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker
} from 'react-icons/hi'
import styles from './style.module.scss'

type CardHomeProps = {
  id?: string
  imgSrc?: any
  name?: string
  location?: string
  roomAvailable?: number
  descriptions?: string
}

export const CardHome = (record: CardHomeProps) => {
  const { id, imgSrc, name, location, roomAvailable, descriptions } = record
  // const navigate = useNavigate()

  // const handleClick = (id: string) => {
  //   navigate(id)
  // }

  return (
    <Card key={id} className={styles.singleDestination} data-aos="fade-up">
      <div className={styles.imageDiv}>
        <img src={houseForRent} alt={houseForRent} />
      </div>
      <div className={styles.cardInfo}>
        <Typography className={clsx(styles.Name, styles.Headline6)}>
          {name}
        </Typography>
        <span className={clsx(styles.ContainerLocation, styles.flex)}>
          <HiOutlineLocationMarker className={styles.icon} />
          <span className={styles.Location}>{location}</span>
        </span>

        <div className={clsx(styles.RoomInfo, styles.flex)}>
          <div className={styles.RoomAvailable}>Room available</div>
          <div className={clsx(styles.RoomNumber, styles.Headline4)}>
            <h5>{roomAvailable}</h5>
          </div>
        </div>

        <div className={styles.desc}>
          {descriptions ? (
            <p>{descriptions}</p>
          ) : (
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Veritatis, sed perspiciatis repellendus rerum esse doloribus sequi
              optio eligendi cumque quasi voluptate corrupti amet modi nostrum
              necessitatibus mollitia magnam aliquid culpa?
            </p>
          )}
        </div>
        <Grid display={'flex'} justifyContent={'flex-start'}>
          <PrimaryButton
            endIcon={<HiOutlineClipboardCheck />}
            className={styles.detailButton}
            onClick={() => undefined}
          >
            Detail
          </PrimaryButton>
        </Grid>
      </div>
    </Card>
  )
}
