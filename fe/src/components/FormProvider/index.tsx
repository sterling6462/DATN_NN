import { OutlinedInputClasses } from '@mui/material'
import {
  ForwardedRef,
  MutableRefObject,
  ReactNode,
  forwardRef,
  useEffect
} from 'react'
import {
  FieldValues,
  Path,
  UseFormReturn,
  ValidationMode,
  useForm
} from 'react-hook-form'
import { isObjectEmpty } from '../util'
import { FormCheckbox, FormTextInput } from './FormControl'
import { DataDropdown, FormSelect } from './FormSelect'
import { FormInputEnum } from './constants'

export type BaseFormInputs = Record<string, any>

export type UseFormProvider<T extends FieldValues = any> = UseFormReturn<T>

export type Control<T> = {
  name: Path<T>
  defaultValue?: any
  type: FormInputEnum
  required?: { value: boolean; message: string }
  label?: string
  placeholder?: string
  className?: string
  textFieldClasses?: Partial<OutlinedInputClasses>
  pattern?: { value: RegExp; message: string }
  minLength?: { value: number; message: string }
  maxLength?: { value: number; message: string }
  min?: { value: number; message: string }
  max?: { value: number; message: string }
  isShowPassword?: boolean
  startAdornment?: ReactNode
  //data for Dropdown
  dropdownURL?: string
  data?: string | Array<DataDropdown>
}

interface Props<T extends FieldValues = FieldValues> {
  inputs: Array<Control<T>>
  mode?: keyof ValidationMode
  handleErrors?: (error?: boolean) => void
}

const FormWrapper = <T extends FieldValues>(
  props: Props<T>,
  ref: ForwardedRef<UseFormReturn<T>>
) => {
  const { inputs, mode = 'onSubmit', handleErrors } = props
  const form = useForm<T>({
    mode: mode
  })

  useEffect(() => {
    handleErrors && handleErrors(!isObjectEmpty(form.formState.errors))
  }, [form.formState])

  useEffect(() => {
    if (ref) (ref as MutableRefObject<UseFormReturn<T>>).current = form
  }, [])

  console.log(inputs)

  return (
    <form>
      {inputs.map((i) => {
        switch (i.type) {
          case FormInputEnum.INPUT:
          case FormInputEnum.NUMBER:
          case FormInputEnum.PASSWORD:
            return <FormTextInput key={i.name} control={i} form={form} />
          case FormInputEnum.SELECT:
            return <FormSelect key={i.name} control={i} form={form} />
          case FormInputEnum.CHECKBOX:
            return <FormCheckbox key={i.name} control={i} form={form} />
          default:
            break
        }
      })}
    </form>
  )
}

export const FormProvider = forwardRef<any, Props>(FormWrapper)

export * from './FormControl'
export * from './FormSelect'
export { FormInputEnum }
