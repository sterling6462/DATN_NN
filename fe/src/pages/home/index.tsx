import { Search as IconSearch } from '@mui/icons-material'
import { Grid } from '@mui/material'
import clsx from 'clsx'
import {
  CardHome,
  ContainerInputField,
  IHouseInfo,
  Layout,
  SearchOptionsHome,
  SkeletonCardHome,
  TableViewDropdown,
  invokeRequest,
  onUpdateQuery
} from 'components'
import { LIST_HOUSE } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import queryString from 'query-string'
import { useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import styles from './style.module.scss'

type DataHome = {
  page: number
  total: number
  data: IHouseInfo[]
}

const dropdownItem = [
  { key: 'string', value: 'any', label: 'string' },
  { key: 'string', value: 'any', label: 'string' },
  { key: 'string', value: 'any', label: 'string' }
]

export default function Home() {
  const [data, setData] = useState<DataHome>()
  const searchParams = queryString.parse(window.location.search)
  const debounced = useDebouncedCallback((text) => {
    invokeRequest({
      baseURL: onUpdateQuery(LIST_HOUSE, {
        keyword: text || undefined,
        page: 1
      }),
      onSuccess(data) {
        setData(data)
      }
    })
  }, 500)

  useAPI({
    baseURL: LIST_HOUSE,
    onSuccess(data) {
      setData(data)
    }
  })

  return (
    <Layout post>
      <SearchOptionsHome />
      <div className={clsx(styles.Home)}>
        <Grid container className={styles.HomeContent}>
          <Grid item xs={3}>
            <h3 data-aos="fade-right" className={styles.Title}>
              Recently viewed Houses
            </h3>
          </Grid>
          <Grid item xs={9} className={styles.FilterData}>
            <TableViewDropdown
              id="home"
              dropdownItem={dropdownItem}
              labelDropdown="Filter house"
            />
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
          </Grid>
        </Grid>
        {!data || data.data.length === 0 ? (
          <SkeletonCardHome />
        ) : (
          <Grid className={styles.ListContent}>
            {data?.data.map((item, index) => (
              <>
                <CardHome {...item} key={index} />
              </>
            ))}
          </Grid>
        )}
      </div>
    </Layout>
  )
}
