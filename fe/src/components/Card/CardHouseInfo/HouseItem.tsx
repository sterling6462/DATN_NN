import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { RatingStar } from 'components'
import { LocationItem } from './LocationItem'
import styles from './style.module.scss'

interface HouseItemProps {
  houseName?: string
  rate?: number
  location?: string
  className?: string
}

export const HouseItem = (props: HouseItemProps) => {
  const { houseName, rate, location, className } = props

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
      <Grid item>
        <RatingStar value={rate || 0} readOnly />
      </Grid>
      <LocationItem item location={location} />
    </Grid>
  )
}
