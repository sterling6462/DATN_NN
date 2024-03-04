import { Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Column,
  Entity,
  Layout,
  ListView,
  Status,
  TableActionDelete,
  TableActionDetail,
  currencyFormat,
  dateFormat
} from 'components'
import { LIST_BILL } from 'constants/ApiConstant'
import styles from './style.module.scss'

class BillListsAdmin {
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
        <TableActionDelete
          id="bill_list"
          entity={{ labelNoti: `Bill of ${entity.roomName} room` }}
          baseURL={`${LIST_BILL}/${entity.id}`}
        />
      )
    }
  })
  delete?: string

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

export default function BillListAdmin() {
  return (
    <Layout>
      <ListView
        baseURL={LIST_BILL}
        id="bill_list"
        search
        pagination
        titleTable="All house bills"
        descTitle="You will see monthly invoices generated or create a monthly invoice if not already created"
        model={BillListsAdmin}
      />
    </Layout>
  )
}
