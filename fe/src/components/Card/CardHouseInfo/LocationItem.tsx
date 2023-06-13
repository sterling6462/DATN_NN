import { LocationOn } from '@mui/icons-material'
import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

interface LocationItemProps {
  location?: string
  item?: boolean
  container?: boolean
  locationClasses?: { root?: string; icon?: string; text?: string }
}

export const LocationItem = (props: LocationItemProps) => {
  const { location, item, container, locationClasses } = props

  return (
    <Grid
      className={clsx(styles.Location, locationClasses?.root)}
      item={item}
      container={container}
    >
      <LocationOn
        className={clsx(styles.LocationIcon, locationClasses?.icon)}
      />
      <Typography
        component={'span'}
        className={clsx(
          styles.LocationText,
          styles.Body2,
          locationClasses?.text
        )}
      >
        {location}
      </Typography>
    </Grid>
  )
}
