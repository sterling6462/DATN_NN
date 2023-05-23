import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Header,
  Layout,
  ListView,
  Status,
  TableActionDelete,
  TableActionEdit,
  currencyFormat,
  dateFormat
} from 'components'
import { CREATE_ROOM, LIST_ROOM } from 'constants/ApiConstant'
import { FieldValues } from 'react-hook-form'

class RoomLists {
  @Column({
    title: 'Room name',
    sort: true,
    width: '12%'
  })
  name?: string

  @Column({
    title: 'Type',
    sort: true,
    align: 'center',
    width: '8%'
  })
  type?: string

  @Column({
    title: 'Price',
    sort: true,
    align: 'center',
    width: '12%',
    render: ({ price }) => <span>{currencyFormat(price)}</span>
  })
  price?: number

  @Column({
    title: 'Max mem',
    sort: true,
    align: 'center',
    width: '10%'
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
    render: ({ joinDate }) => <span>{dateFormat(joinDate)}</span>
  })
  joinDate?: string

  @Column({
    title: 'Status',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ member }) => {
      if (member > 0) {
        return <Status label="Room in" chipKey="Active" />
      } else {
        return <Status label="Available" chipKey="Off" />
      }
    }
  })
  status?: string

  @Column({
    title: 'Due date',
    sort: true,
    align: 'center',
    width: '12%'
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
          name: 'member',
          label: 'Member',
          type: FormInputEnum.NUMBER,
          required: { value: true, message: 'Member is required' },
          maxLength: {
            value: entity.maxMember,
            message: 'Enter member must be less than Max member'
          },
          placeholder: 'Enter your member ',
          defaultValue: entity.member
        }
      ]
      return (
        <TableActionEdit
          id="house_list"
          titlePopup="Edit room"
          entity={{ label: entity.name }}
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
          entity={{ label: entity.name }}
          baseURL={`${LIST_ROOM}/${entity._id}`}
        />
      )
    }
  })
  delete?: string
}

const inputsPopup = [
  {
    name: 'houseId',
    type: FormInputEnum.INPUT,
    label: 'House *',
    required: { value: true, message: 'House is required' },
    placeholder: 'Select your house '
  },
  {
    name: 'type',
    type: FormInputEnum.INPUT,
    label: 'Type room *',
    required: {
      value: true,
      message: 'Type room is required'
    },
    placeholder: 'Select your Type room '
  },
  {
    name: 'floor',
    type: FormInputEnum.NUMBER,
    label: 'Floor *',
    required: { value: true, message: 'Floor room is required' },
    placeholder: 'Select your Floor room'
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
  return (
    <Layout>
      <Header homeName="Nhu Ngoc" />
      <ListView
        id="room_list"
        baseURL={LIST_ROOM}
        titleTable="Management rooms list"
        descTitle="All room in Nhu Ngoc house"
        addButtonTitle="Add room"
        baseURLPopup={CREATE_ROOM}
        inputsPopup={inputsPopup}
        titlePopup="Add new room"
        model={RoomLists}
      />
    </Layout>
  )
}
