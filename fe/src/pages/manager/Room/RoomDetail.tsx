import { Grid } from '@mui/material'
import {
  CardRoomInfo,
  CardUserRent,
  DataService,
  Header,
  Layout,
  RoomInfoProps,
  useHouseStore
} from 'components'
import {
  DETAIL_ROOM,
  LIST_BILL_BY_ROOM,
  LIST_TENANT_BY_ROOM
} from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { TableForDetail } from 'pages/admin/HouseList/components/TableForDetail'
import { BillListsMember } from 'pages/member/Bill/BillListMember'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.scss'

export const RoomDetail = () => {
  const { id = '' } = useParams()
  const { houseInfo } = useHouseStore()
  const [data, setData] = useState<RoomInfoProps>()
  const [dataService, setDataService] = useState<DataService>()

  useAPI({
    baseURL: DETAIL_ROOM.replace(':id', id),
    onSuccess(data) {
      setData(data)
    }
  })

  useAPI({
    baseURL: LIST_BILL_BY_ROOM.replace('=id', `=${id}`),
    onSuccess(data) {
      setDataService(data)
    }
  })

  return (
    <Layout>
      <Header houseInfo={houseInfo} />
      <Grid container>
        <Grid item container xs={12} className={styles.RoomInfo}>
          <Grid item xs={5}>
            <CardRoomInfo data={data} />
          </Grid>
          <Grid item xs={7}>
            <CardUserRent
              titleCard="Member list"
              baseURL={LIST_TENANT_BY_ROOM.replace('=id', `=${id}`)}
            />
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <TableForDetail
            id="bill-detail-admin"
            model={BillListsMember}
            titleTable="Bill list"
            baseURL={LIST_BILL_BY_ROOM.replace('=id', `=${id}`)}
          />
        </Grid>
      </Grid>
    </Layout>
  )
}
