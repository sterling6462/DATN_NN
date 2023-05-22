import {
  Column,
  FormInputEnum,
  Layout,
  ListView,
  Status,
  dateFormat
} from 'components'

class TenantLists {
  @Column({
    title: 'Tenant name',
    width: '15%'
  })
  tenantName?: string

  @Column({
    title: 'Room number',
    align: 'center',
    width: '12%'
  })
  roomName?: number

  @Column({
    title: 'Phone',
    align: 'center',
    width: '10%'
  })
  phone?: number

  @Column({
    title: 'Birthday',
    align: 'center',
    width: '15%',
    render: ({ birthday }) => <span>{dateFormat(birthday)}</span>
  })
  birthday?: string

  @Column({
    title: 'Location',
    width: '25%'
  })
  location?: string

  @Column({
    title: 'CI number',
    align: 'center',
    width: '10%'
  })
  ciNumber?: string

  // @Column({
  //   title: 'ID status',
  //   align: 'center',
  //   width: '10%',
  //   render: ({ idStatus }) => {
  //     if (idStatus) {
  //       return <Status label="Complete" chipKey="Active" />
  //     } else {
  //       return <Status label="Missing" chipKey="Pending" />
  //     }
  //   }
  // })
  // idStatus?: boolean

  @Column({
    title: 'Temporary status',
    align: 'center',
    width: '13%',
    render: ({ temporaryStatus }) => {
      if (temporaryStatus) {
        return <Status label="Had" chipKey="Active" />
      } else {
        return <Status label="Not yet" chipKey="Off" />
      }
    }
  })
  temporaryStatus?: boolean
}

const dataSample = {
  page: 1,
  total: 101,
  data: [
    {
      tenantName: 'Nhu Ngoc',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: true
    },
    {
      tenantName: 'Thanh Nga',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: false
    },
    {
      tenantName: 'Phuong Tram',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: true
    },
    {
      tenantName: 'Hoai Linh',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: false,
      temporaryStatus: true
    },
    {
      tenantName: 'Quoc viet',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: false,
      temporaryStatus: false
    },
    {
      tenantName: 'Duc Nam',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: false
    },
    {
      tenantName: 'Anh Tuan',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: false,
      temporaryStatus: true
    },
    {
      tenantName: 'Xuan Nhat',
      roomName: 'A.101',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      location: 'Thach Gian, Thanh Khe, Da Nang',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: false
    }
  ]
}

const inputsPopup = [
  {
    name: 'tenantName',
    type: FormInputEnum.INPUT,
    label: 'Tenant name *',
    required: { value: true, message: 'Tenant name is required' },
    minLength: {
      value: 5,
      message: 'Tenant name must be at least 5 characters'
    },
    maxLength: {
      value: 200,
      message: "Tenant name can't be longer than 200 characters"
    },
    placeholder: 'Enter your Tenant name'
  },
  {
    name: 'phone',
    type: FormInputEnum.NUMBER,
    required: { value: true, message: 'Phone is required' },
    label: 'Phone *',
    placeholder: 'Enter your phone'
  },
  {
    name: 'birthday',
    type: FormInputEnum.INPUT,
    label: 'Birthday',
    placeholder: 'Enter your Birthday'
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
    name: 'career',
    type: FormInputEnum.INPUT,
    label: 'Career',
    placeholder: 'Enter your career'
  },
  {
    name: 'ciNumber',
    type: FormInputEnum.INPUT,
    required: {
      value: true,
      message: 'Citizen Identification number is required'
    },
    label: 'Citizen Identification number (CCCD/CMND) *',
    placeholder: 'Enter your Citizen Identification number'
  }
]

export default function Tenant() {
  return (
    <Layout>
      <ListView
        baseURL=""
        id="tenant_list"
        titleTable="Manage tenant list"
        addButtonTitle="Add tenant"
        descTitle="All tenant lists in your Hotel"
        titlePopup="Add new tenant"
        inputsPopup={inputsPopup}
        model={TenantLists}
        dataSample={dataSample}
      />
    </Layout>
  )
}
