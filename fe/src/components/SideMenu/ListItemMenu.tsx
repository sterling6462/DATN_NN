import { ListItem, ListItemIcon, ListItemText } from '@mui/material'
import { MouseEventHandler, ReactNode } from 'react'
import { NavLink, To } from 'react-router-dom'

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
