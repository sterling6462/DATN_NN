import { Column, Header, Layout, ListView, currencyFormat } from 'components'
import { LIST_BILL } from 'constants/ApiConstant'

class ServiceLists {
  @Column({
    title: 'Room name',
    sort: true,
    width: '15%'
  })
  roomName?: string

  @Column({
    title: 'Elect index',
    sort: true,
    align: 'center',
    width: '12%'
  })
  electricityIndex?: number

  @Column({
    title: 'Elect price',
    sort: true,
    align: 'center',
    width: '13%',
    render: ({ electricityPrice }) => (
      <span>{currencyFormat(electricityPrice)}</span>
    )
  })
  electricityPrice?: number

  @Column({
    title: 'Electricity bill',
    sort: true,
    align: 'center',
    width: '15%',
    render: ({ electricityBill }) => (
      <span>{currencyFormat(electricityBill)}</span>
    )
  })
  electricityBill?: number

  @Column({
    title: 'Water bill',
    sort: true,
    align: 'center',
    width: '15%',
    render: ({ waterBill }) => <span>{currencyFormat(waterBill)}</span>
  })
  waterBill?: number

  @Column({
    title: 'Wifi bill',
    sort: true,
    align: 'center',
    width: '15%',
    render: ({ wifiBill }) => <span>{currencyFormat(wifiBill)}</span>
  })
  wifiBill?: number

  @Column({
    title: 'Total',
    sort: true,
    align: 'center',
    width: '15%',
    render: ({ electricityBill, waterBill, wifiBill }) => (
      <span>{currencyFormat(electricityBill + waterBill + wifiBill)}</span>
    )
  })
  total?: string
}

export default function Bill() {
  return (
    <Layout>
      <Header bill houseDetail />
      <ListView
        baseURL={LIST_BILL}
        id="service_list"
        pagination
        titleTable="Tenants use in the month"
        descTitle="Statistics every month tenants use"
        model={ServiceLists}
      />
    </Layout>
  )
}
