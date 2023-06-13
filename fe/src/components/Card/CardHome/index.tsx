import { Button, Card, Grid, Skeleton, Typography } from '@mui/material'
import houseForRent from 'assets/img/houseForRent.jpg'
import clsx from 'clsx'
import { LocationItem, PrimaryButton } from 'components'
import { HiOutlineClipboardCheck } from 'react-icons/hi'
import styles from './style.module.scss'

type CardHomeProps = {
  id?: string
  imgSrc?: any
  name?: string
  location?: string
  roomAvailable?: number
  detail?: string
}

export const CardHome = (record: CardHomeProps) => {
  const { id, imgSrc, name, location, roomAvailable, detail } = record

  return (
    <Card key={id} className={styles.singleDestination} data-aos="fade-up">
      <div className={styles.Image}>
        <img src={houseForRent} alt={houseForRent} />
      </div>
      <div className={styles.CardInfo}>
        <Typography className={clsx(styles.Name, styles.Headline6)}>
          {name}
        </Typography>
        <LocationItem
          location={location}
          locationClasses={{
            root: styles.Location,
            text: styles.LocationText
          }}
        />

        <div className={clsx(styles.RoomInfo, styles.flex)}>
          <div className={clsx(styles.RoomAvailable, styles.Body1)}>
            Room available
          </div>
          <div className={clsx(styles.RoomNumber, styles.Headline4)}>
            <h5>{roomAvailable}</h5>
          </div>
        </div>

        <div className={clsx(styles.Detail, styles.Body2)}>{detail}</div>
        <Grid display={'flex'} justifyContent={'flex-start'}>
          <PrimaryButton
            endIcon={<HiOutlineClipboardCheck />}
            className={styles.DetailButton}
            onClick={() => undefined}
          >
            Detail
          </PrimaryButton>
        </Grid>
      </div>
    </Card>
  )
}

export const SkeletonItem = () => {
  return (
    <Card key={'skeleton'} className={styles.singleDestination}>
      <Grid display={'flex'} flexDirection={'column'}>
        <Skeleton variant="rounded" width={'100%'}>
          <div style={{ paddingBottom: '90%' }} />
        </Skeleton>
        <Skeleton width={'40%'} sx={{ marginTop: '5%' }}>
          <Typography variant="button">.</Typography>
        </Skeleton>
        <Skeleton width={'60%'}>
          <Typography variant="button">.</Typography>
        </Skeleton>
        <Skeleton
          width={'20%'}
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
