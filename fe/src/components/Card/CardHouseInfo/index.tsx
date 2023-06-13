import { Grid, Typography } from '@mui/material'
import house from 'assets/json/house.json'
import clsx from 'clsx'
import { GoogleMap, IHouseInfo, LottieAnimation } from 'components'
import { dataFacility } from './DataFacility'
import { FacilityItem } from './FacilityItem'
import { HouseItem } from './HouseItem'
import { LocationItem } from './LocationItem'
import styles from './style.module.scss'

interface CardHouseInfoProps {
  id: string
  data?: IHouseInfo
  managerName?: string
}

export const CardHouseInfo = (props: CardHouseInfoProps) => {
  const { id, data, managerName } = props

  if (data) {
    return (
      <Grid container className={styles.HouseInfo} rowSpacing={2}>
        <HouseItem
          houseName={data.name}
          rate={data.rate}
          location={data.location}
        />
        {/* TODO: add image */}
        <Grid item className={styles.Image}>
          <LottieAnimation animationData={house} margin="0px" width="100%" />
        </Grid>
        <Grid item container className={styles.ExtraInfo} columnSpacing={2}>
          <Grid item xs={8} className={styles.GoogleMap}>
            <Typography
              component={'span'}
              className={clsx(styles.Headline6, styles.Title)}
            >
              Location
            </Typography>
            <Grid className={styles.MapContainer}>
              <GoogleMap className={styles.Map} address={data.location} />
              <LocationItem
                location={data?.location}
                locationClasses={{ root: styles.LocationItem }}
              />
            </Grid>
          </Grid>
          <Grid item xs={4} className={styles.Facilities}>
            <Typography
              component={'span'}
              className={clsx(styles.Headline6, styles.Title)}
            >
              Facilities
            </Typography>
            <Grid className={styles.FacilityContainer}>
              {dataFacility.map((item, index) => (
                <FacilityItem key={index} label={item.label} icon={item.icon} />
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item display={'flex'} flexDirection={'column'}>
          <Typography
            component={'span'}
            className={clsx(styles.Headline6, styles.Title)}
          >
            Detail
          </Typography>
          <Typography
            component={'span'}
            className={clsx(styles.Body2, styles.HouseDetail)}
          >
            {data?.detail}
          </Typography>
        </Grid>
      </Grid>
    )
  }
  return <></>
}

export * from './FacilityItem'
export * from './HouseItem'
export * from './LocationItem'
