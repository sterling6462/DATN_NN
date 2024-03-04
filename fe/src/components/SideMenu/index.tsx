import { Menu, useAuthStore } from 'components'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AdminMenus, ManagerMenus, MemberMenus } from './DataMenu'

export const SideMenu = () => {
  const auth = useAuthStore((store) => store.auth)
  const role = auth?.role
  const router = useLocation()
  const path = router.pathname
  const [selected, setSelected] = useState(path.split('/')[1] || '')

  const handleClick = (title: string) => {
    title.toLowerCase() !== selected.toLowerCase()
      ? setSelected(title)
      : setSelected('')
  }

  switch (role) {
    case 'admin':
      return <Menu path={path} menus={AdminMenus} handClick={handleClick} />

    case 'manager':
      return <Menu path={path} menus={ManagerMenus} handClick={handleClick} />

    case 'member':
      return <Menu path={path} menus={MemberMenus} handClick={handleClick} />

    default:
      return <></>
  }
}

export * from './ListItemMenu'
export * from './Menu'
