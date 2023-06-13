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
  CREATE_MANAGER,
  DROPDOWN_HOUSE,
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

class ManagerLists {
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
    title: 'Role',
    sort: true,
    width: '10%'
  })
  role?: string

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
    width: '30%'
  })
  location?: number

  @Column({
    width: '3.5%',
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
    width: '3.5%',
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
    width: '3.5%',
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
    name: 'houseId',
    label: 'House',
    type: FormInputEnum.SELECT,
    required: { value: true, message: 'House is required' },
    placeholder: 'Select house *',
    dropdownURL: DROPDOWN_HOUSE
  },
  {
    name: 'firstName',
    type: FormInputEnum.INPUT,
    label: 'First name *',
    required: { value: true, message: 'First name is required' },
    minLength: {
      value: 1,
      message: 'First name must be at least 2 characters'
    },
    maxLength: {
      value: 200,
      message: "First name can't be longer than 200 characters"
    },
    placeholder: 'Enter First name'
  },
  {
    name: 'lastName',
    type: FormInputEnum.INPUT,
    label: 'Last name *',
    required: { value: true, message: 'Last name is required' },
    minLength: {
      value: 1,
      message: 'Last name must be at least 5 characters'
    },
    maxLength: {
      value: 200,
      message: "Last name can't be longer than 200 characters"
    },
    placeholder: 'Enter Last name'
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
  }
]

export default function ManagerList() {
  return (
    <Layout>
      <Header />
      <ListView
        baseURL={LIST_MANAGER}
        id="manager_list"
        pagination
        titleTable="Manager list"
        descTitle="All manager"
        model={ManagerLists}
        popupButton={
          <PopupAdd
            inputsPopup={inputsPopup}
            textButton="Add manager"
            titlePopup="Add new manager"
            baseURLPopup={CREATE_MANAGER}
            baseURLReload={LIST_MANAGER}
            textAlertError="Can't create manager"
            textAlertSuccess="Create manager account successfully"
          />
        }
      />
    </Layout>
  )
}
