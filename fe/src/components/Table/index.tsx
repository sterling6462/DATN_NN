import { Card } from '@mui/material'
import clsx from 'clsx'
import { Data, PopupAddProps, TableHeader, useListViewStore } from 'components'
import { useAPI } from 'hook'
import { ReactNode } from 'react'
import { CardView } from './CardView'
import { TableView } from './TableView'
import { TableHeaderProps, Type } from './decorator'
import styles from './style.module.scss'

export * from './NoDataView'
export * from './TableHeader'
export * from './TableRowLoading'
export * from './TableView'
export { Column } from './decorator'

type Props<T> = {
  model?: Type<T>
  id: string
  baseURL?: string
  listViewClasses?: {
    listContainer?: string
    listHeader?: string
    listContent?: string
  }
  dataSample?: Data
  cardTemplate?: (args: Record<string, unknown>) => ReactNode
  pagination?: boolean
}

export const ListView = <T extends object>(
  props: Props<T> & TableHeaderProps & PopupAddProps
) => {
  const onLoading = useListViewStore((store) => store.onLoading)
  const onData = useListViewStore((store) => store.onData)
  const {
    model,
    id,
    baseURL = '',
    listViewClasses,
    pagination,
    cardTemplate
  } = props

  const onShowLoading = () => onLoading(id)

  const onSuccess = (data: Data) => onData(id, data, baseURL)

  useAPI({
    baseURL: baseURL + window.location.search,
    onShowLoading,
    onSuccess
  })

  return (
    <>
      {model && (
        <Card className={clsx(styles.TableView, styles?.listContainer)}>
          <TableHeader {...props} className={listViewClasses?.listHeader} />
          <TableView {...props} id={id} model={model} />
        </Card>
      )}
      {cardTemplate && (
        <CardView
          {...props}
          id={id}
          pagination={pagination}
          className={listViewClasses?.listContent}
        />
      )}
    </>
  )
}
