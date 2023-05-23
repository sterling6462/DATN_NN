import { Grid } from '@mui/material'
import { useListViewStore } from 'components/store'
import { ReactNode } from 'react'
import { NoDataView } from '../NoDataView'

export interface CardViewProps<T extends object = any> {
  id: string
  data?: any[]
  cardTemplate?: (args: Record<string, unknown>) => ReactNode
  className?: string
  pagination?: boolean
}

export const CardView = (props: CardViewProps) => {
  const { cardTemplate, id, className, pagination } = props
  const data = useListViewStore((store) => store.listViewMap?.get(id)?.data)

  if (!data || data?.data?.length === 0) return <NoDataView />
  console.log(data)

  if (cardTemplate)
    return (
      <>
        {/* {pagination && <Pagination id={id} />} */}
        <Grid container className={className}>
          {data?.data?.map((d) => cardTemplate(d as Record<string, unknown>))}
        </Grid>
      </>
    )
  return <></>
}
