import { textFieldClasses } from '@mui/material'
import {
  CardUserInfo,
  FormInputEnum,
  Header,
  Layout,
  UserInfo,
  dataDropdownRole,
  useAuthStore
} from 'components'
import { DETAIL_USER, EDIT_PASSWORD, EDIT_PROFILE } from 'constants/ApiConstant'
import dayjs from 'dayjs'
import { useAPI } from 'hook'
import { useState } from 'react'

const inputsChangePassword = [
  {
    name: 'oldPassword',
    type: FormInputEnum.PASSWORD,
    label: 'Old password *',
    required: {
      value: true,
      message: 'Old password is required'
    },
    placeholder: 'Enter your Old password ',
    isShowPassword: true
  },
  {
    name: 'newPassword',
    type: FormInputEnum.PASSWORD,
    label: 'New password *',
    required: { value: true, message: 'New password is required' },
    minLength: {
      value: 1,
      message: 'New password must be at least 1 characters'
    },
    maxLength: {
      value: 200,
      message: "New password can't be longer than 200 characters"
    },
    placeholder: 'Enter your New password',
    isShowPassword: true
  },
  {
    name: 'confirmPassword',
    type: FormInputEnum.PASSWORD,
    label: 'Confirm password *',
    required: { value: true, message: 'Confirm password is required' },
    minLength: {
      value: 1,
      message: 'Confirm password must be at least 1 characters'
    },
    maxLength: {
      value: 200,
      message: "Confirm password can't be longer than 200 characters"
    },
    placeholder: 'Enter your Confirm password',
    isShowPassword: true
  }
]

export default function ProfileAdmin() {
  const { auth } = useAuthStore()
  const id = auth?.id
  const [data, setData] = useState<UserInfo>()

  useAPI({
    baseURL: DETAIL_USER.replace(':id', id || ''),
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
      disabled: true,
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
      name: 'birthday',
      type: FormInputEnum.DATE,
      label: 'Birthday *',
      // required: { value: true, message: 'Birthday is required' },
      minLength: {
        value: 5,
        message: 'Birthday must be at least 5 characters'
      },
      maxLength: {
        value: 200,
        message: "Birthday can't be longer than 200 characters"
      },
      defaultValue: dayjs(data?.birthday),
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
      placeholder: 'Enter your phone',
      defaultValue: data?.phone,
      textFieldClasses: textFieldClasses
    },
    {
      name: 'location',
      disabled: true,
      type: FormInputEnum.INPUT,
      label: 'Location',
      placeholder: 'Enter your Location ',
      defaultValue: data?.location,
      textFieldClasses: textFieldClasses
    },

    {
      name: 'role',
      disabled: true,
      type: FormInputEnum.SELECT,
      label: 'Role *',
      required: { value: true, message: 'Role is required' },
      placeholder: 'Select role',
      data: dataDropdownRole,
      defaultValue: data?.role,
      textFieldClasses: textFieldClasses
    }
  ]

  return (
    <Layout>
      <Header />
      {data && (
        <CardUserInfo
          id="manager-detail"
          data={data}
          inputs={inputs}
          baseURL={DETAIL_USER.replace(':id', id || '')}
          baseURLEditProfile={EDIT_PROFILE}
          textEditError="Can't edit user information"
          textEditSuccess="Edit user information successfully"
          titlePopup="Change password"
          textButton="Change password"
          inputPopupEdit={inputsChangePassword}
          baseURLPopup={EDIT_PASSWORD}
          baseURLReload={DETAIL_USER.replace(':id', id || '')}
        />
      )}
    </Layout>
  )
}
