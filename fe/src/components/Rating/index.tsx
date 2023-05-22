import { Star } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

type RatingProps = {
  value: number
  className?: string
}

export const Rating = (props: RatingProps) => {
  return (
    <Grid className={clsx(props.className, styles.Rating)}>
      <Typography>{props.value}</Typography>
      <Star className={styles.Icon} />
    </Grid>
  )
}
