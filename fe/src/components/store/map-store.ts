import { getGeocode, getLatLng } from 'use-places-autocomplete'
import { create } from 'zustand'

export interface IMapInfo {
  lat: number
  lng: number
}

interface IMapInfoStore {
  mapInfo?: IMapInfo
  setMapInfo: (address: string) => Promise<void>
}

export const useMapStore = create<IMapInfoStore>((set) => {
  return {
    async setMapInfo(address) {
      const results = await getGeocode({ address: address })
      const { lat, lng } = await getLatLng(results[0])
      set({ mapInfo: { lat, lng } })
    }
  }
})
