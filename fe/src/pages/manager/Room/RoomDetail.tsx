import { Grid } from '@mui/material'
import {
  CardRoomInfo,
  CardService,
  Header,
  Layout,
  RoomInfoProps
} from 'components'
import { DETAIL_ROOM } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export const RoomDetail = () => {
  const { id = '' } = useParams()
  const [data, setData] = useState<RoomInfoProps>()

  useAPI({
    baseURL: DETAIL_ROOM.replace(':id', id),
    onSuccess(data) {
      setData(data)
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
          <CardService data={data} />
        </Grid>
      </Grid>
    </Layout>
  )
}
