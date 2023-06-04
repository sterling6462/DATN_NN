import { TablePagination } from '@mui/material'
import { UsePaginationProps } from '@mui/material/usePagination/usePagination'
import { useListViewStore } from 'components'
import queryString from 'query-string'
import { useEffect, useState } from 'react'
import styles from './style.module.scss'

type PaginationProps = {
  page: number
  id: string
}

export const Pagination = (props: PaginationProps & UsePaginationProps) => {
  const { id } = props
  const searchParams = queryString.parse(window.location.search)
  const [page, setPage] = useState(Number(searchParams.page || 1))
  const [rowsPerPage, setRowsPerPage] = useState(
    Number(searchParams.size || 10)
  )

  useEffect(() => {
    setPage(Number(searchParams.page || 1))
    setRowsPerPage(Number(searchParams.size || 10))
  }, [searchParams?.page, searchParams?.size])

  const data = useListViewStore((store) => store.listViewMap?.get(id)?.data)
  const onQuery = useListViewStore((store) => store.onQuery)
  const count = data?.total || 0

  const handleChangePage = (newPage: number) => {
    setPage(newPage)
    onQuery(id, { page: newPage + 1 })
  }

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const pageSize = parseInt(event.target.value, 10)
    setRowsPerPage(pageSize)
    setPage(1)
    onQuery(id, { size: pageSize, page: 1 })
  }

  return (
    <TablePagination
      component={'div'}
      count={count}
      rowsPerPage={rowsPerPage}
      onRowsPerPageChange={handleChangeRowsPerPage}
      page={page - 1}
      onPageChange={(_, newPage) => handleChangePage(newPage)}
      className={styles.Pagination}
      classes={{
        select: styles.Select,
        selectIcon: styles.SelectIcon,
        actions: styles.Action
      }}
    />
  )
}
