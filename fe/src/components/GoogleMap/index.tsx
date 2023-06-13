import {
  Marker,
  GoogleMap as ReactGoogleMap,
  useLoadScript
} from '@react-google-maps/api'
import clsx from 'clsx'
import { useEffect, useMemo, useState } from 'react'
import { getGeocode, getLatLng } from 'use-places-autocomplete'
import styles from './style.module.scss'

export type Libraries = (
  | 'drawing'
  | 'geometry'
  | 'localContext'
  | 'places'
  | 'visualization'
)[]

const DNPlace = { lat: 16.0771565, lng: 108.2227389 }
const libraries: Libraries = ['places']
interface LatLng {
  lat: number
  lng: number
}
interface GoogleMapProps {
  address: string
  className?: string
}

interface MapProps {
  position: LatLng
  className?: string
}

export const Map = (props: MapProps) => {
  const { position, className } = props

  const center = useMemo(
    () => ({
      lat: position?.lat || DNPlace.lat,
      lng: position?.lng || DNPlace.lng
    }),
    [position]
  )

  return (
    <ReactGoogleMap
      zoom={15}
      center={center}
      mapContainerClassName={clsx(styles.MapContainer, className)}
    >
      {position && <Marker position={position} />}
    </ReactGoogleMap>
  )
}

export const GoogleMap = (props: GoogleMapProps) => {
  const { className, address } = props
  const [position, setPosition] = useState<LatLng | undefined>()

  const { isLoaded } = useLoadScript({
    googleMapsApiKey: `${process.env.REACT_APP_MAP_API}`
  })

  useEffect(() => {
    const handlePosition = async () => {
      try {
        const results = await getGeocode({ address })

        if (results && results.length > 0) {
          const { lat, lng } = await getLatLng(results[0])
          setPosition({ lat, lng })
        }
      } catch (error) {
        console.error('Error getting geocode:', error)
      }
    }
    handlePosition()
  }, [address])
  console.log(position)

  if (!isLoaded) return <div>Loading...</div>
  return <Map position={position || DNPlace} />
}
