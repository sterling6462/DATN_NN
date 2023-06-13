import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Header,
  Layout,
  ListView,
  PopupAdd,
  RatingNumber,
  TableActionDelete,
  TableActionDetail,
  TableActionEdit,
  currencyFormat,
  dataDropdownRating
} from 'components'
import { CREATE_HOUSE, LIST_HOUSE } from 'constants/ApiConstant'
import { FieldValues } from 'react-hook-form'

class HouseLists {
  @Column({
    title: 'House name',
    sort: true,
    width: '13%'
  })
  name?: string

  @Column({
    title: 'Rate',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ rate }) => <RatingNumber value={rate} />
  })
  rate?: number

  @Column({
    title: 'Room count',
    sort: true,
    align: 'center',
    width: '12%'
  })
  roomCount?: number

  @Column({
    title: 'Room available',
    sort: true,
    align: 'center',
    width: '13%'
  })
  roomAvailable?: number

  @Column({
    title: 'Elect price',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ electricityPrice }) => (
      <span>{currencyFormat(electricityPrice)}</span>
    )
  })
  electricityPrice?: number

  @Column({
    title: 'Water price',
    sort: true,
    align: 'center',
    width: '12%',
    render: ({ waterPrice }) => <span>{currencyFormat(waterPrice)}</span>
  })
  waterPrice?: number

  @Column({
    title: 'Wifi price',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ wifiPrice }) => <span>{currencyFormat(wifiPrice)}</span>
  })
  wifiPrice?: number

  @Column({
    title: 'Location',
    sort: true,
    width: '14%'
  })
  location?: string

  @Column({
    width: '3%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      // TODO: replace fields by api
      const inputs: Array<Control<FieldValues>> = [
        {
          name: 'rate',
          label: 'Rate',
          type: FormInputEnum.SELECT,
          required: { value: true, message: 'Rating house is required' },
          placeholder: 'Select your rating house *',
          data: dataDropdownRating,
          defaultValue: entity.rate
        },
        {
          name: 'electricityPrice',
          label: 'Electricity price',
          type: FormInputEnum.NUMBER,
          min: {
            value: 0,
            message: 'Enter member must be greater than 0'
          },
          required: { value: true, message: 'Electricity Price is required' },
          placeholder: 'Enter your Electricity price *',
          defaultValue: entity.electricityPrice
        },
        {
          name: 'waterPrice',
          label: 'Water price',
          type: FormInputEnum.NUMBER,
          min: {
            value: 0,
            message: 'Enter member must be greater than 0'
          },
          required: { value: true, message: 'Water price is required' },
          placeholder: 'Enter your Water price *',
          defaultValue: entity.waterPrice
        },
        {
          name: 'wifiPrice',
          label: 'Wifi price',
          type: FormInputEnum.NUMBER,
          min: {
            value: 0,
            message: 'Enter member must be greater than 0'
          },
          required: { value: true, message: 'Wifi price is required' },
          placeholder: 'Enter your Wifi price *',
          defaultValue: entity.wifiPrice
        }
      ]
      return (
        <TableActionEdit
          id="house_list"
          titlePopup="Edit house"
          entity={{ labelNoti: entity.name }}
          baseURL={`${LIST_HOUSE}/${entity.id}`}
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
          baseURL={`${LIST_HOUSE}/${entity.id}`}
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
          id={entity.id}
          baseURL={`${LIST_HOUSE}/${entity.id}`}
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
    name: 'floorCount',
    type: FormInputEnum.NUMBER,
    label: 'Floor count *',
    required: { value: true, message: 'Floor count is required' },
    min: {
      value: 1,
      message: 'Floor count must be at least than 1'
    },
    max: {
      value: 50,
      message: "Floor count can't be higher than 50"
    },
    placeholder: 'Enter your Floor count'
  },
  {
    name: 'location',
    description: 'location',
    type: FormInputEnum.MAP,
    label: 'Location *',
    placeholder: 'Enter your location',
    required: { value: true, message: 'Location is required' },
    maxLength: { value: 500, message: "Location can't be longer than 500" }
  },
  {
    name: 'rate',
    type: FormInputEnum.SELECT,
    label: 'Rate *',
    required: { value: true, message: 'Rating is required' },
    placeholder: 'Enter your Room rating',
    data: dataDropdownRating
  },
  {
    name: 'electricityPrice',
    type: FormInputEnum.NUMBER,
    label: 'Electricity price *',
    placeholder: 'Enter your Electricity price',
    required: { value: true, message: 'Electricity price is required' },
    min: {
      value: 1,
      message: 'Floor must be at least than 1'
    },
    max: {
      value: 100000,
      message: "Floor can't be higher than 100000"
    }
  },
  {
    name: 'waterPrice',
    type: FormInputEnum.NUMBER,
    label: 'Water price *',
    placeholder: 'Enter your Water price',
    min: {
      value: 1,
      message: 'Floor must be at least than 1'
    },
    max: {
      value: 100000,
      message: "Floor can't be higher than 100000"
    }
  },
  {
    name: 'wifiPrice',
    type: FormInputEnum.NUMBER,
    label: 'Wifi Price *',
    required: { value: true, message: 'Wifi price is required' },
    placeholder: 'Enter your Wifi price',
    min: {
      value: 1,
      message: 'Floor must be at least than 1'
    },
    max: {
      value: 100000,
      message: "Floor can't be higher than 100000"
    }
  },
  {
    name: 'detail',
    type: FormInputEnum.INPUT,
    label: 'Detail *',
    required: { value: true, message: 'Detail is required' },
    placeholder: 'Enter your Wifi price'
  }
]

export default function HouseList() {
  return (
    <Layout>
      <Header />
      <ListView
        id="house_list"
        pagination
        search
        baseURL={LIST_HOUSE}
        titleTable="Management house list"
        descTitle="All house managed"
        model={HouseLists}
        popupButton={
          <PopupAdd
            inputsPopup={inputsPopup}
            textButton="Add house"
            titlePopup="Add new house"
            baseURLPopup={CREATE_HOUSE}
            baseURLReload={LIST_HOUSE}
          />
        }
      />
    </Layout>
  )
}
