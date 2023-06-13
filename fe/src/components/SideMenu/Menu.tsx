import { ArrowDropDownRounded } from '@mui/icons-material'
import { Box, Collapse, List } from '@mui/material'
import clsx from 'clsx'
import { ListItemMenu } from 'components'
import styles from './style.module.scss'

interface MenuItem {
  icon: JSX.Element
  title: string
  path: string
  children?: {
    icon: JSX.Element
    title: string
    path: string
  }[]
}

interface MenuProps {
  handClick: (title: string) => void
  menus: MenuItem[]
  path: string
}

export const Menu = (props: MenuProps) => {
  const { handClick, menus, path } = props

  return (
    <div className={styles.SideMenu}>
      <List className={styles.list} component="nav">
        {menus.map((item, index) => {
          if (item.children && item.children.length) {
            return (
              <div key={item.title + index}>
                <ListItemMenu
                  key={index}
                  onClick={() => handClick(item.title)}
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
