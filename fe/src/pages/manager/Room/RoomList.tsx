import { Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Header,
  Layout,
  ListView,
  PopupAdd,
  Status,
  TableActionDelete,
  TableActionDetail,
  TableActionEdit,
  currencyFormat,
  dataDropdownTypeRoom,
  dateFormat,
  useHouseStore
} from 'components'
import { CREATE_ROOM, LIST_ROOM } from 'constants/ApiConstant'
import { FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

class RoomLists {
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
      // TODO: replace fields by api
      const inputs: Array<Control<FieldValues>> = [
        {
          name: 'type',
          type: FormInputEnum.SELECT,
          label: 'Type room *',
          required: {
            value: true,
            message: 'Type room is required'
          },
          placeholder: 'Select your Type room ',
          data: dataDropdownTypeRoom
        }
      ]
      return (
        <TableActionEdit
          id="room_list"
          titlePopup="Edit room"
          entity={{ labelNoti: entity.name }}
          baseURL={`${LIST_ROOM}/${entity._id}`}
          inputPopupEdit={inputs}
        />
      )
    }
  })
  edit?: string

  @Column({
    width: '3%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      return (
        <TableActionDelete
          id="room_list"
          entity={{ labelNoti: entity.name }}
          baseURL={`${LIST_ROOM}/${entity._id}`}
        />
      )
    }
  })
  delete?: string

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

const inputsPopup = [
  {
    name: 'type',
    type: FormInputEnum.SELECT,
    label: 'Type room *',
    required: {
      value: true,
      message: 'Type room is required'
    },
    placeholder: 'Select your Type room ',
    data: dataDropdownTypeRoom
  },
  {
    name: 'floor',
    type: FormInputEnum.NUMBER,
    label: 'Floor *',
    required: { value: true, message: 'Floor room is required' },
    placeholder: 'Enter your Floor room'
  },
  {
    name: 'amountRoom',
    type: FormInputEnum.NUMBER,
    label: 'Number of rooms *',
    required: { value: true, message: 'Number of rooms is required' },
    placeholder: 'Enter your Number of rooms'
  }
]

export default function RoomList() {
  const { houseInfo } = useHouseStore()

  return (
    <Layout>
      <Header houseDetail />
      <ListView
        id="room_list"
        pagination
        search
        baseURL={LIST_ROOM}
        titleTable="Management rooms list"
        descTitle={`All room in ${houseInfo?.name} house`}
        model={RoomLists}
        popupButton={
          <PopupAdd
            managerRole
            inputsPopup={inputsPopup}
            textButton="Add room"
            titlePopup="Add new room"
            baseURLPopup={CREATE_ROOM}
          />
        }
      />
    </Layout>
  )
}
