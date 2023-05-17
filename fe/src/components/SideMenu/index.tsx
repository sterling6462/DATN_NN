import { ArrowDropDownRounded, ArrowDropUpRounded } from '@mui/icons-material'
import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { menus } from './DataMenu'
import styles from './style.module.scss'

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
                <ListItem
                  onClick={() => handleClick(item.title)}
                  className={styles.MenuItem}
                >
                  <NavLink
                    className={clsx(
                      styles.link,
                      path.includes(item.path) && styles.active
                    )}
                    to={item.path}
                  >
                    <ListItemIcon
                      className={clsx(
                        styles.ListItemIcon,
                        path.includes(item.title.toLowerCase()) && styles.active
                      )}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      className={clsx(
                        styles.Button,
                        styles.ListText,
                        path.includes(item.title.toLowerCase()) && styles.active
                      )}
                    />
                    <Box
                      className={clsx(
                        styles.ListIcon,
                        path.includes(item.title.toLowerCase()) && styles.active
                      )}
                    >
                      {item.title.toLowerCase() === selected.toLowerCase() ? (
                        <ArrowDropUpRounded />
                      ) : (
                        <ArrowDropDownRounded />
                      )}
                    </Box>
                  </NavLink>
                </ListItem>
                <Collapse
                  in={true}
                  // in={item.title.toLowerCase() === selected.toLowerCase()}
                  timeout="auto"
                  unmountOnExit
                >
                  {item.children.map((sub, index) => (
                    <ListItem className={styles.ListItemSub} key={index}>
                      <NavLink
                        to={sub.path}
                        key={index}
                        className={styles.linkSub}
                      >
                        <ListItemIcon
                          className={clsx(
                            styles.ListItemIcon,
                            path === sub.path && styles.subActive
                          )}
                        >
                          {sub.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={sub.title}
                          className={clsx(
                            styles.ListText,
                            styles.listItemButton,
                            path === sub.path && styles.subActive
                          )}
                        />
                      </NavLink>
                    </ListItem>
                  ))}
                </Collapse>
              </div>
            )
          } else {
            return (
              <ListItem key={item.title + index} className={styles.MenuItem}>
                <NavLink
                  className={clsx(
                    styles.link,
                    path === item.path && styles.active
                  )}
                  to={item.path}
                >
                  <ListItemIcon
                    className={clsx(
                      styles.ListItemIcon,
                      path === item.path && styles.active
                    )}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.title}
                    className={clsx(
                      styles.Button,
                      styles.ListText,
                      path === item.path && styles.active
                    )}
                  />
                </NavLink>
              </ListItem>
            )
          }
        })}
      </List>
    </div>
  )
}
