import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Header,
  Layout,
  ListView,
  PopupAdd,
  TableActionDelete,
  TableActionDetail,
  TableActionEdit
} from 'components'
import { CREATE_HOUSE, LIST_MANAGER } from 'constants/ApiConstant'
import { FieldValues } from 'react-hook-form'

// TODO: replace fields by api
const inputs: Array<Control<FieldValues>> = [
  {
    name: 'member',
    type: FormInputEnum.INPUT,
    required: { value: true, message: 'Member is required' },
    placeholder: 'Enter your member *'
  }
]

class HostLists {
  @Column({
    title: 'Name',
    sort: true,
    width: '15%'
  })
  name?: string

  @Column({
    title: 'Username',
    sort: true,
    width: '30%'
  })
  username?: string

  @Column({
    title: 'Phone',
    sort: true,
    align: 'center',
    width: '15%'
  })
  phone?: number

  @Column({
    title: 'Location',
    sort: true,
    width: '20%'
  })
  location?: number

  @Column({
    width: '3%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      return (
        <TableActionEdit
          id="house_list"
          titlePopup="Edit house"
          entity={{ labelNoti: entity.name }}
          baseURL={`${LIST_MANAGER}/${entity.id}`}
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
          id="house_list"
          entity={{ labelNoti: entity.name }}
          baseURL={`${LIST_MANAGER}/${entity.id}`}
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
          baseURL={`${LIST_MANAGER}/${entity._id}`}
        />
      )
    }
  })
  detail?: string
}

const inputsPopup = [
  {
    name: 'name',
    type: FormInputEnum.INPUT,
    label: 'House name *',
    required: { value: true, message: 'House name is required' },
    minLength: {
      value: 5,
      message: 'House name must be at least 5 characters'
    },
    maxLength: {
      value: 200,
      message: "House name can't be longer than 200 characters"
    },
    placeholder: 'Enter your House name'
  },
  {
    name: 'location',
    type: FormInputEnum.INPUT,
    label: 'Location *',
    placeholder: 'Enter your location',
    required: { value: true, message: 'Location is required' },
    maxLength: { value: 500, message: "Location can't be longer than 500" }
  },
  {
    name: 'managerId',
    type: FormInputEnum.INPUT,
    label: 'Manager name *',
    placeholder: 'Enter your Manager name'
  },
  {
    name: 'rate',
    type: FormInputEnum.NUMBER,
    label: 'Rate *',
    required: { value: true, message: 'Room number is required' },
    placeholder: 'Enter your Room rating'
  },
  {
    name: 'electricityPrice',
    type: FormInputEnum.NUMBER,
    label: 'Electricity price *',
    placeholder: 'Enter your electricity price',
    required: { value: true, message: 'Electricity price is required' },
    maxLength: {
      value: 500,
      message: "Electricity price can't be longer than 500"
    }
  },
  {
    name: 'waterPrice',
    type: FormInputEnum.NUMBER,
    label: 'Water price *',
    placeholder: 'Enter your Water price'
  },
  {
    name: 'wifiPrice',
    type: FormInputEnum.NUMBER,
    label: 'Wifi Price *',
    required: { value: true, message: 'Wifi price is required' },
    placeholder: 'Enter your Wifi price'
  }
]

export default function ManagerList() {
  return (
    <Layout>
      <Header />
      <ListView
        baseURL={LIST_MANAGER}
        id="house_list"
        pagination
        titleTable="House's managers list"
        descTitle="All house's managers"
        model={HostLists}
        popupButton={
          <PopupAdd
            inputsPopup={inputsPopup}
            textButton="Add manager"
            titlePopup="Add new manager"
            baseURLPopup={CREATE_HOUSE}
          />
        }
      />
    </Layout>
  )
}
