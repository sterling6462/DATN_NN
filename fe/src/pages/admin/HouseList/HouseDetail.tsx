import { CardHouseInfo, Header, Layout } from 'components'
import { DETAIL_HOUSE } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export function HouseDetail() {
  const { id = '' } = useParams()
  const [data, setData] = useState<CardHouseInfo>()

  useAPI({
    baseURL: DETAIL_HOUSE.replace(':id', id),
    onSuccess(data) {
      setData(data)
    }
  })

  return (
    <Layout>
      <Header />
      <CardHouseInfo id="house-detail" data={data} />
    </Layout>
  )
}
