import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Layout,
  ListView,
  Rating,
  TableActionDelete,
  TableActionEdit,
  currencyFormat
} from 'components'
import { CREATE_HOUSE, LIST_HOUSE } from 'constants/ApiConstant'
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
    title: 'House name',
    sort: true,
    width: '15%'
  })
  name?: string

  @Column({
    title: 'Room count',
    sort: true,
    align: 'center',
    width: '15%'
  })
  roomCount?: number

  @Column({
    title: 'Room available',
    sort: true,
    align: 'center',
    width: '10%'
  })
  roomAvailable?: number

  @Column({
    title: 'Elect price',
    align: 'center',
    width: '10%',
    render: ({ electricityPrice }) => (
      <span>{currencyFormat(electricityPrice)}</span>
    )
  })
  electricityPrice?: number

  @Column({
    title: 'Water price',
    align: 'center',
    width: '12%',
    render: ({ waterPrice }) => <span>{currencyFormat(waterPrice)}</span>
  })
  waterPrice?: number

  @Column({
    title: 'Wifi price',
    align: 'center',
    width: '8%',
    render: ({ wifiPrice }) => <span>{currencyFormat(wifiPrice)}</span>
  })
  wifiPrice?: number

  @Column({
    title: 'Rate',
    align: 'center',
    width: '5%',
    render: ({ rate }) => <Rating value={rate} />
  })
  rate?: number

  @Column({
    title: 'Location',
    sort: true,
    width: '15%'
  })
  location?: string

  @Column({
    width: '5%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      return (
        <TableActionEdit
          id="house_list"
          titlePopup="Edit house"
          entity={{ label: entity.name }}
          baseURL={`${LIST_HOUSE}/${entity._id}`}
          inputPopupEdit={inputs}
        />
      )
    }
  })
  edit?: string

  @Column({
    width: '5%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      return (
        <TableActionDelete
          id="house_list"
          entity={{ label: entity.name }}
          baseURL={`${LIST_HOUSE}/${entity._id}`}
        />
      )
    }
  })
  delete?: string
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

export default function HostList() {
  return (
    <Layout>
      <ListView
        baseURL={LIST_HOUSE}
        id="house_list"
        titleTable="Management house list"
        descTitle="All house managed"
        addButtonTitle="Add house"
        baseURLPopup={CREATE_HOUSE}
        inputsPopup={inputsPopup}
        titlePopup="Add new house"
        model={HostLists}
        // dataSample={dataSample}
      />
    </Layout>
  )
}
