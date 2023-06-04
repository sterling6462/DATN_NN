import { Grid, Typography } from '@mui/material'
import house from 'assets/json/house.json'
import clsx from 'clsx'
import { LottieAnimation, Rating, currencyFormat } from 'components'
import { ReactNode } from 'react'
import styles from './style.module.scss'

export interface CardHouseInfo {
  _id?: string
  name?: string
  location?: string
  rate?: number
  electricityPrice?: number
  waterPrice?: number
  wifiPrice?: number
  createDate?: string
}

interface CardHouseInfoProps {
  id: string
  data?: CardHouseInfo
  managerName?: string
}

interface HouseItemProps {
  label: string
  value?: string | number | ReactNode
  classItems?: { labelClass?: string; valueClass?: string }
}
export const HouseItem = (props: HouseItemProps) => {
  const { label, value, classItems } = props
  return (
    <Grid container className={styles.InfoItem}>
      <Grid item xs={6}>
        <Typography
          className={clsx(styles.Body1, styles.Label, classItems?.labelClass)}
        >
          {label}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <Typography
          className={clsx(
            styles.Subhead1,
            styles.Value,
            classItems?.valueClass
          )}
        >
          {value}
        </Typography>
      </Grid>
    </Grid>
  )
}

export const CardHouseInfo = (props: CardHouseInfoProps) => {
  const { id, data, managerName } = props

  if (data) {
    return (
      <Grid container columnSpacing={2} className={styles.CardUserInfo}>
        <Grid item xs={6} className={styles.LeftContainer}>
          <LottieAnimation animationData={house} margin="0px" width="100%" />
          <Typography className={clsx(styles.Headline4, styles.HouseName)}>
            {`${data?.name || ''} house`}
          </Typography>
        </Grid>
        <Grid item xs={6} className={styles.RightContainer}>
          <Grid className={styles.Title}>
            <Typography className={clsx(styles.Headline6, styles.Text)}>
              House Information
            </Typography>
          </Grid>

          <Grid className={styles.HouseInfo}>
            <HouseItem label="House name" value={data.name || ''} />
            <HouseItem label="Manager" value={managerName} />
            <HouseItem
              label="Rate"
              value={
                <Rating
                  value={data.rate || 0}
                  ratingClasses={{
                    root: styles.RatingRoot,
                    value: clsx(styles.Subhead1, styles.RatingValue)
                  }}
                />
              }
            />
            <HouseItem label="Location" value={data.location || ''} />
            <HouseItem
              label="Electricity price"
              value={currencyFormat(data.electricityPrice || 0)}
            />
            <HouseItem
              label="Water price"
              value={currencyFormat(data.waterPrice || 0)}
            />
            <HouseItem
              label="Wifi price"
              value={currencyFormat(data.wifiPrice || 0)}
            />
            <HouseItem label="Room count" value={''} />
            <HouseItem label="Room available" value={''} />
          </Grid>
        </Grid>
      </Grid>
    )
  }
  return <></>
}
