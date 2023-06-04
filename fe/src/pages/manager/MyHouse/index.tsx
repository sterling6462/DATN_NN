import {
  CardHouseInfo,
  Header,
  Layout,
  useAuthStore,
  useHouseStore
} from 'components'

export default function MyHouse() {
  const { houseInfo } = useHouseStore()
  const { auth } = useAuthStore()

  return (
    <Layout>
      <Header />
      <CardHouseInfo
        id="house-detail"
        data={houseInfo}
        managerName={auth?.username}
      />
    </Layout>
  )
}
