import { KeyboardArrowDownRounded, LocationOn } from '@mui/icons-material'
import { Autocomplete, Box, Grid, Typography, debounce } from '@mui/material'
import { LoadScript } from '@react-google-maps/api'
import parse from 'autosuggest-highlight/parse'
import clsx from 'clsx'
import { ContainerInputField, FormProps, Libraries } from 'components'
import { useEffect, useMemo, useState } from 'react'
import { Controller, FieldValues } from 'react-hook-form'
import styles from './style.module.scss'

const autocompleteService = { current: null }
const libraries: Libraries = ['places']

interface MainTextMatchedSubstrings {
  offset: number
  length: number
}
interface StructuredFormatting {
  main_text: string
  secondary_text: string
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[]
}

interface PlaceType {
  description: string
  structured_formatting: StructuredFormatting
}

export const FormMap = <T extends FieldValues>(props: FormProps<T>) => {
  const { form, control } = props
  const [value, setValue] = useState<PlaceType | null>(null)
  const [inputValue, setInputValue] = useState('')
  const error = form.formState.errors[control.name]
  const [options, setOptions] = useState<readonly PlaceType[]>([])

  const fetchOptions = useMemo(
    () =>
      debounce(
        (
          request: { input: string },
          callback: (results?: readonly PlaceType[]) => void
        ) => {
          if (autocompleteService.current) {
            ;(autocompleteService.current as any).getPlacePredictions(
              request,
              callback
            )
          }
        },
        500
      ),
    []
  )

  useEffect(() => {
    let active = true

    if (!autocompleteService.current && (window as any).google) {
      autocompleteService.current = new (
        window as any
      ).google.maps.places.AutocompleteService()
    }
    if (!autocompleteService.current) {
      return undefined
    }

    if (inputValue === '') {
      setOptions(value ? [value] : [])
      return undefined
    }

    fetchOptions({ input: inputValue }, (results?: readonly PlaceType[]) => {
      if (active) {
        let newOptions: readonly PlaceType[] = []

        if (value) {
          newOptions = [value]
        }
        if (results) {
          newOptions = [...newOptions, ...results]
        }
        setOptions(newOptions)
      }
    })

    return () => {
      active = false
    }
  }, [value, inputValue, fetchOptions])

  return (
    <LoadScript
      googleMapsApiKey={`${process.env.REACT_APP_MAP_API}`}
      libraries={libraries}
      language="en"
      region="EN"
    >
      <Controller
        name={control.name}
        defaultValue={control.defaultValue}
        control={form.control}
        rules={{
          required: control.required
        }}
        render={({ field: { value, onChange } }) => {
          const defaultValue = options.find((d) => d.description === value)
          return (
            <Autocomplete
              autoComplete
              includeInputInList
              filterSelectedOptions
              defaultValue={options.find(
                (d) => d.description === control.defaultValue
              )}
              key={control.name}
              placeholder={control.placeholder}
              options={options}
              getOptionLabel={(option) =>
                typeof option === 'string' ? option : option.description
              }
              filterOptions={(x) => x}
              className={clsx(styles.Autocomplete, control.className)}
              classes={{ input: styles.Input, listbox: styles.ListBoxDropdown }}
              popupIcon={<KeyboardArrowDownRounded />}
              noOptionsText="Not found"
              onChange={(_, newValue) => {
                onChange(newValue?.description as any)
                setOptions(newValue ? [newValue, ...options] : options)
              }}
              isOptionEqualToValue={(option, value) =>
                option.description === value.description
              }
              onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue)
              }}
              renderInput={(params) => (
                <ContainerInputField
                  {...params}
                  disabled={control.disabled}
                  value={defaultValue?.description}
                  label={control.label}
                  placeholder={control.placeholder}
                  error={Boolean(error)}
                  helperText={error?.message as React.ReactNode}
                  textFieldClasses={control.textFieldClasses}
                />
              )}
              renderOption={(props, option: PlaceType) => {
                const matches =
                  option.structured_formatting.main_text_matched_substrings ||
                  []

                const parts = parse(
                  option.structured_formatting.main_text,
                  matches.map((match: any) => [
                    match.offset,
                    match.offset + match.length
                  ])
                )

                return (
                  <li {...props}>
                    <Grid container alignItems="center">
                      <Grid item sx={{ display: 'flex', width: 44 }}>
                        <LocationOn sx={{ color: 'text.secondary' }} />
                      </Grid>
                      <Grid
                        item
                        sx={{
                          width: 'calc(100% - 44px)',
                          wordWrap: 'break-word'
                        }}
                      >
                        {parts.map((part, index) => (
                          <Box
                            key={index}
                            component="span"
                            sx={{
                              fontWeight: part.highlight ? 'bold' : 'regular'
                            }}
                          >
                            {part.text}
                          </Box>
                        ))}
                        <Typography variant="body2" color="text.secondary">
                          {option.structured_formatting.secondary_text}
                        </Typography>
                      </Grid>
                    </Grid>
                  </li>
                )
              }}
            />
          )
        }}
      />
    </LoadScript>
  )
}
