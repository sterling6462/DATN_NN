import Aos from 'aos'
import 'aos/dist/aos.css'
import clsx from 'clsx'
import { PrimaryButton } from 'components'
import { useEffect } from 'react'
import { AiFillYoutube, AiOutlineTwitter } from 'react-icons/ai'
import { BsFillHouseHeartFill } from 'react-icons/bs'
import { FaTripadvisor } from 'react-icons/fa'
import { FiChevronRight, FiSend } from 'react-icons/fi'
import styles from './style.module.scss'

const skyscrapers = require('assets/mp4/skyscrapers.mp4')

const DataFooterLink = [
  {
    title: 'Services'
  },
  {
    title: 'Staff'
  },
  {
    title: 'Report'
  },
  {
    title: 'Accommodation'
  },
  {
    title: 'Payments'
  }
]

type FooterLinkProps = {
  title?: string
  classNameIcon?: string
  classNameLi?: string
}

const FooterLink = (props: FooterLinkProps) => {
  const { title, classNameIcon, classNameLi } = props
  return (
    <li className={clsx(classNameLi, styles.flex, styles.footerList)}>
      <FiChevronRight className={clsx(classNameIcon, styles.icon)} />
      {title}
    </li>
  )
}

export const Footer = () => {
  //react hook
  useEffect(() => {
    Aos.init({ duration: 2000 })
  }, [])

  return (
    <section className={styles.Footer}>
      <div className={styles.videoDiv}>
        <video src={skyscrapers} loop autoPlay muted />
      </div>

      <div className={styles.Content}>
        <div className={styles.Contact}>
          <div data-aos="fade-up" className={styles.text}>
            <small>ACCOMMODATION</small>
            <h2>Find accommodation easier</h2>
          </div>

          <div className={styles.Input}>
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

        <div className={clsx(styles.FooterCard, styles.flex)}>
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
              data-aos-duration="2000"
              className={styles.linkGroup}
            >
              <span className={styles.groupTitle}>OUR AGENCY</span>
              {DataFooterLink.map((item, index) => (
                <FooterLink {...item} key={index} />
              ))}
            </div>

            {/* Group 2 */}
            <div
              data-aos="fade-up"
              data-aos-duration="4000"
              className={styles.linkGroup}
            >
              <span className={styles.groupTitle}>PARTNERS</span>
              {DataFooterLink.map((item, index) => (
                <FooterLink {...item} key={index} />
              ))}
            </div>

            {/* Group 3 */}
            <div
              data-aos="fade-up"
              data-aos-duration="5000"
              className={styles.linkGroup}
            >
              <span className={styles.groupTitle}>LAST MINUTE</span>
              {DataFooterLink.map((item, index) => (
                <FooterLink {...item} key={index} />
              ))}
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
