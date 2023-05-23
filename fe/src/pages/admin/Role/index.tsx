import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Layout,
  ListView,
  TableActionDelete,
  TableActionEdit,
  dateTimeFormat
} from 'components'
import { CREATE_HOUSE } from 'constants/ApiConstant'
import { FieldValues } from 'react-hook-form'

class RoleLists {
  @Column({ title: 'Username', width: '20%' })
  username?: string

  @Column({ title: 'Role', width: '14%' })
  role?: string

  @Column({ title: 'Describe', width: '30%' })
  describe?: string

  @Column({
    title: 'Date updated',
    width: '30%',
    align: 'center',
    render: ({ dateUpdated }) => <span>{dateTimeFormat(dateUpdated)}</span>
  })
  dateUpdated?: string

  @Column({
    width: '3%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      // TODO: replace fields by api
      const inputs: Array<Control<FieldValues>> = [
        {
          name: 'username',
          label: 'Username',
          type: FormInputEnum.INPUT,
          required: { value: true, message: 'Username is required' },
          placeholder: 'Enter your username',
          defaultValue: entity.username
        },
        {
          name: 'role',
          label: 'Role',
          type: FormInputEnum.SELECT,
          required: { value: true, message: 'Role is required' },
          placeholder: 'Enter your role ',
          defaultValue: entity.role,
          dropdownURL: '',
          data: dataDropdownSample
        },
        {
          name: 'describe',
          label: 'Describe',
          type: FormInputEnum.INPUT,
          placeholder: 'Enter your describe ',
          defaultValue: entity.describe
        }
      ]
      return (
        <TableActionEdit
          id="house_list"
          titlePopup="Edit role"
          entity={{ label: entity.name }}
          baseURL={``}
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
    render: ({ id, role }) => {
      return (
        <TableActionDelete id="role" entity={{ label: role }} baseURL={''} />
      )
    }
  })
  delete?: string
}

const dataDropdownSample = [
  { code: '1', label: 'admin' },
  { code: '2', label: 'host' },
  { code: '3', label: 'user' }
]

const dataSample = {
  page: 1,
  total: 101,
  data: [
    {
      username: 'Nhu Ngoc',
      role: 'admin',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: true
    },
    {
      username: 'Thanh Nga',
      role: 'host',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: false
    },
    {
      username: 'Phuong Tram',
      role: 'user',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: true
    },
    {
      username: 'Hoai Linh',
      role: 'admin',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: false,
      temporaryStatus: true
    },
    {
      username: 'Quoc viet',
      role: 'admin',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: false,
      temporaryStatus: false
    },
    {
      username: 'Duc Nam',
      role: 'admin',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: false
    },
    {
      username: 'Anh Tuan',
      role: 'admin',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: false,
      temporaryStatus: true
    },
    {
      username: 'Xuan Nhat',
      role: 'admin',
      phone: 123456789,
      birthday: '2022-09-19T19:17:55.159Z',
      describe: 'create, edit, delete, update',
      ciNumber: '123456789',
      idStatus: true,
      temporaryStatus: false
    }
  ]
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

export default function Role() {
  return (
    <Layout>
      <ListView
        baseURL=""
        id="role"
        titleTable="Management house list"
        descTitle="All house managed"
        addButtonTitle="Add house"
        baseURLPopup={CREATE_HOUSE}
        inputsPopup={inputsPopup}
        titlePopup="Add new usernames"
        model={RoleLists}
        dataSample={dataSample}
      />
    </Layout>
  )
}
