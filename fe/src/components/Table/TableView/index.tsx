import { Table } from '@mui/material'
import { Data, NoDataView, TableRowLoading, useListViewStore } from 'components'
import { useMemo } from 'react'
import { Type, getMetadataColumns } from '../decorator'
import { TableHead } from './TableHead'
import { TableRow } from './TableRow'
import styles from './style.module.scss'

export interface TableProps<T extends object = any> {
  model: Type<T>
  id: string
  /** Base URL to fetch data. */
  baseURL?: string
  dataSample?: Data
}

export const TableView = (props: TableProps) => {
  const { id, model, dataSample } = props
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
        <TableHead id={id} columns={columns} />
        <TableRow columns={columns} data={data} />
      </Table>
      <TableRowLoading id={id} />
    </div>
  )
}

export * from './TableAction'
