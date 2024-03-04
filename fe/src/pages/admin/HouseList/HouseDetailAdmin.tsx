import { Typography } from '@mui/material'
import clsx from 'clsx'
import {
  CardHouseInfo,
  Column,
  Header,
  IHouseInfo,
  Layout,
  Status,
  currencyFormat,
  dateFormat
} from 'components'
import { DETAIL_HOUSE, LIST_ROOM_BY_HOUSE } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { TableForDetail } from './components/TableForDetail'
import styles from './style.module.scss'

class RoomsTable {
  @Column({
    title: 'Room name',
    sort: true,
    width: '12%',
    render: ({ name }) => (
      <Typography className={clsx(styles.Subhead2, styles.NameTableCell)}>
        {name}
      </Typography>
    )
  })
  name?: string

  @Column({
    title: 'Type',
    sort: true,
    align: 'center',
    width: '15%'
  })
  type?: string

  @Column({
    title: 'Price',
    sort: true,
    align: 'center',
    width: '12%',
    render: ({ price }) => (
      <Typography className={clsx(styles.Subhead2, styles.PriceTableCell)}>
        {currencyFormat(price)}
      </Typography>
    )
  })
  price?: number

  @Column({
    title: 'Max mem',
    sort: true,
    align: 'center',
    width: '8%'
  })
  maxMember?: number

  @Column({
    title: 'Member',
    sort: true,
    align: 'center',
    width: '8%'
  })
  member?: number

  @Column({
    title: 'Join date',
    sort: true,
    align: 'center',
    width: '12%',
    render: ({ joinDate }) => {
      if (joinDate === null) {
        return <></>
      } else {
        return <span>{dateFormat(joinDate)}</span>
      }
    }
  })
  joinDate?: string

  @Column({
    title: 'Status',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ member }) => {
      if (member > 0) {
        return <Status chipKey="Active" />
      } else {
        return <Status chipKey="Off" />
      }
    }
  })
  status?: string

  @Column({
    title: 'Due date',
    sort: true,
    align: 'center',
    width: '7%'
  })
  dueDate?: number

  @Column({
    title: 'Due',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ due }) => {
      if (due) {
        return <Status label="Paid" chipKey="Active" />
      } else {
        return <Status label="Unpaid" chipKey="Off" />
      }
    }
  })
  due?: boolean
}

export function HouseDetailAdmin() {
  const { id = '' } = useParams()
  const [dataHouseInfo, setDataHouseInfo] = useState<IHouseInfo>()

  useAPI({
    baseURL: DETAIL_HOUSE.replace(':id', id),
    onSuccess(data) {
      setDataHouseInfo(data)
    }
  })

  return (
    <Layout>
      <Header />
      <CardHouseInfo id="house-detail" data={dataHouseInfo} />
      <TableForDetail
        id="room-list-admin"
        model={RoomsTable}
        titleTable="Room list"
        baseURL={LIST_ROOM_BY_HOUSE.replace('=id', `=${id}`)}
      />
    </Layout>
  )
}
