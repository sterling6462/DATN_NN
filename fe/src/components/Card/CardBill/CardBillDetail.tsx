import { Card, Grid, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  TableBill,
  TableBillLoading,
  dateTimeFormat,
  useHouseStore
} from 'components'
import styles from './style.module.scss'

export type BillDetailData = {
  _id: string
  houseId: string
  roomId: string
  electricityBill: number
  waterBill: number
  wifiBill: number
  roomBill: number
  otherBill: number
  total: number
  createBy: string
  createdAt: string
  status: boolean
  roomName: string
}

interface CardBillDetailProps {
  data?: BillDetailData
}
interface BillTitleItemProps {
  title: string
  value?: string
  xs?: number
  columnGap?: number
  classItems?: { titleClass?: string; valueClass?: string }
}
export const BillTitleItem = (props: BillTitleItemProps) => {
  const { title, value, xs, classItems, columnGap } = props
  return (
    <Grid item xs={xs || 6} className={styles.InfoItem} columnGap={columnGap}>
      <Typography
        className={clsx(styles.Body1, styles.Title, classItems?.titleClass)}
      >
        {title}
      </Typography>
      <Typography
        className={clsx(styles.Subhead1, styles.Value, classItems?.valueClass)}
      >
        {value}
      </Typography>
    </Grid>
  )
}
export const CardBillDetail = (props: CardBillDetailProps) => {
  const { data } = props
  const { houseInfo } = useHouseStore()

  if (data) {
    return (
      <>
        <Grid display={'flex'} justifyContent={'center'}>
          <Card className={styles.CardBillDetail}>
            <Typography className={clsx(styles.TitleBill, styles.Headline5)}>
              Room rent Receipt
            </Typography>
            <Grid container columnSpacing={2} className={styles.ContainerInfo}>
              <BillTitleItem
                title="House"
                value={houseInfo?.name}
                columnGap={8}
              />
              <BillTitleItem
                title="Location"
                value={houseInfo?.location}
                columnGap={3}
              />
              <BillTitleItem
                title="Room"
                value={data?.roomName}
                xs={12}
                columnGap={10}
              />
              <BillTitleItem
                title="Create by"
                value={data?.createBy}
                columnGap={6}
              />
              <BillTitleItem
                title="Create at"
                value={dateTimeFormat(data?.createdAt || '')}
                columnGap={2}
              />
            </Grid>
            <TableBill data={data} className={styles.TableBill} />
          </Card>
        </Grid>
      </>
    )
  }
  return (
    <Grid display={'flex'} justifyContent={'center'}>
      <Card className={styles.CardBillDetail}>
        <Typography className={clsx(styles.TitleBill, styles.Headline5)}>
          Room rent Receipt
        </Typography>

        <TableBillLoading isFetching={true} />
      </Card>
    </Grid>
  )
}
