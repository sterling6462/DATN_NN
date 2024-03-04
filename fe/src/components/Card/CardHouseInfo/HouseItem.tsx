import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { RatingStar, currencyFormat } from 'components'
import { LocationItem } from './LocationItem'
import styles from './style.module.scss'

interface HouseItemProps {
  houseName?: string
  rate?: number
  location?: string
  priceDefault?: number
  className?: string
}

export const HouseItem = (props: HouseItemProps) => {
  const { houseName, rate, location, className, priceDefault = 0 } = props

  return (
    <Grid
      container
      className={clsx(styles.HouseItem, className)}
      rowSpacing={0.5}
    >
      <Grid item>
        <Typography
          component={'span'}
          className={clsx(styles.Headline4, styles.HouseName)}
        >
          {houseName}
        </Typography>
      </Grid>
      <Grid container item className={styles.HouseDetail}>
        <Grid item className={styles.LeftContainer}>
          <RatingStar value={rate || 0} readOnly />
          <LocationItem
            item={false}
            location={location}
            locationClasses={{ root: styles.Location }}
          />
        </Grid>
        <Grid item className={styles.RightContainer}>
          <Typography className={clsx(styles.Headline4, styles.PriceDefault)}>
            {currencyFormat(priceDefault)}
          </Typography>
          {/* <PrimaryButton>{capitalizeFirstLetter('Select room')}</PrimaryButton> */}
        </Grid>
      </Grid>
    </Grid>
  )
}
