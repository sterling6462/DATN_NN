import { Grid } from '@mui/material'
import { SkeletonCardHome, useListViewStore } from 'components'
import { ReactNode } from 'react'

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

  if (!data || data?.data?.length === 0) return <SkeletonCardHome />
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
