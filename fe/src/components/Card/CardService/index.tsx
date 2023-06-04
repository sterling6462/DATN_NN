import { Card, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { CardRoomInfoProps, CardRoomItem } from '../CardRoomInfo'
import styles from './style.module.scss'

export const CardService = (props: CardRoomInfoProps) => {
  const { data } = props

  if (data) {
    return (
      <Grid className={styles.Container} xs={12}>
        <Typography className={clsx(styles.RoomInfo, styles.Headline6)}>
          List of services used
        </Typography>
        <Card className={styles.CardContainer}>
          <CardRoomItem
            label="Room name"
            value={data.name}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="Type"
            value={data.type}
            cardRoomClasses={{
              cardInfo: styles.CardInfo,
              label: styles.Label,
              value: styles.Value
            }}
          />
          <CardRoomItem
            label="Price"
            value={data.price}
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
