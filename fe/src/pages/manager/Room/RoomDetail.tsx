import { Grid } from '@mui/material'
import {
  CardRoomInfo,
  CardService,
  DataService,
  Header,
  Layout,
  RoomInfoProps
} from 'components'
import { DETAIL_ROOM, LIST_BILL_BY_ROOM } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const RoomDetail = () => {
  const { id = '' } = useParams()
  const [data, setData] = useState<RoomInfoProps>()
  const [dataService, setDataService] = useState<DataService>()

  useAPI({
    baseURL: DETAIL_ROOM.replace(':id', id),
    onSuccess(data) {
      setData(data)
    }
  })

  useAPI({
    // baseURL: LIST_BILL_BY_ROOM.replace('=id', `=${id}`),
    baseURL: LIST_BILL_BY_ROOM.replace('=id', id),
    onSuccess(data) {
      setDataService(data)
    }
  })

  return (
    <Layout>
      <Header houseDetail />
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <CardRoomInfo data={data} />
        </Grid>
        <Grid item xs={7}>
          <CardService data={dataService} />
        </Grid>
      </Grid>
    </Layout>
  )
}
