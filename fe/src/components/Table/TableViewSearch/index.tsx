import { Search as IconSearch } from '@mui/icons-material'
import { ContainerInputField, useListViewStore } from 'components'
import { default as queryString } from 'query-string'
import { useDebouncedCallback } from 'use-debounce'
import styles from './style.module.scss'

type Props = {
  id: string
  baseURL?: string
}

export const TableViewSearch = (props: Props) => {
  const { id, baseURL } = props
  const searchParams = queryString.parse(window.location.search)
  const onQuery = useListViewStore((store) => store.onQuery)
  const debounced = useDebouncedCallback((text) => {
    onQuery(id, { keyword: text || undefined, page: 1 }, baseURL)
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
