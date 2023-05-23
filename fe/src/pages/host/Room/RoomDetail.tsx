import { Grid } from '@mui/material'
import { CardRoomInfo, CardService, Header, Layout } from 'components'

const dataCardRoomInfo = [
  {
    label: 'Room name',
    value: 'A.101'
  },
  {
    label: 'Type',
    value: 'A.101'
  },
  {
    label: 'Price',
    value: 1250
  },
  {
    label: 'Max member',
    value: 5
  },
  {
    label: 'Member',
    value: 1
  },
  {
    label: 'Join date',
    value: 5
  },
  {
    label: 'Status',
    value: 'ffffff'
  },
  {
    label: 'Due date',
    value: 5
  },
  {
    label: 'Due',
    value: 'ffffff'
  }
]

export const RoomDetail = () => {
  return (
    <Layout>
      <Header homeName="Nhu Ngoc" />
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <CardRoomInfo data={dataCardRoomInfo} />
        </Grid>
        <Grid item xs={7}>
          <CardService data={dataCardRoomInfo} />
        </Grid>
      </Grid>
    </Layout>
  )
}
