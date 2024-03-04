import { Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Column,
  Entity,
  Header,
  Layout,
  ListView,
  Status,
  TableActionDetail,
  currencyFormat,
  dateFormat,
  useAuthStore,
  useHouseStore
} from 'components'
import { LIST_BILL, LIST_BILL_FOR_MEMBER } from 'constants/ApiConstant'
import styles from './style.module.scss'

export class BillListsMember {
  @Column({
    title: 'Name',
    sort: true,
    width: '5%',
    render: ({ roomName }) => (
      <Typography className={clsx(styles.Subhead2, styles.NameTableCell)}>
        {roomName}
      </Typography>
    )
  })
  roomName?: string

  @Column({
    title: 'Rental',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ roomBill }) => <span>{currencyFormat(roomBill)}</span>
  })
  roomBill?: number

  @Column({
    title: 'Elect ',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ electricityBill }) => (
      <span>{currencyFormat(electricityBill)}</span>
    )
  })
  electricityBill?: number

  @Column({
    title: 'Water ',
    sort: true,
    width: '8%',
    render: ({ waterBill }) => <span>{currencyFormat(waterBill)}</span>
  })
  waterBill?: number

  @Column({
    title: 'Wifi ',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ wifiBill }) => <span>{currencyFormat(wifiBill)}</span>
  })
  wifiBill?: number

  @Column({
    title: 'Other ',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ otherBill }) => <span>{currencyFormat(otherBill)}</span>
  })
  otherBill?: string

  @Column({
    title: 'Total',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ total }) => (
      <Typography className={clsx(styles.Subhead2, styles.PriceTableCell)}>
        {currencyFormat(total)}
      </Typography>
    )
  })
  total?: string

  @Column({
    title: 'Create at',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ createdAt }) => <span>{dateFormat(createdAt)}</span>
  })
  createdAt?: string

  @Column({
    title: 'Status',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ status }) => {
      if (status) {
        return <Status chipKey={true} />
      } else {
        return <Status chipKey={false} />
      }
    }
  })
  status?: boolean

  @Column({
    width: '3.5%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      return (
        <TableActionDetail
          id={entity.id}
          baseURL={`${LIST_BILL}/${entity.id}`}
        />
      )
    }
  })
  detail?: string
}

export default function BillListMember() {
  const { auth } = useAuthStore()
  const { houseInfo } = useHouseStore()

  const houseId = auth?.houseId
  const roomId = auth?.roomId || ''

  if (houseId) {
    return (
      <Layout>
        <Header houseInfo={houseInfo} />
        <ListView
          id="bill_list"
          baseURL={LIST_BILL_FOR_MEMBER.replace('idHouse', houseId).replace(
            'idRoom',
            roomId
          )}
          search
          pagination
          titleTable="All house bills"
          descTitle="You will see monthly invoices generated or create a monthly invoice if not already created"
          model={BillListsMember}
        />
      </Layout>
    )
  }
  return <></>
}
