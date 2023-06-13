import {
  Add,
  CellWifiRounded,
  GroupsRounded,
  HouseRounded,
  MonetizationOnRounded,
  SettingsRounded
} from '@mui/icons-material'
import { Card, Fab, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { ReactNode } from 'react'
import { HiHome } from 'react-icons/hi'
import styles from './style.module.scss'

const DataCardItemHeader = [
  {
    title: 'My home',
    icon: <HouseRounded className={styles.CardIcon} />
  },
  {
    title: 'Bill',
    icon: <MonetizationOnRounded className={styles.CardIcon} />
  },
  {
    title: 'Service',
    icon: <CellWifiRounded className={styles.CardIcon} />
  },
  {
    title: 'Tenant',
    icon: <GroupsRounded className={styles.CardIcon} />
  },
  {
    title: 'Settings',
    icon: <SettingsRounded className={styles.CardIcon} />
  }
]

type CardItemHeaderProps = {
  title: string
  icon: ReactNode
}

export const CardItemHeader = (props: CardItemHeaderProps) => {
  const { title, icon } = props

  return (
    <Card className={styles.CardContainer}>
      {icon}
      <Typography
        component={'span'}
        className={clsx(styles.Subhead2, styles.CardTitle)}
      >
        {title}
      </Typography>
    </Card>
  )
}

type CardHeaderProps = {
  homeName: string
}

export const CardHeader = (props: CardHeaderProps) => {
  const { homeName } = props

  return (
    <Grid container spacing={2} className={styles.CardHeader}>
      <Grid item xs={2} className={styles.LeftCard}>
        <Card className={styles.CardContainer}>
          <Grid container display={'flex'}>
            <Grid item>
              <HiHome className={styles.CardIcon} />
            </Grid>
            <Grid item className={styles.HostInfo}>
              <Typography
                component={'span'}
                className={clsx(styles.Subhead2, styles.CardTitle)}
              >
                On supervising
              </Typography>
              <Typography
                component={'span'}
                className={clsx(styles.Subhead1, styles.CardTitle)}
              >
                {homeName} house
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Grid item xs={9} className={styles.CenterCard}>
        {DataCardItemHeader.map((item, index) => (
          <CardItemHeader {...item} />
        ))}
      </Grid>
      <Grid item xs={1} className={styles.RightCard}>
        <Fab className={styles.IconAddButton}>
          <Add />
        </Fab>
      </Grid>
    </Grid>
  )
}
