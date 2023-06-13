import {
  ElectricBolt,
  WaterDamageRounded,
  WifiRounded
} from '@mui/icons-material'
import { Card, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { currencyFormat, useAuthStore, useHouseStore } from 'components'
import { ReactNode, useEffect } from 'react'
import styles from './style.module.scss'

type ServiceBillItemProps = {
  textBill?: string
  icon?: ReactNode
  price: number
  measure?: string
  descBill?: string
}

export const CardBillItem = (props: ServiceBillItemProps) => {
  const { textBill, icon, price, measure, descBill } = props

  return (
    <Grid item className={styles.LeftCard}>
      <Card className={styles.CardContainer}>
        <Grid container className={styles.GridContainer}>
          <Grid item className={styles.CardIcon}>
            {icon}
          </Grid>
          <Grid item className={styles.CardInfo}>
            <Typography component={'span'} className={styles.TextBill}>
              {textBill}
            </Typography>
            <Typography component={'span'} className={styles.PriceInfo}>
              <Typography
                component={'span'}
                className={clsx(styles.Price, styles.Subhead1)}
              >
                {currencyFormat(price)}
              </Typography>
              / {measure}
            </Typography>
            {descBill && <Typography component={'span'}>{descBill}</Typography>}
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export const CardServiceBill = () => {
  const { auth } = useAuthStore()
  const { houseInfo, setHouseInfo } = useHouseStore()

  useEffect(() => {
    setHouseInfo(auth?.houseId || '')
  }, [auth?.houseId])

  return (
    <Grid container className={styles.CardServiceBill} item columnSpacing={1}>
      <CardBillItem
        textBill="Electricity price"
        price={houseInfo?.electricityPrice || 0}
        measure="KWh"
        icon={<ElectricBolt className={styles.CardIcon} />}
      />
      <CardBillItem
        textBill="Water price"
        price={houseInfo?.waterPrice || 0}
        icon={<WaterDamageRounded className={styles.CardIcon} />}
        measure="person"
      />
      <CardBillItem
        textBill="Wifi price"
        price={houseInfo?.wifiPrice || 0}
        icon={<WifiRounded className={styles.CardIcon} />}
        measure="month"
      />
    </Grid>
  )
}
