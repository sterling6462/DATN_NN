import { Grid, Link, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  NavbarItemProps,
  NavbarProps,
  PrimaryButton,
  capitalizedStr,
  removeCookie,
  useAuthStore
} from 'components'
import { PATH } from 'constants/Paths'
import { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillHouseHeartFill } from 'react-icons/bs'
import { TbGridDots } from 'react-icons/tb'
import styles from './style.module.scss'

const dataHeader = [
  {
    title: 'Management',
    href: PATH.HOST.ROOM_LIST,
    classNameLi: styles.navItem,
    classNameLink: styles.navLink
  },
  {
    title: 'Report',
    href: '/#',
    classNameLi: styles.navItem,
    classNameLink: styles.navLink
  }
]

const NavbarItem = (props: NavbarItemProps) => {
  const { classNameLi, classNameLink, href, title } = props

  return (
    <li className={classNameLi}>
      <a href={href} className={classNameLink}>
        {title}
      </a>
    </li>
  )
}

export const Navbar = (props: NavbarProps) => {
  const [active, setActive] = useState(styles.navBar)
  const { auth } = useAuthStore()

  //TODO: replace role after login
  const { role = 'host', post } = props

  //Functions to toggle navbar
  const showNav = () => {
    setActive(clsx(styles.navBar, styles.activeNavbar))
  }

  //Functions to remove navbar
  const removeNavbar = () => {
    setActive(styles.navBar)
  }

  const logOut = () => {
    window.location.replace(PATH.HOME)
    removeCookie('access')
  }

  return (
    <div className={styles.navBarSection}>
      <header className={clsx(styles.header, styles.flex)}>
        <div className={styles.LogoContainer}>
          <BsFillHouseHeartFill className={styles.Icon} />
          <Link
            href="/#"
            underline="none"
            className={clsx(styles.Headline5, styles.LogoTitle)}
          >
            Accommodation
          </Link>
        </div>
        <div className={active}>
          <ul className={clsx(styles.navLists, styles.flex)}>
            <NavbarItem
              title="Home"
              href="/"
              classNameLi={styles.navItem}
              classNameLink={styles.navLink}
            />
            {role === 'host' &&
              dataHeader.map((item) => {
                return <NavbarItem {...item} />
              })}
            <NavbarItem
              title="About us"
              href={PATH.ABOUT}
              classNameLi={styles.navItem}
              classNameLink={styles.navLink}
            />
            {auth?.username ? (
              <>
                <Grid
                  display={'flex'}
                  flexDirection={'column'}
                  alignItems={'center'}
                >
                  <Typography
                    className={clsx(styles.Subhead1, styles.TextUsername)}
                  >
                    {auth.username}
                  </Typography>
                  {/* TODO: add role name */}
                  <Typography className={styles.Button}>
                    {capitalizedStr(role)}
                  </Typography>
                </Grid>
                <PrimaryButton className={styles.loginButton} onClick={logOut}>
                  Log out
                </PrimaryButton>
              </>
            ) : (
              <PrimaryButton className={styles.loginButton} href={PATH.LOGIN}>
                Log in
              </PrimaryButton>
            )}
          </ul>

          <div className={styles.closeNavbar} onClick={removeNavbar}>
            <AiFillCloseCircle className={styles.icon} />
          </div>
        </div>

        <div className={styles.toggleNavbar} onClick={showNav}>
          <TbGridDots className={styles.icon} />
        </div>
      </header>
    </div>
  )
}
