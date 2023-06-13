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
    <Grid item xs={xs} className={styles.InfoItem} columnGap={columnGap}>
      <Typography
        component={'span'}
        className={clsx(styles.Body2, styles.Title, classItems?.titleClass)}
      >
        {title}
      </Typography>
      <Typography
        component={'span'}
        className={clsx(styles.Subhead2, styles.Value, classItems?.valueClass)}
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
            <Typography
              component={'span'}
              className={clsx(styles.TitleBill, styles.Headline5)}
            >
              Room rent Receipt
            </Typography>
            <Grid container columnSpacing={2} className={styles.ContainerInfo}>
              <BillTitleItem
                title="House"
                xs={12}
                columnGap={5}
                value={houseInfo?.name}
              />
              <BillTitleItem
                xs={12}
                columnGap={5}
                title="Room"
                value={data?.roomName}
              />
              <BillTitleItem
                xs={12}
                columnGap={3}
                title="Location"
                value={houseInfo?.location}
              />
              <BillTitleItem
                title="Create by"
                value={data?.createBy}
                columnGap={3}
              />
              <BillTitleItem
                xs={12}
                title="Create at"
                value={dateTimeFormat(data?.createdAt || '')}
                columnGap={3}
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
        <Typography
          component={'span'}
          className={clsx(styles.TitleBill, styles.Headline5)}
        >
          Room rent Receipt
        </Typography>

        <TableBillLoading isFetching={true} />
      </Card>
    </Grid>
  )
}
