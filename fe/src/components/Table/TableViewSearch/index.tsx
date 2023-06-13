import { Search as IconSearch } from '@mui/icons-material'
import { ContainerInputField, useListViewStore } from 'components'
import { default as queryString } from 'query-string'
import { useDebouncedCallback } from 'use-debounce'
import styles from './style.module.scss'

export const TableViewSearch = (props: { id: string }) => {
  const searchParams = queryString.parse(window.location.search)
  const onQuery = useListViewStore((store) => store.onQuery)
  const debounced = useDebouncedCallback((text) => {
    onQuery(props.id, { keyword: text || undefined, page: 1 })
  }, 500)

  return (
    <ContainerInputField
      type="search"
      placeholder="Search"
      className={styles.TableViewSearch}
      defaultValue={searchParams?.keyword}
      onChange={(e) => debounced(e.target.value)}
      InputProps={{
        startAdornment: <IconSearch />
      }}
      boxClasses={{ containerBox: styles.ContainerBox }}
    />
  )
}
