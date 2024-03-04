import {
  CardUserInfo,
  FormInputEnum,
  Header,
  Layout,
  UserInfo,
  dataDropdownRole
} from 'components'
import { DETAIL_USER, DROPDOWN_HOUSE } from 'constants/ApiConstant'
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

export default function TenantDetail() {
  const { id = '' } = useParams()
  const [data, setData] = useState<UserInfo>()

  useAPI({
    baseURL: DETAIL_USER.replace(':id', id),
    onSuccess(data) {
      setData(data)
    }
  })

  const inputs = [
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
      name: 'firstName',
      type: FormInputEnum.INPUT,
      label: 'Fist name *',
      required: { value: true, message: 'Fist name is required' },
      minLength: {
        value: 1,
        message: 'Fist name must be at least 5 characters'
      },
      maxLength: {
        value: 200,
        message: "Fist name can't be longer than 200 characters"
      },
      defaultValue: data?.firstName,
      placeholder: 'Enter your Fist name',
      textFieldClasses: textFieldClasses
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
      placeholder: 'Enter your Last name',
      defaultValue: data?.lastName,
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
        id="member-detail"
        data={data}
        inputs={inputs}
        baseURL={DETAIL_USER.replace(':id', id)}
        textEditError="Can't edit member information"
        textEditSuccess="Edit member information successfully"
      />
    </Layout>
  )
}
