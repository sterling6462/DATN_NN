import { Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  BreadcrumbsNavigation,
  CardServiceBill,
  useHouseStore
} from 'components'
import { HiHome } from 'react-icons/hi'
import { useLocation } from 'react-router-dom'
import styles from './style.module.scss'

export interface HeaderProps {
  bill?: boolean
  houseDetail?: boolean
}

export const Header = (props: HeaderProps) => {
  const { bill, houseDetail } = props
  const { houseInfo } = useHouseStore()
  const { pathname } = useLocation()
  const pathnames = pathname.split('/').filter((item) => item)

  return (
    <Grid className={styles.ContainerHeader}>
      <Grid className={styles.BreadcrumbsNavigation}>
        <BreadcrumbsNavigation pathnames={pathnames} />
      </Grid>
      {houseDetail && (
        <Grid container className={styles.InfoHeader}>
          <Grid container className={styles.HostInfo} item columnSpacing={1}>
            <Grid item>
              <HiHome className={styles.Icon} />
            </Grid>
            <Grid item display={'flex'} flexDirection={'column'}>
              <Typography
                component={'span'}
                className={clsx(styles.Subhead2, styles.Title)}
              >
                On supervising
              </Typography>
              <Typography
                component={'span'}
                className={clsx(styles.Subhead1, styles.Title)}
              >
                {houseInfo?.name} house
              </Typography>
            </Grid>
          </Grid>
          {bill && <CardServiceBill />}
        </Grid>
      )}
    </Grid>
  )
}
