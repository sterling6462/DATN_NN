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
import {
  DETAIL_USER,
  DROPDOWN_HOUSE,
  EDIT_PASSWORD,
  EDIT_PROFILE
} from 'constants/ApiConstant'
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

const datahouse = [
  {
    _id: '6462f651e3ba4c0c5e8a5585',
    name: 'Thanh Khe'
  },
  {
    _id: '6462f673e3ba4c0c5e8a5586',
    name: 'Ngu Hanh Son'
  },
  {
    _id: '6462f6cbe3ba4c0c5e8a5587',
    name: 'Hai Chau'
  },
  {
    _id: '6462fa2be3ba4c0c5e8a5588',
    name: 'Lien Chieu'
  },
  {
    _id: '6462fa6de3ba4c0c5e8a5589',
    name: 'Son Tra'
  },
  {
    _id: '6462faf5e3ba4c0c5e8a558e',
    name: 'Hoa Vang'
  },
  {
    _id: '6463b1e43870a67798b87367',
    name: 'Hoa Tho Tay'
  },
  {
    _id: '64645c676a3ca4204caaafde',
    name: 'Hoa Tho Dong'
  },
  {
    _id: '646885a35811e32fc1d0f612',
    name: 'Chinh Gian'
  },
  {
    _id: '646f7bbdb78602df88a8261b',
    name: 'Cam Le'
  },
  {
    _id: '646f7cae51c802a70742751b',
    name: 'Hoa Cam Bac'
  },
  {
    _id: '6478d36c16a480e3e3050f19',
    name: 'Phuoc Ninh'
  },
  {
    _id: '6481868393dde10fa7b44360',
    name: 'Hoa Cuong Nam'
  },
  {
    _id: '64912a97e846c21ddc825fd5',
    name: 'Hoa Cuong'
  },
  {
    _id: '64912d4f41e295e4009e54c7',
    name: 'Hoa Cuong Nam 1'
  },
  {
    _id: '6494506df37e27a00d172f73',
    name: 'Hoa Tho Dong 1'
  }
]

export default function Profile() {
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
      name: 'houseId',
      // disabled: true,
      type: FormInputEnum.INPUT,
      // data: dropdownHouse,
      // dropdownURL: DROPDOWN_HOUSE,
      label: 'House',
      defaultValue: data?.houseId,
      textFieldClasses: textFieldClasses
    },
    {
      name: 'houseId',
      // disabled: true,
      type: FormInputEnum.SELECT,
      // data: dropdownHouse,
      dropdownURL: DROPDOWN_HOUSE,
      label: 'House',
      defaultValue: data?.houseId,
      textFieldClasses: textFieldClasses
    },
    {
      name: 'houseId',
      disabled: true,
      type: FormInputEnum.SELECT,
      label: 'House *',
      required: { value: true, message: 'House is required' },
      placeholder: 'Select house',
      data: dataDropdownRole,
      dropdownURL: DROPDOWN_HOUSE,
      defaultValue: data?.houseId,
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
