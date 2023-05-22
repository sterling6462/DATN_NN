import {
  Column,
  FormInputEnum,
  Layout,
  ListView,
  Status,
  currencyFormat,
  dateFormat
} from 'components'

class BillLists {
  @Column({
    title: 'Room name',
    width: '20%'
  })
  roomName?: string

  @Column({
    title: 'Room price',
    align: 'center',
    width: '10%',
    render: ({ roomPrice }) => <span>{currencyFormat(roomPrice)}</span>
  })
  roomPrice?: number

  @Column({
    title: 'Electricity bill',
    align: 'center',
    width: '10%',
    render: ({ electricityBill }) => (
      <span>{currencyFormat(electricityBill)}</span>
    )
  })
  electricityBill?: number

  @Column({
    title: 'Water bill',
    width: '10%',
    render: ({ waterBill }) => <span>{currencyFormat(waterBill)}</span>
  })
  waterBill?: number

  @Column({
    title: 'Wifi price',
    align: 'center',
    width: '10%',
    render: ({ wifiPrice }) => <span>{currencyFormat(wifiPrice)}</span>
  })
  wifiPrice?: number

  @Column({
    title: 'Total',
    align: 'center',
    width: '15%',
    render: ({ roomPrice, electricityBill, waterBill, wifiPrice }) => (
      <span>
        {currencyFormat(roomPrice + electricityBill + waterBill + wifiPrice)}
      </span>
    )
  })
  total?: string

  @Column({
    title: 'Payment date',
    align: 'center',
    width: '15%',
    render: ({ paymentDate }) => {
      if (paymentDate !== '') {
        return <span>{dateFormat(paymentDate)}</span>
      }
      return paymentDate
    }
  })
  paymentDate?: string

  @Column({
    title: 'Payment status',
    align: 'center',
    width: '10%',
    render: ({ paymentDate }) => {
      if (paymentDate !== '') {
        return <Status label="Paid" chipKey="Active" />
      } else {
        return <Status label="Unpaid" chipKey="Off" />
      }
    }
  })
  paymentStatus?: boolean
}

const dataSample = {
  page: 1,
  total: 101,
  data: [
    {
      roomName: 'Nhu Ngoc',
      roomPrice: 3000000,
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 200000,
      paymentDate: '2022-09-19T19:17:55.159Z'
    },
    {
      roomName: 'Thanh Nga',
      roomPrice: 3000000,
      electricityBill: 70000,
      waterBill: 50000,
      wifiPrice: 200000,
      paymentDate: '2022-09-19T19:17:55.159Z'
    },
    {
      roomName: 'Phuong Tram',
      roomPrice: 3000000,
      electricityBill: 124000,
      waterBill: 30000,
      wifiPrice: 200000,
      paymentDate: ''
    },
    {
      roomName: 'Hoai Linh',
      roomPrice: 3000000,
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 0,
      paymentDate: '2022-09-19T19:17:55.159Z'
    },
    {
      roomName: 'Quoc viet',
      roomPrice: 3000000,
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 200000,
      paymentDate: ''
    },
    {
      roomName: 'Duc Nam',
      roomPrice: 3000000,
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 200000,
      paymentDate: '2022-09-19T19:17:55.159Z'
    },
    {
      roomName: 'Anh Tuan',
      roomPrice: 3000000,
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 0,
      paymentDate: '2022-09-19T19:17:55.159Z'
    },
    {
      roomName: 'Xuan Nhat',
      roomPrice: 3000000,
      electricityBill: 124000,
      waterBill: 50000,
      wifiPrice: 200000,
      paymentDate: '2022-09-19T19:17:55.159Z'
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
      <ListView
        // baseURL={BILL}
        id="bill_list"
        titleTable="All house bills"
        descTitle="You will see monthly invoices generated or create a monthly invoice if not already created"
        addButtonTitle="Add Bill"
        inputsPopup={inputsPopup}
        titlePopup="Add new bill"
        model={BillLists}
        dataSample={dataSample}
      />
    </Layout>
  )
}
