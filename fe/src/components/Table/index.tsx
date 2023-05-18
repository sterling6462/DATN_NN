import { Card } from '@mui/material'
import { Data, PopupAddProps, TableHeader, useListViewStore } from 'components'
import { useAPI } from 'hook'
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
  tableViewClasses?: { tableHeader?: string }
  dataSample?: Data
}

export const ListView = <T extends object>(
  props: Props<T> & TableHeaderProps & PopupAddProps
) => {
  const onLoading = useListViewStore((store) => store.onLoading)
  const onData = useListViewStore((store) => store.onData)
  const { model, id, baseURL = '', tableViewClasses } = props

  const onShowLoading = () => onLoading(id)

  const onSuccess = (data: Data) => onData(id, data, baseURL)

  useAPI({
    baseURL: baseURL + window.location.search,
    onShowLoading,
    onSuccess
  })

  return (
    <Card className={styles.TableView}>
      <TableHeader {...props} className={tableViewClasses?.tableHeader} />
      {model && <TableView {...props} id={id} model={model} />}
    </Card>
  )
}
