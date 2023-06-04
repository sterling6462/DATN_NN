import { Star } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

type RatingProps = {
  value: number
  ratingClasses?: { root?: string; value?: string; icon?: string }
}

export const Rating = (props: RatingProps) => {
  const { value, ratingClasses } = props
  return (
    <Grid className={clsx(styles.Rating, ratingClasses?.root)}>
      <Typography className={clsx(styles.Body1, ratingClasses?.value)}>
        {value}
      </Typography>
      <Star className={clsx(styles.Icon, ratingClasses?.icon)} />
    </Grid>
  )
}
