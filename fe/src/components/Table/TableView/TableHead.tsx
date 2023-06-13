import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material'
import {
  Grid,
  TableHead as MUITableHead,
  TableCell,
  TableRow,
  TableSortLabel
} from '@mui/material'
import clsx from 'clsx'
import { ColumnSort, useListViewStore } from 'components'
import { useState } from 'react'
import { BaseOptions } from '../decorator'
import styles from './style.module.scss'

type Props = {
  id: string
  columns: BaseOptions[]
}

export const TableHead = (props: Props) => {
  const { columns, id } = props
  const onQuery = useListViewStore((store) => store.onQuery)
  let [columnSort, setColumnSort] = useState<ColumnSort>()
  const [sortOrder, setSortOrder] = useState<string | undefined>()

  const handleSort = (sortKey: string) => {
    if (!columnSort || !columnSort.get(sortKey)) {
      columnSort = new Map()
      columnSort.set(sortKey, 'asc')
    } else if (columnSort.get(sortKey) === 'asc') {
      columnSort.set(sortKey, 'desc')
    } else {
      columnSort = undefined
    }
    setColumnSort(columnSort)
    setSortOrder(columnSort?.get(sortKey))
    onQuery(
      id,
      columnSort
        ? { sortKey, sortOrder: columnSort?.get(sortKey), page: 1 }
        : { sortKey: undefined, sortOrder: undefined }
    )
  }

  return (
    <MUITableHead className={styles.TableHead}>
      <TableRow className={styles.TableRow}>
        {columns.map((col, idx) => (
          <TableCell
            key={col.key}
            className={clsx(styles.Subhead2, styles.TableCell)}
          >
            <Grid className={styles.Item} justifyContent={columns[idx].align}>
              {col.title}
              {col.sort && (
                <TableSortLabel
                  onClick={() => {
                    handleSort(col.key || '')
                  }}
                  IconComponent={() => (
                    <Grid className={styles.SortIcon}>
                      <ArrowDropUp
                        className={clsx(
                          styles.Icon,
                          `${
                            columnSort?.get(col.key || '') === 'asc' &&
                            styles.Active
                          }`
                        )}
                      />
                      <ArrowDropDown
                        className={`${
                          columnSort?.get(col.key || '') === 'desc' &&
                          styles.Active
                        }`}
                      />
                    </Grid>
                  )}
                />
              )}
            </Grid>
          </TableCell>
        ))}
      </TableRow>
    </MUITableHead>
  )
}
