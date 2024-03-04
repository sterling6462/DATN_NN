import { MenuItem as MUIMenuItem } from '@mui/material'
import clsx from 'clsx'
import { DropdownContained, useListViewStore } from 'components'
import { default as queryString } from 'query-string'
import styles from './style.module.scss'

export type DataDropdownSort = {
  sortKey: string
  sortOrder: string
  label: string
}

export type DataDropdownFilter = {
  key: string
  value: any
  label: string
}

type TableViewDropdownProps = {
  labelDropdown?: string
  dropdownItem: DataDropdownSort[] | DataDropdownFilter[]
  id: string
  label?: string
}

export const TableViewDropdown = (props: TableViewDropdownProps) => {
  const searchParams = queryString.parse(window.location.search)
  const { id, labelDropdown, dropdownItem, label } = props
  const onQuery = useListViewStore((store) => store.onQuery)
  const onChange = (item: DataDropdownSort | DataDropdownFilter) => {
    const { sortKey, sortOrder, key, value } = item as DataDropdownSort &
      DataDropdownFilter
    onQuery(id, { sortKey, sortOrder, page: undefined, [key]: value })
  }
  // Check dropdown isFilter
  let isFilter = false
  const { key } = dropdownItem[0] as DataDropdownFilter
  if (key) isFilter = true
  const valueIndex = dropdownItem.findIndex((d: any) => {
    if (d.value) return d?.value === searchParams[d?.key]
    return (
      d?.sortKey === searchParams['sortKey'] &&
      d?.sortOrder === searchParams['sortOrder']
    )
  })
  return (
    <DropdownContained
      label={
        <span className={clsx(styles.Subhead2, styles.LabelDropdown)}>
          {labelDropdown}
        </span>
      }
      className={styles.TableViewDropdown}
      defaultValue={valueIndex >= 0 ? valueIndex + (isFilter ? 1 : 0) : 0}
    >
      {isFilter && (
        <MUIMenuItem
          value={0}
          onClick={() =>
            onChange({ key, value: undefined } as DataDropdownFilter)
          }
          className={styles.ItemDropdown}
        >
          <div className={styles.DefaultSelected}>{label || 'Select'}</div>
        </MUIMenuItem>
      )}
      {dropdownItem.map((item, index) => (
        <MUIMenuItem
          onClick={() => onChange(item)}
          value={isFilter ? index + 1 : index}
          key={index}
          className={styles.ItemDropdown}
        >
          {item.label}
        </MUIMenuItem>
      ))}
    </DropdownContained>
  )
}
