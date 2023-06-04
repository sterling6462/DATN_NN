import { ApiCore } from 'components/ApiCore'
import { DETAIL_HOUSE } from 'constants/ApiConstant'
import { create } from 'zustand'

interface IHouseInfo {
  _id: string
  name: string
  location: string
  managerId: string
  rate: number
  electricityPrice: number
  waterPrice: number
  wifiPrice: number
}

interface IHouseInfoStore {
  houseInfo?: IHouseInfo
  setHouseInfo: (houseId: string) => void
}

export const useHouseStore = create<IHouseInfoStore>((set, get) => {
  return {
    async setHouseInfo(houseId) {
      const data = await ApiCore.get(DETAIL_HOUSE.replace(':id', houseId || ''))
      set({ houseInfo: data.data })
    }
  }
})
