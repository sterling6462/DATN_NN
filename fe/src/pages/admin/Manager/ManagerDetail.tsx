import {
  CardUserInfo,
  FormInputEnum,
  Header,
  Layout,
  dataDropdownRole
} from 'components'
import { DETAIL_MANAGER, DROPDOWN_HOUSE } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.scss'

export const textFieldClasses = {
  inputBaseRoot: styles.InputBaseRoot,
  inputBaseFocused: styles.InputBaseFocused,
  notchedOutline: styles.NotchedOutline,
  labelRoot: styles.LabelRoot,
  labelFocused: styles.LabelFocused
}

export default function ManagerDetail() {
  const { id = '' } = useParams()
  const [data, setData] = useState<CardUserInfo>()

  useAPI({
    baseURL: DETAIL_MANAGER.replace(':id', id),
    onSuccess(data) {
      setData(data)
    }
  })

  const inputs = [
    {
      name: 'name',
      type: FormInputEnum.INPUT,
      label: 'Name *',
      required: {
        value: true,
        message: 'Name is required'
      },
      placeholder: 'Enter your name ',
      defaultValue: data?.name,
      textFieldClasses: textFieldClasses
    },
    {
      name: 'username',
      type: FormInputEnum.INPUT,
      label: 'Username *',
      required: {
        value: true,
        message: 'Username is required'
      },
      placeholder: 'Enter your name ',
      defaultValue: data?.username,
      textFieldClasses: textFieldClasses
    },
    {
      name: 'role',
      type: FormInputEnum.SELECT,
      label: 'Role *',
      required: { value: true, message: 'Role is required' },
      placeholder: 'Select role',
      data: dataDropdownRole,
      defaultValue: data?.role,
      textFieldClasses: textFieldClasses
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
      placeholder: 'Enter your phone',
      defaultValue: data?.phone,
      textFieldClasses: textFieldClasses
    },
    {
      name: 'location',
      type: FormInputEnum.INPUT,
      label: 'Location',
      placeholder: 'Enter your Location ',
      defaultValue: data?.location,
      textFieldClasses: textFieldClasses
    },
    {
      name: 'houseId',
      type: FormInputEnum.SELECT,
      label: 'Management house',
      placeholder: 'Select a Management House',
      dropdownURL: DROPDOWN_HOUSE,
      defaultValue: data?.houseId,
      textFieldClasses: textFieldClasses
    }
  ]

  return (
    <Layout>
      <Header />
      <CardUserInfo
        id="manager-detail"
        data={data}
        inputs={inputs}
        baseURL={DETAIL_MANAGER.replace(':id', id)}
        textAlertError="Can't edit user information"
        textAlertSuccess="Edit user information successfully"
      />
    </Layout>
  )
}
