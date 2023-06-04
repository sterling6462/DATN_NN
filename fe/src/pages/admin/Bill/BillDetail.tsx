import { BillDetailData, CardBillDetail, Header, Layout } from 'components'
import { DETAIL_BILL } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BillDetailAdmin() {
  const { id = '' } = useParams()
  const [data, setData] = useState<BillDetailData>()

  useAPI({
    baseURL: DETAIL_BILL.replace(':id', id),
    onSuccess(data) {
      setData(data)
    }
  })

  return (
    <Layout>
      <Header houseDetail />
      <CardBillDetail data={data} />
    </Layout>
  )
}
