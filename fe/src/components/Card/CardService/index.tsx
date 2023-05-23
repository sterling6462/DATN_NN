import { Card, Divider, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import styles from './style.module.scss'

type RoomInfoProps = {
  label?: string
  value?: any
  valueRender?: (record: any, data?: unknown, index?: number) => JSX.Element
}

type CardRoomInfoProps = {
  data: RoomInfoProps[]
}

export const CardService = (props: CardRoomInfoProps) => {
  const { data } = props

  return (
    <Grid className={styles.Container} xs={12}>
      <Typography className={clsx(styles.RoomInfo, styles.Headline6)}>
        List of services used
      </Typography>
      <Card className={styles.CardContainer}>
        {data.map((item, index) => (
          <>
            <Grid
              container
              justifyContent={'space-between'}
              className={styles.CardInfo}
            >
              <Typography className={clsx(styles.Label, styles.Body1)}>
                {item.label}
              </Typography>
              <Typography className={clsx(styles.Value, styles.Subhead1)}>
                {item.value}
              </Typography>
            </Grid>
            <Divider></Divider>
          </>
        ))}
      </Card>
    </Grid>
  )
}
