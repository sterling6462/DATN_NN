import { Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Column,
  Header,
  Layout,
  ListView,
  currencyFormat,
  useHouseStore
} from 'components'
import { LIST_BILL_BY_HOUSE } from 'constants/ApiConstant'
import styles from './style.module.scss'

class ServiceLists {
  @Column({
    title: 'Room name',
    sort: true,
    width: '15%',
    render: ({ roomName }) => (
      <Typography className={clsx(styles.Subhead2, styles.NameTableCell)}>
        {roomName}
      </Typography>
    )
  })
  roomName?: string

  @Column({
    title: 'Old number',
    sort: true,
    align: 'center',
    width: '13%'
  })
  oldNumber?: number

  @Column({
    title: 'New number',
    sort: true,
    align: 'center',
    width: '13%'
  })
  newNumber?: number

  @Column({
    title: 'Electricity bill',
    sort: true,
    align: 'center',
    width: '14%',
    render: ({ electricityBill }) => (
      <span>{currencyFormat(electricityBill)}</span>
    )
  })
  electricityBill?: number

  @Column({
    title: 'Water bill',
    sort: true,
    align: 'center',
    width: '15%',
    render: ({ waterBill }) => <span>{currencyFormat(waterBill)}</span>
  })
  waterBill?: number

  @Column({
    title: 'Wifi bill',
    sort: true,
    align: 'center',
    width: '15%',
    render: ({ wifiBill }) => <span>{currencyFormat(wifiBill)}</span>
  })
  wifiBill?: number

  @Column({
    title: 'Total',
    sort: true,
    align: 'center',
    width: '15%',
    render: ({ electricityBill, waterBill, wifiBill }) => (
      <Typography className={clsx(styles.Subhead2, styles.PriceTableCell)}>
        {currencyFormat(electricityBill + waterBill + wifiBill)}
      </Typography>
    )
  })
  total?: string
}

export default function Bill() {
  const { houseInfo } = useHouseStore()
  const houseId = houseInfo?._id

  if (houseId) {
    return (
      <Layout>
        <Header bill houseDetail />
        <ListView
          baseURL={LIST_BILL_BY_HOUSE.replace('=id', `=${houseId}`)}
          id="service_list"
          pagination
          titleTable="Tenants use in the month"
          descTitle="Statistics every month tenants use"
          model={ServiceLists}
        />
      </Layout>
    )
  }
  return <></>
}
