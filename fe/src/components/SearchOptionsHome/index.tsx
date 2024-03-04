import { Grid, Typography } from '@mui/material'
import Aos from 'aos'
import 'aos/dist/aos.css'
import apartments from 'assets/mp4/apartments.mp4'
import clsx from 'clsx'
import { useEffect } from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsListTask } from 'react-icons/bs'
import { FiFacebook } from 'react-icons/fi'
import { GrLocation } from 'react-icons/gr'
import { SiTripadvisor } from 'react-icons/si'
import { TbApps } from 'react-icons/tb'
import styles from './style.module.scss'

export const SearchOptionsHome = () => {
  //react hook
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <Grid className={styles.home}>
      <div className={styles.overlay}> </div>
      <video src={apartments} muted autoPlay loop />

      <div className={clsx(styles.homeContent, 'container')}>
        <div className={styles.textDiv}>
          <Typography data-aos="fade-up" className={styles.SmallText}>
            Our Packages
          </Typography>
          <Typography
            data-aos="fade-up"
            className={clsx(styles.Headline1, styles.HomeTitle)}
          >
            Search your Accommodation
          </Typography>
        </div>

        <div className={clsx(styles.cardDiv, styles.grid)}>
          <div className={styles.destinationInput}>
            <label htmlFor="city">Search your destination :</label>
            <div className={clsx(styles.input, styles.flex)}>
              <input type="text" placeholder="Enter name here" />
              <GrLocation className={styles.icon} />
            </div>
          </div>
        </div>

        <div
          data-aos="fade-up"
          className={clsx(styles.homeFooterIcons, styles.flex)}
        >
          <div className={styles.rightIcons}>
            <FiFacebook className={styles.icon} />
            <AiOutlineInstagram className={styles.icon} />
            <SiTripadvisor className={styles.icon} />
          </div>
          <div className={styles.leftIcons}>
            <BsListTask className={styles.icon} />
            <TbApps className={styles.icon} />
          </div>
        </div>
      </div>
    </Grid>
  )
}
