import { Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Header,
  Layout,
  ListView,
  PopupAdd,
  Status,
  TableActionDelete,
  TableActionDetail,
  TableActionEdit,
  currencyFormat,
  dataDropdownPaid,
  dateFormat,
  useHouseStore
} from 'components'
import {
  CREATE_BILL,
  DROPDOWN_ROOM_FOR_BILL,
  LIST_BILL,
  LIST_BILL_BY_HOUSE
} from 'constants/ApiConstant'
import { FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

class BillLists {
  @Column({
    title: 'Name',
    sort: true,
    width: '5%',
    render: ({ roomName }) => (
      <Typography className={clsx(styles.Subhead2, styles.NameTableCell)}>
        {roomName}
      </Typography>
    )
  })
  roomName?: string

  @Column({
    title: 'Rental',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ roomBill }) => <span>{currencyFormat(roomBill)}</span>
  })
  roomBill?: number

  @Column({
    title: 'Elect ',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ electricityBill }) => (
      <span>{currencyFormat(electricityBill)}</span>
    )
  })
  electricityBill?: number

  @Column({
    title: 'Water ',
    sort: true,
    width: '8%',
    render: ({ waterBill }) => <span>{currencyFormat(waterBill)}</span>
  })
  waterBill?: number

  @Column({
    title: 'Wifi ',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ wifiBill }) => <span>{currencyFormat(wifiBill)}</span>
  })
  wifiBill?: number

  @Column({
    title: 'Other ',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ otherBill }) => <span>{currencyFormat(otherBill)}</span>
  })
  otherBill?: string

  @Column({
    title: 'Total',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ total }) => (
      <Typography className={clsx(styles.Subhead2, styles.PriceTableCell)}>
        {currencyFormat(total)}
      </Typography>
    )
  })
  total?: string

  @Column({
    title: 'Create at',
    sort: true,
    align: 'center',
    width: '10%',
    render: ({ createdAt }) => <span>{dateFormat(createdAt)}</span>
  })
  createdAt?: string

  @Column({
    title: 'Status',
    sort: true,
    align: 'center',
    width: '8%',
    render: ({ status }) => {
      if (status) {
        return <Status chipKey={true} />
      } else {
        return <Status chipKey={false} />
      }
    }
  })
  status?: boolean

  @Column({
    width: '3.5%',
    align: 'center',
    padding: 'none',
    render: (entity: Entity) => {
      const inputsEdit: Array<Control<FieldValues>> = [
        {
          name: 'currentElectricity',
          label: 'Electric current index *',
          required: {
            value: true,
            message: 'Electric current index is required'
          },
          type: FormInputEnum.NUMBER,
          min: {
            value: 1,
            message: 'Enter Electric current index must be greater than 1'
          },
          placeholder: 'Enter your Electric current index '
          // defaultValue: entity.member
        },
        {
          name: 'other',
          label: 'Costs incurred',
          type: FormInputEnum.NUMBER,
          min: {
            value: 1,
            message: 'Enter Costs incurred must be greater than 1'
          },
          placeholder: 'Enter Costs incurred ',
          defaultValue: entity.otherBill
        },
        {
          name: 'status',
          label: 'Status',
          type: FormInputEnum.SELECT,
          // required: { value: true, message: 'Status is required' },
          data: dataDropdownPaid,
          defaultValue: entity.status
        }
      ]
      return (
        <TableActionEdit
          id="bill_list"
          titlePopup="Edit bill"
          extraTitlePopup={` of ${entity.roomName} room`}
          entity={{ labelNoti: `Bill of ${entity.roomName} room` }}
          baseURL={`${LIST_BILL}/${entity.id}`}
          inputPopupEdit={inputsEdit}
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
          id="bill_list"
          entity={{ labelNoti: `Bill of ${entity.roomName} room` }}
          baseURL={`${LIST_BILL}/${entity.id}`}
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
          id={entity.id}
          baseURL={`${LIST_BILL}/${entity.id}`}
        />
      )
    }
  })
  detail?: string
}

const inputsPopup = [
  {
    name: 'roomId',
    type: FormInputEnum.SELECT,
    label: 'Room name*',
    required: { value: true, message: 'Room is required' },
    placeholder: 'Select your room',
    dropdownURL: DROPDOWN_ROOM_FOR_BILL
  },
  {
    name: 'currentElectricity',
    label: 'Electric current index *',
    type: FormInputEnum.NUMBER,
    min: {
      value: 1,
      message: 'Enter Electric current index must be greater than 1'
    },
    required: {
      value: true,
      message: 'Electric current index is required'
    },
    placeholder: 'Enter your Electric current index'
  },
  {
    name: 'other',
    type: FormInputEnum.NUMBER,
    label: 'Costs incurred',
    min: {
      value: 1,
      message: 'Enter Costs incurred must be greater than 1'
    },
    placeholder: 'Enter Costs incurred'
  }
]

export default function BillListManager() {
  const { houseInfo } = useHouseStore()
  const houseId = houseInfo?._id

  if (houseId) {
    return (
      <Layout>
        <Header houseInfo={houseInfo} />
        <ListView
          manager
          id="bill_list"
          baseURL={LIST_BILL_BY_HOUSE.replace('=id', `=${houseId}`)}
          search
          pagination
          titleTable="All house bills"
          descTitle="You will see monthly invoices generated or create a monthly invoice if not already created"
          model={BillLists}
          popupButton={
            <PopupAdd
              managerRole
              inputsPopup={inputsPopup}
              textButton="Add bill"
              titlePopup="Add new bill"
              baseURLPopup={CREATE_BILL}
              baseURLReload={LIST_BILL}
              textAddError="Can't create new bill"
              textAddSuccess="Create new bill successfully"
            />
          }
        />
      </Layout>
    )
  }
  return <></>
}
