import {
  Button,
  Card,
  CardMedia,
  Grid,
  Skeleton,
  Typography
} from '@mui/material'
import houseForRent from 'assets/img/houseForRent.jpg'
import clsx from 'clsx'
import {
  LocationItem,
  PrimaryButton,
  RatingStar,
  currencyFormat
} from 'components'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import { useNavigate } from 'react-router-dom'
import styles from './style.module.scss'

export type CardHomeProps = {
  id?: string
  imgSrc?: any
  name?: string
  roomAvailable?: number
  roomCount?: number
  floorCount?: number
  location?: string
  detail?: string
  rate?: number
  priceDefault?: number
  electricityPrice?: number
  waterPrice?: number
  wifiPrice?: number
}

export const CardHome = (props: CardHomeProps) => {
  const { id = '', imgSrc, name, location, priceDefault = 0, rate = 0 } = props
  const navigate = useNavigate()

  const handleClick = (id: string) => {
    navigate(id)
  }

  return (
    <Card key={id} className={styles.CardHome} data-aos="fade-up">
      <Grid container className={styles.CardContainer}>
        <Grid item className={styles.Image}>
          <CardMedia
            className={styles.CardMedia}
            component="img"
            src={houseForRent}
            alt={houseForRent}
            onClick={() => handleClick(id)}
          />
        </Grid>
        <Grid item className={styles.CardInfo}>
          <Typography
            className={clsx(styles.Name, styles.Headline6)}
            onClick={() => handleClick(id)}
          >
            {name}
          </Typography>
          <RatingStar value={rate} readOnly />
          <LocationItem
            location={location}
            locationClasses={{
              root: styles.Location,
              text: styles.LocationText
            }}
          />

          <Grid className={clsx(styles.RoomInfo, styles.flex)}>
            <Grid className={clsx(styles.RoomAvailable, styles.Body1)}>
              Room rent default
            </Grid>
            <Grid className={clsx(styles.RoomNumber, styles.Headline4)}>
              <h5>{currencyFormat(priceDefault)}</h5>
            </Grid>
          </Grid>

          <Grid display={'flex'} justifyContent={'flex-start'}>
            <PrimaryButton
              endIcon={<HiOutlineClipboardCheck />}
              className={styles.DetailButton}
              onClick={() => handleClick(id)}
            >
              Detail
            </PrimaryButton>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export const SkeletonItem = () => {
  return (
    <Card key={'skeleton'} className={styles.CardHome}>
      <Grid display={'flex'} flexDirection={'column'}>
        <Skeleton variant="rounded" width={'100%'}>
          <Grid style={{ paddingBottom: '90%' }} />
        </Skeleton>
        <Skeleton width={'40%'} sx={{ marginTop: '5%' }}>
          <Typography variant="button">.</Typography>
        </Skeleton>
        <Skeleton width={'60%'}>
          <Typography variant="button">.</Typography>
        </Skeleton>
        <Skeleton
          width={'30%'}
          variant="rounded"
          sx={{ borderRadius: '50px', marginTop: '5%' }}
        >
          <Button sx={{ paddingTop: '10%' }}>.</Button>
        </Skeleton>
      </Grid>
    </Card>
  )
}

export const SkeletonCardHome = () => {
  return (
    <Grid className={styles.SkeletonContainer}>
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Grid>
  )
}
