import {
  CardHouseInfo,
  Header,
  IHouseInfo,
  Layout,
  useAuthStore
} from 'components'
import { DETAIL_HOUSE } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import styles from './style.module.scss'

export default function HouseDetail() {
  const { auth } = useAuthStore()
  const { id = '' } = useParams()
  const [data, setData] = useState<IHouseInfo>()

  useAPI({
    baseURL: DETAIL_HOUSE.replace(':id', id),
    onSuccess(data) {
      setData(data)
    }
  })

  return (
    <Layout post>
      <Header />
      <CardHouseInfo
        id="house-detail"
        data={data}
        managerName={auth?.username}
        className={styles.CardHouseInfo}
      />
    </Layout>
  )
}
