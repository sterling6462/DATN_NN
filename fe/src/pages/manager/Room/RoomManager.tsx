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
  useHouseStore
} from 'components'
import { LIST_ROOM, LIST_ROOM_BY_HOUSE } from 'constants/ApiConstant'
import styles from './style.module.scss'

class RoomsManager {
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

  @Column({
    width: '3%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      return (
        <TableActionDetail
          id={entity._id}
          baseURL={`${LIST_ROOM}/${entity._id}`}
        />
      )
    }
  })
  detail?: string
}

export default function RoomManager() {
  const { houseInfo } = useHouseStore()
  const houseId = houseInfo?._id

  if (houseId) {
    return (
      <Layout>
        <Header houseInfo={houseInfo} />
        <ListView
          id="room_list"
          manager
          pagination
          baseURL={LIST_ROOM_BY_HOUSE.replace('=id', `=${houseId}`)}
          titleTable="Management rooms list"
          descTitle={`All room in ${houseInfo?.name} house`}
          model={RoomsManager}
        />
      </Layout>
    )
  }
  return <></>
}
