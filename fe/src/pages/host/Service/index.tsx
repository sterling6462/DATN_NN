import {
  CardBill,
  Column,
  FormInputEnum,
  Layout,
  ListView,
  currencyFormat
} from 'components'

class ServiceLists {
  @Column({
    title: 'Room name',
    width: '20%'
  })
  roomName?: string

  @Column({
    title: 'Electricity bill',
    align: 'center',
    width: '15%',
    render: ({ electricityBill }) => (
      <span>{currencyFormat(electricityBill)}</span>
    )
  })
  electricityBill?: number

  @Column({
    title: 'Water bill',
    align: 'center',
    width: '15%',
    render: ({ waterBill }) => <span>{currencyFormat(waterBill)}</span>
  })
  waterBill?: number

  @Column({
    title: 'Wifi price',
    align: 'center',
    width: '15%',
    render: ({ wifiPrice }) => <span>{currencyFormat(wifiPrice)}</span>
  })
  wifiPrice?: number

  @Column({
    title: 'Total',
    align: 'center',
    width: '25%',
    render: ({ electricityBill, waterBill, wifiPrice }) => (
      <span>{currencyFormat(electricityBill + waterBill + wifiPrice)}</span>
    )
  })
  total?: string
}

const dataSample = {
  page: 1,
  total: 101,
  data: [
    {
      roomName: 'A.101',
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 200000
    },
    {
      roomName: 'A.102',
      electricityBill: 70000,
      waterBill: 50000,
      wifiPrice: 200000
    },
    {
      roomName: 'A.103',
      electricityBill: 124000,
      waterBill: 30000,
      wifiPrice: 200000,
      paymentDate: ''
    },
    {
      roomName: 'A.104',
      electricityBill: 124000,
      waterBill: 40000,
      wifiPrice: 200000
    },
    {
      roomName: 'A.105',
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 0
    },
    {
      roomName: 'A.106',
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 200000,
      paymentDate: ''
    },
    {
      roomName: 'A.107',
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 200000
    },
    {
      roomName: 'A.108',
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 0
    }
  ]
}

const inputsPopup = [
  {
    name: 'houseName',
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
    name: 'roomFloor',
    type: FormInputEnum.NUMBER,
    label: 'Room floor',
    placeholder: 'Enter your room floor'
  },
  {
    name: 'roomNumber',
    type: FormInputEnum.NUMBER,
    label: 'Room number *',
    required: { value: true, message: 'Room number is required' },
    minLength: { value: 0, message: 'Room floor must be at least 1' },
    maxLength: { value: 100, message: "Room floor can't be longer than 100" },
    placeholder: 'Enter your Room number'
  },
  {
    name: 'location',
    type: FormInputEnum.INPUT,
    label: 'Location *',
    placeholder: 'Enter your location',
    required: { value: true, message: 'Location is required' },
    maxLength: { value: 500, message: "Location can't be longer than 500" }
  }
]

export default function Bill() {
  return (
    <Layout>
      <CardBill />
      <ListView
        baseURL=""
        id="Service_list"
        titleTable="Tenants use in the month"
        descTitle="Statistics every month tenants use"
        addButtonTitle="Add Service"
        inputsPopup={inputsPopup}
        model={ServiceLists}
        dataSample={dataSample}
      />
    </Layout>
  )
}
