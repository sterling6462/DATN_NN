import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import styles from './style.module.scss'

interface FacilityItemProps {
  label: string
  icon: ReactNode
}

export const FacilityItem = (props: FacilityItemProps) => {
  const { icon, label } = props
  return (
    <Grid container item xs={3} className={styles.FacilityItem}>
      <Grid item className={styles.Icon}>
        {icon}
      </Grid>
      <Grid item display={'flex'} marginTop={'0.5rem'}>
        <Typography
          component={'span'}
          className={clsx(styles.Subhead2, styles.Label)}
        >
          {label}
        </Typography>
      </Grid>
    </Grid>
  )
}
