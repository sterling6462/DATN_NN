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
import {
  CREATE_MEMBER,
  DROPDOWN_ROOM,
  LIST_MANAGER
} from 'constants/ApiConstant'
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

class TenantLists {
  @Column({
    title: 'Username',
    sort: true,
    width: '25%'
  })
  username?: string

  @Column({
    title: 'First name',
    sort: true,
    width: '10%'
  })
  firstName?: string

  @Column({
    title: 'Last name',
    sort: true,
    width: '10%'
  })
  lastName?: string

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
          baseURL={`${LIST_MANAGER}/${entity._id}`}
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
          baseURL={`${LIST_MANAGER}/${entity._id}`}
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
    name: 'roomId',
    label: 'Room',
    type: FormInputEnum.SELECT,
    required: { value: true, message: 'Room is required' },
    placeholder: 'Select room *',
    dropdownURL: DROPDOWN_ROOM
  },
  {
    name: 'firstName',
    type: FormInputEnum.INPUT,
    label: "Member's fist name *",
    required: { value: true, message: "Member's fist name is required" },
    minLength: {
      value: 1,
      message: "Member's fist name must be at least 5 characters"
    },
    maxLength: {
      value: 200,
      message: "Member's fist name can't be longer than 200 characters"
    },
    placeholder: "Enter your Member's fist name"
  },
  {
    name: 'lastName',
    type: FormInputEnum.INPUT,
    label: "Member's last name *",
    required: { value: true, message: "Member's last name is required" },
    minLength: {
      value: 1,
      message: "Member's last name must be at least 5 characters"
    },
    maxLength: {
      value: 200,
      message: "Member's last name can't be longer than 200 characters"
    },
    placeholder: "Enter your Member's last name"
  },
  {
    name: 'phone',
    type: FormInputEnum.NUMBER,
    label: 'Phone *',
    required: {
      value: true,
      message: 'Phone is required'
    },
    minLength: {
      value: 10,
      message: 'Phone must be at least 10 characters'
    },
    maxLength: {
      value: 11,
      message: "Phone can't be longer than 11 characters"
    },
    placeholder: 'Enter phone number'
  },
  {
    name: 'birthday',
    type: FormInputEnum.DATE,
    label: 'Birthday *',
    required: { value: true, message: 'Birthday is required' },
    minLength: {
      value: 5,
      message: 'Birthday must be at least 5 characters'
    },
    maxLength: {
      value: 200,
      message: "Birthday can't be longer than 200 characters"
    },
    placeholder: 'Enter Birthday'
  }
]

export default function TenantList() {
  return (
    <Layout>
      <Header />
      <ListView
        baseURL={LIST_MANAGER}
        id="tenant_list"
        pagination
        titleTable="Tenant list"
        descTitle="All tenant"
        model={TenantLists}
        popupButton={
          <PopupAdd
            inputsPopup={inputsPopup}
            textButton="Add user"
            titlePopup="Add new user"
            baseURLPopup={CREATE_MEMBER}
            baseURLReload={LIST_MANAGER}
            textAlertError="Can't create user"
            textAlertSuccess="Create user account successfully"
          />
        }
      />
    </Layout>
  )
}
