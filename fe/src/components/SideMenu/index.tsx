import { ArrowDropDownRounded } from '@mui/icons-material'
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import clsx from 'clsx'
import { MouseEventHandler, ReactNode, useState } from 'react'
import { NavLink, To, useLocation } from 'react-router-dom'
import { menus } from './DataMenu'
import styles from './style.module.scss'

interface ListItemMenuProps {
  listItemKey?: React.Key
  navLinkKey?: React.Key
  toNavLink: To
  path?: string
  children?: ReactNode
  primary?: string
  icon?: ReactNode
  classListItem?: {
    listItem?: string
    navLink?: string
    listItemIcon?: string
    listItemText?: string
    primaryListItemText?: string
  }
  onClick?: MouseEventHandler<HTMLLIElement>
}

export const ListItemMenu = (props: ListItemMenuProps) => {
  const {
    listItemKey,
    navLinkKey,
    toNavLink,
    path,
    primary,
    classListItem,
    icon,
    onClick,
    children
  } = props

  return (
    <ListItem
      className={classListItem?.listItem}
      key={listItemKey}
      onClick={onClick}
    >
      <NavLink
        to={toNavLink}
        key={navLinkKey}
        className={classListItem?.navLink}
      >
        {icon && (
          <ListItemIcon className={classListItem?.listItemIcon}>
            {icon}
          </ListItemIcon>
        )}
        <ListItemText
          primary={primary}
          className={classListItem?.listItemText}
          classes={{ primary: classListItem?.primaryListItemText }}
        />
        {children}
      </NavLink>
    </ListItem>
  )
}

export const SideMenu = () => {
  const router = useLocation()
  const path = router.pathname
  const [selected, setSelected] = useState(path.split('/')[1] || '')

  const handleClick = (title: string) => {
    title.toLowerCase() !== selected.toLowerCase()
      ? setSelected(title)
      : setSelected('')
  }

  return (
    <div className={styles.SideMenu}>
      <List className={styles.list} component="nav">
        {menus.map((item, index) => {
          if (item.children && item.children.length) {
            return (
              <div key={item.title + index}>
                <ListItemMenu
                  key={index}
                  onClick={() => handleClick(item.title)}
                  toNavLink=""
                  navLinkKey={index}
                  listItemKey={index}
                  primary={item.title}
                  icon={item.icon}
                  classListItem={{
                    listItem: styles.MenuItem,
                    navLink: clsx(
                      styles.link,
                      path.includes(item.path) && styles.active
                    ),
                    listItemIcon: clsx(
                      styles.ListItemIcon,
                      path.includes(item.title.toLowerCase()) && styles.active
                    ),
                    listItemText: clsx(
                      styles.Button,
                      styles.ListText,
                      path.includes(item.title.toLowerCase()) && styles.active
                    )
                  }}
                >
                  <Box
                    className={clsx(
                      styles.ListIcon,
                      path.includes(item.title.toLowerCase()) && styles.active
                    )}
                  >
                    <ArrowDropDownRounded />
                  </Box>
                </ListItemMenu>
                <Collapse
                  in={true}
                  // in={item.title.toLowerCase() === selected.toLowerCase()}
                  timeout="auto"
                  unmountOnExit
                >
                  {item.children.map((sub, index) => (
                    <ListItemMenu
                      key={index}
                      toNavLink={sub.path}
                      navLinkKey={index}
                      listItemKey={index}
                      icon={sub.icon}
                      primary={sub.title}
                      classListItem={{
                        listItem: styles.ListItemSub,
                        navLink: styles.linkSub,
                        listItemIcon: clsx(
                          styles.ListItemIcon,
                          path.includes(sub.path.toLowerCase()) &&
                            styles.subActive
                        ),
                        listItemText: clsx(
                          styles.ListText,
                          styles.listItemButton,
                          path.includes(sub.path.toLowerCase()) &&
                            styles.subActive
                        )
                      }}
                    />
                  ))}
                </Collapse>
              </div>
            )
          } else {
            return (
              <ListItemMenu
                key={index}
                icon={item.icon}
                primary={item.title}
                toNavLink={item.path}
                navLinkKey={index}
                listItemKey={item.title + index}
                classListItem={{
                  listItem: styles.MenuItem,
                  navLink: clsx(
                    styles.link,
                    path === item.path && styles.active
                  ),
                  listItemIcon: clsx(
                    styles.ListItemIcon,
                    path === item.path && styles.active
                  ),
                  listItemText: clsx(
                    styles.Button,
                    styles.ListText,
                    path === item.path && styles.active
                  )
                }}
              />
            )
          }
        })}
      </List>
    </div>
  )
}
