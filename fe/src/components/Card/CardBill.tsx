import {
  Add,
  ElectricBolt,
  WaterDamageRounded,
  WifiRounded
} from '@mui/icons-material'
import { Card, Fab, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { currencyFormat } from 'components/util'
import { ReactNode } from 'react'
import styles from './style.module.scss'

const DataBillExample = [
  {
    textBill: 'Electricity price',
    icon: <ElectricBolt className={styles.CardIcon} />,
    measure: 'KWh',
    price: 18000
  },
  {
    textBill: 'Water price',
    icon: <WaterDamageRounded className={styles.CardIcon} />,
    measure: 'm3',
    price: 20000
  },
  {
    textBill: 'Wifi price',
    icon: <WifiRounded className={styles.CardIcon} />,
    price: 20000,
    measure: 'month'
  }
]

type CardBillItemProps = {
  textBill?: string
  icon?: ReactNode
  price: number
  measure?: string
  descBill?: string
}

type CardBillProps = {
  DataBillItem?: Array<CardBillItemProps>
}

export const CardBillItem = (props: CardBillItemProps) => {
  const { textBill, icon, price, measure, descBill } = props

  return (
    <Grid item className={styles.LeftCard}>
      <Card className={styles.CardContainer}>
        <Grid container className={styles.GridContainer}>
          <Grid item className={styles.CardIcon}>
            {icon}
          </Grid>
          <Grid item className={styles.CardInfo}>
            <Typography className={styles.TextBill}>{textBill}</Typography>
            <Typography className={styles.PriceInfo}>
              <Typography className={clsx(styles.Price, styles.Subhead1)}>
                {currencyFormat(price)}
              </Typography>
              / {measure}
            </Typography>
            <Typography>{descBill}</Typography>
          </Grid>
        </Grid>
      </Card>
    </Grid>
  )
}

export const CardBill = (props: CardBillProps) => {
  return (
    <Grid container spacing={2} className={styles.CardBill}>
      {DataBillExample.map((item, index) => (
        <CardBillItem {...item} />
      ))}
      <Grid item xs={1} className={styles.RightCard}>
        <Fab className={styles.IconAddButton}>
          <Add />
        </Fab>
      </Grid>
    </Grid>
  )
}
