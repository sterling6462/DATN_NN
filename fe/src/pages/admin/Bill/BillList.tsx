import { Typography } from '@mui/material'
import clsx from 'clsx'
import {
  Column,
  Control,
  Entity,
  FormInputEnum,
  Layout,
  ListView,
  Status,
  TableActionDelete,
  TableActionDetail,
  TableActionEdit,
  currencyFormat,
  dateFormat
} from 'components'
import { DROPDOWN_ROOM, LIST_BILL } from 'constants/ApiConstant'
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
    title: 'Create by',
    sort: true,
    align: 'center',
    width: '5%'
  })
  createBy?: string

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
      // TODO: replace fields by api
      const dataSelectStatus = [
        { _id: true, name: 'Paid' },
        { _id: false, name: 'Unpaid' }
      ]
      const inputs: Array<Control<FieldValues>> = [
        {
          name: 'numberElectricity',
          label: 'Electricity index',
          type: FormInputEnum.NUMBER,
          min: {
            value: 1,
            message: 'Enter member must be greater than 1'
          },
          required: { value: true, message: 'Electricity index is required' },
          placeholder: 'Enter your Electricity index '
          // defaultValue: entity.member
        },
        {
          name: 'status',
          label: 'Status',
          type: FormInputEnum.SELECT,
          required: { value: true, message: 'Status is required' },
          data: dataSelectStatus
        }
      ]
      return (
        <TableActionEdit
          id="bill_list"
          titlePopup="Edit bill"
          extraTitlePopup={` of ${entity.roomName} room`}
          entity={{ labelNoti: `Bill of ${entity.roomName} room` }}
          baseURL={`${LIST_BILL}/${entity.id}`}
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
    dropdownURL: DROPDOWN_ROOM
  },
  {
    name: 'numberElectricity',
    type: FormInputEnum.NUMBER,
    label: 'Electricity index *',
    min: {
      value: 1,
      message: 'Enter member must be greater than 1'
    },
    required: {
      value: true,
      message: 'Electricity index is required'
    },
    placeholder: 'Enter your Electricity index '
  },
  {
    name: 'other',
    type: FormInputEnum.NUMBER,
    min: {
      value: 1,
      message: 'Enter member must be greater than 0'
    },
    label: 'Costs incurred',
    placeholder: 'Enter Costs incurred'
  }
]

export default function BillListAdmin() {
  return (
    <Layout>
      <ListView
        baseURL={LIST_BILL}
        id="bill_list"
        search
        pagination
        titleTable="All house bills"
        descTitle="You will see monthly invoices generated or create a monthly invoice if not already created"
        model={BillLists}
      />
    </Layout>
  )
}
