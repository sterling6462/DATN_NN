import Aos from 'aos'
import 'aos/dist/aos.css'
import video2 from 'assets/mp4/video2.mp4'
import { useEffect } from 'react'
import { AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'
import { BsFillHouseHeartFill } from 'react-icons/bs'
import { FaTripadvisor } from 'react-icons/fa'
import { FiChevronRight, FiSend } from 'react-icons/fi'

import clsx from 'clsx'
import { PrimaryButton } from 'components'
import styles from './style.module.scss'

export const Footer = () => {
  //react hook
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <section className={styles.footer}>
      <div className={styles.videoDiv}>
        <video src={video2} loop autoPlay muted />
      </div>

      <div className={clsx(styles.secContent, 'container')}>
        <div className={clsx(styles.contactDiv, styles.flex)}>
          <div data-aos="fade-up" className={styles.text}>
            <small>ACCOMMODATION</small>
            <h2>Find accommodation easier</h2>
          </div>

          <div className={clsx(styles.inputDiv, styles.flex)}>
            <input
              data-aos="fade-up"
              type="text"
              placeholder="Enter Email Address"
            />

            <PrimaryButton
              data-aos="fade-up"
              endIcon={<FiSend />}
              className={styles.sendButton}
            >
              Send
            </PrimaryButton>
          </div>
        </div>

        <div className={clsx(styles.footerCard, styles.flex)}>
          <div className={clsx(styles.footerIntro, styles.flex)}>
            <div className={styles.logoDiv}>
              <a href="/#" className={clsx(styles.logo, styles.flex)}>
                <BsFillHouseHeartFill className={styles.icon} /> Accommodation
              </a>
            </div>

            <div data-aos="fade-up" className={styles.footerParagraph}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Optio
              architecto voluptate ad nobis. Vitae odit libero corporis
              repellendus tempore incidunt maiores magni sequi porro dolores
              expedita, nesciunt asperiores autem accusantium.
            </div>
            <div
              data-aos="fade-up"
              className={clsx(styles.footerSocials, styles.flex)}
            >
              <AiOutlineTwitter className={styles.icon} />
              <AiFillYoutube className={styles.icon} />
              <FaTripadvisor className={styles.icon} />
              <AiOutlineTwitter className={styles.icon} />
            </div>
          </div>

          <div className={clsx(styles.footerLinks, styles.grid)}>
            {/* Group 1 */}
            <div
              data-aos="fade-up"
              data-aos-duration="3000"
              className={styles.linkGroup}
            >
              <span className={styles.groupTitle}>OUR AGENCY</span>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Services
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Staff
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Report
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Accommodation
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Payments
              </li>
            </div>

            {/* Group 2 */}
            <div
              data-aos="fade-up"
              data-aos-duration="4000"
              className={styles.linkGroup}
            >
              <span className={styles.groupTitle}>PARTNERS</span>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Services
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Staff
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Report
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Accommodation
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Payments
              </li>
            </div>

            {/* Group 3 */}
            <div
              data-aos="fade-up"
              data-aos-duration="5000"
              className={styles.linkGroup}
            >
              <span className={styles.groupTitle}>LAST MINUTE</span>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Services
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Staff
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Report
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Accommodation
              </li>

              <li className={clsx(styles.footerList, styles.flex)}>
                <FiChevronRight className={styles.icon} />
                Payments
              </li>
            </div>
          </div>

          <div className={clsx(styles.footerDiv, styles.flex)}>
            <small>FIND ACCOMMODATION EASIER</small>
            <small>COPYRIGHTS RESERVED - 2023</small>
          </div>
        </div>
      </div>
    </section>
  )
}
