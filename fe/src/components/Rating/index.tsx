import { Star, StarRounded } from '@mui/icons-material'
import { Grid, Rating, Typography } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

type RatingProps = {
  value: number
  readOnly?: boolean
  ratingClasses?: { root?: string; value?: string; icon?: string }
}

export const RatingNumber = (props: RatingProps) => {
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

export const RatingStar = (props: RatingProps) => {
  const { value, ratingClasses, readOnly } = props

  return (
    <Rating
      icon={<StarRounded />}
      emptyIcon={<></>}
      value={value}
      readOnly={readOnly}
      classes={{ root: ratingClasses?.root, icon: ratingClasses?.icon }}
    />
  )
}
