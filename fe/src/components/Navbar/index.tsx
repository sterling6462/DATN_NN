import { Avatar, Grid, Link, Typography } from '@mui/material'
import clsx from 'clsx'
import {
  ListItemMenu,
  NavbarProps,
  PrimaryButton,
  capitalizeFirstLetter,
  removeCookie,
  stringToColor,
  useAuthStore
} from 'components'
import { PATH } from 'constants/Paths'
import { useState } from 'react'
import { AiFillCloseCircle } from 'react-icons/ai'
import { BsFillHouseHeartFill } from 'react-icons/bs'
import { TbGridDots } from 'react-icons/tb'
import { useLocation } from 'react-router-dom'
import styles from './style.module.scss'

export const Navbar = (props: NavbarProps) => {
  const [active, setActive] = useState(styles.RightContainer)
  const { auth } = useAuthStore()
  const router = useLocation()
  const path = router.pathname
  const subPath = path.split('/')
  const username = auth?.username
  const roles = auth?.roles
  const role = auth?.role

  //TODO: replace role after login
  const { post } = props

  //Functions to toggle navbar
  const showNav = () => {
    setActive(clsx(styles.RightContainer, styles.activeNavbar))
  }

  //Functions to remove navbar
  const removeNavbar = () => {
    setActive(styles.RightContainer)
  }

  const logOut = () => {
    window.location.replace(PATH.HOME)
    removeCookie('access')
  }

  return (
    <Grid container className={styles.Navbar}>
      <Grid item className={styles.LeftContainer}>
        <BsFillHouseHeartFill className={styles.Icon} />
        <Link
          href="/#"
          underline="none"
          className={clsx(styles.Headline5, styles.LogoTitle)}
        >
          Accommodation
        </Link>
      </Grid>
      <Grid item className={active}>
        <Grid className={styles.NavLists}>
          <ListItemMenu
            key={'home'}
            toNavLink={PATH.HOME}
            primary="Home"
            classListItem={{
              listItem: styles.ListItem,
              navLink: clsx(
                styles.NavLink,
                path === '/' && styles.NavLinkActive
              ),
              primaryListItemText: styles.Subhead1
            }}
          />
          {(role === 'manager' || role === 'admin') && (
            <ListItemMenu
              key={'management'}
              toNavLink={PATH.DASHBOARD}
              primary="Management"
              classListItem={{
                listItem: styles.ListItem,
                navLink: clsx(
                  styles.NavLink,
                  (subPath[1].includes('admin') ||
                    subPath[1].includes('manager')) &&
                    styles.NavLinkActive
                ),
                primaryListItemText: styles.Subhead1
              }}
            />
          )}

          {role === 'member' && (
            <ListItemMenu
              key={'rentedHouse'}
              toNavLink={PATH.MEMBER.MY_HOUSE}
              primary="Rented house"
              classListItem={{
                listItem: styles.ListItem,
                navLink: clsx(
                  styles.NavLink,
                  subPath[1].includes('member') && styles.NavLinkActive
                ),
                primaryListItemText: styles.Subhead1
              }}
            />
          )}

          <ListItemMenu
            key={'about'}
            toNavLink={PATH.ABOUT}
            primary="About us"
            classListItem={{
              listItem: styles.ListItem,
              navLink: clsx(
                styles.NavLink,
                path === PATH.ABOUT && styles.NavLinkActive
              ),
              primaryListItemText: styles.Subhead1
            }}
          />
          {username ? (
            <>
              <Grid container className={styles.ContainerInfo}>
                <Grid item>
                  <Avatar
                    sx={{ backgroundColor: stringToColor(username) }}
                    className={styles.Avatar}
                  >
                    {username.charAt(0)}
                  </Avatar>
                </Grid>
                <Grid item className={styles.User}>
                  <Typography
                    component={'span'}
                    className={clsx(styles.Subhead1, styles.TextUsername)}
                  >
                    {username}
                  </Typography>
                  <Typography component={'span'} className={styles.Button}>
                    {capitalizeFirstLetter(role || '')}
                  </Typography>
                </Grid>
              </Grid>
              <PrimaryButton
                className={styles.loginLogoutButton}
                onClick={logOut}
              >
                Log out
              </PrimaryButton>
            </>
          ) : (
            <PrimaryButton
              className={styles.loginLogoutButton}
              href={PATH.LOGIN}
            >
              Log in
            </PrimaryButton>
          )}
        </Grid>
        <div className={styles.CloseNavbar} onClick={removeNavbar}>
          <AiFillCloseCircle className={styles.Icon} />
        </div>
      </Grid>
      <div className={styles.ToggleNavbar} onClick={showNav}>
        <TbGridDots className={styles.Icon} />
      </div>
    </Grid>
  )
}
