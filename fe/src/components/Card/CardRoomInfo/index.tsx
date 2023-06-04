import { Card, Divider, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import { Status, currencyFormat, dateFormat } from 'components'
import { ReactNode } from 'react'
import styles from './style.module.scss'

export type RoomInfoProps = {
  _id: string
  name: string
  type: string
  price: number
  maxMember: number
  member: string
  status: boolean
  due: boolean
  dueDate: number
  floor: number
  houseId: string
  joinDate: string
}

export type CardRoomInfoProps = {
  data?: RoomInfoProps
}

export type CardRoomItemProps = {
  label: string
  value?: string | number | boolean
  render?: ReactNode
  cardRoomClasses?: { cardInfo?: string; label?: string; value?: string }
}

export const CardRoomItem = (props: CardRoomItemProps) => {
  const { label, value, render, cardRoomClasses } = props
  return (
    <>
      <Grid
        container
        justifyContent={'space-between'}
        className={clsx(styles.CardInfo, cardRoomClasses?.cardInfo)}
      >
        <Typography
          className={clsx(styles.Label, styles.Body1, cardRoomClasses?.label)}
        >
          {label}
        </Typography>
        {render ? (
          render
        ) : (
          <Typography
            className={clsx(
              styles.Value,
              styles.Subhead1,
              cardRoomClasses?.value
            )}
          >
            {value}
          </Typography>
        )}
      </Grid>
      <Divider></Divider>
    </>
  )
}

export const CardRoomInfo = (props: CardRoomInfoProps) => {
  const { data } = props

  if (data)
    return (
      <Grid className={styles.Container}>
        <Typography className={clsx(styles.RoomInfo, styles.Headline6)}>
          Room information
        </Typography>
        <Card className={styles.CardContainer}>
          <CardRoomItem label="Room name" value={data.name} />
          <CardRoomItem label="Floor" value={data.floor} />
          <CardRoomItem label="Type" value={data.type} />
          <CardRoomItem
            label="Price"
            render={
              <span className={clsx(styles.Value, styles.Subhead1)}>
                {currencyFormat(data.price)}
              </span>
            }
          />
          <CardRoomItem label="Max member" value={data.maxMember} />
          <CardRoomItem label="Member" value={data.member} />
          <CardRoomItem
            label="Join date"
            render={
              <span className={clsx(styles.Value, styles.Subhead1)}>
                {dateFormat(data.joinDate)}
              </span>
            }
          />
          <CardRoomItem
            label="Status"
            render={
              data.status ? (
                <Status chipKey={data.status} label="Room in" />
              ) : (
                <Status chipKey={!data.status} label="Available" />
              )
            }
          />
          <CardRoomItem
            label="Due date"
            render={
              <span className={clsx(styles.Value, styles.Subhead1)}>
                {data.dueDate}/per month
              </span>
            }
          />
          <CardRoomItem label="Due" render={<Status chipKey={data.due} />} />
        </Card>
      </Grid>
    )
  return <></>
}
