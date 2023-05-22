import { Column, Layout } from 'components'

class SettingLists {
  @Column({
    title: 'Role name',
    sort: true,
    width: '20%'
  })
  role?: string

  @Column({
    title: 'Group',
    sort: true,
    width: '20%'
  })
  group?: string

  @Column({
    title: 'Price',
    sort: true,
    width: '20%'
  })
  price?: string

  @Column({
    title: 'Customer',
    sort: true,
    width: '20%'
  })
  customer?: string

  @Column({
    title: 'Status',
    sort: true,
    width: '20%'
  })
  status?: string
}

const dataSample = {
  page: 1,
  total: 101,
  data: [
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    },
    {
      roomName: 'Admin',
      group: 'Chỉnh sửa, thêm, xóa',
      price: '1000',
      customer: 'Chỉnh sửa, thêm, xóa',
      status: '1000'
    }
  ]
}

export default function Settings() {
  return <Layout>This is setting page</Layout>
}
