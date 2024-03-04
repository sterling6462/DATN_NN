import { Table } from '@mui/material'
import {
  Data,
  NoDataView,
  Pagination,
  TableRowLoading,
  useListViewStore
} from 'components'
import { useMemo } from 'react'
import { Type, getMetadataColumns } from '../decorator'
import { TableHead } from './TableHead'
import { TableRow } from './TableRow'
import styles from './style.module.scss'

export interface TableProps<T extends object = any> {
  model: Type<T>
  id: string
  /** Base URL to fetch data. */
  manager?: boolean
  baseURL?: string
  dataSample?: Data
  pagination?: boolean
}

export const TableView = (props: TableProps) => {
  const { id, model, dataSample, pagination, manager = false } = props
  const columns = useMemo(
    () => getMetadataColumns({ key: model.name }),
    [model.name]
  )
  const data =
    useListViewStore((store) => store.listViewMap?.get(id)?.data) || dataSample

  console.log(data)

  if (data?.data?.length === 0)
    return (
      <div className={styles.Container}>
        <Table>
          <TableHead id={id} columns={columns} />
        </Table>
        <NoDataView />
        <TableRowLoading id={id} />
      </div>
    )

  return (
    <div className={styles.Container}>
      <Table>
        <TableHead id={id} columns={columns} manager={manager} />
        <TableRow columns={columns} data={data} />
      </Table>
      {pagination && <Pagination id={id} page={10} manager={manager} />}
      <TableRowLoading id={id} />
    </div>
  )
}

export * from './TableAction'
