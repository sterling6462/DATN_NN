import {
  BillDetailData,
  CardBillDetail,
  Header,
  IHouseInfo,
  Layout
} from 'components'
import { DETAIL_BILL, DETAIL_HOUSE } from 'constants/ApiConstant'
import { useAPI } from 'hook'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function BillDetailMember() {
  const { id = '' } = useParams()
  const [dataBill, setDataBill] = useState<BillDetailData>()
  const [dataHouse, setDataHouse] = useState<IHouseInfo>()

  useAPI({
    baseURL: DETAIL_BILL.replace(':id', id),
    onSuccess(data) {
      setDataBill(data)
    }
  })

  useAPI({
    baseURL: DETAIL_HOUSE.replace(':id', dataBill?.houseId || ''),
    onSuccess(data) {
      setDataHouse(data)
    }
  })

  return (
    <Layout>
      <Header />
      <CardBillDetail data={dataBill} dataHouse={dataHouse} />
    </Layout>
  )
}
