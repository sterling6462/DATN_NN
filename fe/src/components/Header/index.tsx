import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { HiHome } from 'react-icons/hi'
import styles from './style.module.scss'

type HeaderProps = {
  homeName: string
}

export const Header = (props: HeaderProps) => {
  const { homeName } = props

  return (
    <Grid container className={styles.HostInfo} spacing={1}>
      <Grid item>
        <HiHome className={styles.Icon} />
      </Grid>
      <Grid item>
        <Typography className={clsx(styles.Subhead2, styles.Title)}>
          On supervising
        </Typography>
        <Typography className={clsx(styles.Subhead1, styles.Title)}>
          {homeName} house
        </Typography>
      </Grid>
    </Grid>
  )
}
