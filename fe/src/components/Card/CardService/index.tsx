import { Card, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { dateFormat } from 'components'
import { CardRoomItem } from '../CardRoomInfo'
import styles from './style.module.scss'

export type DataService = {
  page: number
  total: number
  data: RoomServiceProps[]
}

export type RoomServiceProps = {
  id: string
  electricityBill: number
  waterBill: number
  wifiBill: number
  total: number
  createBy: string
  createdAt: string
  roomBill: number
  otherBill: number
  status: boolean
  roomName: string
}

export type CardRoomServiceProps = {
  data?: DataService
}

export const CardService = (props: CardRoomServiceProps) => {
  const { data } = props
  const dataService = data?.data
  if (dataService) {
    console.log(data.data)
    return (
      <Grid className={styles.Container} xs={12}>
        <Typography className={clsx(styles.RoomInfo, styles.Headline6)}>
          List of services used
        </Typography>
        <Card className={styles.CardContainer}>
          <CardRoomItem
            label="electricityBill"
            value={dataService[0].electricityBill}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="waterBill"
            value={dataService[0].waterBill}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="wifiBill"
            value={dataService[0].wifiBill}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="total"
            value={dataService[0].total}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="createBy"
            value={dataService[0].createBy}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="createdAt"
            value={dateFormat(dataService[0].createdAt)}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="roomBill"
            value={dataService[0].roomBill}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="otherBill"
            value={dataService[0].otherBill}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="status"
            value={dataService[0].status}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="roomName"
            value={dataService[0].roomName}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
        </Card>
      </Grid>
    )
  }
  return <></>
}
