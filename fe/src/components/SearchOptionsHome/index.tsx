import { useEffect } from 'react'
import { AiOutlineInstagram } from 'react-icons/ai'
import { BsListTask } from 'react-icons/bs'
import { FiFacebook } from 'react-icons/fi'
import { GrLocation } from 'react-icons/gr'
import { HiFilter } from 'react-icons/hi'
import { SiTripadvisor } from 'react-icons/si'
import { TbApps } from 'react-icons/tb'

import Aos from 'aos'
import 'aos/dist/aos.css'
import video from 'assets/mp4/video.mp4'
import clsx from 'clsx'
import { PrimaryButton } from '..'
import styles from './style.module.scss'

export const SearchOptionsHome = () => {
  //react hook
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <section className={styles.home}>
      <div className={styles.overlay}> </div>
      <video src={video} muted autoPlay loop></video>

      <div className={clsx(styles.homeContent, 'container')}>
        <div className={styles.textDiv}>
          <span data-aos="fade-up" className={styles.smallText}>
            Our Packages
          </span>
          <h1 data-aos="fade-up" className={styles.homeTitle}>
            Search your Accommodation
          </h1>
        </div>

        <div className={clsx(styles.cardDiv, styles.grid)}>
          <div className={styles.destinationInput}>
            <label htmlFor="city">Search your destination :</label>
            <div className={clsx(styles.input, styles.flex)}>
              <input type="text" placeholder="Enter name here" />
              <GrLocation className={styles.icon} />
            </div>
          </div>

          <div className={styles.dateInput}>
            <label htmlFor="date">Search your date :</label>
            <div className={clsx(styles.input, styles.flex)}>
              <input type="date" />
            </div>
          </div>

          <div className={styles.priceInput}>
            <div className={clsx(styles.label_total, styles.flex)}>
              <label htmlFor="price">Max price :</label>
              <h3 className={styles.total}>$5000</h3>
            </div>
            <div className={clsx(styles.input, styles.flex)}>
              <input type="range" max="5000" min="1000" />
            </div>
          </div>

          <PrimaryButton
            endIcon={<HiFilter />}
            className={clsx(styles.searchOptions, styles.flex)}
          >
            More filter
          </PrimaryButton>
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
    </section>
  )
}
